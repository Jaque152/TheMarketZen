"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortalEmblem } from "@/components/logo";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden pt-[72px]">
      <div className="paper-texture absolute inset-0 -z-10" />
      <div className="section-x mx-auto max-w-[1500px]">
        <div className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          {/* Copy */}
          <div className="reveal">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="eyebrow text-primary">{t.hero.eyebrow}</span>
            </div>

            <h1 className="mt-7 font-display text-[3.1rem] font-medium leading-[0.98] tracking-[-0.01em] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
              {t.hero.titleA} <span className="italic text-primary">{t.hero.titleEm}</span>
              {t.hero.titleB}
            </h1>

            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              {t.hero.sub}
            </p>
          </div>

          {/* Visual */}
          <div className="relative reveal" style={{ animationDelay: "0.15s" }}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2px] bg-ink">
              <img
                src="https://images.pexels.com/photos/6476258/pexels-photo-6476258.jpeg"
                alt="Retrato creativo de doble exposición"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-terracotta/25 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

              {/* index tag */}
              <span className="absolute left-5 top-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cream/80">
                TheMarketZen / 2026
              </span>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <p className="max-w-[60%] font-display text-lg leading-tight text-cream">
                  {t.hero.caption}
                </p>
                <Link
                  href="/servicios"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink transition-colors hover:bg-primary hover:text-cream"
                  aria-label={t.hero.cta1}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* floating badge */}
            <div className="animate-float absolute -left-3 top-10 hidden rounded-full bg-cream px-4 py-3 shadow-lg sm:flex sm:items-center sm:gap-2 lg:-left-8">
              <PortalEmblem className="h-4 w-4 text-primary" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.15em]">
                {t.hero.badge}
              </span>
            </div>
            <div className="absolute -bottom-4 -right-2 hidden h-24 w-24 items-center justify-center rounded-full bg-ochre text-center text-ink lg:flex">
              <span className="font-mono text-[0.6rem] uppercase leading-tight tracking-[0.1em]">
                {t.common.from}
                <br />
                2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
