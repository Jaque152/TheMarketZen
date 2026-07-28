"use client";

import { useState } from "react";
import { CATEGORY_KEYS, products, type CategoryKey } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

export function ShopClient() {
  const { t } = useLanguage();
  const [active, setActive] = useState<CategoryKey | "all">("all");

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORY_KEYS.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] transition-colors",
              active === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-foreground/20 text-foreground/70 hover:border-foreground hover:text-foreground",
            )}
          >
            {t.categories[cat]}
          </button>
        ))}
        <span className="ml-auto font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
          {filtered.length} {t.shop.count}
        </span>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
