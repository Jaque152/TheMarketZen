"use client";

import { PortalEmblem} from "@/components/logo";
import { useLanguage } from "@/lib/language-context";

export function Marquee() {
  const { t } = useLanguage();
  const items = t.marquee;

  return (
    <div className="surface-ink overflow-hidden border-y border-cream/10 py-5">
      <div className="flex w-max marquee-track">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex shrink-0 items-center"
            aria-hidden={dup === 1}
          >
            {items.map((item) => (
              <li key={item} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-display text-xl italic text-cream/85 sm:text-2xl">
                  {item}
                </span>
                <PortalEmblem className="h-3.5 w-3.5 shrink-0 text-primary" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
