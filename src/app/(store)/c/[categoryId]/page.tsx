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
    locale
  ).catch(() => ({ totalCount: 0, products: [] }));

  const totalPages = Math.max(1, Math.ceil(result.totalCount / PAGE_SIZE));

  const hrefForPage = (p: number) =>
    `/c/${categoryId}${p > 1 ? `?page=${p}` : ""}`;

  return (
    <div>
      <nav className="mb-6 text-sm text-[var(--sf-color-muted)]">
        <Link href="/" className="transition hover:text-[var(--sf-color-primary)]">
          {dict.category.home}
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-[var(--sf-color-primary)]">
          {current?.name ?? dict.category.collection}
        </span>
      </nav>

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--sf-color-primary)] md:text-3xl">
          {current?.name ?? dict.category.collection}
        </h1>
        {current?.description && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--sf-color-muted)]">
            {current.description}
          </p>
        )}
      </header>

      {current && current.subCategories.length > 0 && (
        <div className="mb-10 rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-[var(--sf-color-surface)] p-5 shadow-[var(--sf-shadow-sm)]">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--sf-color-muted)]">
            {dict.category.browse}
          </p>
          <ul className="flex flex-wrap gap-2">
            {current.subCategories.map((sub) => (
              <li key={sub.id}>
                <Link
                  href={`/c/${sub.id}`}
                  className="inline-block rounded-full border border-[var(--sf-color-border)] bg-white px-4 py-1.5 text-sm text-[var(--sf-color-primary)] transition hover:border-[var(--sf-color-accent)]/50 hover:shadow-sm"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.products.length === 0 ? (
        <p className="text-sm text-[var(--sf-color-muted)]">
          {dict.category.noProducts}
        </p>
      ) : (
        <>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {result.products.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <Pagination
            page={page}
            totalPages={totalPages}
            hrefForPage={hrefForPage}
          />
        </>
      )}
    </div>
  );
}
