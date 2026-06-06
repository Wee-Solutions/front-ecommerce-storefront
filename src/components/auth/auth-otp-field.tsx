"use client";

import { KeyRound } from "lucide-react";
import { useEffect, useRef } from "react";
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
  autoFocus?: boolean;
  onComplete?: (value: string) => void;
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
  autoFocus,
  onComplete,
}: AuthOtpFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const normalized = value.slice(0, codeLength);
  const slots = Array.from({ length: codeLength }, (_, i) => normalized[i] ?? "");

  useEffect(() => {
    if (!autoFocus || disabled) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [autoFocus, disabled]);

  const handleChange = (raw: string) => {
    const next = raw.replace(/\D/g, "").slice(0, codeLength);
    onChange(next);
    if (next.length === codeLength && onComplete) {
      onComplete(next);
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-snug text-foreground"
      >
        {label}
      </label>
      <div
        dir="ltr"
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
          ref={inputRef}
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete={autoComplete}
          enterKeyHint="done"
          dir="ltr"
          value={normalized}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          maxLength={codeLength}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={cn(
            "absolute inset-0 z-10 h-full w-full cursor-text border-0 bg-transparent shadow-none",
            "text-transparent caret-transparent selection:bg-transparent",
            "opacity-0 focus-visible:ring-0 focus-visible:outline-none",
            "disabled:pointer-events-none disabled:bg-transparent disabled:opacity-0",
            "[-webkit-text-fill-color:transparent]",
          )}
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
