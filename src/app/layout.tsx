import type { Metadata } from "next";
import { cookies } from "next/headers";
import { isLocale, isRtlLocale } from "@/lib/i18n/locale-config";
import { localeFontClassName, rootFontClassName } from "@/theme/fonts";
import "./globals.css";
import { cn } from "@/lib/utils";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Boutique", template: "%s | Boutique" },
  description:
    "Women's fashion boutique — curated apparel with a calm, premium shopping experience.",
};

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
        rootFontClassName(),
        localeFontClassName(locale),
      )}
    >
      <body className="min-h-full bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
