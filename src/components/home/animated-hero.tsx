"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  badge: string;
  title: string;
  subtitle: string;
  shopAllLabel: string;
  browseLabel: string;
  browseHref?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function AnimatedHero({
  badge,
  title,
  subtitle,
  shopAllLabel,
  browseLabel,
  browseHref,
}: Props) {
  const reduce = useReducedMotion();

  const inner = (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">
        {badge}
      </p>
      <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
        {subtitle}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/search"
          className="inline-flex min-h-11 items-center rounded-full bg-[var(--sf-color-accent)] px-7 text-sm font-medium text-[var(--sf-color-accent-fg)] shadow-lg shadow-black/15 transition hover:brightness-110 hover:shadow-xl active:scale-[0.98]"
        >
          {shopAllLabel}
        </Link>
        {browseHref && (
          <Link
            href={browseHref}
            className="inline-flex min-h-11 items-center rounded-full border border-white/35 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15 active:scale-[0.98]"
          >
            {browseLabel}
          </Link>
        )}
      </div>
    </>
  );

  return (
    <section className="relative overflow-hidden rounded-[var(--sf-radius)] bg-[var(--sf-color-primary)] px-6 py-16 text-[var(--sf-color-primary-fg)] shadow-[var(--sf-shadow-lg)] sm:px-10 sm:py-24">
      <div
        className="sf-hero-mesh pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl text-center">
        {reduce ? (
          inner
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            {inner}
          </motion.div>
        )}
      </div>
    </section>
  );
}
