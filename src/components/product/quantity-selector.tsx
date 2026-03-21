"use client";

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (n: number) => void;
  disabled?: boolean;
};

export function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  disabled,
}: Props) {
  return (
    <div className="inline-flex items-center rounded-[var(--sf-radius)] border border-[var(--sf-color-border)]">
      <button
        type="button"
        className="px-3 py-2 text-lg leading-none text-[var(--sf-color-primary)] disabled:opacity-40"
        disabled={disabled || value <= min}
        onClick={() => onChange(value - 1)}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="min-w-10 text-center text-sm font-medium tabular-nums">
        {value}
      </span>
      <button
        type="button"
        className="px-3 py-2 text-lg leading-none text-[var(--sf-color-primary)] disabled:opacity-40"
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
