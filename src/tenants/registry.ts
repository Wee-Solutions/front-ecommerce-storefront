import type { CSSProperties } from "react";
import store1 from "./themes/store1.theme.json";
import store2 from "./themes/store2.theme.json";
import { env } from "@/config/env";

export type StoreTheme = {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    surface: string;
    surfaceBorder: string;
  };
  radius: string;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
};

export const themes: Record<string, StoreTheme> = {
  store1: store1 as StoreTheme,
  store2: store2 as StoreTheme,
};

export type StoreDefinition = {
  vendorCode: string;
  themeId: string;
};

/**
 * Subdomain → store. Vendor codes should match Gateway `Vendor-Code` header.
 * Override per environment with NEXT_PUBLIC_VENDOR_CODE_*.
 */
const hostMap: Record<string, () => StoreDefinition> = {
  "store1.localhost": () => ({
    vendorCode: process.env.NEXT_PUBLIC_VENDOR_CODE_STORE1 ?? env.defaultVendorCode,
    themeId: "store1",
  }),
  "store2.localhost": () => ({
    vendorCode: process.env.NEXT_PUBLIC_VENDOR_CODE_STORE2 ?? `${env.defaultVendorCode}_2`,
    themeId: "store2",
  }),
  localhost: () => ({
    vendorCode: env.defaultVendorCode,
    themeId: env.defaultThemeId,
  }),
};

export function resolveStoreFromHost(host: string): StoreDefinition | null {
  const key = host.split(":")[0]?.toLowerCase() ?? "";
  const resolver = hostMap[key];
  if (!resolver) return null;
  return resolver();
}

export function themeToCssVars(theme: StoreTheme): CSSProperties {
  return {
    ["--sf-color-primary" as string]: theme.colors.primary,
    ["--sf-color-primary-fg" as string]: theme.colors.primaryForeground,
    ["--sf-color-accent" as string]: theme.colors.accent,
    ["--sf-color-accent-fg" as string]: theme.colors.accentForeground,
    ["--sf-color-muted" as string]: theme.colors.muted,
    ["--sf-color-surface" as string]: theme.colors.surface,
    ["--sf-color-border" as string]: theme.colors.surfaceBorder,
    ["--sf-radius" as string]: theme.radius,
  };
}
