"use client";

import Link from "next/link";
import { Clock, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PortalEmblem } from "@/components/logo";
import { useLanguage } from "@/lib/language-context";

const icons = [Clock, MapPin, Phone, Mail];

export default function ContactoPage() {
  // Extraemos 'lang' además de 't' para el soporte bilingüe del nuevo botón
  const { lang, t } = useLanguage(); 
  
  return (
    <>
      <section className="section-x mx-auto max-w-[1500px] pb-8 pt-32 lg:pt-40">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          <span className="eyebrow text-primary">{t.contactPage.eyebrow}</span>
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <h1 className="font-display text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-7xl">
            {t.contactPage.titleA}{" "}
            <span className="italic text-primary">{t.contactPage.titleEm}</span>{" "}
            {t.contactPage.titleB}
          </h1>
          <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
            {t.contactPage.sub}
          </p>
        </div>
      </section>

      <section className="section-x mx-auto max-w-[1500px] py-14">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Info column */}
          <div className="flex flex-col justify-between gap-10">
            
            {/* 1. Lista de información de contacto */}
            <ul className="space-y-px overflow-hidden rounded-[3px] border border-foreground/10">
              {t.contact.info.map((item, i) => {
                const Icon = icons[i];
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-4 bg-card p-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="mt-1 font-display text-lg leading-snug">
                        {item.value}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* 2. NUEVO BOTÓN: Redirección a Pago de Folio */}
            <Link
              href="/pago-folio"
              className="group flex items-center justify-between rounded-[3px] border border-primary/20 bg-primary/5 p-6 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10"
            >
              <div>
                <p className="font-display text-2xl font-medium leading-tight text-foreground">
                  {lang === "en"
                    ? "Have an approved quote?"
                    : "¿Tienes una cotización aprobada?"}
                </p>
                <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
                  {lang === "en" ? "Pay custom invoice" : "Pagar folio a la medida"}
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-cream shadow-sm transition-transform duration-500 group-hover:scale-110">
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* 3. Recuadro oscuro con Testimonio / Cita */}
            <div className="surface-ink relative overflow-hidden rounded-[3px] p-8">
              <PortalEmblem className="h-6 w-6 text-primary" />
              <p className="mt-5 font-display text-2xl leading-snug text-cream">
                {t.contactPage.quote}
              </p>
              <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cream/50">
                {t.contactPage.quoteAuthor}
              </p>
            </div>
          </div>

          {/* Form column */}
          <div className="rounded-[3px] border border-foreground/10 bg-card p-8 lg:p-12 h-fit">
            <h2 className="font-display text-3xl">{t.contactPage.formTitle}</h2>
            <p className="mt-2 text-muted-foreground">
              {t.contactPage.formSub}
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}