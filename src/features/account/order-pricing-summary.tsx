"use client";

import { Badge } from "@/components/ui/badge";
import { useLocale, useTranslations } from "@/contexts/locale-context";
import { formatMoney } from "@/lib/format-currency";
import type { CustomerOrderDetail } from "@/types/api/order";

type Props = {
  order: Pick<
    CustomerOrderDetail,
    "productsTotalPriceAfterTax" | "totalSaved" | "finalPrice" | "shipment"
  >;
  couponCode?: string | null;
};

export function OrderPricingSummary({ order, couponCode }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const o = t.orders;

  const shippingFinalPrice = order.shipment?.finalPrice ?? 0;
  const hasSavings = order.totalSaved > 0;
  const showSavingsRow = hasSavings || Boolean(couponCode);

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-muted-foreground">
        <span>{o.productsTotalAfterTax}</span>
        <span className="tabular-nums font-medium text-foreground">
          {formatMoney(order.productsTotalPriceAfterTax, { locale })}
        </span>
      </div>
      <div className="flex justify-between text-muted-foreground">
        <span>{o.shippingCost}</span>
        <span className="tabular-nums font-medium text-foreground">
          {formatMoney(shippingFinalPrice, { locale })}
        </span>
      </div>
      {showSavingsRow ? (
        <div className="flex items-start justify-between gap-2 text-emerald-700">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span>{o.totalSaved}</span>
            {couponCode ? (
              <Badge
                variant="secondary"
                className="border-emerald-200/80 bg-emerald-50 font-semibold tracking-wide text-emerald-950 uppercase"
              >
                {o.couponUsed}: {couponCode}
              </Badge>
            ) : null}
          </div>
          {hasSavings ? (
            <span className="shrink-0 tabular-nums font-medium">
              −{formatMoney(order.totalSaved, { locale })}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="flex justify-between border-t border-border/60 pt-2 font-semibold text-foreground">
        <span>{o.finalTotal}</span>
        <span className="tabular-nums">
          {formatMoney(order.finalPrice, { locale })}
        </span>
      </div>
    </div>
  );
}
