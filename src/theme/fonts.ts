import localFont from "next/font/local";
import {
  Cormorant_Garamond,
  Heebo,
  Inter,
} from "next/font/google";
import type { Locale } from "@/lib/i18n/locale-config";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew"],
  variable: "--font-hebrew",
  display: "swap",
});

/** Local Tajawal family — used for Arabic (`html[lang="ar"]`). */
export const tajawal = localFont({
  src: [
    {
      path: "../../public/Tajawal-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/Tajawal-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/Tajawal-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Tajawal-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Tajawal-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/Tajawal-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/Tajawal-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-arabic",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** CSS variable names for locale-specific typography (see `locale.css`). */
export const FONT_CSS_VARS = {
  ui: "--font-ui",
  display: "--font-display",
  hebrew: "--font-hebrew",
  arabic: "--font-arabic",
} as const;

export function rootFontClassName() {
  return cn(
    inter.variable,
    cormorant.variable,
    heebo.variable,
    tajawal.variable,
  );
}

/** Applies the active locale's body font (next/font `className`). */
export function localeFontClassName(locale: Locale) {
  switch (locale) {
    case "ar":
      return tajawal.className;
    case "he":
      return heebo.className;
    default:
      return inter.className;
  }
}
