import {
  createOrder,
  getPaymentEmbeddedFrame,
} from "@/services/orders.service";
import { GatewayRequestError } from "@/types/api/gateway";
import type { OrderGatewayContext } from "@/types/api/order";
import type {
  ParsedCheckoutForm,
  PlaceOrderFailure,
  PlaceOrderResult,
  PlaceOrderSuccess,
} from "./checkout-flow.types";
import {
  buildCreateOrderRequest,
  isOnlineCardCheckout,
} from "./checkout-order-builders";
import type { CartLine } from "@/features/cart/cart-store";

function normalizePaymentFrameUrl(url: string | undefined): string {
  return url?.trim() ?? "";
}

type Params = {
  form: ParsedCheckoutForm;
  cartLines: CartLine[];
  gateway: OrderGatewayContext;
  genericErrorMessage: string;
  cardUnavailableMessage: string;
};

/**
 * Creates a storefront order and, for card payments, obtains the provider iframe URL.
 * Pure API orchestration — no cart or UI state.
 */
export async function placeStorefrontOrder({
  form,
  cartLines,
  gateway,
  genericErrorMessage,
  cardUnavailableMessage,
}: Params): Promise<PlaceOrderResult> {
  try {
    const payload = buildCreateOrderRequest(form, cartLines);
    const created = await createOrder(payload, gateway);

    if (!isOnlineCardCheckout(form.paymentMethod)) {
      const success: PlaceOrderSuccess = {
        nextStep: "confirmation",
        orderNumber: created.orderNumber,
        paymentCapturedOnline: false,
      };
      return success;
    }

    try {
      const frame = await getPaymentEmbeddedFrame(
        { orderId: created.orderId },
        gateway,
      );
      const paymentFrameUrl = normalizePaymentFrameUrl(
        frame.embeddedFrameURL,
      );

      if (!paymentFrameUrl) {
        const success: PlaceOrderSuccess = {
          nextStep: "confirmation",
          orderNumber: created.orderNumber,
          paymentCapturedOnline: false,
          userMessage: cardUnavailableMessage,
        };
        return success;
      }

      const success: PlaceOrderSuccess = {
        nextStep: "embedded_payment",
        orderId: created.orderId,
        orderNumber: created.orderNumber,
        paymentFrameUrl,
      };
      return success;
    } catch {
      const success: PlaceOrderSuccess = {
        nextStep: "confirmation",
        orderNumber: created.orderNumber,
        paymentCapturedOnline: false,
        userMessage: cardUnavailableMessage,
      };
      return success;
    }
  } catch (error) {
    const message =
      error instanceof GatewayRequestError
        ? error.message
        : genericErrorMessage;
    const failure: PlaceOrderFailure = { errorMessage: message };
    return failure;
  }
}
