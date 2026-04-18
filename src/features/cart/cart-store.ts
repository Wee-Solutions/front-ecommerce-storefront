import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  id: string;
  productId: string;
  variantId: string | null;
  title: string;
  imageUrl: string | null;
  quantity: number;
  unitPrice: number;
  propertyValueIds: string[];
  /** Resolved labels for selected options (e.g. "Size: M · Color: Navy"). */
  variantSummary?: string | null;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addLine: (line: Omit<CartLine, "id">) => void;
  updateQty: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
  clear: () => void;
};

function makeLineId(productId: string, variantId: string | null) {
  return `${productId}::${variantId ?? "base"}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
      addLine: (line) => {
        const id = makeLineId(line.productId, line.variantId);
        const existing = get().lines.find((l) => l.id === id);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.id === id
                ? { ...l, quantity: l.quantity + line.quantity }
                : l
            ),
            isOpen: true,
          });
          return;
        }
        set({
          lines: [...get().lines, { ...line, id }],
          isOpen: true,
        });
      },
      updateQty: (id, quantity) => {
        if (quantity < 1) {
          set({ lines: get().lines.filter((l) => l.id !== id) });
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.id === id ? { ...l, quantity } : l
          ),
        });
      },
      removeLine: (id) =>
        set({ lines: get().lines.filter((l) => l.id !== id) }),
      clear: () => set({ lines: [] }),
    }),
    { name: "sf-cart" }
  )
);

export function cartLineCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.quantity, 0);
}
