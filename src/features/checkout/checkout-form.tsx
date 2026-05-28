"use client";

import { useQuery } from "@tanstack/react-query";
import { Banknote, Building2, CreditCard, Package, Truck } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "@/contexts/locale-context";
import { useCustomerSession } from "@/features/auth/customer-session";
import { BankTransferPanel } from "@/features/checkout/bank-transfer-panel";
import { CheckoutCardPaymentStep } from "@/features/checkout/checkout-card-payment-step";
import { filterSupportedPaymentMethods } from "@/features/checkout/checkout-order-builders";
import { CheckoutPricingSummary } from "@/features/checkout/checkout-pricing-summary";
import { useCheckoutFlow } from "@/features/checkout/use-checkout-flow";
import { useCheckoutPricing } from "@/features/checkout/use-checkout-pricing";
import { useCart } from "@/features/cart/use-cart";
import { useStoreConfiguration } from "@/features/store-configuration/store-configuration-store";
import { formatMoney } from "@/lib/format-currency";
import { getCustomerShipmentInfos } from "@/services/customers.service";
import { authenticatedOrderContext } from "@/features/checkout/order-gateway-context";
import {
  OrderShippingMethod,
  PaymentMethod,
  type PaymentMethodValue,
} from "@/types/api/order";
import type { ShipmentInfo } from "@/types/api/customer";
import type { StorefrontOrderSubmission } from "./checkout-flow.types";

function shipmentSummaryLine(s: ShipmentInfo): string {
  const parts = [s.street, s.streetNumber, s.cityDescription, s.zipCode].filter(
    Boolean,
  );
  return parts.join(", ");
}

function PaymentMethodIcon({ method }: { method: PaymentMethodValue }) {
  const className = "size-6 shrink-0";
  if (method === PaymentMethod.CreditCard) {
    return <CreditCard className={className} aria-hidden />;
  }
  if (method === PaymentMethod.BankTransfer) {
    return <Building2 className={className} aria-hidden />;
  }
  return <Banknote className={className} aria-hidden />;
}

