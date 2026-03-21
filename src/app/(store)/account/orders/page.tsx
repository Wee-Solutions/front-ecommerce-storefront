import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return { title: dict.orders.title };
}

export default async function OrdersPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      <nav className="mb-6 text-sm text-[var(--sf-color-muted)]">
        <Link
          href="/account"
          className="transition hover:text-[var(--sf-color-primary)]"
        >
          {dict.orders.account}
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-[var(--sf-color-primary)]">{dict.orders.title}</span>
      </nav>
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--sf-color-primary)] md:text-3xl">
        {dict.orders.title}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--sf-color-muted)]">
        {dict.orders.subtitle}
      </p>
      <div className="mt-10 rounded-[var(--sf-radius)] border border-dashed border-[var(--sf-color-border)] bg-[var(--sf-color-surface)]/50 p-10 text-center text-sm text-[var(--sf-color-muted)]">
        {dict.orders.empty}
      </div>
    </div>
  );
}
