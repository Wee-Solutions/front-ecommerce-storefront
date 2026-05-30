import { getServerLocale } from "@/lib/i18n/server-locale";
import { getServerStoreContext } from "@/lib/tenant/server-store";
import { getStoreConfiguration } from "@/services/configuration.service";

export const dynamic = "force-dynamic";

export default async function AppleIcon() {
  const ctx = await getServerStoreContext();
  if (!ctx) return new Response(null, { status: 404 });

  const locale = await getServerLocale();
  let imageUrl: string | null = null;
  try {
    const config = await getStoreConfiguration(locale);
    imageUrl =
      config.iconImage?.trim() || config.favicon?.trim() || null;
  } catch {
    return new Response(null, { status: 404 });
  }

  if (!imageUrl) return new Response(null, { status: 404 });

  const upstream = await fetch(imageUrl, { cache: "no-store" });
  if (!upstream.ok) return new Response(null, { status: 404 });

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
