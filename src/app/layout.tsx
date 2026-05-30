import type { Metadata } from "next";
import { cookies } from "next/headers";
import { iconsFromStoreConfig } from "@/lib/store-metadata";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { getServerStoreContext } from "@/lib/tenant/server-store";
import { getStoreConfiguration } from "@/services/configuration.service";
import {
  Cormorant_Garamond,
  Cairo,
  Heebo,
  Inter,
} from "next/font/google";
import { isLocale, isRtlLocale } from "@/lib/i18n/locale-config";
import "./globals.css";
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

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  let icons: Metadata["icons"] | undefined;
  try {
    const ctx = await getServerStoreContext();
    if (ctx) {
      const locale = await getServerLocale();
      const config = await getStoreConfiguration(locale);
      icons = iconsFromStoreConfig(config);
    }
  } catch {
    icons = undefined;
  }

  return {
    metadataBase: new URL(siteUrl),
    title: { default: "Boutique", template: "%s | Boutique" },
    description:
      "Women's fashion boutique — curated apparel with a calm, premium shopping experience.",
    ...(icons ? { icons } : {}),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const raw = cookieStore.get("sf-locale")?.value;
  const locale = isLocale(raw) ? raw : "en";
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(
        "h-full scroll-smooth font-sans",
        inter.variable,
        cormorant.variable,
        heebo.variable,
        cairo.variable
      )}
    >
      <body className="min-h-full bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
