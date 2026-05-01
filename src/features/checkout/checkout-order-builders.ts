import type { CartLine } from "@/features/cart/cart-store";
import { env } from "@/config/env";
import type { CreateOrderRequest } from "@/types/api/order";
import {
  OrderShippingMethod,
  PaymentMethod,
  type PaymentMethodValue,
} from "@/types/api/order";
import type { StorefrontOrderSubmission } from "./checkout-flow.types";

export function buildOrderLinesFromCart(cartLines: CartLine[]) {
  return cartLines.map((line) => ({
    productId: line.productId,
    quantity: line.quantity,
    price: line.unitPrice,
    isWeightBased: false as const,
    propertyValueIds: line.propertyValueIds,
  }));
}

export function buildCreateOrderRequest(
  submission: StorefrontOrderSubmission,
  cartLines: CartLine[],
): CreateOrderRequest {
  const isDelivery =
    submission.shippingMethod === OrderShippingMethod.Delivery;

  return {
    paymentMethod: submission.paymentMethod,
    shippingMethod: submission.shippingMethod,
    shippingAddressId: isDelivery ? submission.shippingAddressId : null,
    customerNotes: submission.customerNotes?.trim() || undefined,
    couponCode: submission.couponCode?.trim() || undefined,
    tenantId: env.tenantId,
    orderProducts: buildOrderLinesFromCart(cartLines),
  };
}

export function isOnlineCardCheckout(paymentMethod: PaymentMethodValue): boolean {
  return paymentMethod === PaymentMethod.CreditCard;
}

export function sumCartLinesSubtotal(cartLines: CartLine[]): number {
  return cartLines.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0,
  );
}

export function uniqueCartProductIds(cartLines: CartLine[]): string[] {
  return [...new Set(cartLines.map((l) => l.productId))];
}

/** Payment methods the store supports and that exist in the domain enum. */
export function filterSupportedPaymentMethods(
  vendorMethods: number[],
): PaymentMethodValue[] {
  const allowed = new Set<number>([
    PaymentMethod.Cash,
    PaymentMethod.CreditCard,
    PaymentMethod.BankTransfer,
  ]);
  const out: PaymentMethodValue[] = [];
  for (const m of vendorMethods) {
    if (!allowed.has(m)) continue;
    const v = m as PaymentMethodValue;
    if (!out.includes(v)) out.push(v);
  }
  return out;
}
