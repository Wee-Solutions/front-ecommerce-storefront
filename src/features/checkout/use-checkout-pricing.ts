"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { CartLine } from "@/features/cart/cart-types";
import {
  buildCheckoutOrderRequest,
  cartLinesQueryKey,
} from "@/features/checkout/checkout-order-builders";
import { checkoutOrder } from "@/services/orders.service";
import {
  OrderShippingMethod,
  type CheckoutOrderResponse,
  type OrderShippingMethodValue,
} from "@/types/api/order";

type Params = {
  cartLines: CartLine[];
  accessToken: string | null;
  locale: string;
  appliedCouponCode: string | null;
  shippingMethod: OrderShippingMethodValue;
  shippingAddressId: string | null;
};

export function useCheckoutPricing({
  cartLines,
  accessToken,
  locale,
  appliedCouponCode,
  shippingMethod,
  shippingAddressId,
}: Params) {
  const queryClient = useQueryClient();
  const linesKey = useMemo(() => cartLinesQueryKey(cartLines), [cartLines]);

  const shippingReady =
    shippingMethod !== OrderShippingMethod.Delivery || Boolean(shippingAddressId);

  const queryKey = useMemo(
    () =>
      [
        "checkout-pricing",
        accessToken,
        locale,
        linesKey,
        appliedCouponCode,
        shippingMethod,
        shippingAddressId,
      ] as const,
    [
      accessToken,
      locale,
      linesKey,
      appliedCouponCode,
      shippingMethod,
      shippingAddressId,
    ],
  );

  const buildRequest = useCallback(
    (couponCode: string | null) =>
      buildCheckoutOrderRequest(cartLines, {
        couponCode,
        shippingMethod,
        shippingAddressId,
      }),
    [cartLines, shippingMethod, shippingAddressId],
  );

  const pricingQuery = useQuery({
    queryKey,
    queryFn: () => checkoutOrder(buildRequest(appliedCouponCode), accessToken!, locale),
    enabled: Boolean(accessToken && cartLines.length > 0 && shippingReady),
  });

  const refreshPricing = useCallback(
    async (couponCode: string | null): Promise<CheckoutOrderResponse> => {
      const data = await checkoutOrder(
        buildRequest(couponCode),
        accessToken!,
        locale,
      );
      const key = [
        "checkout-pricing",
        accessToken,
        locale,
        linesKey,
        couponCode,
        shippingMethod,
        shippingAddressId,
      ] as const;
      queryClient.setQueryData(key, data);
      return data;
    },
    [
      accessToken,
      buildRequest,
      linesKey,
      locale,
      queryClient,
      shippingAddressId,
      shippingMethod,
    ],
  );

  return { pricingQuery, refreshPricing, queryKey, shippingReady };
}
