"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { products, formatMXN } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const planIds = ["pluma-y-pixel", "aliados-de-marca", "esencia-de-marca"];

export function Plans() {
  const { lang, t } = useLanguage();
  const plans = planIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <section id="planes" className="surface-ink relative py-24 lg:py-32">
      <div className="section-x mx-auto max-w-[1500px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow text-primary">{t.plans.eyebrow}</span>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.02] text-cream sm:text-5xl lg:text-[3.4rem]">
              {t.plans.title}
            </h2>
          </div>
          <p className="max-w-sm text-cream/60">{t.plans.sub}</p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const featured = plan.popular;
            const c = plan.content[lang];
            return (
              <div
                key={plan.id}
                className={cn(
                  "flex flex-col rounded-[3px] border p-8 transition-transform duration-500 hover:-translate-y-1",
                  featured
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-cream/15 bg-cream/[0.03] text-cream",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-mono text-[0.65rem] uppercase tracking-[0.2em]",
                      featured ? "text-cream/80" : "text-cream/50",
                    )}
                  >
                    {t.categories[plan.category]}
                  </span>
                  {featured && (
                    <span className="rounded-full bg-cream/20 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.15em]">
                      {t.plans.popular}
                    </span>
                  )}
                </div>

                <Link href={`/servicios/${plan.id}`}>
                  <h3 className="mt-5 font-display text-3xl transition-opacity hover:opacity-80">
                    {c.name}
                  </h3>
                </Link>
                <p
                  className={cn(
                    "mt-2 text-sm",
                    featured ? "text-cream/80" : "text-cream/55",
                  )}
                >
                  {c.tagline}
                </p>

                <div className="mt-7 flex items-end gap-1">
                  <span className="font-display text-4xl">
                    {formatMXN(plan.price).replace(" MXN", "")}
                  </span>
                  <span
                    className={cn(
                      "mb-1 font-mono text-[0.65rem] uppercase tracking-[0.12em]",
                      featured ? "text-cream/70" : "text-cream/45",
                    )}
                  >
                    MXN {plan.monthly ? t.common.perMonth : ""} · +IVA 16%
                  </span>
                </div>

                <div className="my-7 h-px w-full bg-cream/15" />

                <ul className="flex-1 space-y-3">
                  {c.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          featured ? "text-cream" : "text-primary",
                        )}
                      />
                      <span className={featured ? "text-cream/90" : "text-cream/70"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <AddToCartButton
                  productId={plan.id}
                  label={t.plans.cta}
                  showIcon={false}
                  variant={featured ? "ink" : "default"}
                  className={cn(
                    "mt-8 w-full",
                    featured &&
                      "bg-ink text-cream hover:bg-cream hover:text-ink",
                  )}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg" className="border-cream/30 text-cream hover:bg-cream hover:text-ink">
            <Link href="/servicios">
              {t.plans.all} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
