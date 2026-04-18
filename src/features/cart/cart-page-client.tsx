"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "@/contexts/locale-context";
import { formatMoney } from "@/lib/format-currency";
import { useCartStore } from "./cart-store";

export function CartView() {
  const t = useTranslations();
  const locale = useLocale();
  const lines = useCartStore((s) => s.lines);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeLine = useCartStore((s) => s.removeLine);

  const subtotal = lines.reduce(
    (sum, l) => sum + l.unitPrice * l.quantity,
    0
  );

  if (lines.length === 0) {
    return (
      <p className="mt-10 text-sm text-[var(--sf-color-muted)]">{t.cart.empty}</p>
    );
  }

  return (
    <ul className="mt-10 divide-y divide-[var(--sf-color-border)]">
      {lines.map((line) => (
        <li key={line.id} className="flex gap-4 py-8">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-[var(--sf-color-surface)] shadow-inner">
            {line.imageUrl ? (
              <Image
                src={line.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="112px"
              />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-[var(--sf-color-primary)]">
              {line.title}
            </p>
            {line.variantSummary ? (
              <p className="mt-1 line-clamp-2 text-sm leading-snug text-[var(--sf-color-muted)]">
                {line.variantSummary}
              </p>
            ) : null}
            <p className="mt-1 text-sm text-[var(--sf-color-muted)]">
              {formatMoney(line.unitPrice, { locale })} {t.cart.each}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-[var(--sf-color-muted)]">
                {t.cart.qty}
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={line.quantity}
                  onChange={(e) =>
                    updateQty(line.id, parseInt(e.target.value, 10) || 1)
                  }
                  className="w-16 rounded-lg border border-[var(--sf-color-border)] px-2 py-1.5 text-sm tabular-nums"
                />
              </label>
              <button
                type="button"
                onClick={() => removeLine(line.id)}
                className="text-sm font-medium text-red-600 transition hover:underline"
              >
                {t.cart.remove}
              </button>
            </div>
          </div>
          <div className="text-end text-sm font-semibold tabular-nums text-[var(--sf-color-primary)]">
            {formatMoney(line.unitPrice * line.quantity, { locale })}
          </div>
        </li>
      ))}
      <li className="flex justify-between py-8 text-base font-semibold text-[var(--sf-color-primary)]">
        <span>{t.cart.subtotal}</span>
        <span className="tabular-nums">{formatMoney(subtotal, { locale })}</span>
      </li>
    </ul>
  );
}
