"use client";

import { useEffect, useRef } from "react";
import { getOrderPaymentStatus } from "@/services/orders.service";
import { OrderPaymentStatus } from "@/types/api/order";
import type { OrderGatewayContext } from "@/types/api/order";

const PAYMENT_STATUS_POLL_INTERVAL_MS = 5000;
const MAX_PAYMENT_STATUS_POLL_ATTEMPTS = 90;

type Props = {
  iframeUrl: string;
  orderId: string;
  gateway: OrderGatewayContext;
  secureHint: string;
  waitingHint: string;
  onPaid: () => void;
  onFailed: () => void;
  onTimeout: () => void;
};

export function CheckoutCardPaymentStep({
  iframeUrl,
  orderId,
  gateway,
  secureHint,
  waitingHint,
  onPaid,
  onFailed,
  onTimeout,
}: Props) {
  const onPaidRef = useRef(onPaid);
  const onFailedRef = useRef(onFailed);
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    onPaidRef.current = onPaid;
    onFailedRef.current = onFailed;
    onTimeoutRef.current = onTimeout;
  }, [onPaid, onFailed, onTimeout]);

  useEffect(() => {
    let cancelled = false;
    let polls = 0;
    const intervalRef: { id: ReturnType<typeof setInterval> | null } = {
      id: null,
    };

    const pollPaymentStatus = async () => {
      polls += 1;
      if (polls > MAX_PAYMENT_STATUS_POLL_ATTEMPTS) {
        if (intervalRef.id !== null) clearInterval(intervalRef.id);
        if (!cancelled) onTimeoutRef.current();
        return;
      }
      try {
        const status = await getOrderPaymentStatus(orderId, gateway);
        if (cancelled) return;
        if (status.paymentStatus === OrderPaymentStatus.Paid) {
          if (intervalRef.id !== null) clearInterval(intervalRef.id);
          onPaidRef.current();
        } else if (status.paymentStatus === OrderPaymentStatus.Failed) {
          if (intervalRef.id !== null) clearInterval(intervalRef.id);
          onFailedRef.current();
        }
      } catch {
        /* keep polling */
      }
    };

    void pollPaymentStatus();
    intervalRef.id = setInterval(
      () => void pollPaymentStatus(),
      PAYMENT_STATUS_POLL_INTERVAL_MS,
    );

    return () => {
      cancelled = true;
      if (intervalRef.id !== null) clearInterval(intervalRef.id);
    };
  }, [orderId, gateway]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--sf-color-muted)]">{secureHint}</p>
      <div className="overflow-hidden rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-white shadow-[var(--sf-shadow-sm)]">
        <iframe
          title="Payment"
          src={iframeUrl}
          className="h-[min(520px,70vh)] w-full border-0"
          allow="payment"
        />
      </div>
      <p className="text-center text-xs text-[var(--sf-color-muted)]">
        {waitingHint}
      </p>
    </div>
  );
}
