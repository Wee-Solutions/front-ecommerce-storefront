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
    <div className="flex flex-col gap-4">
      {product.properties.map((prop) => (
        <fieldset key={prop.propertyId} className="space-y-2">
          <legend className="text-sm font-medium text-[var(--sf-color-primary)]">
            {prop.propertyName}
          </legend>
          <div className="flex flex-wrap gap-2">
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
                    "rounded-full border px-3 py-1.5 text-sm transition",
                    active
                      ? "border-[var(--sf-color-accent)] bg-[var(--sf-color-accent)] text-[var(--sf-color-accent-fg)]"
                      : "border-[var(--sf-color-border)] text-[var(--sf-color-primary)] hover:border-[var(--sf-color-muted)]"
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
