"use client";

import { useLocale, useTranslations } from "@/contexts/locale-context";
import { CheckoutCardPaymentStep } from "@/features/checkout/checkout-card-payment-step";
import { sumCartLinesSubtotal } from "@/features/checkout/checkout-order-builders";
import { useCheckoutFlow } from "@/features/checkout/use-checkout-flow";
import { useCartStore } from "@/features/cart/cart-store";
import { formatMoney } from "@/lib/format-currency";
import { getOrCreateGuestIdentifier } from "@/lib/guest-identifier";
import { PaymentMethod } from "@/types/api/order";

export function CheckoutForm() {
  const t = useTranslations();
  const locale = useLocale();
  const lines = useCartStore((s) => s.lines);
  const clearCart = useCartStore((s) => s.clear);

  const checkout = useCheckoutFlow({
    locale,
    clearCart,
    labels: {
      errorGeneric: t.checkout.errorGeneric,
      cardUnavailable: t.checkout.cardUnavailable,
      paymentFailed: t.checkout.paymentFailed,
      paymentTimeout: t.checkout.paymentTimeout,
      successPaid: t.checkout.successPaid,
      successPlaced: t.checkout.successPlaced,
    },
  });

  const subtotal = sumCartLinesSubtotal(lines);

  if (lines.length === 0 && checkout.step.name === "details") {
    return (
      <div className="mt-10 space-y-4">
        {checkout.errorMessage ? (
          <p
            className="rounded-[var(--sf-radius)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            {checkout.errorMessage}
          </p>
        ) : null}
        <p className="text-sm text-[var(--sf-color-muted)]">
          {t.checkout.empty}
        </p>
      </div>
    );
  }

  if (checkout.step.name === "confirmation" && checkout.confirmationBannerText) {
    return (
      <div className="mt-10 space-y-4">
        {checkout.errorMessage ? (
          <p
            className="rounded-[var(--sf-radius)] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
            role="status"
          >
            {checkout.errorMessage}
          </p>
        ) : null}
        <p className="rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-[var(--sf-color-surface)] p-5 text-sm leading-relaxed text-[var(--sf-color-primary)]">
          {checkout.confirmationBannerText}
        </p>
      </div>
    );
  }

  if (checkout.step.name === "embedded_payment") {
    return (
      <div className="mt-10 space-y-6">
        <CheckoutCardPaymentStep
          iframeUrl={checkout.step.paymentFrameUrl}
          orderId={checkout.step.orderId}
          language={locale}
          accessToken={checkout.accessToken}
          guestIdentifier={
            checkout.accessToken ? null : getOrCreateGuestIdentifier()
          }
          secureHint={t.checkout.paySecure}
          waitingHint={t.checkout.payWaiting}
          onPaid={checkout.onEmbeddedPaymentSucceeded}
          onFailed={checkout.onEmbeddedPaymentFailed}
          onTimeout={checkout.onEmbeddedPaymentTimedOut}
        />
      </div>
    );
  }

  return (
    <form
      className="mt-10 space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        void checkout.submitDetailsStep(new FormData(e.currentTarget), lines);
      }}
    >
      {checkout.errorMessage ? (
        <p
          className="rounded-[var(--sf-radius)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {checkout.errorMessage}
        </p>
      ) : null}
      <fieldset className="space-y-4 rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-white p-5 shadow-[var(--sf-shadow-sm)]">
        <legend className="px-1 text-sm font-semibold text-[var(--sf-color-primary)]">
          {t.checkout.contact}
        </legend>
        <div>
          <label className="block text-xs font-medium text-[var(--sf-color-muted)]">
            {t.checkout.email}
          </label>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-[var(--sf-color-border)] px-3 py-2.5 text-sm transition focus:border-[var(--sf-color-accent)]/40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--sf-color-muted)]">
            {t.checkout.phone}
          </label>
          <input
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            className="mt-1.5 w-full rounded-xl border border-[var(--sf-color-border)] px-3 py-2.5 text-sm transition focus:border-[var(--sf-color-accent)]/40"
          />
        </div>
      </fieldset>
      <fieldset className="space-y-4 rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-white p-5 shadow-[var(--sf-shadow-sm)]">
        <legend className="px-1 text-sm font-semibold text-[var(--sf-color-primary)]">
          {t.checkout.shipping}
        </legend>
        <div>
          <label className="block text-xs font-medium text-[var(--sf-color-muted)]">
            {t.checkout.fullName}
          </label>
          <input
            required
            name="name"
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-[var(--sf-color-border)] px-3 py-2.5 text-sm transition focus:border-[var(--sf-color-accent)]/40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--sf-color-muted)]">
            {t.checkout.address}
          </label>
          <input
            required
            name="address"
            autoComplete="street-address"
            className="mt-1.5 w-full rounded-xl border border-[var(--sf-color-border)] px-3 py-2.5 text-sm transition focus:border-[var(--sf-color-accent)]/40"
          />
        </div>
      </fieldset>
      <fieldset className="space-y-3 rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-white p-5 shadow-[var(--sf-shadow-sm)]">
        <legend className="px-1 text-sm font-semibold text-[var(--sf-color-primary)]">
          {t.checkout.paymentMethod}
        </legend>
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="radio"
            name="paymentMethod"
            value={PaymentMethod.CreditCard}
            defaultChecked
            className="size-4 accent-[var(--sf-color-primary)]"
          />
          {t.checkout.paymentCard}
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="radio"
            name="paymentMethod"
            value={PaymentMethod.Cash}
            className="size-4 accent-[var(--sf-color-primary)]"
          />
          {t.checkout.paymentCash}
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="radio"
            name="paymentMethod"
            value={PaymentMethod.BankTransfer}
            className="size-4 accent-[var(--sf-color-primary)]"
          />
          {t.checkout.paymentBank}
        </label>
      </fieldset>
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--sf-color-muted)]">
          {t.checkout.subtotal}
        </span>
        <span className="font-semibold tabular-nums text-[var(--sf-color-primary)]">
          {formatMoney(subtotal, { locale })}
        </span>
      </div>
      <button
        type="submit"
        disabled={checkout.isSubmitting || lines.length === 0}
        className="w-full rounded-full bg-[var(--sf-color-primary)] py-3.5 text-sm font-semibold text-[var(--sf-color-primary-fg)] shadow-md transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
      >
        {checkout.isSubmitting ? t.checkout.submitting : t.checkout.placeOrder}
      </button>
    </form>
  );
}
