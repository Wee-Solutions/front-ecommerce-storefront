import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Rubik, Noto_Sans_Arabic, Geist } from "next/font/google";
import { isLocale, isRtlLocale } from "@/lib/i18n/locale-config";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-rubik",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Storefront", template: "%s" },
  description: "Multi-tenant commerce storefront",
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
      className={cn("h-full", "scroll-smooth", rubik.variable, notoArabic.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full bg-[var(--sf-page-bg)] font-sans text-zinc-900 antialiased selection:bg-[var(--sf-color-accent)]/25 selection:text-[var(--sf-color-primary)]">
        {children}
      </body>
    </html>
  );
}
