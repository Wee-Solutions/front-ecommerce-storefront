import type { ProductDetail } from "@/types/api/product";

/**
 * Human-readable option line for cart/checkout (e.g. "Size: M · Color: Navy").
 * Order follows `product.properties`.
 */
export function formatCartVariantSummary(
  product: Pick<ProductDetail, "properties">,
  propertyValueIds: string[],
): string | null {
  if (propertyValueIds.length === 0) return null;
  const chosen = new Set(propertyValueIds);
  const parts: string[] = [];
  for (const p of product.properties) {
    const val = p.values.find((v) => chosen.has(v.propertyValueId));
    if (val) {
      parts.push(`${p.propertyName}: ${val.value}`);
    }
  }
  return parts.length > 0 ? parts.join(" · ") : null;
}
