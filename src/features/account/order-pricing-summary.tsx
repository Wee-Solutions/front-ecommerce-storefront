"use client";

import { useLocale, useTranslations } from "@/contexts/locale-context";
import { formatMoney } from "@/lib/format-currency";
import type { CustomerOrderDetail } from "@/types/api/order";

type Props = {
  order: Pick<
    CustomerOrderDetail,
    "productsTotalPriceAfterTax" | "totalSaved" | "finalPrice" | "shipment"
  >;
};

export function OrderPricingSummary({ order }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const o = t.orders;

  const shippingFinalPrice = order.shipment?.finalPrice ?? 0;
  const hasSavings = order.totalSaved > 0;

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
      {hasSavings ? (
        <div className="flex justify-between text-emerald-700">
          <span>{o.totalSaved}</span>
          <span className="tabular-nums font-medium">
            −{formatMoney(order.totalSaved, { locale })}
          </span>
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
