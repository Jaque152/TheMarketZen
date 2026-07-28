"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PortalEmblem } from "@/components/logo";
import { useLanguage } from "@/lib/language-context";

const icons = [Clock, MapPin, Phone, Mail];

export default function ContactoPage() {
  const { t } = useLanguage();
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

          {/* Form */}
          <div className="rounded-[3px] border border-foreground/10 bg-card p-8 lg:p-12">
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
