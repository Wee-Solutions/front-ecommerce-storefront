import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Pagination } from "@/components/catalog/pagination";
import { ProductCard } from "@/components/product/product-card";
import { findCategoryInTree } from "@/lib/category-tree";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { isGuid } from "@/lib/guards";
import { getServerStoreContext } from "@/lib/tenant/server-store";
import { getCategoryTree } from "@/services/categories.service";
import { searchProducts } from "@/services/products.service";

const PAGE_SIZE = 12;

type Props = {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoryId } = await params;
  const ctx = await getServerStoreContext();
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  if (!ctx || !isGuid(categoryId)) return { title: dict.category.collection };
  const tree = await getCategoryTree(ctx.vendorCode, {}, locale).catch(() => ({
    categoriesTree: [],
  }));
  const cat = findCategoryInTree(tree.categoriesTree, categoryId);
  return { title: cat?.name ?? dict.category.collection };
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { categoryId } = await params;
  const { page: pageStr } = await searchParams;
  if (!isGuid(categoryId)) notFound();

  const ctx = await getServerStoreContext();
  if (!ctx) return null;

  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const tree = await getCategoryTree(ctx.vendorCode, {}, locale).catch(() => ({
    categoriesTree: [],
  }));
  const current = findCategoryInTree(tree.categoriesTree, categoryId);

  const result = await searchProducts(
    ctx.vendorCode,
    {
      categoriesIds: [categoryId],
      take: PAGE_SIZE,
      skip,
    },
    locale,
  ).catch(() => ({ totalCount: 0, products: [] }));

  const totalPages = Math.max(1, Math.ceil(result.totalCount / PAGE_SIZE));

  return (
    <div>
      <nav
        className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="rounded-full border border-border/70 bg-card/80 px-3 py-1 transition hover:border-primary/30 hover:text-foreground"
        >
          {dict.category.home}
        </Link>
        <span className="text-border" aria-hidden>
          /
        </span>
        <span className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-foreground">
          {current?.name ?? dict.category.collection}
        </span>
      </nav>

      <header className="mb-12 md:mb-14">
        <p className="sf-section-eyebrow text-muted-foreground">
          {dict.category.collection}
        </p>
        <h1 className="font-heading mt-3 text-4xl font-medium tracking-tight text-foreground md:text-5xl">
          {current?.name ?? dict.category.collection}
        </h1>
        {result.totalCount > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            {result.totalCount} {dict.category.productsSuffix}
          </p>
        )}
        {current?.description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {current.description}
          </p>
        )}
      </header>

      {current && current.subCategories.length > 0 && (
        <div className="mb-12 rounded-2xl border border-border/60 bg-gradient-to-b from-card to-muted/20 p-6 shadow-sm ring-1 ring-border/30 md:p-8">
          <p className="sf-section-eyebrow mb-4 text-muted-foreground">
            {dict.category.browse}
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {current.subCategories.map((sub) => (
              <li key={sub.id}>
                <Link
                  href={`/c/${sub.id}`}
                  className="inline-flex rounded-full border border-border/80 bg-card px-5 py-2 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/35 hover:shadow-md"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.products.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {dict.category.noProducts}
        </p>
      ) : (
        <>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {result.products.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <Pagination
            page={page}
            totalPages={totalPages}
            pathname={`/c/${categoryId}`}
          />
        </>
      )}
    </div>
  );
}
