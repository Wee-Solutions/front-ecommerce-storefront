import {
  gatewayFetch,
  type GatewayFetchOptions,
} from "@/services/http/gateway-fetch";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderPaymentStatusResponse,
  GetPaymentEmbeddedFrameRequest,
  GetPaymentEmbeddedFrameResponse,
  OrderGatewayContext,
  SearchCustomerOrdersRequest,
  SearchCustomerOrdersResponse,
} from "@/types/api/order";

function orderFetchOptions(
  ctx: OrderGatewayContext,
): Pick<GatewayFetchOptions, "language" | "accessToken" | "guestIdentifier"> {
  const { language = "en", accessToken, guestIdentifier } = ctx;
  return {
    language,
    accessToken: accessToken ?? undefined,
    guestIdentifier: accessToken ? undefined : (guestIdentifier ?? undefined),
  };
}

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

export function createOrder(body: CreateOrderRequest, ctx: OrderGatewayContext) {
  return gatewayFetch<CreateOrderResponse>({
    path: "/orders/Create",
    method: "POST",
    body,
    cache: "no-store",
    ...orderFetchOptions(ctx),
  });
}

export function getPaymentEmbeddedFrame(
  body: GetPaymentEmbeddedFrameRequest,
  ctx: OrderGatewayContext,
) {
  return gatewayFetch<GetPaymentEmbeddedFrameResponse>({
    path: "/orders/GetPaymentEmbeddedFrame",
    method: "POST",
    body,
    cache: "no-store",
    ...orderFetchOptions(ctx),
  });
}

export function getOrderPaymentStatus(
  orderId: string,
  ctx: OrderGatewayContext,
) {
  return gatewayFetch<GetOrderPaymentStatusResponse>({
    path: `/orders/${orderId}/GetOrderPaymentStatus`,
    method: "GET",
    cache: "no-store",
    ...orderFetchOptions(ctx),
  });
}
