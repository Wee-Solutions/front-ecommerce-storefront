import type { Metadata } from "next";
import { cookies } from "next/headers";
import { iconsFromStoreConfig } from "@/lib/store-metadata";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { getServerStoreContext } from "@/lib/tenant/server-store";
import { getStoreConfiguration } from "@/services/configuration.service";
import { isLocale, isRtlLocale } from "@/lib/i18n/locale-config";
import { localeFontClassName, rootFontClassName } from "@/theme/fonts";
import "./globals.css";
import { cn } from "@/lib/utils";

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
        "h-full scroll-smooth",
        rootFontClassName(),
        localeFontClassName(locale),
      )}
    >
      <body className="min-h-full bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
