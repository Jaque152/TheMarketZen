"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const icons = [Clock, MapPin, Phone, Mail];

export function ContactInfo() {
  const { lang, t } = useLanguage();

  return (
    <section id="contacto" className="section-x mx-auto max-w-[1500px] py-24 lg:py-32">
      {/* Encabezado editorial */}
      <div className="text-center">
        <span className="eyebrow text-primary">{t.contact.eyebrow}</span>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-medium italic leading-[1.02] sm:text-5xl lg:text-[3.6rem]">
          {t.contact.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {t.contact.sub}
        </p>
      </div>

      {/* Contenedor principal: Proporción 1.1 a 0.9 con items-stretch para alinear alturas a la perfección */}
      <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 xl:gap-10 items-stretch">
        
        {/* Bloque 1: Cuadrícula 2x2 con tarjetas independientes (Cero barras grises residuales) */}
        <div className="grid gap-4 sm:grid-cols-2 auto-rows-fr">
          {t.contact.info.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.label}
                className="group flex flex-col justify-between rounded-[3px] border border-foreground/10 bg-card p-6 lg:p-7 transition-all duration-500 hover:border-foreground/25 hover:bg-background shadow-2xs"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-cream">
                    <Icon className="h-5 w-5 shrink-0" />
                  </div>
                  <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </p>
                </div>
                {/* break-words y text-base garantizan que el correo electrónico no se corte ni se desborde */}
                <p className="mt-3 font-display text-base sm:text-lg leading-snug text-foreground break-words">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bloque 2: Tarjeta Destacada de Cotización y Plan Personalizado */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-[3px] border border-primary/25 bg-gradient-to-br from-card via-background to-card p-8 sm:p-10 shadow-sm transition-all duration-500 hover:border-primary/50">
          
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span>
                {lang === "en" ? "Custom Scope & Pricing" : "Alcance a la medida"}
              </span>
            </div>

            <h3 className="mt-6 font-display text-3xl font-medium leading-tight text-foreground sm:text-4xl">
              {lang === "en"
                ? "Need a Custom Plan or Quote?"
                : "¿Requieres una Cotización o Plan Personalizado?"}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {lang === "en"
                ? "If your brand demands a specialized scope, dedicated ongoing deliverables, or a unique combination of our catalog solutions, let's build a tailored roadmap structured around your exact business goals."
                : "Si tu marca necesita un alcance específico, entregables continuos dedicados o una combinación única de nuestro catálogo, diseñemos una propuesta estratégica estructurada exactamente a la medida de tus objetivos."}
            </p>
          </div>

          {/* Remate inferior y Botón de acción */}
          <div className="mt-10 pt-6 border-t border-foreground/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-muted-foreground">
              {lang === "en" ? "Direct response · Friction-free" : "Respuesta directa · Sin compromiso"}
            </span>

            <Link
              href="/contacto"
              className="group/btn inline-flex items-center justify-center gap-3 rounded-sm bg-primary px-7 py-4 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg active:translate-y-0.5"
            >
              <span>
                {lang === "en" ? "Request Custom Quote" : "Solicitar Cotización"}
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>

          {/* Marca de agua arquitectónica en el fondo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-10 select-none font-display text-[14rem] leading-none text-primary/[0.03] rotate-12"
          >
            Zen
          </div>
        </div>

      </div>
    </section>
  );
}