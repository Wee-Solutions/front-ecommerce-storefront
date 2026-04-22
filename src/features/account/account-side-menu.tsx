"use client";

import Link from "next/link";
import { useTranslations } from "@/contexts/locale-context";
import { cn } from "@/lib/utils";

type TabId = "profile" | "orders" | "shipping";

export function AccountSideMenu({ active }: { active: TabId }) {
  const t = useTranslations();
  const itemBase =
    "flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition";

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-border/60 bg-card p-2 shadow-sm">
        <nav aria-label={t.account.sectionsLabel} className="space-y-1.5">
          <Link
            href="/account"
            aria-current={active === "profile" ? "page" : undefined}
            className={cn(
              itemBase,
              active === "profile"
                ? "border-primary/35 bg-primary/10 text-primary"
                : "border-transparent hover:border-primary/20 hover:bg-muted/30",
            )}
          >
            <span>{t.account.title}</span>
          </Link>
          <Link
            href="/account/orders"
            aria-current={active === "orders" ? "page" : undefined}
            className={cn(
              itemBase,
              active === "orders"
                ? "border-primary/35 bg-primary/10 text-primary"
                : "border-transparent hover:border-primary/20 hover:bg-muted/30",
            )}
          >
            <span>{t.account.orders}</span>
          </Link>
          <Link
            href="/account/shipping"
            aria-current={active === "shipping" ? "page" : undefined}
            className={cn(
              itemBase,
              active === "shipping"
                ? "border-primary/35 bg-primary/10 text-primary"
                : "border-transparent hover:border-primary/20 hover:bg-muted/30",
            )}
          >
            <span>{t.account.shippingDetails}</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}

