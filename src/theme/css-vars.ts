import type { CSSProperties } from "react";
import type { StoreTheme } from "@/theme/types";

/** Maps a store theme JSON object to CSS custom properties. */
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
