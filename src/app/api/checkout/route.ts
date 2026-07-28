import { NextResponse } from "next/server";

const KEYCOP_BASE_URL = "https://pagos.keycop.com.mx/api/v1";

// 1. Definición estricta de interfaces 
interface CheckoutForm {
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  direccion: string;
  ciudad: string;
  cp: string;
  countryIdx?: string;
  card: string;
  exp: string;
  cvc: string;
  cardName: string;
}

interface ProductContent {
  name: string;
  features?: string[];
}

interface CartLineItem {
  quantity: number;
  product: {
    id: string | number;
    price: number;
    content: Record<string, ProductContent>;
  };
}

interface CheckoutRequestPayload {
  form: CheckoutForm;
  items: CartLineItem[];
  subtotal: number;
  iva: number;
  total: number;
  lang: "es" | "en" | string;
}

interface EmailError {
  target: "customer" | "admin";
  error: unknown;
}

interface EmailStatus {
  attempted: boolean;
  customerSuccess: boolean;
  adminSuccess: boolean;
  errors: EmailError[];
}

interface EmailTemplateParams {
  orderId: string;
  form: CheckoutForm;
  items: CartLineItem[];
  subtotal: number;
  iva: number;
  total: number;
  lang: string;
}

export async function POST(req: Request) {
  try {
    const { form, items, subtotal, iva, total, lang }: CheckoutRequestPayload = await req.json();

    if (!form || !items || items.length === 0) {
      return NextResponse.json(
        { error: lang === "en" ? "Invalid order data" : "Datos de orden inválidos" },
        { status: 400 }
      );
    }

    const orderId = `TMZ-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Iniciar sesión en Keycop
    const signinRes = await fetch(`${KEYCOP_BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email: process.env.KEYCOP_EMAIL,
        password: process.env.KEYCOP_PASSWORD,
      }),
    });

    const signinData = await signinRes.json();
    if (!signinData.authToken) {
      console.error("[Keycop Auth Error]", signinData);
      return NextResponse.json(
        { error: lang === "en" ? "Payment gateway authentication failed." : "Error de autenticación con la pasarela de pago." },
        { status: 502 }
      );
    }

    const authToken = signinData.authToken;
    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // 2. Formatear expiración
    const cleanExp = form.exp.replace(/\D/g, "");
    const expirationMonth = cleanExp.slice(0, 2);
    const expirationYear = "20" + cleanExp.slice(2, 4);

    // 3. Tokenizar tarjeta
    const tokenRes = await fetch(`${KEYCOP_BASE_URL}/card/tokenizer`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        cardData: {
          cardNumber: form.card.replace(/\s/g, ""),
          cardholderName: form.cardName,
          expirationMonth,
          expirationYear,
        },
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.cardNumberToken) {
      console.error("[Keycop Tokenizer Error]", tokenData);
      return NextResponse.json(
        { error: lang === "en" ? "Card encryption failed. Check card details." : "Error al encriptar la tarjeta. Verifica los datos." },
        { status: 400 }
      );
    }

    const formattedItems = items.map((line: CartLineItem) => ({
      title: line.product.content[lang]?.name ?? "Producto",
      amount: Number(line.product.price),
      quantity: Number(line.quantity),
      id: String(line.product.id),
    }));

    // 5. Procesar cobro 
    const salePayload = {
      amount: Number(total.toFixed(2)),
      currency: 484, // MXN
      reference: orderId,
      customerInformation: {
        firstName: form.nombre.split(" ")[0] || form.nombre,
        lastName: form.nombre.split(" ").slice(1).join(" ") || "Cliente",
        email: form.email,
        phone1: form.telefono || "0000000000",
        city: form.ciudad,
        address1: form.direccion,
        postalCode: form.cp,
        state: form.ciudad,
        country: "MX",
        ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      },
      cardData: {
        cardNumberToken: tokenData.cardNumberToken,
        cvv: form.cvc,
      },
      items: formattedItems,
      redirectUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://themarketzen.com",
    };

    const saleRes = await fetch(`${KEYCOP_BASE_URL}/sale`, {
      method: "POST",
      headers,
      body: JSON.stringify(salePayload),
    });

    const saleData = await saleRes.json();

    if (saleData.status !== "APPROVED") {
      console.error("[Keycop Sale Declined/Error]", saleData);
      return NextResponse.json(
        { 
          error: saleData.message || (lang === "en" ? "Payment declined by issuing bank." : "El pago fue declinado por el banco emisor."),
          status: saleData.status 
        },
        { status: 402 }
      );
    }

    // 6. Enviar correos 
    const emailStatus: EmailStatus = { 
      attempted: false, 
      customerSuccess: false, 
      adminSuccess: false, 
      errors: [] 
    };

    if (process.env.RESEND_API_KEY) {
      emailStatus.attempted = true;
      const emailHtml = buildEmailTemplate({ orderId, form, items, subtotal, iva, total, lang });     
      const adminEmail = "The Market Zen <administracion@themarketzen.com>";

      // Envío al Cliente
      try {
        const resClient = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: adminEmail,
            to: [form.email],
            subject: lang === "en" ? `Order Confirmation — ${orderId}` : `Confirmación de orden — ${orderId}`,
            html: emailHtml.customer,
          }),
        });
        const clientData = await resClient.json();
        if (!resClient.ok) {
          console.error("[Resend Customer Error]", clientData);
          emailStatus.errors.push({ target: "customer", error: clientData });
        } else {
          console.log("[Resend Customer Success]", clientData);
          emailStatus.customerSuccess = true;
        }
      } catch (err: unknown) {
        console.error("[Resend Customer Exception]", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        emailStatus.errors.push({ target: "customer", error: errorMessage });
      }

      // Envío al Admin
      try {
        const resAdmin = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: adminEmail,
            to: [adminEmail],
            subject: `[Nueva Orden Pagada] ${orderId} — $${total.toLocaleString("en-US")} MXN`,
            html: emailHtml.admin,
          }),
        });
        const adminData = await resAdmin.json();
        if (!resAdmin.ok) {
          console.error("[Resend Admin Error]", adminData);
          emailStatus.errors.push({ target: "admin", error: adminData });
        } else {
          console.log("[Resend Admin Success]", adminData);
          emailStatus.adminSuccess = true;
        }
      } catch (err: unknown) {
        console.error("[Resend Admin Exception]", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        emailStatus.errors.push({ target: "admin", error: errorMessage });
      }
    } else {
      console.warn("[Resend Warning] RESEND_API_KEY no se encontró en las variables de entorno.");
    }

    return NextResponse.json({ 
      success: true, 
      orderId, 
      status: saleData.status,
      emailStatus 
    });
  } catch (error: unknown) {
    console.error("[Checkout Route Exception]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function buildEmailTemplate({ orderId, form, items, subtotal, iva, total, lang }: EmailTemplateParams) {
  const isEn = lang === "en";
  const itemsListHtml = items
    .map(
      (line: CartLineItem) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea;">
          <strong>${line.product.content[lang]?.name ?? "Producto"}</strong>
          <br /><small style="color: #666;">${isEn ? "Qty" : "Cant."}: ${line.quantity}</small>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea; text-align: right;">
          $${(line.product.price * line.quantity).toLocaleString("en-US")} MXN
        </td>
      </tr>`
    )
    .join("");

  const baseHtml = (title: string, intro: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f1f1f; background: #fdfcfb; padding: 30px; border: 1px solid #e5e0db;">
      <h1 style="color: #c44d2b; font-size: 24px; margin-top: 0;">The Market Zen</h1>
      <h2 style="font-size: 20px; border-bottom: 2px solid #1f1f1f; padding-bottom: 10px;">${title}</h2>
      <p style="font-size: 15px; line-height: 1.6; color: #4a4a4a;">${intro}</p>
      
      <div style="background: #f5f2ef; padding: 15px 20px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 0; font-size: 14px;"><strong>${isEn ? "Order Reference" : "Folio de Orden"}:</strong> ${orderId}</p>
        <p style="margin: 5px 0 0; font-size: 14px;"><strong>${isEn ? "Client" : "Cliente"}:</strong> ${form.nombre} (${form.email})</p>
        <p style="margin: 5px 0 0; font-size: 14px;"><strong>${isEn ? "Phone" : "Teléfono"}:</strong> ${form.telefono || "N/A"}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
        <thead>
          <tr>
            <th style="text-align: left; padding-bottom: 8px; border-bottom: 2px solid #1f1f1f;">${isEn ? "Service" : "Servicio"}</th>
            <th style="text-align: right; padding-bottom: 8px; border-bottom: 2px solid #1f1f1f;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsListHtml}
        </tbody>
        <tfoot>
          <tr>
            <td style="padding-top: 15px;"><strong>Subtotal:</strong></td>
            <td style="padding-top: 15px; text-align: right;">$${subtotal.toLocaleString("en-US")} MXN</td>
          </tr>
          <tr>
            <td style="padding-top: 5px;"><strong>IVA (16%):</strong></td>
            <td style="padding-top: 5px; text-align: right;">$${iva.toLocaleString("en-US")} MXN</td>
          </tr>
          <tr>
            <td style="padding-top: 10px; font-size: 16px;"><strong>Total:</strong></td>
            <td style="padding-top: 10px; font-size: 16px; text-align: right; color: #c44d2b;"><strong>$${total.toLocaleString("en-US")} MXN</strong></td>
          </tr>
        </tfoot>
      </table>

      <p style="font-size: 13px; color: #888; margin-top: 40px; text-align: center;">
        © ${new Date().getFullYear()} themarketzen.com · Creative Studio · CDMX
      </p>
    </div>
  `;

  return {
    customer: baseHtml(
      isEn ? "Thank you for your purchase!" : "¡Gracias por tu contratación!",
      isEn
        ? "We have successfully processed your payment. Our team is already reviewing your order details and will contact you shortly to schedule the kickoff session."
        : "Hemos procesado exitosamente tu pago. Nuestro equipo ya está revisando los detalles de tu orden y se pondrá en contacto contigo en breve para arrancar el proyecto."
    ),
    admin: baseHtml(
      isEn ? "New Paid Order Received" : "Nueva Orden Pagada Registrada",
      isEn
        ? `A new payment of $${total.toLocaleString("en-US")} MXN has been approved via Keycop for client ${form.nombre}.`
        : `Se ha aprobado un nuevo pago por $${total.toLocaleString("en-US")} MXN vía Keycop para el cliente ${form.nombre}.`
    ),
  };
}