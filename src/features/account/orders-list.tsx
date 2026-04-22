"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale, useTranslations } from "@/contexts/locale-context";
import { useCustomerSession } from "@/features/auth/customer-session";
import { formatMoney } from "@/lib/format-currency";
import { searchCustomerOrders } from "@/services/orders.service";

export function OrdersList() {
  const t = useTranslations();
  function statusLabel(status: number): string {
    switch (status) {
      case 1:
        return t.orders.statusPending;
      case 2:
        return t.orders.statusApproved;
      case 3:
        return t.orders.statusReady;
      case 4:
        return t.orders.statusDelivered;
      case 5:
        return t.orders.statusCancelled;
      default:
        return `${t.orders.statusUnknown} ${status}`;
    }
  }

  const locale = useLocale();
  const { accessToken } = useCustomerSession();

  const ordersQuery = useQuery({
    queryKey: ["customer-orders", accessToken],
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
          <Link href="/login" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
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
      {orders.map((o) => (
        <Card key={o.id} className="border-border/60">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
            <div>
              <p className="text-sm font-semibold text-foreground">#{o.number}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(o.createdAt).toLocaleDateString(locale)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{t.orders.status}</p>
              <p className="text-sm font-medium">{statusLabel(o.orderStatus)}</p>
            </div>
            <div className="text-end">
              <p className="text-xs text-muted-foreground">{t.orders.total}</p>
              <p className="text-sm font-semibold tabular-nums">
                {formatMoney(o.totalPriceAfterTax, { locale })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