export function CheckoutForm() {
  const t = useTranslations();
  const locale = useLocale();
  const { lines, clear: clearCart } = useCart();
  const accessToken = useCustomerSession((s) => s.accessToken);
  const storeConfig = useStoreConfiguration((s) => s.config);

  const supportedPaymentMethods = useMemo(() => {
    const raw = storeConfig?.supportedPaymentMethods;
    if (raw?.length) {
      const filtered = filterSupportedPaymentMethods(raw);
      if (filtered.length > 0) return filtered;
    }
    return filterSupportedPaymentMethods([
      PaymentMethod.Cash,
      PaymentMethod.CreditCard,
      PaymentMethod.BankTransfer,
    ]);
  }, [storeConfig?.supportedPaymentMethods]);

  const [shippingMethod, setShippingMethod] = useState<
    (typeof OrderShippingMethod)[keyof typeof OrderShippingMethod]
  >(OrderShippingMethod.Delivery);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodValue>(
    PaymentMethod.CreditCard,
  );
  const [shippingAddressId, setShippingAddressId] = useState<string | null>(
    null,
  );
  const [orderNotes, setOrderNotes] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(
    null,
  );
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponBusy, setCouponBusy] = useState(false);

  useEffect(() => {
    const first = supportedPaymentMethods[0];
    if (first !== undefined) setPaymentMethod(first);
  }, [supportedPaymentMethods]);

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
      loginRequired: t.checkout.loginRequired,
    },
  });

  const { data: shipmentData, isLoading: shipmentsLoading } = useQuery({
    queryKey: ["checkout-shipments", locale, accessToken],
    queryFn: () => getCustomerShipmentInfos(accessToken!, locale),
    enabled: Boolean(accessToken),
  });

  const activeShipments = useMemo(
    () => (shipmentData?.records ?? []).filter((r) => r.isActive !== false),
    [shipmentData?.records],
  );

  useEffect(() => {
    if (shippingMethod !== OrderShippingMethod.Delivery) return;
    if (shippingAddressId) return;
    const def = activeShipments.find((s) => s.isDefault) ?? activeShipments[0];
    if (def) setShippingAddressId(def.id);
  }, [activeShipments, shippingAddressId, shippingMethod]);

  const { pricingQuery, refreshPricing, shippingReady } = useCheckoutPricing({
    cartLines: lines,
    accessToken,
    locale,
    appliedCouponCode,
    shippingMethod,
    shippingAddressId,
  });

  const pricing = pricingQuery.data;
  const isPricingBusy =
    !shippingReady ||
    pricingQuery.isLoading ||
    pricingQuery.isFetching ||
    couponBusy;

  const orderGateway = useMemo(() => {
    if (!accessToken) return null;
    return authenticatedOrderContext(locale, accessToken);
  }, [accessToken, locale]);

  const applyCouponCode = useCallback(async () => {
    const code = couponInput.trim();
    if (!code || !accessToken) return;
    setCouponError(null);
    setCouponBusy(true);
    try {
      const result = await refreshPricing(code);
      if (result.totalSaved <= 0) {
        setCouponError(t.checkout.couponInvalid);
        return;
      }
      setAppliedCouponCode(code);
      setCouponInput(code);
    } catch {
      setAppliedCouponCode(null);
      setCouponError(t.checkout.couponInvalid);
    } finally {
      setCouponBusy(false);
    }
  }, [accessToken, couponInput, refreshPricing, t.checkout.couponInvalid]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    if (shippingMethod === OrderShippingMethod.Delivery && !shippingAddressId) {
      checkout.setErrorMessage(t.checkout.noSavedAddresses);
      return;
    }

    const submission: StorefrontOrderSubmission = {
      paymentMethod,
      shippingMethod,
      shippingAddressId:
        shippingMethod === OrderShippingMethod.Delivery
          ? shippingAddressId
          : null,
      customerNotes: orderNotes.trim() || null,
      couponCode: appliedCouponCode,
    };

    void checkout.submitDetailsStep(submission, lines);
  };

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

  if (
    checkout.step.name === "confirmation" &&
    checkout.confirmationBannerText
  ) {
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

  if (checkout.step.name === "embedded_payment" && orderGateway) {
    return (
      <div className="mt-10 space-y-6">
        <CheckoutCardPaymentStep
          iframeUrl={checkout.step.paymentFrameUrl}
          orderId={checkout.step.orderId}
          gateway={orderGateway}
          secureHint={t.checkout.paySecure}
          waitingHint={t.checkout.payWaiting}
          onPaid={checkout.onEmbeddedPaymentSucceeded}
          onFailed={checkout.onEmbeddedPaymentFailed}
          onTimeout={checkout.onEmbeddedPaymentTimedOut}
        />
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div className="mt-10 rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-[var(--sf-color-surface)] p-8 text-center shadow-[var(--sf-shadow-sm)]">
        <p className="text-sm text-[var(--sf-color-primary)]">
          {t.checkout.loginRequired}
        </p>
        <Link
          href="/login"
          className="mt-4 inline-flex rounded-full bg-[var(--sf-color-primary)] px-6 py-3 text-sm font-semibold text-[var(--sf-color-primary-fg)] shadow-md transition hover:brightness-110"
        >
          {t.checkout.loginCta}
        </Link>
      </div>
    );
  }

  const showBankInfo =
    paymentMethod === PaymentMethod.BankTransfer &&
    storeConfig?.bankInfo != null;

  return (
    <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
      {checkout.errorMessage ? (
        <p
          className="rounded-[var(--sf-radius)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {checkout.errorMessage}
        </p>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-[var(--sf-color-primary)]">
          {t.checkout.shippingMethodTitle}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setShippingMethod(OrderShippingMethod.Delivery)}
            className={`flex flex-col items-start gap-2 rounded-[var(--sf-radius)] border p-4 text-left transition ${
              shippingMethod === OrderShippingMethod.Delivery
                ? "border-[var(--sf-color-primary)] bg-white shadow-[var(--sf-shadow-sm)] ring-2 ring-[var(--sf-color-primary)]/20"
                : "border-[var(--sf-color-border)] bg-white hover:border-[var(--sf-color-accent)]/30"
            }`}
          >
            <Truck className="size-6 text-[var(--sf-color-primary)]" />
            <span className="font-medium text-[var(--sf-color-primary)]">
              {t.checkout.shippingDelivery}
            </span>
            <span className="text-xs text-[var(--sf-color-muted)]">
              {t.checkout.shippingDeliveryHint}
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              setShippingMethod(OrderShippingMethod.Pickup);
            }}
            className={`flex flex-col items-start gap-2 rounded-[var(--sf-radius)] border p-4 text-left transition ${
              shippingMethod === OrderShippingMethod.Pickup
                ? "border-[var(--sf-color-primary)] bg-white shadow-[var(--sf-shadow-sm)] ring-2 ring-[var(--sf-color-primary)]/20"
                : "border-[var(--sf-color-border)] bg-white hover:border-[var(--sf-color-accent)]/30"
            }`}
          >
            <Package className="size-6 text-[var(--sf-color-primary)]" />
            <span className="font-medium text-[var(--sf-color-primary)]">
              {t.checkout.shippingPickup}
            </span>
            <span className="text-xs text-[var(--sf-color-muted)]">
              {t.checkout.shippingPickupHint}
            </span>
          </button>
        </div>
      </section>

      {shippingMethod === OrderShippingMethod.Delivery ? (
        <section className="space-y-3 rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-white p-5 shadow-[var(--sf-shadow-sm)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[var(--sf-color-primary)]">
              {t.checkout.deliveryAddress}
            </h2>
            <Link
              href="/account/shipping"
              className="text-xs font-medium text-[var(--sf-color-accent)] underline-offset-2 hover:underline"
            >
              {t.checkout.manageAddresses}
            </Link>
          </div>
          {shipmentsLoading ? (
            <p className="text-sm text-[var(--sf-color-muted)]">…</p>
          ) : activeShipments.length === 0 ? (
            <p className="text-sm text-[var(--sf-color-muted)]">
              {t.checkout.noSavedAddresses}
            </p>
          ) : (
            <ul className="space-y-2">
              {activeShipments.map((s) => (
                <li key={s.id}>
                  <label className="flex cursor-pointer gap-3 rounded-xl border border-[var(--sf-color-border)] p-3 transition has-[:checked]:border-[var(--sf-color-primary)] has-[:checked]:ring-2 has-[:checked]:ring-[var(--sf-color-primary)]/15">
                    <input
                      type="radio"
                      name="shippingAddressId"
                      value={s.id}
                      checked={shippingAddressId === s.id}
                      onChange={() => setShippingAddressId(s.id)}
                      className="mt-1 size-4 accent-[var(--sf-color-primary)]"
                    />
                    <span className="min-w-0 flex-1 text-sm">
                      <span className="font-medium text-[var(--sf-color-primary)]">
                        {shipmentSummaryLine(s)}
                      </span>
                      {s.isDefault ? (
                        <span className="ms-2 rounded-full bg-[var(--sf-color-surface)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--sf-color-muted)]">
                          {t.checkout.defaultAddressTag}
                        </span>
                      ) : null}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-[var(--sf-color-primary)]">
          {t.checkout.paymentMethod}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {supportedPaymentMethods.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPaymentMethod(m)}
              className={`flex flex-col items-center gap-2 rounded-[var(--sf-radius)] border px-3 py-4 text-center transition ${
                paymentMethod === m
                  ? "border-[var(--sf-color-primary)] bg-white shadow-[var(--sf-shadow-sm)] ring-2 ring-[var(--sf-color-primary)]/20"
                  : "border-[var(--sf-color-border)] bg-white hover:border-[var(--sf-color-accent)]/30"
              }`}
            >
              <PaymentMethodIcon method={m} />
              <span className="text-xs font-medium text-[var(--sf-color-primary)]">
                {m === PaymentMethod.CreditCard
                  ? t.checkout.paymentCard
                  : m === PaymentMethod.BankTransfer
                    ? t.checkout.paymentBank
                    : t.checkout.paymentCash}
              </span>
            </button>
          ))}
        </div>
        {showBankInfo ? (
          <BankTransferPanel
            bank={storeConfig!.bankInfo!}
            labels={{
              panelTitle: t.checkout.bankTransferPanelTitle,
              panelHint: t.checkout.bankTransferPanelHint,
              referenceHint: t.checkout.bankTransferReferenceHint,
              bankName: t.checkout.bankName,
              bankBranch: t.checkout.bankBranch,
              bankAccount: t.checkout.bankAccount,
              bankAccountOwner: t.checkout.bankAccountOwner,
              bankIban: t.checkout.bankIban,
              copy: t.checkout.bankCopy,
              copied: t.checkout.bankCopied,
            }}
          />
        ) : null}
      </section>

      <section className="rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-white p-5 shadow-[var(--sf-shadow-sm)]">
        <h2 className="text-sm font-semibold text-[var(--sf-color-primary)]">
          {t.checkout.coupon}
        </h2>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={couponInput}
            onChange={(e) => {
              setCouponInput(e.target.value);
              setCouponError(null);
            }}
            placeholder={t.checkout.couponPlaceholder}
            className="min-h-11 flex-1 rounded-xl border border-[var(--sf-color-border)] px-3 py-2 text-sm"
            autoComplete="off"
          />
          <button
            type="button"
            disabled={couponBusy || !couponInput.trim()}
            onClick={() => void applyCouponCode()}
            className="rounded-full bg-[var(--sf-color-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--sf-color-primary)] ring-1 ring-[var(--sf-color-border)] transition hover:bg-[var(--sf-color-border)]/30 disabled:opacity-50"
          >
            {couponBusy ? t.checkout.validatingCoupon : t.checkout.applyCoupon}
          </button>
        </div>
        {couponError ? (
          <p className="mt-2 text-xs text-red-600">{couponError}</p>
        ) : null}
        {appliedCouponCode && pricing && pricing.totalSaved > 0 ? (
          <p className="mt-2 text-xs font-medium text-emerald-700">
            {t.checkout.couponApplied}: {appliedCouponCode} (−
            {formatMoney(pricing.totalSaved, { locale })})
          </p>
        ) : null}
      </section>

      <section>
        <label className="block text-sm font-semibold text-[var(--sf-color-primary)]">
          {t.checkout.orderNotes}
        </label>
        <textarea
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          name="customerNotes"
          rows={3}
          placeholder={t.checkout.orderNotesPlaceholder}
          className="mt-2 w-full rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] px-3 py-2.5 text-sm"
        />
      </section>

      <div className="rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-white p-5 shadow-[var(--sf-shadow-sm)]">
        <CheckoutPricingSummary
          pricing={pricing}
          isLoading={isPricingBusy}
          hasError={pricingQuery.isError}
        />
      </div>

      <button
        type="submit"
        disabled={
          checkout.isSubmitting ||
          lines.length === 0 ||
          isPricingBusy ||
          pricingQuery.isError ||
          !pricing ||
          (shippingMethod === OrderShippingMethod.Delivery &&
            (!shippingAddressId || activeShipments.length === 0))
        }
        className="w-full rounded-full bg-[var(--sf-color-primary)] py-3.5 text-sm font-semibold text-[var(--sf-color-primary-fg)] shadow-md transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
      >
        {checkout.isSubmitting ? t.checkout.submitting : t.checkout.placeOrder}
      </button>
    </form>
  );
}
