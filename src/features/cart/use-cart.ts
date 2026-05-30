"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useVendor } from "@/contexts/vendor-context";
import { useCustomerSession } from "@/features/auth/customer-session";
import {
  addCartItem,
  clearCart as clearCartApi,
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/services/carts.service";
import type { AddCartLineInput, CartLine } from "./cart-types";
import { mapCartItemToLine } from "./cart-types";
import {
  trackAddProductToCart,
  trackRemoveFromCart,
  trackUpdateCartItem,
} from "@/features/events/track-events";
import { cartQueryKey } from "./cart-query";
import { useCartUiStore } from "./cart-ui-store";

function toCartLineRequest(line: Pick<
  CartLine,
  | "productId"
  | "quantity"
  | "unitPrice"
  | "isWeightBased"
  | "propertyValueIds"
>) {
  return {
    productId: line.productId,
    quantity: line.quantity,
    unitPrice: line.unitPrice,
    isWeightBased: line.isWeightBased,
    propertyValueIds: line.propertyValueIds,
  };
}

export function useCart() {
  const { language } = useVendor();
  const accessToken = useCustomerSession((s) => s.accessToken);
  const queryClient = useQueryClient();
  const gateway = useMemo(
    () => ({ language, accessToken }),
    [language, accessToken],
  );

  const isOpen = useCartUiStore((s) => s.isOpen);
  const open = useCartUiStore((s) => s.open);
  const close = useCartUiStore((s) => s.close);

  const cartQuery = useQuery({
    queryKey: cartQueryKey(language, accessToken),
    queryFn: () => getCart(gateway),
  });

  const cartId = cartQuery.data?.cartId ?? null;

  const lines = useMemo<CartLine[]>(
    () => (cartQuery.data?.items ?? []).map(mapCartItemToLine),
    [cartQuery.data?.items],
  );

  const invalidate = useCallback(
    () =>
      queryClient.invalidateQueries({
        queryKey: cartQueryKey(language, accessToken),
      }),
    [queryClient, language, accessToken],
  );

  const addMutation = useMutation({
    mutationFn: (line: AddCartLineInput) =>
      addCartItem({ line: toCartLineRequest(line) }, gateway),
    onSuccess: async (_data, line) => {
      trackAddProductToCart({
        productId: line.productId,
        quantity: line.quantity,
        cartId,
        propertyValueIds: line.propertyValueIds,
      });
      await invalidate();
      open();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      cartItemId,
      line,
    }: {
      cartItemId: string;
      line: CartLine;
    }) =>
      updateCartItem(
        { cartItemId, line: toCartLineRequest(line) },
        gateway,
      ),
    onSuccess: (_data, { cartItemId, line }) => {
      trackUpdateCartItem({
        cartItemId,
        quantity: line.quantity,
        cartId,
        propertyValueIds: line.propertyValueIds,
      });
      void invalidate();
    },
  });

  const removeMutation = useMutation({
    mutationFn: (cartItemId: string) => removeCartItem(cartItemId, gateway),
    onSuccess: (_data, cartItemId) => {
      const existing = lines.find((l) => l.id === cartItemId);
      if (existing) {
        trackRemoveFromCart({
          productId: existing.productId,
          cartId,
          cartItemId,
          propertyValueIds: existing.propertyValueIds,
        });
      }
      void invalidate();
    },
  });

  const clearMutation = useMutation({
    mutationFn: () => clearCartApi(gateway),
    onSuccess: invalidate,
  });

  const addLine = useCallback(
    (line: AddCartLineInput) => {
      addMutation.mutate(line);
    },
    [addMutation],
  );

  const updateQty = useCallback(
    (id: string, quantity: number) => {
      const existing = lines.find((l) => l.id === id);
      if (!existing) return;

      if (quantity < 1) {
        removeMutation.mutate(id);
        return;
      }

      updateMutation.mutate({
        cartItemId: id,
        line: { ...existing, quantity },
      });
    },
    [lines, removeMutation, updateMutation],
  );

  const removeLine = useCallback(
    (id: string) => {
      removeMutation.mutate(id);
    },
    [removeMutation],
  );

  const clear = useCallback(() => {
    clearMutation.mutate();
  }, [clearMutation]);

  const isMutating =
    addMutation.isPending ||
    updateMutation.isPending ||
    removeMutation.isPending ||
    clearMutation.isPending;

  return {
    lines,
    cartId,
    isOpen,
    open,
    close,
    addLine,
    updateQty,
    removeLine,
    clear,
    isLoading: cartQuery.isLoading,
    isFetching: cartQuery.isFetching,
    isMutating,
    error: cartQuery.error,
    removedProducts: cartQuery.data?.removedProducts ?? [],
  };
}
