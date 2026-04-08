"use client";

import { useTranslations } from "@/contexts/locale-context";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/cart-store";
import { cn } from "@/lib/utils";

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
    <Button
      type="button"
      disabled={disabled || unitPrice < 0}
      size="lg"
      className={cn(
        "min-h-11 min-w-[10rem] rounded-full px-8 font-semibold shadow-md transition hover:shadow-lg active:scale-[0.98]",
        className
      )}
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
    >
      {t.product.addToCart}
    </Button>
  );
}
