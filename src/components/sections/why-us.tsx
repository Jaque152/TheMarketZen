"use client";

import { PortalEmblem} from "@/components/logo";
import { useLanguage } from "@/lib/language-context";

export function WhyUs() {
  const { t } = useLanguage();
  return (
    <section className="section-x mx-auto max-w-[1500px] py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Copy + list */}
        <div>
          <div className="flex items-center gap-3">
            <PortalEmblem className="h-4 w-4 text-primary" />
            <span className="eyebrow text-primary">{t.whyUs.eyebrow}</span>
          </div>
          <h2 className="mt-6 max-w-xl font-display text-4xl font-medium leading-[1.02] sm:text-5xl lg:text-[3.4rem]">
            {t.whyUs.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t.whyUs.sub}
          </p>

          <ul className="mt-12">
            {t.whyUs.advantages.map((a, i) => (
              <li
                key={a.t}
                className="group grid grid-cols-[auto_1fr] gap-6 border-t border-foreground/10 py-6 transition-colors last:border-b hover:bg-secondary/40"
              >
                <span className="font-mono text-sm text-primary">
                  0{i + 1}
                </span>
                <div>
                  <p className="font-display text-2xl">{a.t}</p>
                  <p className="mt-1.5 max-w-xl text-muted-foreground">{a.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Sticky image */}
        <div className="relative">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-secondary">
              <img
                src="https://plus.unsplash.com/premium_photo-1684179641331-e89c6320b6a9?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Miembro del equipo creativo trabajando"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-2xl text-cream">
                  {t.whyUs.caption}
                </p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-cream/70">
                  {t.whyUs.captionSub}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
