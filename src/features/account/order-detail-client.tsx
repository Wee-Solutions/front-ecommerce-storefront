"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
import { getCustomerOrderById } from "@/services/orders.service";
import { cn } from "@/lib/utils";

function interpolateOrderNumber(template: string, orderNumber: number) {
  return template.replace(/\{\{orderNumber\}\}/g, String(orderNumber));
}

function toneClasses(tone: ReturnType<typeof orderStatusTone>) {
  switch (tone) {
    case "pending":
      return "bg-amber-100 text-amber-950 ring-amber-200/80";
    case "success":
      return "bg-emerald-100 text-emerald-950 ring-emerald-200/80";
    case "danger":
      return "bg-red-100 text-red-950 ring-red-200/80";
    default:
      return "bg-muted text-muted-foreground ring-border/60";
  }
}

export function OrderDetailClient({ orderId }: { orderId: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const { accessToken } = useCustomerSession();

  const q = useQuery({
    queryKey: ["customer-order", orderId, accessToken, locale],
    queryFn: () => getCustomerOrderById(orderId, accessToken!, locale),
    enabled: Boolean(accessToken && orderId),
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

  if (q.isLoading) {
    return (
      <div className="mt-8 rounded-xl border border-border/60 bg-muted/20 px-4 py-6 text-sm text-muted-foreground">
        {t.orders.loading}
      </div>
    );
  }

  if (q.isError) {
    return (
      <div className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-6 text-sm text-destructive">
        {t.orders.loadError}
      </div>
    );
  }

  const order = q.data;
  if (!order) {
    return (
      <p className="mt-8 text-sm text-muted-foreground">{t.orders.notFound}</p>
    );
  }

  const statusTone = orderStatusTone(order.orderStatus);

  return (
    <div className="mt-8 space-y-8">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {t.orders.backToOrders}
      </Link>

      <div className="flex flex-col gap-4 border-b border-border/60 pb-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {interpolateOrderNumber(t.orders.orderDetailTitle, order.number)}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.orders.orderDetailSubtitle}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {t.orders.placedOn}{" "}
            {new Date(order.createdAt).toLocaleString(locale)}
            {" · "}
            {t.orders.lastUpdated}{" "}
            {new Date(order.updatedAt).toLocaleString(locale)}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span
            className={cn(
              "inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1",
              toneClasses(statusTone),
            )}
          >
            {orderStatusLabel(order.orderStatus, t.orders)}
          </span>
          <div className="text-right text-xs text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">
                {t.orders.payment}
              </span>
              {": "}
              {paymentMethodLabel(order.paymentMethod, t.orders)}
            </p>
            <p>
              <span className="font-medium text-foreground">
                {t.orders.paymentStatus}
              </span>
              {": "}
              {paymentStatusLabel(order.paymentStatus, t.orders)}
            </p>
          </div>
        </div>
      </div>

      <section>
        <h3 className="text-sm font-semibold text-foreground">
          {t.orders.items}
        </h3>
        <ul className="mt-4 space-y-4">
          {order.products.map((p) => (
            <li
              key={p.id}
              className="flex gap-4 rounded-xl border border-border/60 bg-card/40 p-3"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                {p.mainImage ? (
                  <Image
                    src={p.mainImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{p.title}</p>
                {p.properties.length > 0 ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {p.properties
                      .map((x) => `${x.propertyName}: ${x.propertyValueName}`)
                      .join(" · ")}
                  </p>
                ) : null}
                <p className="mt-2 text-xs text-muted-foreground">
                  {t.orders.quantityShort}: {p.quantity} ·{" "}
                  {formatMoney(p.price, { locale })}{" "}
                  {t.orders.lineTotal}:{" "}
                  {formatMoney(p.totalPriceAfterTax, { locale })}
                </p>
                {p.customerNotes ? (
                  <p className="mt-1 text-xs italic text-muted-foreground">
                    {p.customerNotes}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Card className="border-border/60">
        <CardContent className="space-y-2 p-5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>{t.orders.subtotalBeforeTax}</span>
            <span className="tabular-nums font-medium text-foreground">
              {formatMoney(order.totalPriceBeforeTax, { locale })}
            </span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>
              {t.orders.tax} ({order.taxRatePercentage.toFixed(0)}%)
            </span>
            <span className="tabular-nums font-medium text-foreground">
              {formatMoney(order.totalTaxAmount, { locale })}
            </span>
          </div>
          {order.discountAmount > 0 ? (
            <div className="flex justify-between text-emerald-700">
              <span>{t.orders.discount}</span>
              <span className="tabular-nums font-medium">
                −{formatMoney(order.discountAmount, { locale })}
              </span>
            </div>
          ) : null}
          <div className="flex justify-between border-t border-border/60 pt-2 font-semibold text-foreground">
            <span>{t.orders.total}</span>
            <span className="tabular-nums">
              {formatMoney(order.totalPriceAfterTax, { locale })}
            </span>
          </div>
        </CardContent>
      </Card>

      {order.customerNotes?.trim() ? (
        <section className="rounded-xl border border-border/60 bg-muted/20 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t.orders.customerNotes}
          </h3>
          <p className="mt-2 text-sm text-foreground">{order.customerNotes}</p>
        </section>
      ) : null}
    </div>
  );
}
