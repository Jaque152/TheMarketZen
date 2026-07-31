"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../../lib/language-context";

const content = {
  es: {
    title: "Aviso de Privacidad",
    lastUpdated: "Última actualización: Julio 2026",
    backToHome: "← Volver al inicio",
    header: "POLÍTICA DE PRIVACIDAD",
    subheader: "PROTECCIÓN DE INFORMACIÓN PERSONAL",
    company: "AGENCIA DIGITAL 21FEET S.A. DE C.V.",
    responsable: "Responsable: AGENCIA DIGITAL 21FEET S.A. DE C.V. | Ubicación: Av. Tamaulipas 150, Piso 18, Int. 1801, Col. Hipódromo, Cuauhtémoc, 06100, CDMX",
    queTitle: "¿QUÉ INFORMACIÓN RECOPILAMOS Y POR QUÉ?",
    queText1: "Cuando compras servicios de marketing digital, branding o publicidad en nuestra tienda online, procesamos tu información personal bajo el marco legal de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
    queText2: "Tu información financiera (datos bancarios, información de pago) la utilizamos exclusivamente para procesar transacciones. Trabajamos con procesadores de pago certificados PCI-DSS que encriptan esta información. Nosotros NO almacenamos números completos de tarjeta en nuestros servidores.",
    queText3: "Tus datos de facturación (RFC, razón social, domicilio fiscal, régimen) los requiere el SAT para emitir facturas electrónicas válidas. Los conservamos por el tiempo que marca la legislación fiscal mexicana.",
    queText4: "Tu correo electrónico nos permite comunicarnos contigo sobre los servicios que compraste: confirmación de pedido, avances del proyecto, entrega de archivos finales, y resolución de dudas técnicas.",
    queText5: "Tu información de navegación (páginas que visitas, servicios que consultas, tiempo en el sitio) la analizamos mediante Google Analytics para mejorar la experiencia de compra y optimizar nuestro catálogo. Esto incluye cookies de análisis que puedes desactivar desde tu navegador.",
    compartirTitle: "¿COMPARTIMOS TU INFORMACIÓN?",
    compartirText: "Únicamente con estos terceros necesarios para operar el negocio:",
    compartirLi1: "Pasarelas de pago (u otros procesadores certificados) para ejecutar transacciones",
    compartirLi2: "Proveedores de hosting y almacenamiento en la nube donde reside nuestra tienda",
    compartirLi3: "Autoridades fiscales cuando lo requiera la ley",
    compartirCierre: "Todos estos proveedores operan bajo acuerdos de confidencialidad y cumplen con estándares de seguridad informática.",
    derechosTitle: "TUS DERECHOS SOBRE TU INFORMACIÓN",
    derechosAcceder: "ACCEDER: Solicitar una copia de toda la información que tenemos sobre ti",
    derechosRectificar: "RECTIFICAR: Corregir datos incorrectos o desactualizados",
    derechosCancelar: "CANCELAR: Eliminar tu información de nuestras bases de datos",
    derechosOponerte: "OPONERTE: Negarte al uso de tus datos para fines específicos",
    derechosRevocar: "REVOCAR CONSENTIMIENTO: Retirar tu autorización en cualquier momento",
    derechosComo: "¿Cómo ejercer estos derechos?",
    derechosComoText: "Envía un correo a administracion@themarketzen.com con:",
    derechosComoLi1: "Tu nombre completo y correo registrado",
    derechosComoLi2: "Copia de identificación oficial",
    derechosComoLi3: "Descripción clara de lo que solicitas",
    derechosCierre: "Responderemos en máximo 20 días hábiles.",
    seguridadTitle: "SEGURIDAD DE TU INFORMACIÓN",
    seguridadText: "Implementamos protocolos SSL/TLS para encriptar la transmisión de datos, controles de acceso restringido a información sensible, respaldos periódicos encriptados, y monitoreo continuo de vulnerabilidades de seguridad.",
    cookiesTitle: "COOKIES Y TECNOLOGÍAS DE RASTREO",
    cookiesText1: "Usamos cookies esenciales para que el carrito de compras funcione y cookies analíticas para entender cómo usas el sitio.",
    cookiesText2: "Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades de la tienda.",
    menoresTitle: "MENORES DE EDAD",
    menoresText: "Nuestros servicios están dirigidos a empresas y profesionales mayores de 18 años. No recopilamos intencionalmente información de menores.",
    cambiosTitle: "CAMBIOS A ESTE AVISO",
    cambiosText: "Podemos actualizar este documento para reflejar cambios en nuestras prácticas o en la legislación. La versión actualizada siempre estará disponible en nuestro sitio con la fecha de última modificación.",
    jurisdiccionTitle: "JURISDICCIÓN",
    jurisdiccionText: "Este aviso se rige por las leyes mexicanas. Cualquier controversia se resolverá ante los tribunales competentes de la Ciudad de México.",
    vigencia: "Última actualización: Julio 2026",
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: July 2026",
    backToHome: "← Back to home",
    header: "PRIVACY POLICY",
    subheader: "PERSONAL INFORMATION PROTECTION",
    company: "AGENCIA DIGITAL 21FEET S.A. DE C.V.",
    responsable: "Responsible: AGENCIA DIGITAL 21FEET S.A. DE C.V. | Location: Av. Tamaulipas 150, Piso 18, Int. 1801, Col. Hipódromo, Cuauhtémoc, 06100, CDMX",
    queTitle: "WHAT INFORMATION DO WE COLLECT AND WHY?",
    queText1: "When you purchase digital marketing, branding, or advertising services in our online store, we process your personal information under the legal framework of the Federal Law on Protection of Personal Data Held by Private Parties.",
    queText2: "We use your financial information (banking data, payment information) exclusively to process transactions. We work with PCI-DSS certified payment processors that encrypt this information. We do NOT store complete card numbers on our servers.",
    queText3: "Your billing information (Tax ID, company name, tax address, tax regime) is required by the Mexican tax authority (SAT) to issue valid electronic invoices. We retain it for the period required by Mexican tax legislation.",
    queText4: "Your email allows us to communicate with you about the services you purchased: order confirmation, project progress, delivery of final files, and resolution of technical questions.",
    queText5: "We analyze your browsing information (pages you visit, services you view, time on site) through Google Analytics to improve the shopping experience and optimize our catalog. This includes analytics cookies that you can disable from your browser.",
    compartirTitle: "DO WE SHARE YOUR INFORMATION?",
    compartirText: "Only with these third parties necessary to operate the business:",
    compartirLi1: "Payment gateways (or other certified processors) to execute transactions",
    compartirLi2: "Hosting and cloud storage providers where our store resides",
    compartirLi3: "Tax authorities when required by law",
    compartirCierre: "All these providers operate under confidentiality agreements and comply with cybersecurity standards.",
    derechosTitle: "YOUR RIGHTS OVER YOUR INFORMATION",
    derechosAcceder: "ACCESS: Request a copy of all the information we have about you",
    derechosRectificar: "RECTIFY: Correct inaccurate or outdated data",
    derechosCancelar: "CANCEL: Delete your information from our databases",
    derechosOponerte: "OBJECT: Refuse the use of your data for specific purposes",
    derechosRevocar: "WITHDRAW CONSENT: Revoke your authorization at any time",
    derechosComo: "How to exercise these rights?",
    derechosComoText: "Send an email to administracion@themarketzen.com with:",
    derechosComoLi1: "Your full name and registered email",
    derechosComoLi2: "Copy of official identification",
    derechosComoLi3: "Clear description of what you are requesting",
    derechosCierre: "We will respond within a maximum of 20 business days.",
    seguridadTitle: "SECURITY OF YOUR INFORMATION",
    seguridadText: "We implement SSL/TLS protocols to encrypt data transmission, restricted access controls to sensitive information, periodic encrypted backups, and continuous security vulnerability monitoring.",
    cookiesTitle: "COOKIES AND TRACKING TECHNOLOGIES",
    cookiesText1: "We use essential cookies for the shopping cart to function and analytical cookies to understand how you use the site.",
    cookiesText2: "You can configure your browser to reject cookies, although this may affect some store functionalities.",
    menoresTitle: "MINORS",
    menoresText: "Our services are aimed at companies and professionals over 18 years of age. We do not intentionally collect information from minors.",
    cambiosTitle: "CHANGES TO THIS NOTICE",
    cambiosText: "We may update this document to reflect changes in our practices or legislation. The updated version will always be available on our site with the date of last modification.",
    jurisdiccionTitle: "JURISDICTION",
    jurisdiccionText: "This notice is governed by Mexican law. Any dispute shall be resolved before the competent courts of Mexico City.",
    vigencia: "Last updated: July 2026",
  },
};

