"use client";

import Link from "next/link";
import { useTranslations } from "@/contexts/locale-context";
import { useCustomerSession } from "./customer-session";

export function AccountOverview() {
  const t = useTranslations();
  const { accessToken, customerId, clear } = useCustomerSession();

  if (!accessToken || !customerId) {
    return (
      <div className="mt-10 rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-[var(--sf-color-surface)] p-6 shadow-[var(--sf-shadow-sm)]">
        <p className="text-sm text-[var(--sf-color-muted)]">{t.account.signedOut}</p>
        <Link
          href="/login"
          className="mt-4 inline-block text-sm font-semibold text-[var(--sf-color-accent)] transition hover:underline"
        >
          {t.account.signedOutCta}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-[var(--sf-color-surface)] p-6 shadow-[var(--sf-shadow-sm)]">
      <p className="text-sm text-[var(--sf-color-muted)]">{t.account.signedInAs}</p>
      <p className="mt-2 font-mono text-xs text-[var(--sf-color-primary)]">
        {customerId}
      </p>
      <button
        type="button"
        onClick={() => clear()}
        className="mt-5 text-sm font-medium text-red-600 transition hover:underline"
      >
        {t.account.signOut}
      </button>
    </div>
  );
}
