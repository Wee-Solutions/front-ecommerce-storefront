import { isMockApiEnabled } from "@/config/mock-mode";
import {
  mockGetProductById,
  mockGetProductInventory,
  mockGetProductPrice,
  mockSearchProducts,
} from "@/mocks/mock-products";
import { gatewayFetch } from "@/services/http/gateway-fetch";
import type {
  GetProductInventoryRequest,
  GetProductInventoryResponse,
  GetProductPriceRequest,
  GetProductPriceResponse,
  ProductDetail,
  ProductSearchRequest,
  ProductSearchResponse,
} from "@/types/api/product";

const REVALIDATE_LIST = 120;
const REVALIDATE_PDP = 180;

export async function searchProducts(
  request: ProductSearchRequest,
  language = "en",
) {
  if (isMockApiEnabled()) {
    void language;
    return mockSearchProducts(request);
  }

  const raw = await gatewayFetch<ProductSearchResponse>({
    path: "/products/Search",
    method: "POST",
    body: request,
    language,
    next: { revalidate: REVALIDATE_LIST },
  });
  const products = raw.products ?? raw.Products ?? [];
  const totalCount = raw.totalCount ?? raw.TotalCount ?? 0;
  return { totalCount, products };
}

export function getProductById(id: string, language = "en") {
  if (isMockApiEnabled()) {
    void language;
    return Promise.resolve(mockGetProductById(id));
  }

  return gatewayFetch<ProductDetail>({
    path: `/products/GetById/${id}`,
    method: "GET",
    language,
    next: { revalidate: REVALIDATE_PDP },
  });
}

export function getProductPrice(
  body: GetProductPriceRequest,
  language = "en",
) {
  if (isMockApiEnabled()) {
    void language;
    return Promise.resolve(mockGetProductPrice(body));
  }

  return gatewayFetch<GetProductPriceResponse>({
    path: "/products/GetPrice",
    method: "POST",
    body,
    language,
    cache: "no-store",
  });
}

export function getProductInventory(
  body: GetProductInventoryRequest,
  language = "en",
) {
  if (isMockApiEnabled()) {
    void language;
    return Promise.resolve(mockGetProductInventory(body));
  }

  return gatewayFetch<GetProductInventoryResponse>({
    path: "/products/GetInventory",
    method: "POST",
    body,
    language,
    cache: "no-store",
  });
}
