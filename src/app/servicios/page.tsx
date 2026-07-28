"use client";

import { ShopClient } from "@/components/shop-client";
import { useLanguage } from "@/lib/language-context";

export default function ServiciosPage() {
  const { t } = useLanguage();
  return (
    <>
      {/* Header */}
      <section className="section-x mx-auto max-w-[1500px] pb-4 pt-32 lg:pt-40">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          <span className="eyebrow text-primary">{t.shop.eyebrow}</span>
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <h1 className="font-display text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-7xl">
            {t.shop.titleA}{" "}
            <span className="italic text-primary">{t.shop.titleEm}</span>{" "}
            {t.shop.titleB}
          </h1>
          <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
            {t.shop.sub}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-x mx-auto max-w-[1500px] py-14">
        <ShopClient />
      </section>
    </>
  );
}
