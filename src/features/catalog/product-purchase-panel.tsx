"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Package, RotateCcw, ShieldCheck } from "lucide-react";
import { useTranslations } from "@/contexts/locale-context";
import { AddToCart } from "@/components/product/add-to-cart";
import { PriceDisplay } from "@/components/product/price-display";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { Separator } from "@/components/ui/separator";
import {
  VariantSelector,
  buildInitialSelection,
  findMatchingVariant,
  type VariantSelection,
} from "@/components/product/variant-selector";
import { useVendor } from "@/contexts/vendor-context";
import { getProductInventory, getProductPrice } from "@/services/products.service";
import type { ProductDetail } from "@/types/api/product";

function selectionComplete(
  product: ProductDetail,
  selection: VariantSelection
): boolean {
  if (product.properties.length === 0) return true;
  return product.properties.every((p) => Boolean(selection[p.propertyId]));
}

export function ProductPurchasePanel({
  product,
  onHeroImageUrlChange,
}: {
  product: ProductDetail;
  onHeroImageUrlChange?: (url: string | null) => void;
}) {
  const t = useTranslations();
  const { vendorCode, language } = useVendor();
  const [selection, setSelection] = useState<VariantSelection>(() =>
    buildInitialSelection(product)
  );
  const [qty, setQty] = useState(1);

  const complete = selectionComplete(product, selection);
  const propertyValueIds = useMemo(() => {
    if (!complete) return [];
    return product.properties
      .map((p) => selection[p.propertyId])
      .filter(Boolean)
      .sort();
  }, [complete, product.properties, selection]);

  const matchedVariant = useMemo(
    () => (complete ? findMatchingVariant(product, selection) : undefined),
    [complete, product, selection]
  );

  const needsPriceApi =
    product.variants.length > 0 &&
    complete &&
    (!matchedVariant || matchedVariant.price == null);

  const priceQuery = useQuery({
    queryKey: [
      "product-price",
      product.id,
      propertyValueIds.join(","),
      vendorCode,
    ],
    queryFn: () =>
      getProductPrice(
        vendorCode,
        { productId: product.id, propertyValueIds },
        language
      ),
    enabled: needsPriceApi,
  });

  const needsInventoryApi =
    complete &&
    propertyValueIds.length > 0 &&
    (!matchedVariant || matchedVariant.inventory == null);

  const inventoryQuery = useQuery({
    queryKey: [
      "product-inventory",
      product.id,
      propertyValueIds.join(","),
      vendorCode,
    ],
    queryFn: () =>
      getProductInventory(
        vendorCode,
        { productId: product.id, propertyValueIds },
        language
      ),
    enabled: needsInventoryApi,
  });

  const displayPrice =
    matchedVariant?.price ??
    priceQuery.data?.price ??
    product.price ??
    null;

  const compareAt = useMemo(() => {
    if (matchedVariant) {
      return matchedVariant.oldPrice ?? undefined;
    }
    return product.oldPrice ?? undefined;
  }, [matchedVariant, product.oldPrice]);

  const variantId =
    matchedVariant?.id ?? priceQuery.data?.variantId ?? null;

  const available = useMemo(() => {
    if (matchedVariant?.inventory) {
      const q = matchedVariant.inventory.quantity;
      const r = matchedVariant.inventory.reserved;
      return Math.max(0, Math.floor(q - r));
    }
    if (needsInventoryApi && inventoryQuery.data) {
      const inv = inventoryQuery.data;
      if (inv.available != null) return Math.max(0, Math.floor(inv.available));
      if (inv.quantity != null) {
        const r = inv.reserved ?? 0;
        return Math.max(0, Math.floor(inv.quantity - r));
      }
    }
    const q = product.quantity;
    const r = product.reserved;
    if (q == null) return 99;
    return Math.max(0, Math.floor((q ?? 0) - (r ?? 0)));
  }, [matchedVariant, needsInventoryApi, inventoryQuery.data, product]);

  const imageUrl =
    matchedVariant?.images?.[0]?.url ?? product.mainImage?.url ?? null;

  useEffect(() => {
    onHeroImageUrlChange?.(imageUrl);
  }, [imageUrl, onHeroImageUrlChange]);

  const canAdd =
    complete &&
    displayPrice != null &&
    displayPrice >= 0 &&
    available > 0 &&
    !priceQuery.isError;

  return (
    <div className="flex flex-col gap-6">
      <Separator />
      <div className="flex flex-col gap-6 pt-2">
        <ul className="grid gap-3 sm:grid-cols-3">
          <li className="flex gap-2.5 rounded-xl border border-border/60 bg-muted/20 px-3 py-2.5 text-xs leading-snug text-muted-foreground">
            <Package
              className="mt-0.5 size-4 shrink-0 text-primary"
              strokeWidth={1.5}
              aria-hidden
            />
            <span>{t.product.trustShip}</span>
          </li>
          <li className="flex gap-2.5 rounded-xl border border-border/60 bg-muted/20 px-3 py-2.5 text-xs leading-snug text-muted-foreground">
            <RotateCcw
              className="mt-0.5 size-4 shrink-0 text-primary"
              strokeWidth={1.5}
              aria-hidden
            />
            <span>{t.product.trustReturn}</span>
          </li>
          <li className="flex gap-2.5 rounded-xl border border-border/60 bg-muted/20 px-3 py-2.5 text-xs leading-snug text-muted-foreground sm:col-span-1">
            <ShieldCheck
              className="mt-0.5 size-4 shrink-0 text-primary"
              strokeWidth={1.5}
              aria-hidden
            />
            <span>{t.product.trustAuthentic}</span>
          </li>
        </ul>

        {product.properties.length > 0 && (
          <VariantSelector
            product={product}
            selection={selection}
            onChange={setSelection}
            disabled={priceQuery.isFetching}
          />
        )}

        <PriceDisplay
          price={displayPrice}
          compareAt={compareAt}
          isVATExcluded={product.isVATExcluded}
        />

        {!complete && product.properties.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {t.product.selectOptions}
          </p>
        )}

        {priceQuery.isError && (
          <p className="text-sm text-red-600" role="alert">
            {t.product.priceError}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <QuantitySelector
            value={qty}
            min={1}
            max={Math.max(1, available)}
            onChange={setQty}
            disabled={!canAdd}
          />
          <AddToCart
            productId={product.id}
            variantId={variantId}
            title={product.title}
            imageUrl={imageUrl}
            unitPrice={displayPrice ?? 0}
            propertyValueIds={complete ? propertyValueIds : []}
            quantity={qty}
            disabled={!canAdd}
            className="flex-1 sm:flex-none"
          />
        </div>

        <p className="text-xs font-medium text-muted-foreground">
          {available > 0
            ? `${available} ${t.product.available}`
            : complete
              ? t.product.outOfStock
              : ""}
        </p>
      </div>
    </div>
  );
}
