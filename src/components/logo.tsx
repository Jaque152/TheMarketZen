"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

// PROPUESTA 1: El Portal Arquitectónico (Estructura, Foco y Perspectiva)
export function PortalEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-8 w-8 shrink-0", className)}
      aria-hidden
    >
      {/* Marco exterior en trazo fino editorial */}
      <path
        d="M4.5 19.5V10.5C4.5 6.35786 7.85786 3 12 3C16.1421 3 19.5 6.35786 19.5 10.5V19.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line
        x1="3"
        y1="19.5"
        x2="21"
        y2="19.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Diamante central en terracota (El punto de equilibrio y crecimiento) */}
      <path
        d="M12 7.5L14.5 11.5L12 15.5L9.5 11.5L12 7.5Z"
        className="fill-primary text-primary transition-transform duration-500 group-hover:scale-110"
      />
    </svg>
  );
}

export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="The Market Zen"
    >
      {/* Ícono sin fondo sólido: pura geometría y espacio negativo */}
      <span
        className={cn(
          "relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105",
          onDark ? "text-cream" : "text-foreground",
        )}
      >
        {/* Cambia <PortalEmblem /> por <EnsoEmblem /> si prefieres la opción minimalista circular */}
        <PortalEmblem />
      </span>

      <span className="flex flex-col justify-center leading-none">
        <span className="flex items-baseline">
          <span
            className={cn(
              "font-display text-xl font-medium tracking-tight",
              onDark ? "text-cream" : "text-foreground",
            )}
          >
            The Market Zen
          </span>

        </span>
        <span
          className={cn(
            "mt-1 font-mono text-[0.55rem] uppercase tracking-[0.38em]",
            onDark ? "text-cream/50" : "text-muted-foreground",
          )}
        >
          {t.logo.subtitle}
        </span>
      </span>
    </Link>
  );
}