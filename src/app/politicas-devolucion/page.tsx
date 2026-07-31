"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../../lib/language-context";

const content = {
  es: {
    title: "Políticas de Devolución",
    lastUpdated: "Última actualización: Julio 2026",
    backToHome: "← Volver al inicio",
    header: "POLÍTICA DE DEVOLUCIONES Y REEMBOLSOS",
    company: "AGENCIA DIGITAL 21FEET S.A. DE C.V.",
    intro: "Esta política establece los procedimientos y condiciones bajo las cuales puedes solicitar la cancelación de los servicios contratados en nuestra tienda digital.",
    naturalezaTitle: "NATURALEZA DE LOS SERVICIOS",
    naturalezaText: "Los servicios ofrecidos por 21 Feet son digitales, personalizados y hechos a medida, por lo que desde el momento del pago se destinan recursos humanos, técnicos y creativos de forma inmediata.",
    naturalezaText2: "Por ello, todas las solicitudes de cancelación o reembolso se analizan de forma individual, conforme al momento en que se presenta la solicitud y al estado del proyecto.",
    motivosTitle: "MOTIVOS DE CANCELACIÓN",
    motivosText: "Las cancelaciones únicamente podrán solicitarse bajo las siguientes circunstancias:",
    motivosLi1: "Por decisión del cliente: el cliente puede desistir del servicio en cualquier momento; sin embargo, esto no genera derecho a reembolso, conforme a las condiciones de esta política.",
    motivosLi2: "Por incumplimiento del cliente: si el cliente no proporciona información, materiales o accesos necesarios para la ejecución del servicio, no responde a comunicaciones o incumple con sus obligaciones contractuales, el proyecto podrá darse por terminado sin reembolso alguno.",
    motivosLi3: "Por causa atribuible a 21 Feet: si por motivos directamente atribuibles a 21 Feet no fuera posible ejecutar el servicio contratado, se procederá al reembolso del monto pagado, siempre que no se haya iniciado el desarrollo del proyecto.",
    noReembolsoTitle: "CASOS EN LOS QUE NO APLICA REEMBOLSO",
    noReembolsoText: "No procederá ningún tipo de reembolso en los siguientes supuestos:",
    noReembolsoLi1: "Cuando el proyecto haya iniciado parcial o totalmente.",
    noReembolsoLi2: "Cuando el cliente decida cancelar por motivos personales o de conveniencia, sin que exista incumplimiento por parte de 21 Feet.",
    noReembolsoLi3: "Cuando el retraso o imposibilidad de ejecución derive de falta de respuesta o entrega de información por parte del cliente.",
    noReembolsoLi4: "Cuando el servicio implique inversión en publicidad, contratación de terceros o compra de recursos externos, ya que estos montos son no recuperables.",
    noReembolsoLi5: "Cuando se haya incurrido en contracargos o disputas bancarias iniciadas unilateralmente por el cliente.",
    procedimientoTitle: "PROCEDIMIENTO DE CANCELACIÓN Y REEMBOLSO",
    procedimientoPaso1: "Solicitud formal: el cliente deberá enviar una solicitud por escrito al correo administracion@themarketzen.com, indicando:",
    procedimientoPaso1a: "Nombre completo o razón social.",
    procedimientoPaso1b: "Número de pedido o referencia de compra.",
    procedimientoPaso1c: "Servicio contratado.",
    procedimientoPaso1d: "Motivo de la solicitud.",
    procedimientoPaso2: "Evaluación: el equipo de 21 Feet analizará la solicitud y verificará el estado del proyecto y las condiciones aplicables.",
    procedimientoPaso3: "Resolución: el cliente recibirá una respuesta por correo electrónico en un plazo máximo de 5 días hábiles, indicando si procede o no el reembolso.",
    procedimientoPaso4: "Forma de reembolso: en caso de proceder, el reembolso se realizará exclusivamente por el mismo medio de pago utilizado al momento de la compra.",
    procedimientoCierre: "El tiempo de acreditación dependerá de la institución bancaria o plataforma de pago, pudiendo tardar entre 5 y 20 días hábiles una vez autorizado.",
    erroresTitle: "ERRORES DE COBRO",
    erroresText: "En caso de cargos duplicados o errores en el procesamiento del pago, se verificará la operación y, una vez confirmado el error, se gestionará el reembolso inmediato por el mismo medio de pago.",
    disputasTitle: "DISPUTAS Y CONTRACARGOS",
    disputasText: "Antes de iniciar cualquier disputa bancaria o contracargo, el cliente deberá agotar el proceso interno de revisión y reembolso previsto en esta política.",
    disputasText2: "En caso de que se presente un contracargo sin previo aviso:",
    disputasLi1: "El servicio se suspenderá de inmediato.",
    disputasLi2: "Se proporcionará la evidencia correspondiente a la institución financiera.",
    disputasLi3: "Podrá limitarse la posibilidad de futuras contrataciones con 21 Feet.",
    modificacionesTitle: "MODIFICACIONES Y APLICACIÓN",
    modificacionesText: "Esta política puede ser actualizada para reflejar cambios en nuestras operaciones o en la legislación aplicable. Las solicitudes de cancelación y reembolso se regirán por la versión vigente al momento de su presentación.",
    contactoTitle: "CONTACTO",
    contactoText: "Para cualquier solicitud o aclaración relacionada con cancelaciones o reembolsos, puedes comunicarte al correo: administracion@themarketzen.com",
    vigencia: "Última actualización: Julio 2026",
  },
  en: {
    title: "Refund Policy",
    lastUpdated: "Last updated: July 2026",
    backToHome: "← Back to home",
    header: "RETURN AND REFUND POLICY",
    company: "AGENCIA DIGITAL 21FEET S.A. DE C.V.",
    intro: "This policy establishes the procedures and conditions under which you may request cancellation of services contracted in our digital store.",
    naturalezaTitle: "NATURE OF SERVICES",
    naturalezaText: "The services offered by 21 Feet are digital, personalized, and custom-made, so from the moment of payment, human, technical, and creative resources are allocated immediately.",
    naturalezaText2: "Therefore, all cancellation or refund requests are analyzed individually, according to the time the request is submitted and the status of the project.",
    motivosTitle: "GROUNDS FOR CANCELLATION",
    motivosText: "Cancellations may only be requested under the following circumstances:",
    motivosLi1: "By client decision: the client may withdraw from the service at any time; however, this does not generate the right to a refund, in accordance with the conditions of this policy.",
    motivosLi2: "Due to client non-compliance: if the client does not provide information, materials, or access necessary for the execution of the service, does not respond to communications, or fails to comply with their contractual obligations, the project may be terminated without any refund.",
    motivosLi3: "Due to causes attributable to 21 Feet: if for reasons directly attributable to 21 Feet it is not possible to execute the contracted service, the amount paid will be refunded, provided that the project development has not started.",
    noReembolsoTitle: "CASES IN WHICH NO REFUND APPLIES",
    noReembolsoText: "No type of refund will proceed in the following cases:",
    noReembolsoLi1: "When the project has partially or fully started.",
    noReembolsoLi2: "When the client decides to cancel for personal or convenience reasons, without any breach by 21 Feet.",
    noReembolsoLi3: "When the delay or impossibility of execution derives from lack of response or delivery of information by the client.",
    noReembolsoLi4: "When the service involves investment in advertising, contracting third parties, or purchasing external resources, as these amounts are non-refundable.",
    noReembolsoLi5: "When chargebacks or bank disputes have been initiated unilaterally by the client.",
    procedimientoTitle: "CANCELLATION AND REFUND PROCEDURE",
    procedimientoPaso1: "Formal request: the client must send a written request to the email administracion@themarketzen.com, indicating:",
    procedimientoPaso1a: "Full name or company name.",
    procedimientoPaso1b: "Order number or purchase reference.",
    procedimientoPaso1c: "Contracted service.",
    procedimientoPaso1d: "Reason for the request.",
    procedimientoPaso2: "Evaluation: the 21 Feet team will analyze the request and verify the status of the project and the applicable conditions.",
    procedimientoPaso3: "Resolution: the client will receive a response by email within a maximum of 5 business days, indicating whether the refund proceeds or not.",
    procedimientoPaso4: "Refund method: if applicable, the refund will be made exclusively through the same payment method used at the time of purchase.",
    procedimientoCierre: "The crediting time will depend on the banking institution or payment platform, and may take between 5 and 20 business days once authorized.",
    erroresTitle: "CHARGE ERRORS",
    erroresText: "In case of duplicate charges or payment processing errors, the operation will be verified and, once the error is confirmed, an immediate refund will be processed through the same payment method.",
    disputasTitle: "DISPUTES AND CHARGEBACKS",
    disputasText: "Before initiating any bank dispute or chargeback, the client must exhaust the internal review and refund process provided in this policy.",
    disputasText2: "In the event that a chargeback is filed without prior notice:",
    disputasLi1: "The service will be suspended immediately.",
    disputasLi2: "The corresponding evidence will be provided to the financial institution.",
    disputasLi3: "The possibility of future contracting with 21 Feet may be limited.",
    modificacionesTitle: "MODIFICATIONS AND APPLICATION",
    modificacionesText: "This policy may be updated to reflect changes in our operations or applicable legislation. Cancellation and refund requests will be governed by the version in effect at the time of submission.",
    contactoTitle: "CONTACT",
    contactoText: "For any request or clarification related to cancellations or refunds, you can contact us at: administracion@themarketzen.com",
    vigencia: "Last updated: July 2026",
  },
};

