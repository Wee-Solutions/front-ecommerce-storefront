"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { useTranslations } from "@/contexts/locale-context";
import { isLowStock, syntheticRating } from "@/lib/product-display";
import type { ProductListItem } from "@/types/api/product";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PriceDisplay } from "./price-display";

function StarRow({ value }: { value: number }) {
  const rounded = Math.min(5, Math.max(0, Math.round(value)));
  return (
    <span
      className="inline-flex items-center gap-px text-xs leading-none"
      aria-hidden
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={
            i <= rounded ? "text-primary" : "text-muted-foreground/30"
          }
        >
          ★
        </span>
      ))}
    </span>
  );
}

export function ProductCard({
  product,
  className,
}: {
  product: ProductListItem;
  className?: string;
}) {
  const t = useTranslations();
  const [saved, setSaved] = useState(false);
  const showFrom =
    Boolean(product.hasOptions && product.priceFrom != null);
  const displayPrice = showFrom
    ? (product.priceFrom ?? null)
    : (product.price ?? null);
  const displayCompare = showFrom
    ? (product.priceFromCompareAt ?? undefined)
    : product.oldPrice;
  const onSale =
    displayCompare != null &&
    displayPrice != null &&
    displayCompare > displayPrice;
  const low = isLowStock(product);
  const { value: ratingVal, count: ratingCount } = syntheticRating(product.id);
  const tagNew = product.tags?.some((x) => /new/i.test(x.name));

  return (
    <div
      className={cn(
        "group/card relative flex h-84 flex-col sm:h-88",
        className
      )}
    >
      <button
        type="button"
        aria-label={t.product.saveForLater}
        aria-pressed={saved}
        className={cn(
          "absolute end-2 top-2 z-30 flex size-10 min-h-10 min-w-10 items-center justify-center rounded-full border border-border/60 bg-card/90 text-foreground shadow-sm backdrop-blur-sm transition hover:scale-105 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          saved && "border-primary/50 text-primary"
        )}
        onClick={(e) => {
          e.preventDefault();
          setSaved((v) => !v);
        }}
      >
        <Heart
          className={cn("size-[18px]", saved && "fill-current")}
          strokeWidth={1.75}
        />
      </button>

      <Link
        href={`/products/${product.id}`}
        className="flex h-full min-h-0 flex-1 flex-col outline-none transition duration-300 ease-out hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Card
          size="sm"
          className="sf-card-shine flex h-full min-h-0 flex-1 flex-col gap-0 overflow-hidden rounded-xl border-0 bg-card py-0 shadow-[0_4px_24px_-10px_rgba(61,47,53,0.18)] ring-1 ring-border/45 transition-[box-shadow,ring-color] duration-300 ease-out group-hover/card:shadow-[0_16px_40px_-14px_rgba(61,47,53,0.22)] group-hover/card:ring-primary/25"
        >
          <div className="relative min-h-0 w-full flex-1 overflow-hidden bg-muted/50">
            {product.mainImage ? (
              <Image
                src={product.mainImage}
                alt=""
                fill
                className="object-contain object-center p-1 transition duration-500 ease-out group-hover/card:scale-[1.02]"
                sizes="(max-width:768px) 50vw, 22vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                {t.product.noImage}
              </div>
            )}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-40 transition group-hover/card:opacity-70"
              aria-hidden
            />
            <div className="absolute start-2 top-2 z-20 flex max-w-[calc(100%-3.25rem)] flex-wrap gap-1">
              {tagNew ? (
                <Badge
                  variant="secondary"
                  className="h-6 border-0 bg-card/95 px-2 py-0 text-xs font-semibold tracking-wide text-foreground uppercase shadow-sm backdrop-blur-sm"
                >
                  <Sparkles className="me-1 size-3 shrink-0" aria-hidden />
                  New
                </Badge>
              ) : null}
              {onSale ? (
                <Badge className="h-6 border-0 px-2 py-0 text-xs font-semibold shadow-sm backdrop-blur-sm">
                  Sale
                </Badge>
              ) : null}
              {low ? (
                <Badge
                  variant="outline"
                  className="h-6 border-amber-200/80 bg-amber-50/95 px-2 py-0 text-xs font-semibold text-amber-950 backdrop-blur-sm dark:border-amber-900/50 dark:bg-amber-950/80 dark:text-amber-50"
                >
                  {t.product.lowStock}
                </Badge>
              ) : null}
            </div>
            <div className="absolute inset-x-0 bottom-0 flex translate-y-1.5 items-center justify-between gap-2 px-3 pb-2.5 opacity-0 transition duration-300 ease-out group-hover/card:translate-y-0 group-hover/card:opacity-100">
              <span className="text-xs font-semibold tracking-wide text-foreground uppercase">
                {t.product.viewDetails}
              </span>
              <span className="flex size-9 min-h-9 min-w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
              </span>
            </div>
          </div>

          <CardContent className="shrink-0 space-y-1.5 border-t border-border/40 px-3 py-2 sm:px-3.5">
            <p className="line-clamp-2 font-heading text-sm font-medium leading-tight tracking-tight text-foreground">
              {product.title}
            </p>

            <div className="flex items-end justify-between gap-2">
              <div className="min-w-0 flex-1">
                <span className="sr-only">
                  {t.product.ratingReviews
                    .replace("{{rating}}", ratingVal.toFixed(1))
                    .replace("{{count}}", String(ratingCount))}
                </span>
                <span
                  className="inline-flex max-w-full items-center gap-1 text-xs leading-tight tabular-nums text-muted-foreground"
                  title={`${ratingVal.toFixed(1)} · ${ratingCount}`}
                >
                  <StarRow value={ratingVal} />
                  <span className="font-medium text-foreground/90">
                    {ratingVal.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="truncate">{ratingCount}</span>
                </span>
              </div>
              <div className="shrink-0 text-end">
                {showFrom ? (
                  <p className="mb-0.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {t.product.priceFrom}
                  </p>
                ) : null}
                <PriceDisplay
                  price={displayPrice}
                  compareAt={displayCompare}
                  isVATExcluded={product.isVATExcluded}
                  size="sm"
                  className="justify-end gap-x-1"
                />
              </div>
            </div>

            {showFrom ? (
              <p className="line-clamp-1 text-xs leading-tight text-muted-foreground">
                {t.product.optionsOnProductPage}
              </p>
            ) : null}
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
