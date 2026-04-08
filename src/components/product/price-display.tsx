"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "@/contexts/locale-context";
import { formatMoney } from "@/lib/format-currency";

export function PriceDisplay({
  price,
  compareAt,
  isVATExcluded,
  className,
  size = "md",
}: {
  price: number | null | undefined;
  compareAt?: number | null;
  isVATExcluded?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const t = useTranslations();
  const locale = useLocale();

  const priceCls =
    size === "lg"
      ? "text-2xl font-semibold md:text-3xl"
      : size === "sm"
        ? "text-base font-semibold"
        : "text-lg font-semibold";

  return (
    <div className={clsx("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span
        className={clsx(
          "tabular-nums tracking-tight text-foreground",
          priceCls
        )}
      >
        {formatMoney(price, { locale })}
      </span>
      {compareAt != null && compareAt > (price ?? 0) && (
        <span className="text-sm text-muted-foreground line-through tabular-nums">
          {formatMoney(compareAt, { locale })}
        </span>
      )}
      {isVATExcluded && (
        <span className="text-xs font-medium text-muted-foreground">
          {t.product.vatExcluded}
        </span>
      )}
    </div>
  );
}
