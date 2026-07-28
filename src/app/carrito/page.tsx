"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatMXN, toneStyles } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CarritoPage() {
  const {
    detailedLines,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    iva,
    total,
    itemCount,
  } = useCart();
  const { lang, t } = useLanguage();

  return (
    <div className="section-x mx-auto max-w-[1500px] pb-28 pt-32 lg:pt-40">
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-primary" />
        <span className="eyebrow text-primary">{t.cart.eyebrow}</span>
      </div>
      <h1 className="mt-6 font-display text-5xl font-medium leading-none sm:text-6xl lg:text-7xl">
        {t.cart.title}
      </h1>

      {detailedLines.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-6 rounded-[3px] border border-dashed border-foreground/20 bg-card/50 py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-display text-3xl">{t.cart.emptyTitle}</p>
            <p className="mt-2 text-muted-foreground">{t.cart.emptySub}</p>
          </div>
          <Button asChild size="lg">
            <Link href="/servicios">
              {t.cart.emptyCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_0.9fr] lg:gap-16">
          {/* Items */}
          <div>
            <div className="flex items-center justify-between border-b border-foreground/15 pb-4">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                {itemCount}{" "}
                {itemCount === 1 ? t.cart.itemSingular : t.cart.itemPlural}
              </span>
              <button
                type="button"
                onClick={clearCart}
                className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
              >
                <Trash2 className="h-3.5 w-3.5" /> {t.cart.clear}
              </button>
            </div>

            <ul>
              {detailedLines.map(({ product, quantity }) => {
                const c = product.content[lang];
                return (
                  <li
                    key={product.id}
                    className="grid grid-cols-[auto_1fr] gap-5 border-b border-foreground/10 py-7 sm:grid-cols-[auto_1fr_auto]"
                  >
                    {/* Tarjeta de color HSL optimizada */}
                    <Link
                      href={`/servicios/${product.id}`}
                      className={cn(
                        "flex h-24 w-24 flex-col justify-between rounded-[2px] p-3 transition-transform hover:scale-[1.03]",
                        toneStyles[product.tone].text,
                      )}
                      style={{ backgroundColor: `hsl(var(--${product.tone}))` }}
                    >
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] opacity-80">
                        {t.categories[product.category]}
                      </span>
                      <span className="font-display text-3xl leading-none">
                        {product.index}
                      </span>
                    </Link>

                    <div className="min-w-0">
                      <Link href={`/servicios/${product.id}`}>
                        <h3 className="font-display text-2xl leading-tight transition-colors hover:text-primary">
                          {c.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {c.tagline}
                      </p>
                      <p className="mt-2 font-mono text-sm text-muted-foreground">
                        {formatMXN(product.price)}
                        {product.monthly ? t.common.perMonth : ""} {t.cart.each}
                      </p>

                      <div className="mt-4 flex items-center gap-4 sm:hidden">
                        <QtyControl
                          quantity={quantity}
                          onDec={() => updateQuantity(product.id, quantity - 1)}
                          onInc={() => updateQuantity(product.id, quantity + 1)}
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="text-muted-foreground transition-colors hover:text-primary"
                          aria-label="Quitar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="hidden flex-col items-end justify-between sm:flex">
                      <p className="font-display text-2xl">
                        {formatMXN(product.price * quantity)}
                      </p>
                      <div className="flex items-center gap-3">
                        <QtyControl
                          quantity={quantity}
                          onDec={() => updateQuantity(product.id, quantity - 1)}
                          onInc={() => updateQuantity(product.id, quantity + 1)}
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="text-muted-foreground transition-colors hover:text-primary"
                          aria-label="Quitar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/servicios"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-foreground link-underline"
            >
              <ArrowLeft className="h-4 w-4" /> {t.cart.continue}
            </Link>
          </div>

          {/* Summary */}
          <div>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-[3px] border border-foreground/10 bg-card p-8">
                <h2 className="font-display text-2xl">{t.cart.summaryTitle}</h2>
                <dl className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t.cart.subtotal}</dt>
                    <dd className="font-mono">{formatMXN(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t.cart.iva}</dt>
                    <dd className="font-mono">{formatMXN(iva)}</dd>
                  </div>
                  <div className="my-4 h-px w-full bg-foreground/10" />
                  <div className="flex items-end justify-between">
                    <dt className="font-display text-lg">{t.cart.total}</dt>
                    <dd className="font-display text-3xl">
                      {formatMXN(total)}
                    </dd>
                  </div>
                </dl>
                <Button asChild size="lg" className="mt-8 w-full">
                  <Link href="/checkout">
                    {t.cart.checkout} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <p className="mt-4 text-center font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                  {t.cart.secure}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QtyControl({
  quantity,
  onDec,
  onInc,
}: {
  quantity: number;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className="flex items-center rounded-sm border border-foreground/20">
      <button
        type="button"
        onClick={onDec}
        className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-foreground/5"
        aria-label="-"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-9 text-center font-mono text-sm">{quantity}</span>
      <button
        type="button"
        onClick={onInc}
        className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-foreground/5"
        aria-label="+"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}