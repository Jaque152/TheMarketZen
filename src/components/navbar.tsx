"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/logo";
import { LanguageToggle } from "@/components/language-toggle";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const links = [
  { href: "/", key: "inicio" },
  { href: "/servicios", key: "servicios" },
  { href: "/contacto", key: "contacto" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, setIsOpen } = useCart();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-foreground/10 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="section-x mx-auto flex h-[72px] max-w-[1500px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-mono text-[0.72rem] uppercase tracking-[0.2em] transition-colors",
                  active
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                {t.nav[link.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative flex h-11 items-center gap-2 rounded-sm border border-foreground/20 px-4 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            aria-label={t.nav.carrito}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.15em] lg:inline">
              {t.nav.carrito}
            </span>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 font-mono text-[0.65rem] font-semibold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-foreground/20 md:hidden"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-foreground/10 bg-background sm:max-w-sm"
            >
              <div className="mt-10 flex flex-col gap-1">
                {links.map((link, i) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-baseline justify-between border-b border-foreground/10 py-5"
                    >
                      <span className="font-display text-3xl">
                        {t.nav[link.key]}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        0{i + 1}
                      </span>
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <div className="mt-8">
                <LanguageToggle />
              </div>
              <div className="mt-10 space-y-2">
                <p className="eyebrow text-muted-foreground">
                  {t.footer.contactTitle}
                </p>
                <p className="font-display text-2xl">(+52) 1 55 5553 0519</p>
                <p className="text-sm text-muted-foreground">
                  administracion@themarketzen.com
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}