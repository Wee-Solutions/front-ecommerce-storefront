export type StoreThemeColors = {
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

export type StoreTheme = {
  id: string;
  name: string;
  colors: StoreThemeColors;
  radius: string;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
};
