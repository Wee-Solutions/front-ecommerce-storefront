import Link from "next/link";
import type { Metadata } from "next";
import { CartView } from "@/features/cart/cart-page-client";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return { title: dict.nav.cart };
}

export default async function CartPage() {
  const dict = getDictionary(await getServerLocale());

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--sf-color-primary)] md:text-3xl">
        {dict.cart.title}
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--sf-color-muted)]">
        {dict.cart.subtitle}
      </p>
      <CartView />
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/checkout"
          className="inline-flex min-h-11 items-center rounded-full bg-[var(--sf-color-primary)] px-8 text-sm font-semibold text-[var(--sf-color-primary-fg)] shadow-md transition hover:brightness-110"
        >
          {dict.cart.proceed}
        </Link>
        <Link
          href="/search"
          className="inline-flex min-h-11 items-center rounded-full border border-[var(--sf-color-border)] px-8 text-sm font-medium text-[var(--sf-color-primary)] transition hover:bg-[var(--sf-color-surface)]"
        >
          {dict.cart.continueShopping}
        </Link>
      </div>
    </div>
  );
}
