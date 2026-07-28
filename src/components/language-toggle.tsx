"use client";

import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import type { Lang } from "@/lib/i18n";

const langs: Lang[] = ["es", "en"];

export function LanguageToggle({ onDark = false }: { onDark?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={cn(
        "flex items-center rounded-full border p-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em]",
        onDark ? "border-cream/25" : "border-foreground/20",
      )}
    >
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            lang === l
              ? onDark
                ? "bg-cream text-ink"
                : "bg-foreground text-background"
              : onDark
                ? "text-cream/55 hover:text-cream"
                : "text-foreground/55 hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
