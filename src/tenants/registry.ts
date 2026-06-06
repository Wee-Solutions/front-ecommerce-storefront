import { themes } from "@/theme/stores";
import { env } from "@/config/env";
import type { StoreTheme } from "@/theme/types";

export type { StoreTheme } from "@/theme/types";
export { themeToCssVars } from "@/theme/css-vars";
export { themes };

export type StoreDefinition = {
  themeId: string;
};

/**
 * Subdomain → storefront theme. Gateway `Vendor-Code` is set from
 * `NEXT_PUBLIC_VENDOR_CODE` in env, not from the host.
 */
const hostMap: Record<string, () => StoreDefinition> = {
  "store1.localhost": () => ({
    themeId: "store1",
  }),
  "store2.localhost": () => ({
    themeId: "store2",
  }),
  localhost: () => defaultStore(),
};

const defaultStore = (): StoreDefinition => ({
  themeId: env.defaultThemeId,
});

export function resolveStoreFromHost(host: string): StoreDefinition {
  const key = host.split(":")[0]?.toLowerCase() ?? "";
  const resolver = hostMap[key];
  return resolver?.() ?? defaultStore();
}
