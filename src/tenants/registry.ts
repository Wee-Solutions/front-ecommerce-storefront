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
    /** Full-page canvas; falls back to `surface` */
    pageBackground?: string;
    /** Cards and popovers; falls back to white */
    card?: string;
    /** Muted fills (chips, secondary surfaces); falls back to `surface` */
    wash?: string;
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
  const { colors } = theme;
  const pageBg = colors.pageBackground ?? colors.surface;
  const card = colors.card ?? "#ffffff";
  const wash = colors.wash ?? colors.surface;

  return {
    ["--sf-page-bg" as string]: pageBg,
    ["--sf-color-primary" as string]: colors.primary,
    ["--sf-color-primary-fg" as string]: colors.primaryForeground,
    ["--sf-color-accent" as string]: colors.accent,
    ["--sf-color-accent-fg" as string]: colors.accentForeground,
    ["--sf-color-muted" as string]: colors.muted,
    ["--sf-color-surface" as string]: colors.surface,
    ["--sf-color-border" as string]: colors.surfaceBorder,
    ["--sf-radius" as string]: theme.radius,
    ["--background" as string]: pageBg,
    ["--foreground" as string]: colors.primary,
    ["--card" as string]: card,
    ["--card-foreground" as string]: colors.primary,
    ["--popover" as string]: card,
    ["--popover-foreground" as string]: colors.primary,
    ["--primary" as string]: colors.accent,
    ["--primary-foreground" as string]: colors.accentForeground,
    ["--secondary" as string]: wash,
    ["--secondary-foreground" as string]: colors.primary,
    ["--muted" as string]: wash,
    ["--muted-foreground" as string]: colors.muted,
    ["--accent" as string]: wash,
    ["--accent-foreground" as string]: colors.primary,
    ["--border" as string]: colors.surfaceBorder,
    ["--input" as string]: colors.surfaceBorder,
    ["--ring" as string]: colors.accent,
    ["--sidebar" as string]: card,
    ["--sidebar-foreground" as string]: colors.primary,
    ["--sidebar-primary" as string]: colors.accent,
    ["--sidebar-primary-foreground" as string]: colors.accentForeground,
    ["--sidebar-accent" as string]: wash,
    ["--sidebar-accent-foreground" as string]: colors.primary,
    ["--sidebar-border" as string]: colors.surfaceBorder,
    ["--sidebar-ring" as string]: colors.accent,
  };
}
