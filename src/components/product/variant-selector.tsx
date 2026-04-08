"use client";

import clsx from "clsx";
import type { ProductDetail } from "@/types/api/product";

export type VariantSelection = Record<string, string>;

export function buildInitialSelection(product: ProductDetail): VariantSelection {
  const first = product.variants[0];
  if (!first) return {};
  const m: VariantSelection = {};
  for (const pv of first.propertyValues) {
    const prop = product.properties.find((p) =>
      p.values.some((v) => v.propertyValueId === pv.propertyValueId)
    );
    if (prop) m[prop.propertyId] = pv.propertyValueId;
  }
  return m;
}

export function findMatchingVariant(
  product: ProductDetail,
  selection: VariantSelection
): ProductDetail["variants"][0] | undefined {
  const chosen = Object.values(selection);
  if (chosen.length === 0) return undefined;
  return product.variants.find(
    (v) =>
      v.propertyValues.length === chosen.length &&
      chosen.every((id) =>
        v.propertyValues.some((pv) => pv.propertyValueId === id)
      )
  );
}

export function VariantSelector({
  product,
  selection,
  onChange,
  disabled,
}: {
  product: ProductDetail;
  selection: VariantSelection;
  onChange: (next: VariantSelection) => void;
  disabled?: boolean;
}) {
  if (product.properties.length === 0) return null;

  return (
    <div className="flex flex-col gap-5">
      {product.properties.map((prop) => (
        <fieldset key={prop.propertyId} className="space-y-3">
          <legend className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            {prop.propertyName}
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {prop.values.map((val) => {
              const active = selection[prop.propertyId] === val.propertyValueId;
              return (
                <button
                  key={val.propertyValueId}
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    onChange({
                      ...selection,
                      [prop.propertyId]: val.propertyValueId,
                    })
                  }
                  className={clsx(
                    "min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-[color,box-shadow,transform,border-color] duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_10px_28px_-12px_rgba(61,47,53,0.55)]"
                      : "border-border/80 bg-card/60 text-foreground hover:border-primary/35 hover:bg-muted/40",
                    disabled && "pointer-events-none opacity-50"
                  )}
                >
                  {val.value}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
