import Link from "next/link";
import { Pagination } from "@/components/catalog/pagination";
import { ProductCard } from "@/components/product/product-card";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { getServerStoreContext } from "@/lib/tenant/server-store";
import { searchProducts } from "@/services/products.service";
import type { Metadata } from "next";

const PAGE_SIZE = 12;

type Props = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return { title: q ? `${dict.search.resultsFor} ${q}` : dict.search.title };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, page: pageStr } = await searchParams;
  const ctx = await getServerStoreContext();
  if (!ctx) return null;

  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  const term = (q ?? "").trim();
  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const result = await searchProducts(
    ctx.vendorCode,
    {
      searchTerm: term || null,
      take: PAGE_SIZE,
      skip,
    },
    locale
  ).catch(() => ({ totalCount: 0, products: [] }));

  const totalPages = Math.max(1, Math.ceil(result.totalCount / PAGE_SIZE));
  const hrefForPage = (p: number) => {
    const params = new URLSearchParams();
    if (term) params.set("q", term);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return `/search${qs ? `?${qs}` : ""}`;
  };

  return (
    <div>
      <nav className="mb-6 text-sm text-[var(--sf-color-muted)]">
        <Link href="/" className="transition hover:text-[var(--sf-color-primary)]">
          {dict.search.home}
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-[var(--sf-color-primary)]">{dict.search.title}</span>
      </nav>
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--sf-color-primary)] md:text-3xl">
        {term ? `${dict.search.resultsFor} “${term}”` : dict.search.allProducts}
      </h1>
      <p className="mt-2 text-sm text-[var(--sf-color-muted)]">
        {result.totalCount} {dict.search.resultsWord}
      </p>

      {result.products.length === 0 ? (
        <p className="mt-10 text-sm text-[var(--sf-color-muted)]">
          {dict.search.noResults}
        </p>
      ) : (
        <>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
