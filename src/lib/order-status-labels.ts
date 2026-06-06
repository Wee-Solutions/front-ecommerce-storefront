import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  OrderShipmentStatus,
  OrderShippingMethod,
  OrderStatus,
  OrderPaymentStatus,
  PaymentMethod,
  getShipmentProgressStatuses,
} from "@/types/api/order";

type OrdersDict = Dictionary["orders"];

export function orderStatusLabel(status: number, o: OrdersDict): string {
  switch (status) {
    case OrderStatus.Pending:
      return o.orderStatusPending;
    case OrderStatus.Confirmed:
      return o.orderStatusConfirmed;
    case OrderStatus.Cancelled:
      return o.orderStatusCancelled;
    case OrderStatus.Done:
      return o.orderStatusDone;
    default:
      return `${o.statusUnknown} (${status})`;
  }
}

export function paymentStatusLabel(status: number, o: OrdersDict): string {
  switch (status) {
    case OrderPaymentStatus.Unpaid:
      return o.paymentStatusUnpaid;
    case OrderPaymentStatus.Paid:
      return o.paymentStatusPaid;
    case OrderPaymentStatus.Failed:
      return o.paymentStatusFailed;
    case OrderPaymentStatus.CreditJ5:
      return o.paymentStatusCreditJ5;
    default:
      return `${o.paymentStatusUnknown} (${status})`;
  }
}

export function paymentMethodLabel(method: number, o: OrdersDict): string {
  switch (method) {
    case PaymentMethod.Cash:
      return o.paymentMethodCash;
    case PaymentMethod.CreditCard:
      return o.paymentMethodCard;
    case PaymentMethod.BankTransfer:
      return o.paymentMethodBank;
    default:
      return `${o.paymentMethodUnknown} (${method})`;
  }
}

export function shippingMethodLabel(method: number, o: OrdersDict): string {
  switch (method) {
    case OrderShippingMethod.Delivery:
      return o.shippingDelivery;
    case OrderShippingMethod.Pickup:
      return o.shippingPickup;
    default:
      return `${o.shippingMethodUnknown} (${method})`;
  }
}

/** Mirrors backend `OrderShipmentStatus`. */
export function shipmentStatusLabel(status: number, o: OrdersDict): string {
  switch (status) {
    case OrderShipmentStatus.Pending:
      return o.shipmentStatusPending;
    case OrderShipmentStatus.Prepared:
      return o.shipmentStatusPrepared;
    case OrderShipmentStatus.ReadyForPickup:
      return o.shipmentStatusReadyForPickup;
    case OrderShipmentStatus.OutForDelivery:
      return o.shipmentStatusOutForDelivery;
    case OrderShipmentStatus.Delivered:
      return o.shipmentStatusDelivered;
    default:
      return `${o.shipmentStatusUnknown} (${status})`;
  }
}

export function shipmentProgressStepLabels(
  shippingMethod: number,
  o: OrdersDict,
): string[] {
  return getShipmentProgressStatuses(shippingMethod).map((value) =>
    shipmentStatusLabel(value, o),
  );
}

/** Index into the method-specific progress steps, or -1 when unknown. */
export function shipmentProgressStepIndex(
  status: number,
  shippingMethod: number,
): number {
  const steps = getShipmentProgressStatuses(shippingMethod);
  const idx = steps.indexOf(status as (typeof steps)[number]);
  if (idx >= 0) return idx;
  if (status > OrderShipmentStatus.Delivered) {
    return steps.length - 1;
  }
  for (let i = steps.length - 1; i >= 0; i--) {
    if (status >= steps[i]) return i;
  }
  return -1;
}

export function orderStatusTone(
  status: number,
): "pending" | "success" | "danger" | "neutral" {
  switch (status) {
    case OrderStatus.Pending:
      return "pending";
    case OrderStatus.Confirmed:
    case OrderStatus.Done:
      return "success";
    case OrderStatus.Cancelled:
      return "danger";
    default:
      return "neutral";
  }
}
