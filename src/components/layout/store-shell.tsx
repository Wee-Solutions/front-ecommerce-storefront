"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import type { CategoryTreeItem } from "@/types/api/category";
import type { Locale } from "@/lib/i18n/locale-config";
import { useTranslations } from "@/contexts/locale-context";
import { CartDrawer } from "@/features/cart/cart-drawer";
import { CartIconButton } from "./cart-icon-button";
import { LocaleSwitcher } from "./locale-switcher";
import { SearchBar } from "./search-bar";

export function StoreShell({
  storeName,
  categories,
  currentLocale,
  children,
}: {
  storeName: string;
  categories: CategoryTreeItem[];
  currentLocale: Locale;
  children: React.ReactNode;
}) {
  const [mobileNav, setMobileNav] = useState(false);
  const t = useTranslations();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--sf-color-border)]/80 bg-white/75 shadow-[var(--sf-shadow-sm)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/65">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:gap-4">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-[var(--sf-color-primary)] transition hover:opacity-80"
          >
            {storeName}
          </Link>
          <nav
            className="hidden flex-1 items-center gap-1 md:flex"
            aria-label={t.nav.main}
          >
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/c/${c.id}`}
                className="rounded-full px-3 py-1.5 text-sm text-[var(--sf-color-muted)] transition hover:bg-[var(--sf-color-surface)] hover:text-[var(--sf-color-primary)]"
              >
                {c.name}
              </Link>
            ))}
          </nav>
          <div className="hidden min-w-[180px] flex-1 md:block md:max-w-xs md:flex-none">
            <SearchBar />
          </div>
          <div className="ms-auto flex items-center gap-0.5 md:gap-1">
            <LocaleSwitcher current={currentLocale} />
            <Link
              href="/account"
              className="hidden rounded-full px-3 py-2 text-sm text-[var(--sf-color-primary)] transition hover:bg-[var(--sf-color-surface)] sm:inline-block"
            >
              {t.nav.account}
            </Link>
            <Link
              href="/login"
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-[var(--sf-color-primary)] transition hover:bg-[var(--sf-color-surface)] sm:inline-block"
            >
              {t.nav.signIn}
            </Link>
            <CartIconButton />
            <button
              type="button"
              className="rounded-full p-2 md:hidden"
              aria-expanded={mobileNav}
              aria-controls="mobile-nav"
              onClick={() => setMobileNav((v) => !v)}
              aria-label={t.nav.menu}
            >
              <span className="sr-only">{t.nav.menu}</span>
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="currentColor"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="border-t border-[var(--sf-color-border)]/60 px-4 py-2 md:hidden">
          <SearchBar />
        </div>
        <div
          id="mobile-nav"
          className={clsx(
            "border-t border-[var(--sf-color-border)]/60 md:hidden",
            mobileNav ? "block" : "hidden"
          )}
        >
          <ul className="mx-auto max-w-6xl space-y-0.5 px-4 py-3">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/c/${c.id}`}
                  className="block rounded-xl px-3 py-2.5 text-sm text-[var(--sf-color-primary)] transition hover:bg-[var(--sf-color-surface)]"
                  onClick={() => setMobileNav(false)}
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/account"
                className="block rounded-xl px-3 py-2.5 text-sm"
                onClick={() => setMobileNav(false)}
              >
                {t.nav.account}
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block rounded-xl px-3 py-2.5 text-sm"
                onClick={() => setMobileNav(false)}
              >
                {t.nav.signIn}
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 md:py-12">
        {children}
      </main>
      <footer className="mt-auto border-t border-[var(--sf-color-border)] bg-[var(--sf-color-surface)] py-12 text-sm text-[var(--sf-color-muted)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[var(--sf-color-primary)]/80">
            © {new Date().getFullYear()} {storeName}
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/search"
              className="transition hover:text-[var(--sf-color-primary)]"
            >
              {t.nav.search}
            </Link>
            <Link
              href="/cart"
              className="transition hover:text-[var(--sf-color-primary)]"
            >
              {t.nav.cart}
            </Link>
          </div>
        </div>
      </footer>
      <CartDrawer />
    </>
  );
}
