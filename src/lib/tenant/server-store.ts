import { headers } from "next/headers";
import { resolveStoreFromHost } from "@/tenants/registry";

export type ServerStoreContext = {
  themeId: string;
  host: string;
};

export async function getServerStoreContext(): Promise<ServerStoreContext | null> {
  const h = await headers();
  const themeFromMiddleware = h.get("x-sf-theme-id");
  const host =
    h.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    h.get("host") ??
    "";
  const hostname = host.split(":")[0]?.toLowerCase() ?? "";

  if (themeFromMiddleware) {
    return {
      themeId: themeFromMiddleware,
      host: hostname,
    };
  }

  return { ...resolveStoreFromHost(hostname), host: hostname };
}
