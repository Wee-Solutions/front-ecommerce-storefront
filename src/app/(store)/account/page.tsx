import Link from "next/link";
import type { Metadata } from "next";
import { AccountOverview } from "@/features/auth/account-overview";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return { title: dict.account.title };
}

export default async function AccountPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--sf-color-primary)] md:text-3xl">
        {dict.account.title}
      </h1>
      <p className="mt-2 text-sm text-[var(--sf-color-muted)]">
        {dict.account.subtitle}
      </p>
      <AccountOverview />
      <ul className="mt-10 space-y-3 text-sm">
        <li>
          <Link
            href="/account/orders"
            className="font-medium text-[var(--sf-color-accent)] transition hover:underline"
          >
            {dict.account.orders}
          </Link>
        </li>
        <li>
          <Link
            href="/cart"
            className="font-medium text-[var(--sf-color-accent)] transition hover:underline"
          >
            {dict.account.cart}
          </Link>
        </li>
      </ul>
    </div>
  );
}
