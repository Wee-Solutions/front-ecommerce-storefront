"use client";

import { useTranslations } from "@/contexts/locale-context";
import { Button } from "@/components/ui/button";
import { cartLineCount, useCartStore } from "@/features/cart/cart-store";

export function CartIconButton() {
  const open = useCartStore((s) => s.open);
  const lines = useCartStore((s) => s.lines);
  const count = cartLineCount(lines);
  const t = useTranslations();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={open}
      className="relative text-foreground transition active:scale-95"
      aria-label={`${t.cart.openCart}, ${count}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M6 6h15l-1.5 9h-12z" />
        <path d="M6 6 5 3H2" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
      {count > 0 ? (
        <span className="absolute -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-sm end-0">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Button>
  );
}
