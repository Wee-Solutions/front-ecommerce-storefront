"use client";

import Link from "next/link";
import clsx from "clsx";
import { useTranslations } from "@/contexts/locale-context";

type Props = {
  page: number;
  totalPages: number;
  /** Path only, e.g. `/search` or `/c/<categoryId>` (no query). */
  pathname: string;
  /**
   * Query params to preserve on every page link (excluding `page`).
   * Omit empty values; `page` is added only for page 2 and up.
   */
  query?: Record<string, string | undefined | null>;
};

function buildHref(
  pathname: string,
  query: Record<string, string | undefined | null> | undefined,
  p: number
): string {
  const params = new URLSearchParams();
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value) params.set(key, value);
    }
  }
  if (p > 1) params.set("page", String(p));
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export function Pagination({
  page,
  totalPages,
  pathname,
  query,
}: Props) {
  const t = useTranslations();
  const hrefForPage = (p: number) => buildHref(pathname, query, p);

  if (totalPages <= 1) return null;
  const items: (number | "gap")[] = [];
  const window = 1;
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= window) {
      items.push(p);
    } else if (items[items.length - 1] !== "gap") {
      items.push("gap");
    }
  }

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-1 py-10"
      aria-label={t.pagination.label}
    >
      <PaginationLink
        href={page > 1 ? hrefForPage(page - 1) : null}
        label={t.pagination.previous}
        disabled={page <= 1}
      />
      {items.map((item, i) =>
        item === "gap" ? (
          <span key={`g-${i}`} className="px-2 text-[var(--sf-color-muted)]">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={hrefForPage(item)}
            className={clsx(
              "min-w-10 rounded-full px-3 py-2 text-center text-sm tabular-nums transition",
              item === page
                ? "bg-[var(--sf-color-primary)] font-semibold text-[var(--sf-color-primary-fg)] shadow-md"
                : "text-[var(--sf-color-primary)] hover:bg-[var(--sf-color-surface)]"
            )}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </Link>
        )
      )}
      <PaginationLink
        href={page < totalPages ? hrefForPage(page + 1) : null}
        label={t.pagination.next}
        disabled={page >= totalPages}
      />
    </nav>
  );
}

function PaginationLink({
  href,
  label,
  disabled,
}: {
  href: string | null;
  label: string;
  disabled?: boolean;
}) {
  if (disabled || !href) {
    return (
      <span className="rounded-full px-3 py-2 text-sm text-[var(--sf-color-muted)] opacity-40">
        {label}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-2 text-sm font-medium text-[var(--sf-color-primary)] transition hover:bg-[var(--sf-color-surface)]"
    >
      {label}
    </Link>
  );
}
