"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import clsx from "clsx";
import { setUserLocale } from "@/app/actions/locale";
import type { Locale } from "@/lib/i18n/locale-config";
import { LOCALES } from "@/lib/i18n/locale-config";
import { useTranslations } from "@/contexts/locale-context";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const dict = useTranslations();

  return (
    <div className="relative">
      <label htmlFor="sf-locale" className="sr-only">
        {dict.locale.label}
      </label>
      <select
        id="sf-locale"
        value={current}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value as Locale;
          startTransition(async () => {
            await setUserLocale(next);
            router.refresh();
          });
        }}
        className={clsx(
          "cursor-pointer appearance-none rounded-full border border-[var(--sf-color-border)] bg-white/80 py-1.5 ps-3 pe-8 text-xs font-medium text-[var(--sf-color-primary)] shadow-sm backdrop-blur-sm transition hover:border-[var(--sf-color-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sf-color-accent)]",
          pending && "opacity-50"
        )}
        aria-busy={pending}
      >
        {LOCALES.map((loc) => (
          <option key={loc} value={loc}>
            {dict.locale[loc]}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 text-[10px] text-[var(--sf-color-muted)]"
        aria-hidden
      >
        ▾
      </span>
    </div>
  );
}
