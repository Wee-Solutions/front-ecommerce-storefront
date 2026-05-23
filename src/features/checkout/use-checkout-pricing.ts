"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { CartLine } from "@/features/cart/cart-types";
import {
  buildCheckoutOrderRequest,
  cartLinesQueryKey,
} from "@/features/checkout/checkout-order-builders";
import { checkoutOrder } from "@/services/orders.service";
import type { CheckoutOrderResponse } from "@/types/api/order";

type Params = {
  cartLines: CartLine[];
  accessToken: string | null;
  locale: string;
  appliedCouponCode: string | null;
};

export function useCheckoutPricing({
  cartLines,
  accessToken,
  locale,
  appliedCouponCode,
}: Params) {
  const queryClient = useQueryClient();
  const linesKey = useMemo(() => cartLinesQueryKey(cartLines), [cartLines]);

  const queryKey = useMemo(
    () =>
      [
        "checkout-pricing",
        accessToken,
        locale,
        linesKey,
        appliedCouponCode,
      ] as const,
    [accessToken, locale, linesKey, appliedCouponCode],
  );

  const pricingQuery = useQuery({
    queryKey,
    queryFn: () =>
      checkoutOrder(
        buildCheckoutOrderRequest(cartLines, appliedCouponCode),
        accessToken!,
        locale,
      ),
    enabled: Boolean(accessToken && cartLines.length > 0),
  });

  const refreshPricing = useCallback(
    async (couponCode: string | null): Promise<CheckoutOrderResponse> => {
      const data = await checkoutOrder(
        buildCheckoutOrderRequest(cartLines, couponCode),
        accessToken!,
        locale,
      );
      const key = [
        "checkout-pricing",
        accessToken,
        locale,
        linesKey,
        couponCode,
      ] as const;
      queryClient.setQueryData(key, data);
      return data;
    },
    [accessToken, cartLines, linesKey, locale, queryClient],
  );

  return { pricingQuery, refreshPricing, queryKey };
}
