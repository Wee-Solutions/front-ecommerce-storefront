import Link from "next/link";
import { CategoryGrid } from "@/components/catalog/category-grid";
import { AnimatedHero } from "@/components/home/animated-hero";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/product/product-card";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { getServerStoreContext } from "@/lib/tenant/server-store";
import { getCategoryTree } from "@/services/categories.service";
import { searchProducts } from "@/services/products.service";

export default async function HomePage() {
  const ctx = await getServerStoreContext();
  if (!ctx) return null;

  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  const [tree, featured] = await Promise.all([
    getCategoryTree(ctx.vendorCode, {}, locale).catch(() => ({
      categoriesTree: [],
    })),
    searchProducts(
      ctx.vendorCode,
      { isHomePageProducts: true, take: 8, skip: 0 },
      locale
    ).catch(() => ({ totalCount: 0, products: [] })),
  ]);

  const first = tree.categoriesTree[0];

  return (
    <div className="space-y-20 md:space-y-24">
      <AnimatedHero
        badge={dict.home.heroBadge}
        title={dict.home.heroTitle}
        subtitle={dict.home.heroSubtitle}
        shopAllLabel={dict.home.shopAll}
        browseLabel={
          first
            ? `${dict.home.browse} ${first.name}`
            : dict.home.shopAll
        }
        browseHref={first ? `/c/${first.id}` : undefined}
      />

      {tree.categoriesTree.length > 0 && (
        <Reveal>
          <section aria-labelledby="collections-heading">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2
                id="collections-heading"
                className="text-xl font-semibold tracking-tight text-[var(--sf-color-primary)]"
              >
                {dict.home.collections}
              </h2>
              <Link
                href="/search"
                className="text-sm font-medium text-[var(--sf-color-accent)] transition hover:underline"
              >
                {dict.home.viewAll}
              </Link>
            </div>
            <CategoryGrid
              roots={tree.categoriesTree}
              productsSuffix={dict.category.productsSuffix}
            />
          </section>
        </Reveal>
      )}

      {featured.products.length > 0 && (
        <Reveal delay={0.08}>
          <section aria-labelledby="featured-heading">
            <h2
              id="featured-heading"
              className="mb-8 text-xl font-semibold tracking-tight text-[var(--sf-color-primary)]"
            >
              {dict.home.featured}
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.products.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      )}
    </div>
  );
}
