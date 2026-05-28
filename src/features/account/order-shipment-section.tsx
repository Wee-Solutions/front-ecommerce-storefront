"use client";

import { Package, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "@/contexts/locale-context";
import {
  formatOrderShipmentAddressLines,
  formatOrderShipmentApartmentLines,
} from "@/lib/order-shipment-display";
import { OrderShipmentStatusStepper } from "@/features/account/order-shipment-status-stepper";
import { shippingMethodLabel } from "@/lib/order-status-labels";
import { OrderShippingMethod } from "@/types/api/order";
import type { CustomerOrderShipment } from "@/types/api/order";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

export function OrderShipmentSection({
  shipment,
}: {
  shipment: CustomerOrderShipment;
}) {
  const t = useTranslations();
  const o = t.orders;
  const a = t.account;

  const isDelivery = shipment.shippingMethod === OrderShippingMethod.Delivery;
  const showAddress = shipment.requiresAddress && isDelivery;
  const addressLines = showAddress
    ? [
        ...formatOrderShipmentAddressLines(shipment),
        ...formatOrderShipmentApartmentLines(shipment, {
          entrance: a.shippingEntrance,
          entranceCode: a.shippingEntranceCode,
          additionalEntranceCode: a.shippingAdditionalEntranceCode,
          apartmentFloor: a.shippingApartmentFloor,
          apartmentNumber: a.shippingApartmentNumber,
          addressNotes: a.shippingAddressNotes,
        }),
      ]
    : [];

  return (
    <section>
      <h3 className="text-sm font-semibold text-foreground">{o.shipmentTitle}</h3>
      <Card className="mt-4 border-border/60">
        <CardContent className="space-y-4 p-5 text-sm">
          <div className="flex items-start gap-3">
            {isDelivery ? (
              <Truck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            ) : (
              <Package className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            )}
            <div className="min-w-0 flex-1 space-y-3">
              <DetailRow
                label={o.shippingMethodLabel}
                value={shippingMethodLabel(shipment.shippingMethod, o)}
              />
              <div className="space-y-2 pt-1">
                <p className="text-muted-foreground">{o.shipmentStatusLabel}</p>
                <OrderShipmentStatusStepper
                  shipmentStatus={shipment.shipmentStatus}
                />
              </div>
            </div>
          </div>

          {showAddress && addressLines.length > 0 ? (
            <div className="border-t border-border/60 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {o.deliveryAddress}
              </p>
              <address className="mt-2 space-y-1 not-italic text-foreground">
                {addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </div>
          ) : null}

          {!isDelivery ? (
            <p className="border-t border-border/60 pt-4 text-muted-foreground">
              {o.shippingPickupHint}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}
