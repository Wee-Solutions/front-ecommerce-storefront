"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "@/contexts/locale-context";
import { formatMoney } from "@/lib/format-currency";
import { cartLineCount, useCartStore } from "./cart-store";

export function CartDrawer() {
  const t = useTranslations();
  const locale = useLocale();
  const reduce = useReducedMotion();
  const [rtl, setRtl] = useState(false);
  const open = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const lines = useCartStore((s) => s.lines);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeLine = useCartStore((s) => s.removeLine);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setRtl(document.documentElement.dir === "rtl");
  }, []);

  const subtotal = lines.reduce(
    (sum, l) => sum + l.unitPrice * l.quantity,
    0
  );

  if (!open) return null;

  const offX = rtl ? "-100%" : "100%";
  const panelMotion = reduce
    ? {}
    : {
        initial: { x: offX, opacity: 0.65 },
        animate: { x: 0, opacity: 1 },
        transition: { type: "spring" as const, damping: 28, stiffness: 320 },
      };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        aria-label={t.cart.close}
        onClick={close}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="relative flex h-full w-full max-w-md flex-col border-s border-[var(--sf-color-border)] bg-white shadow-2xl"
        {...panelMotion}
      >
        <div className="flex items-center justify-between border-b border-[var(--sf-color-border)] px-4 py-4">
          <h2
            id="cart-drawer-title"
            className="text-lg font-semibold text-[var(--sf-color-primary)]"
          >
            {t.nav.cart} ({cartLineCount(lines)})
          </h2>
          <button
            type="button"
            onClick={close}
            className="rounded-full p-2 text-[var(--sf-color-muted)] transition hover:bg-[var(--sf-color-surface)]"
            aria-label={t.cart.close}
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {lines.length === 0 ? (
            <p className="text-sm text-[var(--sf-color-muted)]">
              {t.cart.emptyDrawer}
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-3 border-b border-[var(--sf-color-border)] pb-4"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[var(--sf-color-surface)]">
                    {line.imageUrl ? (
                      <Image
                        src={line.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-[var(--sf-color-primary)]">
                      {line.title}
                    </p>
                    <p className="mt-1 text-xs text-[var(--sf-color-muted)]">
                      {formatMoney(line.unitPrice, { locale })} ×{" "}
                      {line.quantity}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="text-xs font-medium text-[var(--sf-color-accent)]"
                        onClick={() => updateQty(line.id, line.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-xs tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        className="text-xs font-medium text-[var(--sf-color-accent)]"
                        onClick={() => updateQty(line.id, line.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ms-auto text-xs text-red-600 hover:underline"
                        onClick={() => removeLine(line.id)}
                      >
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-[var(--sf-color-border)] p-4">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--sf-color-muted)]">{t.cart.subtotal}</span>
            <span className="font-semibold text-[var(--sf-color-primary)]">
              {formatMoney(subtotal, { locale })}
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--sf-color-muted)]">
            {t.cart.shippingNote}
          </p>
          <Link
            href="/cart"
            onClick={close}
            className="mt-4 block w-full rounded-full border border-[var(--sf-color-border)] py-3 text-center text-sm font-medium text-[var(--sf-color-primary)] transition hover:bg-[var(--sf-color-surface)]"
          >
            {t.cart.viewCart}
          </Link>
          <Link
            href="/checkout"
            onClick={close}
            className="mt-2 block w-full rounded-full bg-[var(--sf-color-primary)] py-3 text-center text-sm font-medium text-[var(--sf-color-primary-fg)] transition hover:brightness-110"
          >
            {t.cart.checkout}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
