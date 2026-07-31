"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const content = {
  es: {
    title: "Términos del Servicio",
    lastUpdated: "Última actualización: Julio 2026",
    backToHome: "← Volver al inicio",
    header: "TÉRMINOS Y CONDICIONES DE SERVICIO",
    company: "AGENCIA DIGITAL 21FEET S.A. DE C.V.",
    intro: "Bienvenido a nuestra tienda digital. Al realizar una compra o contratar cualquier servicio, aceptas estar legalmente vinculado por estos términos.",
    aceptacionTitle: "ACEPTACIÓN Y CAPACIDAD LEGAL",
    aceptacionText: "Confirmas que eres mayor de 18 años y tienes capacidad legal para celebrar contratos vinculantes. Si actúas en representación de una empresa, garantizas contar con autoridad para obligarla legalmente.",
    catalogoTitle: "CATÁLOGO DE SERVICIOS Y PRECIOS",
    catalogoText: "Ofrecemos servicios digitales de marketing, branding, diseño gráfico y publicidad organizados en paquetes con alcances específicos. Todos los precios incluyen IVA y están expresados en pesos mexicanos. Nos reservamos el derecho de modificar precios sin previo aviso, respetando siempre los compromisos ya adquiridos.",
    procesoTitle: "PROCESO DE CONTRATACIÓN",
    procesoPaso1: "Paso 1 – Selección: Agregas el servicio deseado al carrito de compras",
    procesoPaso2: "Paso 2 – Checkout: Proporcionas información de contacto y facturación",
    procesoPaso3: "Paso 3 – Pago: Procesas el pago mediante las pasarelas habilitadas",
    procesoPaso4: "Paso 4 – Confirmación: Recibes email con confirmación de compra y factura electrónica.",
    procesoCierre: "La compra se perfecciona cuando recibes la confirmación por correo electrónico. Hasta ese momento existe un contrato válido entre las partes.",
    pagosTitle: "MÉTODOS DE PAGO ACEPTADOS",
    pagosText1: "Aceptamos pagos mediante tarjetas de crédito y débito emitidas por instituciones bancarias nacionales e internacionales que operen en México. Todos los cargos se procesan en pesos mexicanos (MXN) a través de nuestra pasarela de pago segura, la cual cumple con los más altos estándares de protección y confidencialidad de datos.",
    pagosText2: "Los precios de los productos y servicios están expresados en pesos mexicanos (MXN) y son más IVA, salvo que expresamente se indique lo contrario. El importe total a pagar, incluidos impuestos y comisiones aplicables, se mostrará antes de confirmar la transacción.",
    pagosText3: "El procesamiento del pago se considerará exitoso una vez que la institución bancaria haya autorizado la operación y el sistema confirme la recepción del monto correspondiente.",
    obligacionesTitle: "OBLIGACIONES DEL CLIENTE",
    obligacionesText1: "Proporcionar información completa y veraz: Datos de contacto, especificaciones del proyecto, materiales necesarios (logos, fotografías, textos, accesos a plataformas).",
    obligacionesText2: "Responder en tiempo: Tienes 5 días hábiles para revisar y aprobar cada entregable. Si no respondes en este plazo, se considera aprobado automáticamente y continuamos con la siguiente fase.",
    obligacionesText3: "Facilitar accesos necesarios: Para servicios que requieren gestión de redes sociales, email marketing o publicidad digital, debes proporcionar credenciales de administrador o permisos necesarios.",
    obligacionesText4: "Cumplir con derechos de autor: Garantizas que cualquier material que nos proporciones (imágenes, textos, música) no infringe derechos de terceros.",
    entregablesTitle: "ENTREGABLES Y PLAZOS",
    entregablesText1: "Cada servicio cuenta con alcances, características y objetivos claramente definidos en su descripción o propuesta comercial, los cuales determinan el tipo y número de entregables comprometidos. Antes de iniciar cualquier proyecto, se acordará con el cliente un cronograma estimado de ejecución y entrega, adaptado a la complejidad, volumen de trabajo y necesidades particulares de cada caso.",
    entregablesText2: "Los plazos de entrega comenzarán a correr únicamente a partir del momento en que el cliente haya proporcionado toda la información, materiales, archivos o accesos necesarios para el correcto desarrollo del servicio. Cualquier demora en la entrega de dichos elementos podrá afectar el calendario originalmente previsto, sin que ello implique incumplimiento por parte de la empresa.",
    entregablesText3: "En caso de requerir modificaciones, ajustes o entregas adicionales no contempladas inicialmente, estas se cotizarán y calendarizarán por separado. Asimismo, los entregables finales se considerarán completados una vez que hayan sido validados y aprobados por el cliente, conforme a los términos del servicio contratado.",
    revisionesTitle: "REVISIONES Y MODIFICACIONES",
    revisionesText1: "Cada servicio incluye un número específico de rondas de revisión según lo indicado en su descripción. Revisiones adicionales fuera del alcance contratado se cobrarán como servicio extraordinario.",
    revisionesText2: "Una \"revisión\" significa ajustes sobre el trabajo presentado. Cambios que implican rehacer completamente el concepto o dirección creativa se consideran un nuevo proyecto.",
    propiedadTitle: "PROPIEDAD INTELECTUAL",
    propiedadText1: "Trabajo final entregado: Una vez pagado completamente el servicio, te transferimos los derechos de uso sobre los entregables para que los utilices en tu negocio. Conservamos el derecho de usar el proyecto en nuestro portafolio y materiales promocionales.",
    propiedadText2: "Archivos fuente: No incluimos archivos editables (PSD, AI, etc.) salvo que estén expresamente indicados en la descripción del servicio. Si los requieres, puedes solicitarlos con costo adicional.",
    propiedadText3: "Marca 21 Feet: Todos nuestros desarrollos, metodologías, procesos y marca son propiedad exclusiva de AGENCIA DIGITAL 21FEET S.A. DE C.V.",
    suspensionTitle: "SUSPENSIÓN Y TERMINACIÓN",
    suspensionText: "Podemos suspender o cancelar el servicio si:",
    suspensionLi1: "Proporcionas información falsa o fraudulenta",
    suspensionLi2: "Incumples con tus obligaciones de pago",
    suspensionLi3: "Usas nuestros servicios para fines ilegales o poco éticos",
    suspensionLi4: "Faltas de respeto al equipo o mantienes conducta abusiva",
    suspensionCierre: "En caso de terminación anticipada por causa imputable al cliente, no procede reembolso alguno.",
    limitacionTitle: "LIMITACIÓN DE RESPONSABILIDAD",
    limitacionText1: "Nuestros servicios de marketing y publicidad no garantizan resultados específicos de ventas, alcance o engagement. Trabajamos con mejores prácticas de la industria, pero los resultados dependen de múltiples factores fuera de nuestro control (mercado, competencia, producto, timing, presupuesto).",
    limitacionText2: "No somos responsables por pérdidas de oportunidad comercial, daños indirectos, suspensión de cuentas en plataformas de terceros, cambios en algoritmos de redes sociales, o problemas técnicos en servidores externos.",
    limitacionText3: "Nuestra responsabilidad máxima se limita al monto pagado por el servicio específico en cuestión.",
    confidencialidadTitle: "CONFIDENCIALIDAD",
    confidencialidadText: "Mantenemos confidencial toda información estratégica, comercial o sensible que compartas durante la prestación del servicio. No la divulgamos a terceros salvo que sea necesario para ejecutar el proyecto. Esta obligación permanece vigente incluso después de terminada la relación comercial.",
    fuerzaTitle: "FUERZA MAYOR",
    fuerzaText: "No seremos responsables por retrasos o incumplimientos causados por circunstancias fuera de nuestro control razonable: desastres naturales, pandemias, conflictos bélicos, cortes de energía, fallas en servicios de internet, cambios regulatorios, o suspensiones de plataformas digitales de terceros.",
    leyTitle: "LEY APLICABLE Y JURISDICCIÓN",
    leyText: "Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier disputa se resolverá en los tribunales competentes de la Ciudad de México, renunciando a cualquier otra jurisdicción.",
    notificacionesTitle: "NOTIFICACIONES",
    notificacionesText: "Todas las comunicaciones oficiales se realizan al correo electrónico proporcionado durante la compra. Es tu responsabilidad mantenerlo actualizado y revisar regularmente incluyendo la carpeta de spam.",
    divisibilidadTitle: "DIVISIBILIDAD",
    divisibilidadText: "Si alguna cláusula de estos términos se declara inválida o inexigible, el resto permanece vigente y vinculante.",
    modificacionesTitle: "MODIFICACIONES",
    modificacionesText: "Podemos actualizar estos términos ocasionalmente. Los cambios aplican para compras futuras. Servicios ya contratados se rigen por los términos vigentes al momento de la compra.",
    vigencia: "Vigencia: Julio 2026",
  },
  en: {
    title: "Terms of Service",
    lastUpdated: "Last updated: July 2026",
    backToHome: "← Back to home",
    header: "TERMS AND CONDITIONS OF SERVICE",
    company: "AGENCIA DIGITAL 21FEET S.A. DE C.V.",
    intro: "Welcome to our digital store. By making a purchase or contracting any service, you agree to be legally bound by these terms.",
    aceptacionTitle: "ACCEPTANCE AND LEGAL CAPACITY",
    aceptacionText: "You confirm that you are over 18 years of age and have the legal capacity to enter into binding contracts. If you are acting on behalf of a company, you guarantee that you have the authority to legally bind it.",
    catalogoTitle: "SERVICE CATALOG AND PRICING",
    catalogoText: "We offer digital marketing, branding, graphic design, and advertising services organized in packages with specific scopes. All prices include VAT and are expressed in Mexican pesos. We reserve the right to modify prices without prior notice, always respecting commitments already made.",
    procesoTitle: "CONTRACTING PROCESS",
    procesoPaso1: "Step 1 – Selection: You add the desired service to the shopping cart",
    procesoPaso2: "Step 2 – Checkout: You provide contact and billing information",
    procesoPaso3: "Step 3 – Payment: You process the payment through enabled gateways",
    procesoPaso4: "Step 4 – Confirmation: You receive an email with purchase confirmation and electronic invoice.",
    procesoCierre: "The purchase is completed when you receive confirmation by email. At that moment, a valid contract exists between the parties.",
    pagosTitle: "ACCEPTED PAYMENT METHODS",
    pagosText1: "We accept payments via credit and debit cards issued by national and international banking institutions operating in Mexico. All charges are processed in Mexican pesos (MXN) through our secure payment gateway, which complies with the highest standards of data protection and confidentiality.",
    pagosText2: "Product and service prices are expressed in Mexican pesos (MXN) plus VAT, unless expressly stated otherwise. The total amount to be paid, including applicable taxes and fees, will be displayed before confirming the transaction.",
    pagosText3: "Payment processing will be considered successful once the banking institution has authorized the operation and the system confirms receipt of the corresponding amount.",
    obligacionesTitle: "CLIENT OBLIGATIONS",
    obligacionesText1: "Provide complete and accurate information: Contact details, project specifications, necessary materials (logos, photographs, texts, platform access).",
    obligacionesText2: "Respond on time: You have 5 business days to review and approve each deliverable. If you do not respond within this period, it is considered automatically approved and we continue with the next phase.",
    obligacionesText3: "Provide necessary access: For services requiring social media management, email marketing, or digital advertising, you must provide administrator credentials or necessary permissions.",
    obligacionesText4: "Comply with copyright: You guarantee that any material you provide us (images, texts, music) does not infringe on third-party rights.",
    entregablesTitle: "DELIVERABLES AND DEADLINES",
    entregablesText1: "Each service has scope, characteristics, and objectives clearly defined in its description or commercial proposal, which determine the type and number of committed deliverables. Before starting any project, an estimated execution and delivery schedule will be agreed upon with the client, adapted to the complexity, workload, and particular needs of each case.",
    entregablesText2: "Delivery deadlines will only begin to run from the moment the client has provided all the information, materials, files, or access necessary for the proper development of the service. Any delay in delivering such elements may affect the originally planned schedule, without this implying non-compliance by the company.",
    entregablesText3: "In case of requiring modifications, adjustments, or additional deliveries not initially contemplated, these will be quoted and scheduled separately. Likewise, final deliverables will be considered completed once they have been validated and approved by the client, in accordance with the terms of the contracted service.",
    revisionesTitle: "REVIEWS AND MODIFICATIONS",
    revisionesText1: "Each service includes a specific number of review rounds as indicated in its description. Additional reviews outside the contracted scope will be charged as an extraordinary service.",
    revisionesText2: "A \"review\" means adjustments to the presented work. Changes that involve completely redoing the concept or creative direction are considered a new project.",
    propiedadTitle: "INTELLECTUAL PROPERTY",
    propiedadText1: "Final delivered work: Once the service is fully paid, we transfer the usage rights over the deliverables so you can use them in your business. We retain the right to use the project in our portfolio and promotional materials.",
    propiedadText2: "Source files: We do not include editable files (PSD, AI, etc.) unless expressly indicated in the service description. If you require them, you can request them at an additional cost.",
    propiedadText3: "21 Feet Brand: All our developments, methodologies, processes, and brand are the exclusive property of AGENCIA DIGITAL 21FEET S.A. DE C.V.",
    suspensionTitle: "SUSPENSION AND TERMINATION",
    suspensionText: "We may suspend or cancel the service if:",
    suspensionLi1: "You provide false or fraudulent information",
    suspensionLi2: "You fail to comply with your payment obligations",
    suspensionLi3: "You use our services for illegal or unethical purposes",
    suspensionLi4: "You show disrespect to the team or maintain abusive conduct",
    suspensionCierre: "In case of early termination due to client-attributable cause, no refund shall apply.",
    limitacionTitle: "LIMITATION OF LIABILITY",
    limitacionText1: "Our marketing and advertising services do not guarantee specific sales, reach, or engagement results. We work with industry best practices, but results depend on multiple factors beyond our control (market, competition, product, timing, budget).",
    limitacionText2: "We are not responsible for loss of business opportunity, indirect damages, account suspension on third-party platforms, changes in social media algorithms, or technical problems on external servers.",
    limitacionText3: "Our maximum liability is limited to the amount paid for the specific service in question.",
    confidencialidadTitle: "CONFIDENTIALITY",
    confidencialidadText: "We keep confidential all strategic, commercial, or sensitive information that you share during the provision of the service. We do not disclose it to third parties unless necessary to execute the project. This obligation remains in effect even after the business relationship has ended.",
    fuerzaTitle: "FORCE MAJEURE",
    fuerzaText: "We shall not be liable for delays or non-compliance caused by circumstances beyond our reasonable control: natural disasters, pandemics, war conflicts, power outages, internet service failures, regulatory changes, or suspensions of third-party digital platforms.",
    leyTitle: "APPLICABLE LAW AND JURISDICTION",
    leyText: "These terms are governed by the laws of the United Mexican States. Any dispute shall be resolved in the competent courts of Mexico City, waiving any other jurisdiction.",
    notificacionesTitle: "NOTIFICATIONS",
    notificacionesText: "All official communications are made to the email address provided during purchase. It is your responsibility to keep it updated and check regularly, including the spam folder.",
    divisibilidadTitle: "SEVERABILITY",
    divisibilidadText: "If any clause of these terms is declared invalid or unenforceable, the rest shall remain in effect and binding.",
    modificacionesTitle: "MODIFICATIONS",
    modificacionesText: "We may update these terms occasionally. Changes apply to future purchases. Services already contracted are governed by the terms in effect at the time of purchase.",
    vigencia: "Effective: July 2026",
  },
};

