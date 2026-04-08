import type { Metadata } from "next";
import { headers } from "next/headers";
import { AppProviders } from "@/components/providers/app-providers";
import { StoreShell } from "@/components/layout/store-shell";
import { UnknownStore } from "@/components/layout/unknown-store";
import { LocaleProvider } from "@/contexts/locale-context";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { getServerStoreContext } from "@/lib/tenant/server-store";
import { getCategoryTree } from "@/services/categories.service";
import { themeToCssVars, themes } from "@/tenants/registry";

export async function generateMetadata(): Promise<Metadata> {
  const ctx = await getServerStoreContext();
  if (!ctx) {
    return { title: "Storefront" };
  }
  const theme = themes[ctx.themeId] ?? themes.store1;
  return {
    title: { default: theme.name, template: `%s · ${theme.name}` },
    description: "Multi-tenant commerce storefront",
  };
}

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ctx = await getServerStoreContext();
  const h = await headers();
  const host = h.get("host") ?? "";
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  if (!ctx) {
    return <UnknownStore host={host} dict={dict} />;
  }

  const theme = themes[ctx.themeId] ?? themes.store1;
  let categories: Awaited<ReturnType<typeof getCategoryTree>>["categoriesTree"] =
    [];
  try {
    const tree = await getCategoryTree(ctx.vendorCode, {}, locale);
    categories = tree.categoriesTree;
  } catch {
    categories = [];
  }

  return (
    <AppProviders vendorCode={ctx.vendorCode} language={locale}>
      <LocaleProvider locale={locale} dict={dict}>
        <div
          style={themeToCssVars(theme)}
          className="sf-boutique-canvas sf-grain flex min-h-screen flex-col bg-background text-foreground"
        >
          <div className="relative z-[1] flex min-h-screen flex-1 flex-col">
          <StoreShell
            storeName={theme.name}
            categories={categories}
            currentLocale={locale}
          >
            {children}
          </StoreShell>
          </div>
        </div>
      </LocaleProvider>
    </AppProviders>
  );
}
