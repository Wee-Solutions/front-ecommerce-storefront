"use client";

import { useTranslations, useLocale } from "@/contexts/locale-context";
import { formatMoney } from "@/lib/format-currency";
import type { CheckoutOrderResponse } from "@/types/api/order";

type Props = {
  pricing: CheckoutOrderResponse | undefined;
  isLoading: boolean;
  hasError: boolean;
};

export function CheckoutPricingSummary({ pricing, isLoading, hasError }: Props) {
  const t = useTranslations();
  const locale = useLocale();

  if (hasError) {
    return (
      <p className="text-sm text-red-600" role="alert">
        {t.checkout.pricingLoadError}
      </p>
    );
  }

  if (isLoading && !pricing) {
    return (
      <p className="text-sm text-[var(--sf-color-muted)]">{t.checkout.loadingTotals}</p>
    );
  }

  if (!pricing) return null;

  const hasSavings = pricing.totalSaved > 0;

  return (
    <div className="space-y-2 text-sm">
      <div
        className={`flex justify-between ${
          hasSavings
            ? "text-[var(--sf-color-muted)]"
            : "font-semibold text-[var(--sf-color-primary)]"
        }`}
      >
        <span>{t.checkout.totalInclTax}</span>
        <span
          className={`tabular-nums ${
            hasSavings
              ? "font-medium line-through decoration-[var(--sf-color-muted)]"
              : ""
          }`}
        >
          {formatMoney(pricing.totalPriceAfterTax, { locale })}
        </span>
      </div>
      {hasSavings ? (
        <div className="flex justify-between text-emerald-700">
          <span>{t.checkout.totalSaved}</span>
          <span className="tabular-nums font-medium">
            −{formatMoney(pricing.totalSaved, { locale })}
          </span>
        </div>
      ) : null}
      {hasSavings ? (
        <div className="flex justify-between border-t border-[var(--sf-color-border)] pt-2 font-semibold text-[var(--sf-color-primary)]">
          <span>{t.checkout.finalTotal}</span>
          <span className="tabular-nums">
            {formatMoney(pricing.finalPrice, { locale })}
          </span>
        </div>
      ) : null}
    </div>
  );
}
