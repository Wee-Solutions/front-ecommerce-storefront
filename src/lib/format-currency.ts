import { env } from "@/config/env";
import type { Locale } from "@/lib/i18n/locale-config";

const LOCALE_MAP: Record<Locale, string> = {
  en: "en-US",
  he: "he-IL",
  ar: "ar-SA",
};

export function formatMoney(
  amount: number | null | undefined,
  options?: { locale?: Locale; currency?: string },
): string {
  if (amount === null || amount === undefined) return "—";
  const localeTag = options?.locale
    ? LOCALE_MAP[options.locale]
    : "en-US";
  const currency = options?.currency ?? env.storeCurrency;
  return new Intl.NumberFormat(localeTag, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** For labels, analytics, or future server-driven store config. */
export function getStoreCurrencyCode(): string {
  return env.storeCurrency;
}
