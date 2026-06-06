import { enqueueTrackEvent, enqueueTrackEvents } from "@/features/events/event-buffer";
import { PaymentMethod, type PaymentMethodValue } from "@/types/api/order";
import { EventType } from "@/types/api/events";

export function paymentMethodEventName(
  value: PaymentMethodValue,
): string {
  const entry = Object.entries(PaymentMethod).find(([, v]) => v === value);
  return entry?.[0] ?? String(value);
}

export function trackViewProduct(productId: string): void {
  enqueueTrackEvent({ type: EventType.ViewProduct, productId });
}

export function trackViewCategory(categoryId: string): void {
  enqueueTrackEvent({ type: EventType.ViewCategory, categoryId });
}

export function trackSearchProducts(searchTerm: string): void {
  const term = searchTerm.trim();
  if (!term) return;
  enqueueTrackEvent({
    type: EventType.SearchProducts,
    payload: { searchTerm: term },
  });
}

export function trackAddProductToCart(params: {
  productId: string;
  quantity: number;
  cartId?: string | null;
  propertyValueIds?: string[];
}): void {
  enqueueTrackEvent({
    type: EventType.AddProductToCart,
    productId: params.productId,
    cartId: params.cartId ?? undefined,
    payload: {
      quantity: params.quantity,
      propertyValueIds: params.propertyValueIds ?? [],
    },
  });
}

export function trackUpdateCartItem(params: {
  cartItemId: string;
  quantity: number;
  cartId?: string | null;
  propertyValueIds?: string[];
}): void {
  enqueueTrackEvent({
    type: EventType.UpdateCartItem,
    cartId: params.cartId ?? undefined,
    payload: {
      cartItemId: params.cartItemId,
      quantity: params.quantity,
      propertyValueIds: params.propertyValueIds ?? [],
    },
  });
}

export function trackRemoveFromCart(params: {
  productId: string;
  cartId?: string | null;
  cartItemId?: string;
  propertyValueIds?: string[];
}): void {
  const payload: {
    cartItemId?: string;
    propertyValueIds?: string[];
  } = {};
  if (params.cartItemId) payload.cartItemId = params.cartItemId;
  if (params.propertyValueIds?.length) {
    payload.propertyValueIds = params.propertyValueIds;
  }
  enqueueTrackEvent({
    type: EventType.RemoveFromCart,
    productId: params.productId,
    cartId: params.cartId ?? undefined,
    payload,
  });
}

export function trackViewCart(cartId?: string | null): void {
  enqueueTrackEvent({
    type: EventType.ViewCart,
    cartId: cartId ?? undefined,
  });
}

export function trackBeginCheckout(cartId?: string | null): void {
  enqueueTrackEvent({
    type: EventType.BeginCheckout,
    cartId: cartId ?? undefined,
  });
}

export function trackCheckout(params: {
  orderId: string;
  paymentMethod: PaymentMethodValue;
}): void {
  enqueueTrackEvent({
    type: EventType.Checkout,
    orderId: params.orderId,
    payload: {
      paymentMethod: paymentMethodEventName(params.paymentMethod),
    },
  });
}

export function trackViewOrderConfirmation(orderId: string): void {
  enqueueTrackEvent({
    type: EventType.ViewOrderConfirmation,
    orderId,
  });
}

export function trackApplyCoupon(couponCode: string, cartId?: string | null): void {
  enqueueTrackEvent({
    type: EventType.ApplyCoupon,
    cartId: cartId ?? undefined,
    payload: { couponCode: couponCode.trim() },
  });
}

export function trackRemoveCoupon(couponCode: string, cartId?: string | null): void {
  enqueueTrackEvent({
    type: EventType.RemoveCoupon,
    cartId: cartId ?? undefined,
    payload: { couponCode: couponCode.trim() },
  });
}

export function trackLogin(): void {
  enqueueTrackEvent({ type: EventType.Login });
}

export function trackRegister(): void {
  enqueueTrackEvent({ type: EventType.Register });
}

/** Batch multiple events in one enqueue cycle (single flush batch when possible). */
export { enqueueTrackEvents };