export default function PoliticasDevolucionPage() {
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
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.naturalezaTitle}</h2>
            <p>{t.naturalezaText}</p>
            <p className="mt-4">{t.naturalezaText2}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.motivosTitle}</h2>
            <p>{t.motivosText}</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>{t.motivosLi1}</li>
              <li>{t.motivosLi2}</li>
              <li>{t.motivosLi3}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.noReembolsoTitle}</h2>
            <p>{t.noReembolsoText}</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>{t.noReembolsoLi1}</li>
              <li>{t.noReembolsoLi2}</li>
              <li>{t.noReembolsoLi3}</li>
              <li>{t.noReembolsoLi4}</li>
              <li>{t.noReembolsoLi5}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.procedimientoTitle}</h2>
            <p><strong>1.</strong> {t.procedimientoPaso1}</p>
            <ul className="list-circle pl-8 mt-1 space-y-1">
              <li>{t.procedimientoPaso1a}</li>
              <li>{t.procedimientoPaso1b}</li>
              <li>{t.procedimientoPaso1c}</li>
              <li>{t.procedimientoPaso1d}</li>
            </ul>
            <p className="mt-4"><strong>2.</strong> {t.procedimientoPaso2}</p>
            <p className="mt-2"><strong>3.</strong> {t.procedimientoPaso3}</p>
            <p className="mt-2"><strong>4.</strong> {t.procedimientoPaso4}</p>
            <p className="mt-4">{t.procedimientoCierre}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.erroresTitle}</h2>
            <p>{t.erroresText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.disputasTitle}</h2>
            <p>{t.disputasText}</p>
            <p className="mt-4">{t.disputasText2}</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>{t.disputasLi1}</li>
              <li>{t.disputasLi2}</li>
              <li>{t.disputasLi3}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.modificacionesTitle}</h2>
            <p>{t.modificacionesText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.contactoTitle}</h2>
            <p>{t.contactoText}</p>
          </section>

          <p className="mt-12 text-sm text-muted-foreground">
            {t.vigencia}
          </p>
        </div>
      </div>
    </div>
  );
}