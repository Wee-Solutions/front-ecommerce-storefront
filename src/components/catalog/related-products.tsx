import { ProductCard } from "@/components/product/product-card";
import { searchProducts } from "@/services/products.service";
import type { ProductListItem } from "@/types/api/product";
import type { Locale } from "@/lib/i18n/locale-config";

export async function RelatedProducts({
  vendorCode,
  categoryIds,
  excludeProductId,
  language,
  title,
}: {
  vendorCode: string;
  categoryIds: string[];
  excludeProductId: string;
  language: Locale;
  title: string;
}) {
  if (categoryIds.length === 0) return null;

  let items: ProductListItem[] = [];
  try {
    const res = await searchProducts(
      vendorCode,
      {
        categoriesIds: [categoryIds[0]],
        take: 8,
        skip: 0,
      },
      language
    );
    items = res.products.filter((p) => p.id !== excludeProductId).slice(0, 4);
  } catch {
    return null;
  }

  if (items.length === 0) return null;

  return (
    <section
      className="mt-16 border-t border-[var(--sf-color-border)] pt-12"
      aria-labelledby="related-heading"
    >
      <h2
        id="related-heading"
        className="text-lg font-semibold text-[var(--sf-color-primary)]"
      >
        {title}
      </h2>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
