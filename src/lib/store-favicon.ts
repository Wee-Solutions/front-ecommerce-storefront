import { getServerLocale } from "@/lib/i18n/server-locale";
import { getServerStoreContext } from "@/lib/tenant/server-store";
import { getStoreConfiguration } from "@/services/configuration.service";

/** Read SAS URL for favicon (falls back to `iconImage`). */
export async function getStoreFaviconImageUrl(): Promise<string | null> {
  const ctx = await getServerStoreContext();
  if (!ctx) return null;

  const locale = await getServerLocale();
  try {
    const config = await getStoreConfiguration(locale);
    return config.favicon?.trim() || config.iconImage?.trim() || null;
  } catch {
    return null;
  }
}

/** Proxies vendor favicon bytes for `app/icon.tsx` (same-origin `/icon` route). */
export async function fetchStoreFaviconResponse(): Promise<Response | null> {
  const imageUrl = await getStoreFaviconImageUrl();
  if (!imageUrl) return null;

  const upstream = await fetch(imageUrl, { cache: "no-store" });
  if (!upstream.ok) return null;

  const contentType =
    upstream.headers.get("content-type")?.split(";")[0]?.trim() ?? "image/webp";
  const buffer = await upstream.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "private, max-age=300",
    },
  });
}
