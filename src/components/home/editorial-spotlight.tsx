"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/contexts/locale-context";
import { productCardHighlights, syntheticRating } from "@/lib/product-display";
import type { ProductListItem } from "@/types/api/product";
import { buttonVariants } from "@/components/ui/button";
import { PriceDisplay } from "@/components/product/price-display";
import { cn } from "@/lib/utils";

export function EditorialSpotlight({ product }: { product: ProductListItem }) {
  const t = useTranslations();
  const chips = productCardHighlights(product, 4);
  const { value: r, count: c } = syntheticRating(product.id);

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-6 shadow-[0_32px_80px_-28px_rgba(61,47,53,0.35)] ring-1 ring-border/40 md:p-10 lg:p-12"
      aria-labelledby="editorial-spotlight-heading"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted/50 shadow-inner ring-1 ring-border/50 lg:col-span-7 lg:aspect-[4/5]">
          {product.mainImage ? (
            <Image
              src={product.mainImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 58vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              {t.product.noImage}
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15"
            aria-hidden
          />
        </div>

        <div className="flex flex-col justify-center space-y-6 lg:col-span-5">
          <div>
            <p className="sf-section-eyebrow text-muted-foreground">
              {t.home.editorialEyebrow}
            </p>
            <h2
              id="editorial-spotlight-heading"
              className="font-heading mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight text-foreground md:text-4xl lg:text-[2.65rem]"
            >
              {product.title}
            </h2>
            <p className="mt-2 text-sm tabular-nums text-muted-foreground">
              {t.product.ratingReviews
                .replace("{{rating}}", r.toFixed(1))
                .replace("{{count}}", String(c))}
            </p>
          </div>

          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            {t.home.editorialSupporting}
          </p>

          {chips.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {chips.map((x) => (
                <li
                  key={x}
                  className="rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm"
                >
                  {x}
                </li>
              ))}
            </ul>
          ) : null}

          <PriceDisplay
            price={product.price ?? null}
            compareAt={product.oldPrice}
            isVATExcluded={product.isVATExcluded}
            size="lg"
          />

          <Link
            href={`/products/${product.id}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "group mt-2 w-fit rounded-full px-8 shadow-md transition hover:shadow-lg",
            )}
          >
            {t.product.shopNow}
            <ArrowRight className="ms-2 size-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
