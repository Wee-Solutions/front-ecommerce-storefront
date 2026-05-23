"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useCustomerSession } from "@/features/auth/customer-session";
import type { CartLine } from "@/features/cart/cart-types";
import type { OrderGatewayContext } from "@/types/api/order";
import type { CheckoutStep, StorefrontOrderSubmission } from "./checkout-flow.types";
import { isPlaceOrderFailure } from "./checkout-flow.types";
import { authenticatedOrderContext } from "./order-gateway-context";
import { placeStorefrontOrder } from "./place-storefront-order";

function interpolateOrderNumber(template: string, orderNumber: number): string {
  return template.replace(/\{\{orderNumber\}\}/g, String(orderNumber));
}

export type CheckoutFlowLabels = {
  errorGeneric: string;
  cardUnavailable: string;
  paymentFailed: string;
  paymentTimeout: string;
  successPaid: string;
  successPlaced: string;
  loginRequired: string;
};

type Params = {
  locale: string;
  labels: CheckoutFlowLabels;
  clearCart: () => void;
};

export function useCheckoutFlow({ locale, labels, clearCart }: Params) {
  const accessToken = useCustomerSession((s) => s.accessToken);

  const [step, setStep] = useState<CheckoutStep>({ name: "details" });
  const stepRef = useRef(step);
  stepRef.current = step;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resolveGatewayContext = useCallback((): OrderGatewayContext | null => {
    if (!accessToken) return null;
    return authenticatedOrderContext(locale, accessToken);
  }, [locale, accessToken]);

  const exitEmbeddedPaymentWithMessage = useCallback(
    (template: string) => {
      const current = stepRef.current;
      if (current.name !== "embedded_payment") return;
      setErrorMessage(`${template} (#${current.orderNumber})`);
      clearCart();
      setStep({ name: "details" });
    },
    [clearCart],
  );

  const onEmbeddedPaymentFailed = useCallback(() => {
    exitEmbeddedPaymentWithMessage(labels.paymentFailed);
  }, [exitEmbeddedPaymentWithMessage, labels.paymentFailed]);

  const onEmbeddedPaymentTimedOut = useCallback(() => {
    exitEmbeddedPaymentWithMessage(labels.paymentTimeout);
  }, [exitEmbeddedPaymentWithMessage, labels.paymentTimeout]);

  const onEmbeddedPaymentSucceeded = useCallback(() => {
    setStep((current) => {
      if (current.name !== "embedded_payment") return current;
      clearCart();
      return {
        name: "confirmation",
        orderNumber: current.orderNumber,
        paymentCapturedOnline: true,
      };
    });
  }, [clearCart]);

  const submitDetailsStep = useCallback(
    async (submission: StorefrontOrderSubmission, cartLines: CartLine[]) => {
      setErrorMessage(null);
      const gateway = resolveGatewayContext();
      if (!gateway) {
        setErrorMessage(labels.loginRequired);
        return;
      }

      setIsSubmitting(true);
      try {
        const result = await placeStorefrontOrder({
          submission,
          cartLines,
          gateway,
          genericErrorMessage: labels.errorGeneric,
          cardUnavailableMessage: labels.cardUnavailable,
        });

        if (isPlaceOrderFailure(result)) {
          setErrorMessage(result.errorMessage);
          return;
        }

        if (result.nextStep === "embedded_payment") {
          setStep({
            name: "embedded_payment",
            orderId: result.orderId,
            orderNumber: result.orderNumber,
            paymentFrameUrl: result.paymentFrameUrl,
          });
          return;
        }

        clearCart();
        setStep({
          name: "confirmation",
          orderNumber: result.orderNumber,
          paymentCapturedOnline: result.paymentCapturedOnline,
        });
        if (result.userMessage) {
          setErrorMessage(result.userMessage);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      clearCart,
      labels.cardUnavailable,
      labels.errorGeneric,
      labels.loginRequired,
      resolveGatewayContext,
    ],
  );

  const confirmationBannerText = useMemo(() => {
    if (step.name !== "confirmation") return null;
    const template = step.paymentCapturedOnline
      ? labels.successPaid
      : labels.successPlaced;
    return interpolateOrderNumber(template, step.orderNumber);
  }, [labels.successPaid, labels.successPlaced, step]);

  return {
    step,
    accessToken,
    isSubmitting,
    errorMessage,
    setErrorMessage,
    submitDetailsStep,
    onEmbeddedPaymentSucceeded,
    onEmbeddedPaymentFailed,
    onEmbeddedPaymentTimedOut,
    confirmationBannerText,
  };
}
