"use client";

import Image from "next/image";
import { useMemo } from "react";
import clsx from "clsx";
import type { ImageItem, ProductDetail } from "@/types/api/product";

function buildImageList(product: ProductDetail): ImageItem[] {
  const main = product.mainImage;
  const rest = product.images.filter((img) => img.id !== main?.id);
  return main ? [main, ...rest] : rest;
}

type Props = {
  product: ProductDetail;
  /** URL shown as the hero; thumbs stay in sync when this matches an item. */
  activeUrl: string | null;
  onActiveUrlChange: (url: string) => void;
};

export function ProductGallery({ product, activeUrl, onActiveUrlChange }: Props) {
  const baseList = useMemo(() => buildImageList(product), [product]);
  const displayList = useMemo(() => {
    if (!activeUrl) return baseList;
    if (baseList.some((i) => i.url === activeUrl)) return baseList;
    return [{ id: "__variant-hero", url: activeUrl }, ...baseList];
  }, [baseList, activeUrl]);

  const activeIndex = useMemo(() => {
    if (!activeUrl) return 0;
    const i = displayList.findIndex((img) => img.url === activeUrl);
    return i >= 0 ? i : 0;
  }, [activeUrl, displayList]);

  const current = displayList[activeIndex] ?? displayList[0];

  if (!current?.url) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center rounded-3xl border border-border/60 bg-muted/40 text-muted-foreground">
        No image
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/50 bg-muted/20 shadow-[0_28px_70px_-24px_rgba(61,47,53,0.35)] ring-1 ring-black/5">
        <Image
          key={current.url}
          src={current.url}
          alt={product.title}
          fill
          priority
          className="object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
          sizes="(max-width:1024px) 100vw, 50vw"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10"
          aria-hidden
        />
      </div>
      {displayList.length > 1 && (
        <ul
          className="flex max-w-full gap-2.5 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:thin]"
          role="list"
        >
          {displayList.map((img, i) => (
            <li key={`${img.id}-${i}`}>
              <button
                type="button"
                onClick={() => {
                  onActiveUrlChange(img.url);
                }}
                className={clsx(
                  "relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl border-2 bg-muted/30 shadow-sm transition",
                  i === activeIndex
                    ? "border-primary ring-2 ring-primary/25"
                    : "border-transparent opacity-75 hover:opacity-100"
                )}
                aria-label={`Show image ${i + 1}`}
              >
                <Image
                  src={img.url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
