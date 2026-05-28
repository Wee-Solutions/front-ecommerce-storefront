import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  OrderShipmentStatus,
  OrderShippingMethod,
  OrderStatus,
  OrderPaymentStatus,
  PaymentMethod,
  SHIPMENT_PROGRESS_STATUSES,
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

/** Mirrors backend `OrderShipmentStatus` when known; extend as API documents values. */
export function shipmentStatusLabel(status: number, o: OrdersDict): string {
  switch (status) {
    case OrderShipmentStatus.Pending:
      return o.shipmentStatusPending;
    case OrderShipmentStatus.InTransit:
      return o.shipmentStatusInTransit;
    case OrderShipmentStatus.Delivered:
      return o.shipmentStatusDelivered;
    case OrderShipmentStatus.Cancelled:
      return o.shipmentStatusCancelled;
    default:
      return `${o.shipmentStatusUnknown} (${status})`;
  }
}

export function shipmentProgressStepLabels(o: OrdersDict): string[] {
  return SHIPMENT_PROGRESS_STATUSES.map((value) => shipmentStatusLabel(value, o));
}

/** Index into `SHIPMENT_PROGRESS_STATUSES`, or -1 when cancelled / unknown. */
export function shipmentProgressStepIndex(status: number): number {
  if (status === OrderShipmentStatus.Cancelled) return -1;
  const idx = SHIPMENT_PROGRESS_STATUSES.indexOf(
    status as (typeof SHIPMENT_PROGRESS_STATUSES)[number],
  );
  if (idx >= 0) return idx;
  if (status > OrderShipmentStatus.Delivered) return -1;
  return 0;
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
