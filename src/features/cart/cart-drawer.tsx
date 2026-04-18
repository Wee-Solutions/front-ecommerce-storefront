"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "@/contexts/locale-context";
import { formatMoney } from "@/lib/format-currency";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cartLineCount, useCartStore } from "./cart-store";

export function CartDrawer() {
  const t = useTranslations();
  const locale = useLocale();
  const [rtl, setRtl] = useState(false);
  const open = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const lines = useCartStore((s) => s.lines);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeLine = useCartStore((s) => s.removeLine);

  useEffect(() => {
    setRtl(document.documentElement.dir === "rtl");
  }, []);

  const subtotal = lines.reduce(
    (sum, l) => sum + l.unitPrice * l.quantity,
    0
  );

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) close();
      }}
    >
      <SheetContent
        side={rtl ? "left" : "right"}
        className="flex h-full w-full max-w-md flex-col gap-0 border-s p-0 sm:max-w-md"
        showCloseButton
      >
        <SheetHeader className="shrink-0 space-y-0 border-b border-border px-4 py-4">
          <SheetTitle id="cart-drawer-title">
            {t.nav.cart}{" "}
            <span className="text-muted-foreground">
              ({cartLineCount(lines)})
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          {lines.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t.cart.emptyDrawer}</p>
          ) : (
            <ul className="flex flex-col gap-0">
              {lines.map((line, i) => (
                <li key={line.id}>
                  {i > 0 ? <Separator className="my-4" /> : null}
                  <div className="flex gap-3">
                    <div className="relative h-[5.25rem] w-[5.25rem] shrink-0 overflow-hidden rounded-xl bg-muted/80 ring-1 ring-border/60">
                      {line.imageUrl ? (
                        <Image
                          src={line.imageUrl}
                          alt=""
                          fill
                          className="object-cover transition duration-500 ease-out hover:scale-105"
                          sizes="84px"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
                        {line.title}
                      </p>
                      {line.variantSummary ? (
                        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted-foreground">
                          {line.variantSummary}
                        </p>
                      ) : null}
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatMoney(line.unitPrice, { locale })} ×{" "}
                        {line.quantity}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center rounded-full border border-border bg-muted/40 p-0.5">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            className="rounded-full"
                            aria-label="Decrease quantity"
                            onClick={() =>
                              updateQty(line.id, line.quantity - 1)
                            }
                          >
                            −
                          </Button>
                          <span className="min-w-7 text-center text-xs font-medium tabular-nums text-foreground">
                            {line.quantity}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            className="rounded-full"
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQty(line.id, line.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          className="ms-auto text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeLine(line.id)}
                        >
                          {t.cart.remove}
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <SheetFooter className="shrink-0 gap-3 border-t border-border bg-muted/25 px-4 py-4">
          <div className="flex w-full justify-between text-sm">
            <span className="text-muted-foreground">{t.cart.subtotal}</span>
            <span className="font-semibold tabular-nums text-foreground">
              {formatMoney(subtotal, { locale })}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{t.cart.shippingNote}</p>
          <Link
            href="/cart"
            onClick={close}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 w-full rounded-full justify-center no-underline"
            )}
          >
            {t.cart.viewCart}
          </Link>
          <Link
            href="/checkout"
            onClick={close}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-11 w-full rounded-full justify-center shadow-sm no-underline"
            )}
          >
            {t.cart.checkout}
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
