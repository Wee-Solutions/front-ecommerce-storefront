import { headers } from "next/headers";
import { resolveStoreFromHost } from "@/tenants/registry";

export type ServerStoreContext = {
  vendorCode: string;
  themeId: string;
  host: string;
};

export async function getServerStoreContext(): Promise<ServerStoreContext | null> {
  const h = await headers();
  const vendorFromMiddleware = h.get("x-sf-vendor-code");
  const themeFromMiddleware = h.get("x-sf-theme-id");
  const host =
    h.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    h.get("host") ??
    "";
  const hostname = host.split(":")[0]?.toLowerCase() ?? "";

  if (vendorFromMiddleware && themeFromMiddleware) {
    return {
      vendorCode: vendorFromMiddleware,
      themeId: themeFromMiddleware,
      host: hostname,
    };
  }

  const resolved = resolveStoreFromHost(hostname);
  if (!resolved) return null;
  return { ...resolved, host: hostname };
}
