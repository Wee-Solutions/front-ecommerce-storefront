"use client";

import { KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AuthOtpFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  disabled?: boolean;
  autoComplete?: string;
};

export function AuthOtpField({
  id,
  label,
  value,
  onChange,
  hint,
  disabled,
  autoComplete = "one-time-code",
}: AuthOtpFieldProps) {
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
          "relative flex min-h-11 items-center rounded-xl border border-border bg-card/70 shadow-sm transition-[box-shadow,border-color]",
          "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/35"
        )}
      >
        <KeyRound
          className="pointer-events-none absolute start-3.5 size-[1.125rem] shrink-0 text-muted-foreground"
          aria-hidden
        />
        <Input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete={autoComplete}
          enterKeyHint="done"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\s/g, ""))}
          disabled={disabled}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="h-11 min-h-11 border-0 bg-transparent py-2 ps-11 pe-3.5 font-mono text-base tracking-[0.2em] shadow-none focus-visible:ring-0 sm:text-sm"
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
