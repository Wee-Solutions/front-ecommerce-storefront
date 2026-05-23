"use client";

import { useTranslations } from "@/contexts/locale-context";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/use-cart";
import { cn } from "@/lib/utils";

type Props = {
  productId: string;
  variantId: string | null;
  title: string;
  imageUrl: string | null;
  unitPrice: number;
  propertyValueIds: string[];
  isWeightBased?: boolean;
  /** Shown in cart; built from product properties + selection. */
  variantSummary?: string | null;
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
  isWeightBased = false,
  variantSummary,
  quantity,
  disabled,
  className,
}: Props) {
  const { addLine, isMutating } = useCart();
  const t = useTranslations();

  return (
    <Button
      type="button"
      disabled={disabled || unitPrice < 0 || isMutating}
      size="lg"
      className={cn(
        "min-h-11 min-w-[10rem] rounded-full px-8 font-semibold shadow-md transition hover:shadow-lg active:scale-[0.98]",
        className,
      )}
      onClick={() =>
        addLine({
          productId,
          variantId,
          title,
          imageUrl,
          quantity,
          unitPrice,
          isWeightBased,
          propertyValueIds,
          variantSummary: variantSummary ?? null,
        })
      }
    >
      {t.product.addToCart}
    </Button>
  );
}
