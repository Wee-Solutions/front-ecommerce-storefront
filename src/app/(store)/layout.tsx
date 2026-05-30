import type { Metadata } from "next";
import { headers } from "next/headers";
import { AppProviders } from "@/components/providers/app-providers";
import { StoreShell } from "@/components/layout/store-shell";
import { UnknownStore } from "@/components/layout/unknown-store";
import { LocaleProvider } from "@/contexts/locale-context";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { iconsFromStoreConfig } from "@/lib/store-metadata";
import { getServerStoreContext } from "@/lib/tenant/server-store";
import { getCategoryTree } from "@/services/categories.service";
import { getStoreConfiguration } from "@/services/configuration.service";
import type { StoreConfiguration } from "@/types/api/configuration";
import { themeToCssVars, themes } from "@/tenants/registry";

export async function generateMetadata(): Promise<Metadata> {
  const ctx = await getServerStoreContext();
  if (!ctx) {
    return { title: "Storefront" };
  }
  const locale = await getServerLocale();
  const theme = themes[ctx.themeId] ?? themes.store1;
  let storeName = theme.name;
  let config: StoreConfiguration | null = null;
  try {
    config = await getStoreConfiguration(locale);
    if (config.name?.trim()) {
      storeName = config.name.trim();
    }
  } catch {
    // Fallback to local theme registry when config endpoint fails.
  }
  const icons = iconsFromStoreConfig(config);
  return {
    title: { default: storeName, template: `%s · ${storeName}` },
    description: "Multi-tenant commerce storefront",
    ...(icons ? { icons } : {}),
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
  let storeConfig: StoreConfiguration | null = null;
  let storeName = theme.name;
  let categories: Awaited<
    ReturnType<typeof getCategoryTree>
  >["categoriesTree"] = [];

  try {
    storeConfig = await getStoreConfiguration(locale);
    if (storeConfig.name?.trim()) {
      storeName = storeConfig.name.trim();
    }
  } catch {
    storeConfig = null;
    storeName = theme.name;
  }

  try {
    const tree = await getCategoryTree({}, locale);
    categories = tree.categoriesTree;
  } catch {
    categories = [];
  }

  return (
    <AppProviders language={locale} initialStoreConfig={storeConfig}>
      <LocaleProvider locale={locale} dict={dict}>
        <div
          style={themeToCssVars(theme)}
          className="sf-boutique-canvas sf-grain flex min-h-screen w-full min-w-0 flex-col overflow-x-clip bg-background text-foreground"
        >
          <div className="relative z-1 flex min-h-screen w-full min-w-0 flex-1 flex-col">
            <StoreShell
              storeName={storeName}
              storeConfig={storeConfig}
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
