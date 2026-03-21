"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "@/contexts/locale-context";
import { formatMoney } from "@/lib/format-currency";

export function PriceDisplay({
  price,
  compareAt,
  isVATExcluded,
  className,
}: {
  price: number | null | undefined;
  compareAt?: number | null;
  isVATExcluded?: boolean;
  className?: string;
}) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className={clsx("flex flex-wrap items-baseline gap-2", className)}>
      <span className="text-lg font-semibold tabular-nums tracking-tight text-[var(--sf-color-primary)]">
        {formatMoney(price, { locale })}
      </span>
      {compareAt != null && compareAt > (price ?? 0) && (
        <span className="text-sm text-[var(--sf-color-muted)] line-through tabular-nums">
          {formatMoney(compareAt, { locale })}
        </span>
      )}
      {isVATExcluded && (
        <span className="text-xs font-medium text-[var(--sf-color-muted)]">
          {t.product.vatExcluded}
        </span>
      )}
    </div>
  );
}
