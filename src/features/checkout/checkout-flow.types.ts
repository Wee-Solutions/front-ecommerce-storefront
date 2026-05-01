import type { PaymentMethodValue } from "@/types/api/order";

/** Single screen in the checkout experience (not an API order status). */
export type CheckoutStep =
  | { name: "details" }
  | {
      name: "embedded_payment";
      orderId: string;
      orderNumber: number;
      paymentFrameUrl: string;
    }
  | {
      name: "confirmation";
      orderNumber: number;
      paymentCapturedOnline: boolean;
    };

export type ParsedCheckoutForm = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  shippingAddressLine: string;
  paymentMethod: PaymentMethodValue;
};

export type PlaceOrderSuccess =
  | {
      nextStep: "embedded_payment";
      orderId: string;
      orderNumber: number;
      paymentFrameUrl: string;
    }
  | {
      nextStep: "confirmation";
      orderNumber: number;
      paymentCapturedOnline: boolean;
      /** Shown when card UI could not be started though the order exists */
      userMessage?: string;
    };

export type PlaceOrderFailure = {
  errorMessage: string;
};

export type PlaceOrderResult = PlaceOrderSuccess | PlaceOrderFailure;

export function isPlaceOrderFailure(
  result: PlaceOrderResult,
): result is PlaceOrderFailure {
  return "errorMessage" in result;
}
