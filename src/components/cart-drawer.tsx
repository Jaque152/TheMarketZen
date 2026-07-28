"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatMXN, toneStyles } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const {
    isOpen,
    setIsOpen,
    detailedLines,
    updateQuantity,
    removeItem,
    subtotal,
    itemCount,
  } = useCart();
  const { lang, t } = useLanguage();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-foreground/10 bg-background p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-foreground/10 px-6 py-5 text-left">
          <SheetTitle className="flex items-center gap-3 font-display text-2xl font-medium">
            {t.drawer.title}
            <span className="font-mono text-sm text-muted-foreground">
              ({itemCount})
            </span>
          </SheetTitle>
        </SheetHeader>

        {detailedLines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-display text-xl">{t.drawer.emptyTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.drawer.emptySub}
              </p>
            </div>
            <Button asChild onClick={() => setIsOpen(false)}>
              <Link href="/servicios">{t.drawer.emptyCta}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-foreground/10">
                {detailedLines.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-4 py-5">
                    {/* Recuadro de color a prueba de fallos con variable HSL */}
                    <div
                      className={cn(
                        "flex h-16 w-16 shrink-0 items-center justify-center rounded-sm",
                        toneStyles[product.tone].text,
                      )}
                      style={{ backgroundColor: `hsl(var(--${product.tone}))` }}
                    >
                      <span className="font-display text-lg">
                        {product.index}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display text-base leading-tight">
                            {product.content[lang].name}
                          </p>
                          <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                            {t.categories[product.category]}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="text-muted-foreground transition-colors hover:text-primary"
                          aria-label="Quitar"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-sm border border-foreground/20">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity - 1)
                            }
                            className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-foreground/5"
                            aria-label="-"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-sm">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-foreground/5"
                            aria-label="+"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-mono text-sm">
                          {formatMXN(product.price * quantity)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-foreground/10 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-muted-foreground">
                  {t.drawer.subtotal}
                </span>
                <span className="font-display text-2xl">
                  {formatMXN(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.drawer.ivaNote}
              </p>
              <div className="mt-5 grid gap-2">
                <Button asChild size="lg" onClick={() => setIsOpen(false)}>
                  <Link href="/checkout">{t.drawer.finalize}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/carrito">{t.drawer.viewCart}</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}