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
  vendorCode: string,
  request: ProductSearchRequest,
  language = "en"
) {
  const raw = await gatewayFetch<ProductSearchResponse>({
    vendorCode,
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

export function getProductById(
  vendorCode: string,
  id: string,
  language = "en"
) {
  return gatewayFetch<ProductDetail>({
    vendorCode,
    path: `/products/GetById/${id}`,
    method: "GET",
    language,
    next: { revalidate: REVALIDATE_PDP },
  });
}

export function getProductPrice(
  vendorCode: string,
  body: GetProductPriceRequest,
  language = "en"
) {
  return gatewayFetch<GetProductPriceResponse>({
    vendorCode,
    path: "/products/GetPrice",
    method: "POST",
    body,
    language,
    cache: "no-store",
  });
}

export function getProductInventory(
  vendorCode: string,
  body: GetProductInventoryRequest,
  language = "en"
) {
  return gatewayFetch<GetProductInventoryResponse>({
    vendorCode,
    path: "/products/GetInventory",
    method: "POST",
    body,
    language,
    cache: "no-store",
  });
}
