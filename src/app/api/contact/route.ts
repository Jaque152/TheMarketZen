import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nombre, email, telefono, mensaje, lang } = await req.json();

    if (!nombre || !email) {
      return NextResponse.json(
        {
          error:
            lang === "en"
              ? "Name and email are required fields."
              : "El nombre y correo electrónico son obligatorios.",
        },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("[Contact Route] Missing RESEND_API_KEY in environment variables.");
      return NextResponse.json(
        { error: "Server email configuration is missing." },
        { status: 500 }
      );
    }

    const fromEmail = "The Market Zen <administracion@themarketzen.com>";

    const isEn = lang === "en";

    // Plantillas de correo HTML
    const emailTemplates = buildContactEmailTemplates({
      nombre,
      email,
      telefono,
      mensaje,
      isEn,
    });

    let customerSuccess = false;
    let adminSuccess = false;

    // 1. Enviar correo de confirmación al cliente
    try {
      const resCustomer = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [email],
          subject: isEn
            ? "We've received your inquiry — The Market Zen"
            : "Hemos recibido tu consulta — The Market Zen",
          html: emailTemplates.customer,
        }),
      });

      const customerData = await resCustomer.json();
      if (resCustomer.ok) {
        customerSuccess = true;
        console.log("[Resend Contact Customer Success]", customerData);
      } else {
        console.error("[Resend Contact Customer Error]", customerData);
      }
    } catch (err) {
      console.error("[Resend Contact Customer Exception]", err);
    }

    // 2. Enviar correo de notificación al Administrador
    try {
      const resAdmin = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [fromEmail], 
          subject: `[Nueva Consulta web] ${nombre} (${email})`,
          html: emailTemplates.admin,
        }),
      });

      const adminData = await resAdmin.json();
      if (resAdmin.ok) {
        adminSuccess = true;
        console.log("[Resend Contact Admin Success]", adminData);
      } else {
        console.error("[Resend Contact Admin Error]", adminData);
      }
    } catch (err) {
      console.error("[Resend Contact Admin Exception]", err);
    }

    return NextResponse.json({
      success: true,
      emailStatus: { customerSuccess, adminSuccess },
    });
  } catch (error: any) {
    console.error("[Contact API Exception]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Generador de maquetación HTML para los correos
function buildContactEmailTemplates({
  nombre,
  email,
  telefono,
  mensaje,
  isEn,
}: {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  isEn: boolean;
}) {
  const year = new Date().getFullYear();

  const customerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f1f1f; background: #fdfcfb; padding: 32px; border: 1px solid #e5e0db;">
      <h1 style="color: #c44d2b; font-size: 24px; margin-top: 0;">The Market Zen</h1>
      <h2 style="font-size: 20px; border-bottom: 2px solid #1f1f1f; padding-bottom: 10px;">
        ${isEn ? "Inquiry Received!" : "¡Hemos recibido tu consulta!"}
      </h2>
      <p style="font-size: 15px; line-height: 1.6; color: #4a4a4a;">
        ${
          isEn
            ? `Hello ${nombre},<br/><br/>Thank you for reaching out to us. A strategy specialist from our team will review your inquiry and get back to you shortly.`
            : `Hola ${nombre},<br/><br/>Gracias por ponerte en contacto con nosotros. Un especialista de nuestro equipo revisará tus comentarios y te responderá a la brevedad.`
        }
      </p>

      <div style="background: #f5f2ef; padding: 20px; margin: 24px 0; border-radius: 4px;">
        <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #666;">
          ${isEn ? "Summary of your inquiry" : "Resumen de tu consulta"}
        </h3>
        <p style="margin: 6px 0; font-size: 14px;"><strong>${isEn ? "Name" : "Nombre"}:</strong> ${nombre}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>${isEn ? "Email" : "Correo"}:</strong> ${email}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>${isEn ? "Phone" : "Teléfono"}:</strong> ${telefono || "N/A"}</p>
        ${
          mensaje
            ? `<p style="margin: 12px 0 0; font-size: 14px; border-top: 1px solid #ddd; padding-top: 10px;"><strong>${isEn ? "Message" : "Mensaje"}:</strong><br/>${mensaje}</p>`
            : ""
        }
      </div>

      <p style="font-size: 13px; color: #888; margin-top: 36px; text-align: center;">
        © ${year} themarketzen.com · Creative Studio · CDMX
      </p>
    </div>
  `;

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f1f1f; background: #fdfcfb; padding: 32px; border: 1px solid #e5e0db;">
      <h1 style="color: #c44d2b; font-size: 24px; margin-top: 0;">The Market Zen</h1>
      <h2 style="font-size: 20px; border-bottom: 2px solid #1f1f1f; padding-bottom: 10px;">
        Nueva Consulta recibida desde el sitio web
      </h2>

      <div style="background: #f5f2ef; padding: 20px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 6px 0; font-size: 14px;"><strong>Nombre:</strong> ${nombre}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Correo:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Teléfono:</strong> ${telefono || "No especificado"}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Idioma del sitio:</strong> ${isEn ? "Inglés (EN)" : "Español (ES)"}</p>
      </div>

      <div style="border: 1px solid #e5e0db; padding: 16px; border-radius: 4px;">
        <h4 style="margin: 0 0 10px; font-size: 13px; text-transform: uppercase; color: #666;">Mensaje o requerimiento:</h4>
        <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${mensaje || "Sin mensaje adicional."}</p>
      </div>

      <p style="font-size: 13px; color: #888; margin-top: 36px; text-align: center;">
        Sistema de Notificaciones · themarketzen.com
      </p>
    </div>
  `;

  return { customer: customerHtml, admin: adminHtml };
}