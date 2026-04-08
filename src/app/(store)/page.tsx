import Link from "next/link";
import { CategoryGrid } from "@/components/catalog/category-grid";
import { CategoryRail } from "@/components/home/category-rail";
import { EditorialSpotlight } from "@/components/home/editorial-spotlight";
import { FabricExplorer } from "@/components/home/fabric-explorer";
import { AnimatedHero } from "@/components/home/animated-hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/product/product-card";
import { buttonVariants } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { getServerStoreContext } from "@/lib/tenant/server-store";
import { getCategoryTree } from "@/services/categories.service";
import { searchProducts } from "@/services/products.service";
import { cn } from "@/lib/utils";

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
      { isHomePageProducts: true, take: 12, skip: 0 },
      locale,
    ).catch(() => ({ totalCount: 0, products: [] })),
  ]);

  const first = tree.categoriesTree[0];
  const spotlightProduct = featured.products[0];
  const featuredGrid = featured.products.slice(1);

  return (
    <div className="space-y-14 md:space-y-20 lg:space-y-24">
      <AnimatedHero
        badge={dict.home.heroBadge}
        title={dict.home.heroTitle}
        subtitle={dict.home.heroSubtitle}
        shopAllLabel={dict.home.shopAll}
        browseLabel={
          first ? `${dict.home.browse} ${first.name}` : dict.home.shopAll
        }
        browseHref={first ? `/c/${first.id}` : undefined}
      />

      {tree.categoriesTree.length > 0 && (
        <Reveal>
          <CategoryRail categories={tree.categoriesTree} dict={dict} />
        </Reveal>
      )}

      <Reveal delay={0.04}>
        <TrustStrip
          shipping={dict.home.trustShipping}
          returns={dict.home.trustReturns}
          concierge={dict.home.trustConcierge}
        />
      </Reveal>

      {spotlightProduct ? (
        <Reveal delay={0.06}>
          <EditorialSpotlight product={spotlightProduct} />
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <FabricExplorer dict={dict} />
      </Reveal>

      {tree.categoriesTree.length > 0 && (
        <Reveal delay={0.07}>
          <section
            aria-labelledby="collections-heading"
            className="scroll-mt-8"
          >
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="collections-heading"
                  className="font-heading text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-[2.5rem]"
                >
                  {dict.home.collections}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {dict.home.heroSubtitle}
                </p>
              </div>
              <Link
                href="/search"
                // className={cn(
                //   buttonVariants({ variant: "outline", size: "default" }),
                //   "w-fit rounded-full px-7"
                // )}
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

      {featuredGrid.length > 0 && (
        <Reveal delay={0.09}>
          <section aria-labelledby="featured-heading" className="scroll-mt-8">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="featured-heading"
                  className="font-heading text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-[2.5rem]"
                >
                  {dict.home.featured}
                </h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground md:text-base">
                  {dict.home.featuredSubtitle}
                </p>
              </div>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {featuredGrid.map((p) => (
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
