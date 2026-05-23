import type { CartItemData } from "@/types/api/cart";

export type CartLine = {
  /** Server cart line id. */
  id: string;
  productId: string;
  variantId: string | null;
  title: string;
  imageUrl: string | null;
  quantity: number;
  unitPrice: number;
  isWeightBased: boolean;
  isPriceChanged: boolean;
  propertyValueIds: string[];
  /** Resolved labels for selected options (e.g. "Size: M · Color: Navy"). */
  variantSummary?: string | null;
};

export type AddCartLineInput = Omit<CartLine, "id" | "isPriceChanged">;

export function cartLineCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.quantity, 0);
}

export function mapCartItemToLine(item: CartItemData): CartLine {
  return {
    id: item.id,
    productId: item.productId,
    variantId: null,
    title: item.title,
    imageUrl: item.mainImage ?? null,
    quantity: item.quantity,
    unitPrice: item.isPriceChanged ? item.currentUnitPrice : item.unitPrice,
    isWeightBased: item.isWeightBased,
    isPriceChanged: item.isPriceChanged,
    propertyValueIds: item.propertyValueIds ?? [],
    variantSummary: null,
  };
}
