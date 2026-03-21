"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "@/contexts/locale-context";
import { formatMoney } from "@/lib/format-currency";
import { useCartStore } from "@/features/cart/cart-store";

export function CheckoutForm() {
  const t = useTranslations();
  const locale = useLocale();
  const lines = useCartStore((s) => s.lines);
  const [submitted, setSubmitted] = useState(false);

  const subtotal = lines.reduce(
    (sum, l) => sum + l.unitPrice * l.quantity,
    0
  );

  if (lines.length === 0) {
    return (
      <p className="mt-10 text-sm text-[var(--sf-color-muted)]">
        {t.checkout.empty}
      </p>
    );
  }

  if (submitted) {
    return (
      <p className="mt-10 rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-[var(--sf-color-surface)] p-5 text-sm leading-relaxed text-[var(--sf-color-primary)]">
        {t.checkout.thanks}
      </p>
    );
  }

  return (
    <form
      className="mt-10 space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
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
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--sf-color-muted)]">{t.checkout.subtotal}</span>
        <span className="font-semibold tabular-nums text-[var(--sf-color-primary)]">
          {formatMoney(subtotal, { locale })}
        </span>
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-[var(--sf-color-primary)] py-3.5 text-sm font-semibold text-[var(--sf-color-primary-fg)] shadow-md transition hover:brightness-110 active:scale-[0.99]"
      >
        {t.checkout.placeOrder}
      </button>
    </form>
  );
}
