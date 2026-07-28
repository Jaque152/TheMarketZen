"use client";

import { PortalEmblem } from "@/components/logo";
import { useLanguage } from "@/lib/language-context";

export function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="section-x mx-auto max-w-[1500px] py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Image */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Fotógrafa del estudio en acción"
              className="img-warm h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-terracotta/25 to-transparent mix-blend-multiply" />
          </div>
          <div className="absolute -bottom-6 -right-4 max-w-[200px] rounded-[2px] bg-ink p-5 text-cream sm:right-6">
            <p className="font-display text-3xl leading-none">
              {t.about.badgeTitle}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-cream/60">
              {t.about.badgeDesc}
            </p>
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <PortalEmblem className="h-4 w-4 text-primary" />
            <span className="eyebrow text-primary">{t.about.eyebrow}</span>
          </div>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.02] sm:text-5xl lg:text-[3.6rem]">
            {t.about.title}
          </h2>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[2px] border border-foreground/10 sm:grid-cols-2">
            {t.about.blocks.map((b) => (
              <div key={b.t} className="bg-card p-6">
                <p className="font-display text-xl">{b.t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
