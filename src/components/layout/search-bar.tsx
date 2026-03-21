"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useTranslations } from "@/contexts/locale-context";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const t = useTranslations();
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={className}
      role="search"
      aria-label={t.nav.search}
    >
      <label className="sr-only" htmlFor="sf-search">
        {t.search.placeholder}
      </label>
      <div className="flex overflow-hidden rounded-full border border-[var(--sf-color-border)] bg-white shadow-[var(--sf-shadow-sm)] transition focus-within:border-[var(--sf-color-accent)]/40 focus-within:shadow-md focus-within:ring-2 focus-within:ring-[var(--sf-color-accent)]/15">
        <input
          id="sf-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.search.placeholder}
          className="min-w-0 flex-1 border-0 bg-transparent px-4 py-2.5 text-sm text-[var(--sf-color-primary)] outline-none placeholder:text-[var(--sf-color-muted)]/80"
        />
        <button
          type="submit"
          className="bg-[var(--sf-color-primary)] px-5 py-2.5 text-sm font-medium text-[var(--sf-color-primary-fg)] transition hover:brightness-110"
        >
          {t.search.submit}
        </button>
      </div>
    </form>
  );
}
