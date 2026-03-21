"use client";

import clsx from "clsx";
import { useTranslations } from "@/contexts/locale-context";
import { useCartStore } from "@/features/cart/cart-store";

type Props = {
  productId: string;
  variantId: string | null;
  title: string;
  imageUrl: string | null;
  unitPrice: number;
  propertyValueIds: string[];
  quantity: number;
  disabled?: boolean;
  className?: string;
};

export function AddToCart({
  productId,
  variantId,
  title,
  imageUrl,
  unitPrice,
  propertyValueIds,
  quantity,
  disabled,
  className,
}: Props) {
  const addLine = useCartStore((s) => s.addLine);
  const t = useTranslations();

  return (
    <button
      type="button"
      disabled={disabled || unitPrice < 0}
      onClick={() =>
        addLine({
          productId,
          variantId,
          title,
          imageUrl,
          quantity,
          unitPrice,
          propertyValueIds,
        })
      }
      className={clsx(
        "inline-flex min-h-11 min-w-[10rem] items-center justify-center rounded-full bg-[var(--sf-color-primary)] px-8 text-sm font-semibold text-[var(--sf-color-primary-fg)] shadow-md transition hover:brightness-110 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
    >
      {t.product.addToCart}
    </button>
  );
}
