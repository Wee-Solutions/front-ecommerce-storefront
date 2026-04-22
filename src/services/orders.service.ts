import { gatewayFetch } from "@/services/http/gateway-fetch";
import type {
  SearchCustomerOrdersRequest,
  SearchCustomerOrdersResponse,
} from "@/types/api/order";

export function searchCustomerOrders(
  body: SearchCustomerOrdersRequest,
  accessToken: string,
  language = "en",
) {
  return gatewayFetch<SearchCustomerOrdersResponse>({
    path: "/orders/Search",
    method: "POST",
    body,
    language,
    accessToken,
    cache: "no-store",
  });
}

