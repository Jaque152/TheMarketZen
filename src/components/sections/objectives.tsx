"use client";

import { useLanguage } from "@/lib/language-context";

export function Objectives() {
  const { t } = useLanguage();
  return (
    <section className="surface-ink relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <div className="relative min-h-[320px] lg:min-h-full">
          <img
            src="https://plus.unsplash.com/premium_photo-1683980578016-a1f980719ec2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Dardo en el centro de la diana"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink lg:from-ink/10" />
        </div>

        {/* Copy */}
        <div className="section-x py-20 lg:py-32">
          <div className="mx-auto max-w-xl lg:mr-auto lg:pl-4">
            <span className="eyebrow text-primary">{t.objectives.eyebrow}</span>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.02] text-cream sm:text-5xl lg:text-[3.4rem]">
              {t.objectives.title}
            </h2>

            <div className="mt-12 space-y-8">
              {t.objectives.items.map((o) => (
                <div
                  key={o.n}
                  className="grid grid-cols-[auto_1fr] gap-6 border-t border-cream/15 pt-6"
                >
                  <span className="font-display text-3xl text-primary">
                    {o.n}
                  </span>
                  <div>
                    <p className="font-display text-2xl text-cream">{o.t}</p>
                    <p className="mt-2 text-cream/60">{o.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
