import type { Locale } from "@/lib/i18n/locale-config";

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY ?? "USD";

const LOCALE_MAP: Record<Locale, string> = {
  en: "en-US",
  he: "he-IL",
  ar: "ar-SA",
};

export function formatMoney(
  amount: number | null | undefined,
  options?: { locale?: Locale; currency?: string }
): string {
  if (amount === null || amount === undefined) return "—";
  const localeTag = options?.locale
    ? LOCALE_MAP[options.locale]
    : "en-US";
  const currency = options?.currency ?? CURRENCY;
  return new Intl.NumberFormat(localeTag, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}
