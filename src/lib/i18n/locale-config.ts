export const LOCALES = ["en", "he", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export const RTL_LOCALES: Locale[] = ["he", "ar"];

/** Native display names for supported storefront locales. */
export const LOCALE_DISPLAY_NAMES: Record<Locale, string> = {
  en: "English",
  he: "עברית",
  ar: "العربية",
};

export function getLocaleDisplayName(locale: Locale): string {
  return LOCALE_DISPLAY_NAMES[locale] ?? locale.toUpperCase();
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "he" || value === "ar";
}

export function isRtlLocale(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

/** Edge-safe negotiation (no Node APIs). */
export function resolveLocaleFromAcceptLanguage(
  acceptLanguage: string | null | undefined
): Locale {
  if (!acceptLanguage) return "en";
  const first = acceptLanguage.split(",")[0]?.trim().toLowerCase() ?? "";
  if (first.startsWith("he")) return "he";
  if (first.startsWith("ar")) return "ar";
  return "en";
}
