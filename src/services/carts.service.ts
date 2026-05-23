import { gatewayFetch } from "@/services/http/gateway-fetch";
import type {
  AddCartItemRequest,
  CartResponse,
  UpdateCartItemRequest,
} from "@/types/api/cart";

type CartGatewayContext = {
  language?: string;
  accessToken?: string | null;
};

function cartFetchOptions(ctx: CartGatewayContext = {}) {
  const { language = "en", accessToken } = ctx;
  return {
    language,
    accessToken: accessToken ?? undefined,
    cache: "no-store" as const,
  };
}

export function getCart(ctx: CartGatewayContext = {}) {
  return gatewayFetch<CartResponse>({
    path: "/carts/Get",
    method: "GET",
    ...cartFetchOptions(ctx),
  });
}

export function addCartItem(body: AddCartItemRequest, ctx: CartGatewayContext = {}) {
  return gatewayFetch<void>({
    path: "/carts/AddItem",
    method: "POST",
    body,
    ...cartFetchOptions(ctx),
  });
}

export function updateCartItem(
  body: UpdateCartItemRequest,
  ctx: CartGatewayContext = {},
) {
  return gatewayFetch<void>({
    path: "/carts/UpdateItem",
    method: "PUT",
    body,
    ...cartFetchOptions(ctx),
  });
}

export function removeCartItem(
  cartItemId: string,
  ctx: CartGatewayContext = {},
) {
  return gatewayFetch<void>({
    path: `/carts/RemoveItem/${cartItemId}`,
    method: "DELETE",
    ...cartFetchOptions(ctx),
  });
}

export function clearCart(ctx: CartGatewayContext = {}) {
  return gatewayFetch<void>({
    path: "/carts/Clear",
    method: "DELETE",
    ...cartFetchOptions(ctx),
  });
}
