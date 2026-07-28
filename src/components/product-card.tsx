"use client";

import { Check } from "lucide-react";
import { type Product, formatMXN, toneStyles } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useLanguage();
  const tone = toneStyles[product.tone];
  const c = product.content[lang];

  return (
    <article className="group flex flex-col overflow-hidden rounded-[3px] border border-foreground/10 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-foreground/25">
      {/* Header block (Con estilo en línea para garantizar el color de fondo HSL) */}
      <div
        className={cn(
          "relative flex h-40 flex-col justify-between p-6",
          tone.text,
        )}
        style={{ backgroundColor: `hsl(var(--${product.tone}))` }}
      >
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "rounded-full px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em]",
              tone.chip,
            )}
          >
            {t.categories[product.category]}
          </span>
          {product.popular && (
            <span
              className={cn(
                "rounded-full px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em]",
                tone.chip,
              )}
            >
              {t.plans.popular}
            </span>
          )}
        </div>
        <div className="flex items-end justify-between">
          <span className="font-display text-6xl leading-none opacity-90">
            {product.index}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl leading-tight text-foreground">
          {c.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{c.tagline}</p>

        {/* Mostramos TODAS las viñetas sin cortar (se removió el .slice(0, 3)) */}
        <ul className="mt-5 flex-1 space-y-2.5">
          {c.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex items-end justify-between border-t border-foreground/10 pt-5">
          <div>
            <p className="font-display text-2xl leading-none">
              {formatMXN(product.price).replace(" MXN", "")}
              <span className="ml-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                MXN{product.monthly ? t.common.perMonth : ""}
              </span>
            </p>
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
              {t.common.ivaShort}
            </p>
          </div>
        </div>

        <AddToCartButton
          productId={product.id}
          className="mt-5 w-full"
          variant="ink"
        />
      </div>
    </article>
  );
}