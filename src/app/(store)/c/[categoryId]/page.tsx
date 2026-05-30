import Link from "next/link";
import type { Metadata } from "next";
import { Fragment } from "react";
import { Pagination } from "@/components/catalog/pagination";
import { ProductCard } from "@/components/product/product-card";
import { findCategoryInTree, findCategoryPath } from "@/lib/category-tree";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { isGuid } from "@/lib/guards";
import { getServerStoreContext } from "@/lib/tenant/server-store";
import { TrackCategoryView } from "@/features/events/page-view-trackers";
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
  const tree = await getCategoryTree({}, locale).catch(() => ({
    categoriesTree: [],
  }));
  const cat = findCategoryInTree(tree.categoriesTree, categoryId);
  return { title: cat?.name ?? dict.category.collection };
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { categoryId } = await params;
  const { page: pageStr } = await searchParams;

  const ctx = await getServerStoreContext();
  if (!ctx) return null;

  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const tree = await getCategoryTree({}, locale).catch(() => ({
    categoriesTree: [],
  }));
  const current = findCategoryInTree(tree.categoriesTree, categoryId);
  const categoryPath = findCategoryPath(tree.categoriesTree, categoryId);

  let result: Awaited<ReturnType<typeof searchProducts>>;
  try {
    result = await searchProducts(
      {
        categoriesIds: [categoryId],
        take: PAGE_SIZE,
        skip,
      },
      locale,
    );
  } catch {
    result = { totalCount: 0, products: [] };
  }

  const totalPages = Math.max(1, Math.ceil(result.totalCount / PAGE_SIZE));

  return (
    <div>
      {isGuid(categoryId) ? <TrackCategoryView categoryId={categoryId} /> : null}
      <nav
        className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-medium text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="rounded-full border border-border/70 bg-card/80 px-3 py-1 transition hover:border-primary/30 hover:text-foreground"
        >
          {dict.category.home}
        </Link>
        {categoryPath.length > 0 ? (
          categoryPath.map((seg, i) => (
            <Fragment key={seg.id}>
              <span className="text-border select-none" aria-hidden>
                /
              </span>
              {i < categoryPath.length - 1 ? (
                <Link
                  href={`/c/${seg.id}`}
                  className="max-w-48 truncate rounded-full border border-border/70 bg-card/80 px-3 py-1 transition hover:border-primary/30 hover:text-foreground sm:max-w-64"
                  title={seg.name}
                >
                  {seg.name}
                </Link>
              ) : (
                <span
                  className="max-w-56 truncate rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-foreground sm:max-w-72"
                  title={seg.name}
                >
                  {seg.name}
                </span>
              )}
            </Fragment>
          ))
        ) : (
          <>
            <span className="text-border select-none" aria-hidden>
              /
            </span>
            <span className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-foreground">
              {current?.name ?? dict.category.collection}
            </span>
          </>
        )}
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
