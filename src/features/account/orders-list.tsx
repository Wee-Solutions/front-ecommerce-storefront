"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale, useTranslations } from "@/contexts/locale-context";
import { useCustomerSession } from "@/features/auth/customer-session";
import {
  orderStatusLabel,
  orderStatusTone,
  paymentMethodLabel,
  paymentStatusLabel,
} from "@/lib/order-status-labels";
import { formatMoney } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import { searchCustomerOrders } from "@/services/orders.service";

function toneClasses(tone: ReturnType<typeof orderStatusTone>) {
  switch (tone) {
    case "pending":
      return "bg-amber-100 text-amber-950";
    case "success":
      return "bg-emerald-100 text-emerald-950";
    case "danger":
      return "bg-red-100 text-red-950";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function OrdersList() {
  const t = useTranslations();
  const locale = useLocale();
  const { accessToken } = useCustomerSession();

  const ordersQuery = useQuery({
    queryKey: ["customer-orders", accessToken, locale],
    queryFn: async () => {
      if (!accessToken) throw new Error("Not authenticated");
      return searchCustomerOrders({ take: 20, skip: 0 }, accessToken, locale);
    },
    enabled: Boolean(accessToken),
  });

  if (!accessToken) {
    return (
      <Card className="mt-8">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">{t.account.signedOut}</p>
          <Link
            href="/login"
            className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          >
            {t.account.signedOutCta}
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (ordersQuery.isLoading) {
    return (
      <div className="mt-8 rounded-xl border border-border/60 bg-muted/20 px-4 py-6 text-sm text-muted-foreground">
        {t.orders.loading}
      </div>
    );
  }

  const orders = ordersQuery.data?.records ?? [];
  if (orders.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed border-border/70 bg-muted/20 px-6 py-10 text-center text-sm text-muted-foreground">
        {t.orders.empty}
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-3">
      {orders.map((o) => {
        const tone = orderStatusTone(o.orderStatus);
        return (
          <Card key={o.id} className="border-border/60 transition hover:border-primary/25">
            <CardContent className="px-4 py-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      #{o.number}
                    </p>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                        toneClasses(tone),
                      )}
                    >
                      {orderStatusLabel(o.orderStatus, t.orders)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString(locale, {
                      dateStyle: "medium",
                    })}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {paymentMethodLabel(o.paymentMethod, t.orders)}
                    <span className="mx-1.5 text-border">·</span>
                    {paymentStatusLabel(o.paymentStatus, t.orders)}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
                  <div className="text-end">
                    <p className="text-xs text-muted-foreground">
                      {t.orders.total}
                    </p>
                    <p className="text-sm font-semibold tabular-nums text-foreground">
                      {formatMoney(o.totalPriceAfterTax, { locale })}
                    </p>
                  </div>
                  <Link
                    href={`/account/orders/${o.id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {t.orders.viewOrder}
                    <ChevronRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
