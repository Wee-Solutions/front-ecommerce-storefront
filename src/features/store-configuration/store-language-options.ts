import {
  getLocaleDisplayName,
  isLocale,
  type Locale,
} from "@/lib/i18n/locale-config";
import type { StoreConfiguration } from "@/types/api/configuration";

export type StoreLanguageOption = {
  locale: Locale;
  languageCode: string;
  name: string | null;
  isDefault: boolean;
};

export function getLanguageOptionLabel(option: StoreLanguageOption): string {
  if (option.name) return option.name;
  return getLocaleDisplayName(option.locale);
}

function normalizeLanguageCode(raw: string): Locale | null {
  const code = raw.trim().toLowerCase();
  if (!code) return null;
  const primary = code.split("-")[0];
  if (isLocale(primary)) return primary;
  if (isLocale(code)) return code;
  return null;
}

function readLanguageRow(item: unknown): StoreLanguageOption | null {
  if (!item || typeof item !== "object") return null;
  const row = item as Record<string, unknown>;
  const languageCode = row.languageCode ?? row.LanguageCode;
  const name = row.name ?? row.Name;
  const isDefault = row.isDefault ?? row.IsDefault;
  if (typeof languageCode !== "string") return null;

  const locale = normalizeLanguageCode(languageCode);
  if (!locale) return null;

  const trimmedName = typeof name === "string" ? name.trim() : "";
  return {
    locale,
    languageCode: languageCode.trim(),
    name: trimmedName.length > 0 ? trimmedName : null,
    isDefault: Boolean(isDefault),
  };
}

/** Reads supported language options from store config (camelCase or PascalCase). */
export function getLanguageOptionsFromConfig(
  config: StoreConfiguration | null | undefined,
): StoreLanguageOption[] {
  if (!config) return [];
  const raw =
    config.languages ??
    (config as StoreConfiguration & { Languages?: unknown }).Languages;
  if (!Array.isArray(raw)) return [];

  const seen = new Set<Locale>();
  const options: StoreLanguageOption[] = [];
  for (const item of raw) {
    const row = readLanguageRow(item);
    if (!row || seen.has(row.locale)) continue;
    seen.add(row.locale);
    options.push(row);
  }
  return options;
}

export function getDefaultLocaleFromConfig(
  config: StoreConfiguration | null | undefined,
): Locale | null {
  const options = getLanguageOptionsFromConfig(config);
  if (options.length === 0) return null;
  return options.find((item) => item.isDefault)?.locale ?? options[0].locale;
}

/** Picks a locale allowed by store config, or falls back to the requested locale. */
export function resolveLocaleFromStoreConfig(
  config: StoreConfiguration | null | undefined,
  requestedLocale: Locale,
): Locale {
  const options = getLanguageOptionsFromConfig(config);
  if (options.length === 0) return requestedLocale;
  if (options.some((item) => item.locale === requestedLocale)) {
    return requestedLocale;
  }
  return getDefaultLocaleFromConfig(config) ?? requestedLocale;
}
