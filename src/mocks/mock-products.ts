import { MOCK_PRODUCT_DETAILS } from "@/mocks/fashion-catalog";
import { GatewayRequestError } from "@/types/api/gateway";
import type {
  GetProductInventoryRequest,
  GetProductInventoryResponse,
  GetProductPriceRequest,
  GetProductPriceResponse,
  ProductDetail,
  ProductListItem,
  ProductSearchRequest,
} from "@/types/api/product";

function listMinVariantPrice(p: ProductDetail): number | null {
  const nums = p.variants
    .map((v) => v.price)
    .filter((x): x is number => x != null && x >= 0);
  if (nums.length === 0) return p.price ?? null;
  return Math.min(...nums);
}

function listCompareForFromPrice(
  p: ProductDetail,
  from: number
): number | null {
  let best: number | null = null;
  for (const v of p.variants) {
    if (v.price !== from) continue;
    if (
      v.oldPrice != null &&
      v.price != null &&
      v.oldPrice > v.price
    ) {
      best = best == null ? v.oldPrice : Math.max(best, v.oldPrice);
    }
  }
  return best;
}

function toListItem(p: ProductDetail): ProductListItem {
  const hasOptions = p.properties.length > 0;
  const priceFrom = hasOptions ? listMinVariantPrice(p) : null;
  const priceFromCompareAt =
    hasOptions && priceFrom != null
      ? listCompareForFromPrice(p, priceFrom)
      : null;

  return {
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
    tags: p.tags?.length ? p.tags.map((t) => ({ id: t.id, name: t.name })) : undefined,
    ...(hasOptions && priceFrom != null
      ? { hasOptions: true, priceFrom, priceFromCompareAt }
      : {}),
  };
}

function findDetail(id: string): ProductDetail | undefined {
  return MOCK_PRODUCT_DETAILS.find((p) => p.id === id);
}

function matchesSearch(p: ProductDetail, term: string): boolean {
  const t = term.toLowerCase();
  return (
    p.title.toLowerCase().includes(t) ||
    p.subTitle.toLowerCase().includes(t) ||
    p.description.toLowerCase().includes(t)
  );
}

export function mockSearchProducts(request: ProductSearchRequest): {
  totalCount: number;
  products: ProductListItem[];
} {
  let list = [...MOCK_PRODUCT_DETAILS];

  if (request.productsIds?.length) {
    const set = new Set(request.productsIds);
    list = list.filter((p) => set.has(p.id));
  }

  if (request.isHomePageProducts) {
    list = list.filter((p) => p.isDisplayInHomePage);
  }

  if (request.categoriesIds?.length) {
    const cats = new Set(request.categoriesIds);
    list = list.filter((p) => p.categories.some((c) => cats.has(c.id)));
  }

  const term = (request.searchTerm ?? "").trim();
  if (term) {
    list = list.filter((p) => matchesSearch(p, term));
  }

  list.sort((a, b) => a.title.localeCompare(b.title));

  const totalCount = list.length;
  const skip = Math.max(0, request.skip ?? 0);
  const take = Math.min(100, Math.max(1, request.take ?? 24));
  const slice = list.slice(skip, skip + take);

  return {
    totalCount,
    products: slice.map(toListItem),
  };
}

export function mockGetProductById(id: string): ProductDetail {
  const p = findDetail(id);
  if (!p) {
    throw new GatewayRequestError("Product not found", 404, null);
  }
  return structuredClone(p);
}

function variantForSelection(
  p: ProductDetail,
  propertyValueIds: string[]
): ProductDetail["variants"][0] | undefined {
  if (propertyValueIds.length === 0) return undefined;
  const chosen = [...propertyValueIds].sort();
  return p.variants.find(
    (v) =>
      v.propertyValues.length === chosen.length &&
      chosen.every((id) =>
        v.propertyValues.some((pv) => pv.propertyValueId === id)
      )
  );
}

export function mockGetProductPrice(
  body: GetProductPriceRequest
): GetProductPriceResponse {
  const p = findDetail(body.productId);
  if (!p) {
    throw new GatewayRequestError("Product not found", 404, null);
  }

  const v = variantForSelection(p, body.propertyValueIds);
  if (v && v.price != null) {
    return {
      price: v.price,
      isVariantPrice: true,
      variantId: v.id,
    };
  }

  if (p.properties.length > 0 && body.propertyValueIds.length > 0 && !v) {
    return {
      price: p.price ?? null,
      isVariantPrice: false,
      variantId: null,
    };
  }

  return {
    price: p.price ?? null,
    isVariantPrice: false,
    variantId: null,
  };
}

export function mockGetProductInventory(
  body: GetProductInventoryRequest
): GetProductInventoryResponse {
  const p = findDetail(body.productId);
  if (!p) {
    throw new GatewayRequestError("Product not found", 404, null);
  }

  const v = variantForSelection(p, body.propertyValueIds);
  if (v?.inventory) {
    const q = v.inventory.quantity - v.inventory.reserved;
    return {
      quantity: v.inventory.quantity,
      reserved: v.inventory.reserved,
      available: Math.max(0, Math.floor(q)),
      isVariantInventory: true,
      variantId: v.id,
    };
  }

  const q = (p.quantity ?? 0) - (p.reserved ?? 0);
  return {
    quantity: p.quantity ?? null,
    reserved: p.reserved ?? null,
    available: Math.max(0, Math.floor(q)),
    isVariantInventory: false,
    variantId: null,
  };
}
