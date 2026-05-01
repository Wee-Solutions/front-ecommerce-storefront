import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  OrderStatus,
  OrderPaymentStatus,
  PaymentMethod,
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
