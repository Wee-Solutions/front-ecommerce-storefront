import type { ProductDetail, ProductListItem } from "@/types/api/product";

/** Split subtitle lines like "Silk · Champagne" into display chips. */
export function subtitleMaterialChips(
  subTitle: string | undefined,
  max = 3
): string[] {
  if (!subTitle?.trim()) return [];
  return subTitle
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, max);
}

/** Stable synthetic social proof for list cards when reviews API is not wired. */
export function syntheticRating(productId: string): {
  value: number;
  count: number;
} {
  let h = 2166136261;
  for (let i = 0; i < productId.length; i++) {
    h ^= productId.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const u = h >>> 0;
  const value = 4 + (2 + (u % 8)) / 10; // 4.2 – 4.9
  const count = 18 + (u % 220);
  return { value, count };
}

export function availableUnits(product: ProductListItem): number | null {
  const q = product.quantity;
  if (q == null) return null;
  return Math.max(0, Math.floor(q - (product.reserved ?? 0)));
}

export function isLowStock(product: ProductListItem, threshold = 12): boolean {
  const a = availableUnits(product);
  return a != null && a > 0 && a <= threshold;
}

/** Merge API tags + subtitle chips for card display (deduped, capped). */
export function productCardHighlights(
  product: ProductListItem,
  maxChips = 3
): string[] {
  const fromTags = (product.tags ?? []).map((t) => t.name.trim()).filter(Boolean);
  const fromSub = subtitleMaterialChips(product.subTitle, maxChips + 2);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const x of [...fromTags, ...fromSub]) {
    const k = x.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x);
    if (out.length >= maxChips) break;
  }
  return out;
}

/** PDP / detail view: tags + subtitle-derived materials. */
export function detailHighlights(p: ProductDetail, maxChips = 5): string[] {
  const list: ProductListItem = {
    id: p.id,
    vendorId: p.vendorId,
    title: p.title,
    subTitle: p.subTitle,
    mainImage: p.mainImage?.url ?? null,
    price: p.price ?? null,
    oldPrice: p.oldPrice ?? null,
    baseUnit: p.baseUnit.name,
    quantity: p.quantity ?? null,
    reserved: p.reserved ?? null,
    sku: p.sku ?? null,
    barcode: p.barcode ?? null,
    isActive: p.isActive,
    isDisplayInHomePage: p.isDisplayInHomePage,
    isVATExcluded: p.isVATExcluded,
    isWeightBased: p.isWeightBased,
    tags: p.tags,
  };
  return productCardHighlights(list, maxChips);
}

