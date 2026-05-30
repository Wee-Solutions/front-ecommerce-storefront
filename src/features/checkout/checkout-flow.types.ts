import type {
  OrderShippingMethodValue,
  PaymentMethodValue,
} from "@/types/api/order";

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
      orderId: string;
      orderNumber: number;
      paymentCapturedOnline: boolean;
    };

/** Values collected on the details step before calling `Create`. */
export type StorefrontOrderSubmission = {
  paymentMethod: PaymentMethodValue;
  shippingMethod: OrderShippingMethodValue;
  /** Required when `shippingMethod` is delivery; must be `null` for pickup. */
  shippingAddressId: string | null;
  customerNotes: string | null;
  couponCode: string | null;
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
      orderId: string;
      orderNumber: number;
      paymentCapturedOnline: boolean;
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
