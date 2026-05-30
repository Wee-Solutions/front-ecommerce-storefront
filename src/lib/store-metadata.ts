import type { Metadata } from "next";
import type { StoreConfiguration } from "@/types/api/configuration";

/** Icons from `GET /client/Configurations` (`favicon`, `iconImage` are read SAS URLs). */
export function iconsFromStoreConfig(
  config: StoreConfiguration | null | undefined,
): Metadata["icons"] | undefined {
  const favicon = config?.favicon?.trim();
  const iconImage = config?.iconImage?.trim();
  if (!favicon && !iconImage) return undefined;

  const faviconEntry = favicon
    ? [{ url: favicon, type: "image/webp" as const }]
    : iconImage
      ? [{ url: iconImage, type: "image/webp" as const }]
      : undefined;
  const appleEntry = iconImage
    ? [{ url: iconImage, type: "image/webp" as const }]
    : undefined;

  return {
    icon: faviconEntry,
    shortcut: favicon ? faviconEntry : undefined,
    apple: appleEntry,
  };
}
