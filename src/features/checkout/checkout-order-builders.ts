import type { CartLine } from "@/features/cart/cart-store";
import type { CreateOrderRequest } from "@/types/api/order";
import { PaymentMethod, type PaymentMethodValue } from "@/types/api/order";
import type { ParsedCheckoutForm } from "./checkout-flow.types";

const SHIPPING_NOTE_PREFIX = "Address:";

/** Normalizes a single "full name" field into API first/last parts. */
export function splitCustomerFullName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const normalized = fullName.trim().replace(/\s+/g, " ");
  const spaceIndex = normalized.indexOf(" ");
  if (spaceIndex === -1) {
    return { firstName: normalized, lastName: "" };
  }
  return {
    firstName: normalized.slice(0, spaceIndex),
    lastName: normalized.slice(spaceIndex + 1),
  };
}

/** API has no structured address; persist it in order notes for fulfillment. */
export function customerNotesFromShippingAddress(
  shippingAddressLine: string,
): string | undefined {
  const trimmed = shippingAddressLine.trim();
  if (!trimmed) return undefined;
  return `${SHIPPING_NOTE_PREFIX} ${trimmed}`;
}

export function parsePaymentMethodFromForm(
  raw: FormDataEntryValue | null,
): PaymentMethodValue {
  const value = Number(raw ?? PaymentMethod.CreditCard);
  if (
    value === PaymentMethod.Cash ||
    value === PaymentMethod.CreditCard ||
    value === PaymentMethod.BankTransfer
  ) {
    return value;
  }
  return PaymentMethod.CreditCard;
}

export function parseCheckoutFormData(formData: FormData): ParsedCheckoutForm {
  const fullName = String(formData.get("name") ?? "").trim();
  const { firstName, lastName } = splitCustomerFullName(fullName);

  return {
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    firstName,
    lastName,
    shippingAddressLine: String(formData.get("address") ?? "").trim(),
    paymentMethod: parsePaymentMethodFromForm(formData.get("paymentMethod")),
  };
}

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
  form: ParsedCheckoutForm,
  cartLines: CartLine[],
): CreateOrderRequest {
  return {
    paymentMethod: form.paymentMethod,
    customerNotes: customerNotesFromShippingAddress(form.shippingAddressLine),
    firstName: form.firstName,
    lastName: form.lastName,
    phoneNumber: form.phone,
    email: form.email,
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
