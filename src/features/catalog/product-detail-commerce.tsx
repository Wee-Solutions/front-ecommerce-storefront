"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchasePanel } from "@/features/catalog/product-purchase-panel";
import type { ProductDetail } from "@/types/api/product";

type Labels = {
  styleCode: string;
  details: string;
  noDescription: string;
};

export function ProductDetailCommerce({
  product,
  highlights,
  labels,
}: {
  product: ProductDetail;
  highlights: string[];
  labels: Labels;
}) {
  const defaultHero = useMemo(
    () => product.mainImage?.url ?? product.images[0]?.url ?? null,
    [product.id, product.mainImage?.url, product.images]
  );

  const [activeUrl, setActiveUrl] = useState<string | null>(defaultHero);

  useEffect(() => {
    setActiveUrl(defaultHero);
  }, [defaultHero]);

  const onVariantHero = useCallback((url: string | null) => {
    setActiveUrl(url ?? defaultHero);
  }, [defaultHero]);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16 xl:gap-20">
      <ProductGallery
        product={product}
        activeUrl={activeUrl}
        onActiveUrlChange={setActiveUrl}
      />
      <div className="lg:sticky lg:top-32">
        <h1 className="font-heading text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
          {product.title}
        </h1>
        {product.subTitle ? (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {product.subTitle}
          </p>
        ) : null}
        {highlights.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Attributes">
            {highlights.map((label) => (
              <li
                key={label}
                className="rounded-full border border-border/70 bg-muted/30 px-3 py-1 text-xs font-medium text-foreground"
              >
                {label}
              </li>
            ))}
          </ul>
        ) : null}
        {product.sku ? (
          <p className="mt-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {labels.styleCode}
            {product.sku}
          </p>
        ) : null}
        <ProductPurchasePanel
          product={product}
          onHeroImageUrlChange={onVariantHero}
        />
        <div className="mt-12 space-y-4 border-t border-border/60 pt-10 text-sm leading-relaxed md:text-base">
          <p className="sf-section-eyebrow text-muted-foreground">
            {labels.details}
          </p>
          {product.description?.includes("<") ? (
            <div
              className="max-w-2xl space-y-3 text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4"
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
          ) : (
            <p className="whitespace-pre-wrap text-muted-foreground">
              {product.description || labels.noDescription}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
