"use client";

import { Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AuthContactFieldProps = {
  id: string;
  label: string;
  type: "tel" | "email";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  optional?: boolean;
  optionalLabel?: string;
  autoComplete?: string;
  "aria-invalid"?: boolean;
  onEnter?: () => void;
};

export function AuthContactField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  hint,
  disabled,
  optional,
  optionalLabel,
  autoComplete,
  "aria-invalid": ariaInvalid,
  onEnter,
}: AuthContactFieldProps) {
  const Icon = type === "tel" ? Phone : Mail;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-snug text-foreground"
      >
        {label}
        {optional && optionalLabel ? (
          <span className="ms-1.5 font-normal text-muted-foreground">
            ({optionalLabel})
          </span>
        ) : null}
      </label>
      <div
        className={cn(
          "relative flex min-h-11 items-center rounded-xl border border-border bg-card/70 shadow-sm transition-[box-shadow,border-color]",
          "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/35",
          ariaInvalid &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/25"
        )}
      >
        <Icon
          className="pointer-events-none absolute start-3.5 size-[1.125rem] shrink-0 text-muted-foreground"
          aria-hidden
        />
        <Input
          id={id}
          type={type}
          inputMode={type === "tel" ? "tel" : "email"}
          enterKeyHint="send"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && onEnter) {
              e.preventDefault();
              onEnter();
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          autoCapitalize={type === "email" ? "none" : undefined}
          spellCheck={type === "email" ? false : undefined}
          aria-invalid={ariaInvalid}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="h-11 min-h-11 border-0 bg-transparent py-2 ps-11 pe-3.5 shadow-none focus-visible:ring-0 md:text-sm"
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