export default function AvisoPrivacidadPage() {
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
            <strong>{t.subheader}</strong>
            <br />
            <strong>{t.company}</strong>
          </p>

          <p className="text-sm text-muted-foreground">{t.responsable}</p>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.queTitle}</h2>
            <p>{t.queText1}</p>
            <p className="mt-4">{t.queText2}</p>
            <p className="mt-4">{t.queText3}</p>
            <p className="mt-4">{t.queText4}</p>
            <p className="mt-4">{t.queText5}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.compartirTitle}</h2>
            <p>{t.compartirText}</p>
            <ul className="list-none pl-0 mt-2 space-y-2">
              <li>→ {t.compartirLi1}</li>
              <li>→ {t.compartirLi2}</li>
              <li>→ {t.compartirLi3}</li>
            </ul>
            <p className="mt-4">{t.compartirCierre}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.derechosTitle}</h2>
            <ul className="list-none pl-0 space-y-2">
              <li><strong>{t.derechosAcceder.split(":")[0]}:</strong> {t.derechosAcceder.split(":")[1]}</li>
              <li><strong>{t.derechosRectificar.split(":")[0]}:</strong> {t.derechosRectificar.split(":")[1]}</li>
              <li><strong>{t.derechosCancelar.split(":")[0]}:</strong> {t.derechosCancelar.split(":")[1]}</li>
              <li><strong>{t.derechosOponerte.split(":")[0]}:</strong> {t.derechosOponerte.split(":")[1]}</li>
              <li><strong>{t.derechosRevocar.split(":")[0]}:</strong> {t.derechosRevocar.split(":")[1]}</li>
            </ul>
            <p className="mt-6"><strong>{t.derechosComo}</strong></p>
            <p className="mt-2">{t.derechosComoText}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t.derechosComoLi1}</li>
              <li>{t.derechosComoLi2}</li>
              <li>{t.derechosComoLi3}</li>
            </ul>
            <p className="mt-4">{t.derechosCierre}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.seguridadTitle}</h2>
            <p>{t.seguridadText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.cookiesTitle}</h2>
            <p>{t.cookiesText1}</p>
            <p className="mt-4">{t.cookiesText2}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.menoresTitle}</h2>
            <p>{t.menoresText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.cambiosTitle}</h2>
            <p>{t.cambiosText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">{t.jurisdiccionTitle}</h2>
            <p>{t.jurisdiccionText}</p>
          </section>

          <p className="mt-12 text-sm text-muted-foreground">
            {t.vigencia}
          </p>
        </div>
      </div>
    </div>
  );
}