export default function TerminosServicioPage() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <div className="min-h-screen bg-background">
      <div className="section-x mx-auto max-w-3xl pb-20 pt-32">
        <Link
  href="/"
  className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground mb-8"
>
  {t.backToHome}
</Link>

        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl mb-4">
            {t.title}
          </h1>
          <p className="font-mono text-xs text-muted-foreground">
            {t.lastUpdated}
          </p>
        </div>

        <div className="prose prose-neutral max-w-none space-y-8">
          <p>
            <strong>{t.header}</strong>
            <br />
            <strong>{t.company}</strong>
          </p>

          <p>{t.intro}</p>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.aceptacionTitle}</h2>
            <p>{t.aceptacionText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.catalogoTitle}</h2>
            <p>{t.catalogoText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.procesoTitle}</h2>
            <p>{t.procesoPaso1}</p>
            <p>{t.procesoPaso2}</p>
            <p>{t.procesoPaso3}</p>
            <p>{t.procesoPaso4}</p>
            <p className="mt-4">{t.procesoCierre}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.pagosTitle}</h2>
            <p>{t.pagosText1}</p>
            <p className="mt-4">{t.pagosText2}</p>
            <p className="mt-4">{t.pagosText3}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.obligacionesTitle}</h2>
            <p><strong>{t.obligacionesText1.split(":")[0]}:</strong> {t.obligacionesText1.split(":")[1]}</p>
            <p className="mt-2"><strong>{t.obligacionesText2.split(":")[0]}:</strong> {t.obligacionesText2.split(":")[1]}</p>
            <p className="mt-2"><strong>{t.obligacionesText3.split(":")[0]}:</strong> {t.obligacionesText3.split(":")[1]}</p>
            <p className="mt-2"><strong>{t.obligacionesText4.split(":")[0]}:</strong> {t.obligacionesText4.split(":")[1]}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.entregablesTitle}</h2>
            <p>{t.entregablesText1}</p>
            <p className="mt-4">{t.entregablesText2}</p>
            <p className="mt-4">{t.entregablesText3}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.revisionesTitle}</h2>
            <p>{t.revisionesText1}</p>
            <p className="mt-4">{t.revisionesText2}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.propiedadTitle}</h2>
            <p><strong>{t.propiedadText1.split(":")[0]}:</strong> {t.propiedadText1.split(":")[1]}</p>
            <p className="mt-2"><strong>{t.propiedadText2.split(":")[0]}:</strong> {t.propiedadText2.split(":")[1]}</p>
            <p className="mt-2"><strong>{t.propiedadText3.split(":")[0]}:</strong> {t.propiedadText3.split(":")[1]}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.suspensionTitle}</h2>
            <p>{t.suspensionText}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t.suspensionLi1}</li>
              <li>{t.suspensionLi2}</li>
              <li>{t.suspensionLi3}</li>
              <li>{t.suspensionLi4}</li>
            </ul>
            <p className="mt-4">{t.suspensionCierre}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.limitacionTitle}</h2>
            <p>{t.limitacionText1}</p>
            <p className="mt-4">{t.limitacionText2}</p>
            <p className="mt-4">{t.limitacionText3}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.confidencialidadTitle}</h2>
            <p>{t.confidencialidadText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.fuerzaTitle}</h2>
            <p>{t.fuerzaText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.leyTitle}</h2>
            <p>{t.leyText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.notificacionesTitle}</h2>
            <p>{t.notificacionesText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.divisibilidadTitle}</h2>
            <p>{t.divisibilidadText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.modificacionesTitle}</h2>
            <p>{t.modificacionesText}</p>
          </section>

          <p className="mt-12 text-sm text-muted-foreground">
            {t.vigencia}
          </p>
        </div>
      </div>
    </div>
  );
}