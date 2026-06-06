"use client";

import clsx from "clsx";
import { CheckIcon } from "lucide-react";
import {
  PropertyType,
  type ProductDetail,
} from "@/types/api/product";
import {
  isLightHexColor,
  resolvePropertyColorHex,
} from "@/lib/color-utils";

export type VariantSelection = Record<string, string>;

export function buildInitialSelection(product: ProductDetail): VariantSelection {
  const first = product.variants[0];
  if (!first) return {};
  const m: VariantSelection = {};
  for (const pv of first.propertyValues) {
    const prop = product.properties.find((p) =>
      p.values.some((v) => v.propertyValueId === pv.propertyValueId),
    );
    if (prop) m[prop.propertyId] = pv.propertyValueId;
  }
  return m;
}

export function findMatchingVariant(
  product: ProductDetail,
  selection: VariantSelection,
): ProductDetail["variants"][0] | undefined {
  const chosen = Object.values(selection);
  if (chosen.length === 0) return undefined;
  return product.variants.find(
    (v) =>
      v.propertyValues.length === chosen.length &&
      chosen.every((id) =>
        v.propertyValues.some((pv) => pv.propertyValueId === id),
      ),
  );
}

function ColorSwatch({
  hex,
  label,
  active,
  disabled,
  onSelect,
}: {
  hex: string | null;
  label: string;
  active: boolean;
  disabled?: boolean;
  onSelect: () => void;
}) {
  const light = hex ? isLightHexColor(hex) : false;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      disabled={disabled}
      aria-label={label}
      title={label}
      onClick={onSelect}
      className={clsx(
        "sf-color-swatch-btn flex min-w-[3.25rem] flex-col items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:min-w-[3.5rem]",
        disabled && "pointer-events-none opacity-45",
      )}
    >
      <span
        className={clsx(
          "sf-color-swatch-disc size-10 sm:size-11",
          light && "sf-color-swatch-disc--light",
        )}
      >
        <span
          aria-hidden
          className="sf-color-swatch-fill"
          style={
            hex
              ? { backgroundColor: hex }
              : {
                  background:
                    "linear-gradient(160deg, color-mix(in srgb, var(--sf-color-surface) 55%, white) 0%, var(--muted) 48%, color-mix(in srgb, var(--sf-color-primary) 10%, var(--muted)) 100%)",
                }
          }
        />

        {!hex ? (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {label.slice(0, 2)}
          </span>
        ) : null}

        <span aria-hidden className="sf-color-swatch-sheen" />
        <span aria-hidden className="sf-color-swatch-shade" />

        {active ? (
          <span aria-hidden className="sf-color-swatch-check">
            <span
              className={clsx(
                "sf-color-swatch-check-mark",
                light && "sf-color-swatch-check-mark--on-dark",
              )}
            >
              <CheckIcon className="size-2.5 stroke-[2.75]" />
            </span>
          </span>
        ) : null}
      </span>

      <span
        className={clsx(
          "max-w-full truncate px-0.5 text-center text-[11px] leading-tight sm:text-xs",
          active ? "font-semibold text-foreground" : "font-medium text-muted-foreground",
        )}
      >
        {label}
      </span>
    </button>
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
      {product.properties.map((prop) => {
        const isColor = prop.type === PropertyType.Color;

        return (
          <fieldset key={prop.propertyId} className="min-w-0">
            <legend className="sf-section-eyebrow mb-3 block">
              {prop.propertyName}
            </legend>

            <div
              role={isColor ? "radiogroup" : undefined}
              aria-label={isColor ? prop.propertyName : undefined}
              className="flex flex-wrap gap-2.5 sm:gap-3"
            >
              {prop.values.map((val) => {
                const active =
                  selection[prop.propertyId] === val.propertyValueId;
                const select = () =>
                  onChange({
                    ...selection,
                    [prop.propertyId]: val.propertyValueId,
                  });

                if (isColor) {
                  return (
                    <ColorSwatch
                      key={val.propertyValueId}
                      hex={resolvePropertyColorHex(val.additionalData)}
                      label={val.value}
                      active={active}
                      disabled={disabled}
                      onSelect={select}
                    />
                  );
                }

                return (
                  <button
                    key={val.propertyValueId}
                    type="button"
                    disabled={disabled}
                    onClick={select}
                    className={clsx(
                      "min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-[color,box-shadow,transform,border-color] duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-[0_10px_28px_-12px_rgba(61,47,53,0.55)]"
                        : "border-border/80 bg-card/60 text-foreground hover:border-primary/35 hover:bg-muted/40",
                      disabled && "pointer-events-none opacity-50",
                    )}
                  >
                    {val.value}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
