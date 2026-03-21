"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useTranslations } from "@/contexts/locale-context";
import type { ProductListItem } from "@/types/api/product";
import { PriceDisplay } from "./price-display";

export function ProductCard({
  product,
  className,
}: {
  product: ProductListItem;
  className?: string;
}) {
  const t = useTranslations();

  return (
    <Link
      href={`/products/${product.id}`}
      className={clsx(
        "sf-card group flex flex-col overflow-hidden outline-none transition duration-300 ease-out hover:-translate-y-1",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--sf-color-surface)]">
        {product.mainImage ? (
          <Image
            src={product.mainImage}
            alt=""
            fill
            className="object-cover transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            sizes="(max-width:768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--sf-color-muted)]">
            {t.product.noImage}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--sf-color-primary)]">
          {product.title}
        </h3>
        {product.subTitle && (
          <p className="line-clamp-1 text-xs text-[var(--sf-color-muted)]">
            {product.subTitle}
          </p>
        )}
        <PriceDisplay
          price={product.price ?? null}
          compareAt={product.oldPrice}
          isVATExcluded={product.isVATExcluded}
          className="mt-auto pt-2"
        />
      </div>
    </Link>
  );
}
