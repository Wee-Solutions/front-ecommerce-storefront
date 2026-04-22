"use client";

import { KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AuthOtpFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  codeLength?: number;
  hint?: string;
  disabled?: boolean;
  autoComplete?: string;
};

export function AuthOtpField({
  id,
  label,
  value,
  onChange,
  codeLength = 6,
  hint,
  disabled,
  autoComplete = "one-time-code",
}: AuthOtpFieldProps) {
  const normalized = value.slice(0, codeLength);
  const slots = Array.from({ length: codeLength }, (_, i) => normalized[i] ?? "");

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-snug text-foreground"
      >
        {label}
      </label>
      <div
        className={cn(
          "relative rounded-xl border border-border bg-card/70 p-3 shadow-sm transition-[box-shadow,border-color]",
          "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/35"
        )}
      >
        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <KeyRound className="size-[1.05rem] shrink-0" aria-hidden />
        </div>
        <div className="flex items-center justify-center gap-2">
          {slots.map((ch, i) => (
            <div
              key={`${id}-${i}`}
              className={cn(
                "flex h-11 w-10 items-center justify-center rounded-lg border bg-background text-base font-semibold tabular-nums transition-colors sm:h-12 sm:w-11",
                i < normalized.length
                  ? "border-primary/35 text-foreground"
                  : "border-border text-muted-foreground",
              )}
              aria-hidden
            >
              {ch || ""}
            </div>
          ))}
        </div>
        <Input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete={autoComplete}
          enterKeyHint="done"
          value={normalized}
          onChange={(e) =>
            onChange(e.target.value.replace(/\D/g, "").slice(0, codeLength))
          }
          disabled={disabled}
          maxLength={codeLength}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="absolute inset-0 h-full w-full border-0 bg-transparent opacity-0 shadow-none focus-visible:ring-0"
        />
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
