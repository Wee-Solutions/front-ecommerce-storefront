"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  badge: string;
  title: string;
  subtitle: string;
  shopAllLabel: string;
  heroImageUrl?: string;
  browseLabel: string;
  browseHref?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease },
  },
};

export function AnimatedHero({
  badge,
  title,
  subtitle,
  shopAllLabel,
  heroImageUrl,
  browseLabel,
  browseHref,
}: Props) {
  const reduce = useReducedMotion();

  const staticBlock = (
    <div className="max-w-4xl space-y-0 text-center">
      <p className="sf-section-eyebrow text-[var(--sf-color-primary-fg)]/65">
        {badge}
      </p>
      <span
        className="mx-auto mt-5 block h-px w-12 bg-gradient-to-r from-transparent via-[var(--sf-color-accent)] to-transparent opacity-90"
        aria-hidden
      />
      <h1 className="font-heading mt-8 max-w-4xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-[var(--sf-color-primary-fg)] sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.02]">
        {title}
      </h1>
      <p className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-[var(--sf-color-primary-fg)]/85 sm:text-lg">
        {subtitle}
      </p>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Link
          href="/search"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "min-h-12 rounded-full border-0 bg-[var(--sf-color-accent)] px-10 text-[15px] font-semibold text-[var(--sf-color-accent-fg)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] transition hover:brightness-[1.06] hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)] active:scale-[0.98]",
          )}
        >
          {shopAllLabel}
        </Link>
        {browseHref ? (
          <Link
            href={browseHref}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-h-12 rounded-full border-[var(--sf-color-primary-fg)]/40 bg-[var(--sf-color-primary-fg)]/[0.07] px-10 text-[15px] text-[var(--sf-color-primary-fg)] backdrop-blur-md hover:bg-[var(--sf-color-primary-fg)]/14 active:scale-[0.98]",
            )}
          >
            {browseLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );

  return (
    <section className="relative isolate min-h-[min(88vh,40rem)] overflow-hidden rounded-[var(--sf-radius)] bg-[var(--sf-color-primary)] px-5 py-20 shadow-[var(--sf-shadow-lg)] sm:px-10 sm:py-28 md:min-h-[min(90vh,44rem)]">
      {heroImageUrl ? (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${heroImageUrl}")` }}
          aria-hidden
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--sf-color-primary)_72%,transparent)]"
        aria-hidden
      />
      <div
        className="sf-hero-mesh sf-hero-aurora pointer-events-none absolute inset-0 opacity-100"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-[var(--sf-color-primary-fg)]/[0.12]"
        aria-hidden
      />
      <div className="relative flex min-h-[inherit] flex-col items-center justify-center py-6 text-center md:py-10">
        {reduce ? (
          staticBlock
        ) : (
          <motion.div
            className="max-w-4xl space-y-0 text-center"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={rise}
              className="sf-section-eyebrow text-[var(--sf-color-primary-fg)]/65"
            >
              {badge}
            </motion.p>
            <motion.span
              variants={rise}
              className="mx-auto mt-5 block h-px w-12 bg-gradient-to-r from-transparent via-[var(--sf-color-accent)] to-transparent opacity-90"
              aria-hidden
            />
            <motion.h1
              variants={rise}
              className="font-heading mt-8 max-w-4xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-[var(--sf-color-primary-fg)] sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.02]"
            >
              {title}
            </motion.h1>
            <motion.p
              variants={rise}
              className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-[var(--sf-color-primary-fg)]/85 sm:text-lg"
            >
              {subtitle}
            </motion.p>
            <motion.div
              variants={rise}
              className="mt-12 flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/search"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "min-h-12 rounded-full border-0 bg-[var(--sf-color-accent)] px-10 text-[15px] font-semibold text-[var(--sf-color-accent-fg)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] transition hover:brightness-[1.06] hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)] active:scale-[0.98]",
                )}
              >
                {shopAllLabel}
              </Link>
              {browseHref ? (
                <Link
                  href={browseHref}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "min-h-12 rounded-full border-[var(--sf-color-primary-fg)]/40 bg-[var(--sf-color-primary-fg)]/[0.07] px-10 text-[15px] text-[var(--sf-color-primary-fg)] backdrop-blur-md hover:bg-[var(--sf-color-primary-fg)]/14 active:scale-[0.98]",
                  )}
                >
                  {browseLabel}
                </Link>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
