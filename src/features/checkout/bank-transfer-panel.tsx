"use client";

import { Building2, Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import type { StoreBankInfo } from "@/types/api/configuration";

type Labels = {
  panelTitle: string;
  panelHint: string;
  referenceHint: string;
  bankName: string;
  bankBranch: string;
  bankAccount: string;
  bankAccountOwner: string;
  bankIban: string;
  copy: string;
  copied: string;
};

type Row = { key: string; label: string; value: string; mono?: boolean };

export function BankTransferPanel({
  bank,
  labels,
}: {
  bank: StoreBankInfo;
  labels: Labels;
}) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const rows: Row[] = [
    { key: "bank", label: labels.bankName, value: bank.bankName },
    { key: "branch", label: labels.bankBranch, value: bank.branchNumber },
    {
      key: "account",
      label: labels.bankAccount,
      value: bank.accountNumber,
      mono: true,
    },
    { key: "owner", label: labels.bankAccountOwner, value: bank.accountOwnerName },
  ];
  if (bank.iban?.trim()) {
    rows.push({
      key: "iban",
      label: labels.bankIban,
      value: bank.iban.trim(),
      mono: true,
    });
  }

  const copy = useCallback(async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 2000);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-white to-white shadow-[0_8px_30px_-12px_rgba(5,150,105,0.35)] ring-1 ring-emerald-100">
      <div className="flex items-start gap-3 border-b border-emerald-100/80 bg-emerald-600/[0.06] px-4 py-4 sm:px-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
          <Building2 className="size-6" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-emerald-950">
            {labels.panelTitle}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-emerald-900/70">
            {labels.panelHint}
          </p>
        </div>
      </div>
      <div className="space-y-0 divide-y divide-[var(--sf-color-border)]/60 px-1 sm:px-2">
        {rows.map((row) => (
          <div
            key={row.key}
            className="flex flex-col gap-2 px-3 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4"
          >
            <div className="min-w-0 sm:flex-1">
              <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--sf-color-muted)]">
                {row.label}
              </p>
              <p
                className={`mt-0.5 break-all text-sm font-semibold text-[var(--sf-color-primary)] ${
                  row.mono ? "font-mono text-[13px] tracking-tight" : ""
                }`}
              >
                {row.value}
              </p>
            </div>
            <button
              type="button"
              onClick={() => void copy(row.key, row.value)}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50 sm:self-center"
            >
              {copiedKey === row.key ? (
                <>
                  <Check className="size-3.5" aria-hidden />
                  {labels.copied}
                </>
              ) : (
                <>
                  <Copy className="size-3.5" aria-hidden />
                  {labels.copy}
                </>
              )}
            </button>
          </div>
        ))}
      </div>
      <p className="border-t border-emerald-100/80 bg-emerald-50/40 px-4 py-3 text-xs leading-relaxed text-emerald-900/75 sm:px-5">
        {labels.referenceHint}
      </p>
    </div>
  );
}
