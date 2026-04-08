"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setUserLocale } from "@/app/actions/locale";
import type { Locale } from "@/lib/i18n/locale-config";
import { LOCALES } from "@/lib/i18n/locale-config";
import { useTranslations } from "@/contexts/locale-context";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const dict = useTranslations();

  return (
    <div className="relative">
      <Label htmlFor="sf-locale" className="sr-only">
        {dict.locale.label}
      </Label>
      <Select
        value={current}
        disabled={pending}
        onValueChange={(next) => {
          if (!next || next === current) return;
          const loc = next as Locale;
          startTransition(async () => {
            await setUserLocale(loc);
            router.refresh();
          });
        }}
      >
        <SelectTrigger
          id="sf-locale"
          size="sm"
          aria-busy={pending}
          className={cn(
            "h-8 min-w-[7.25rem] rounded-full border-border/80 bg-card/90 text-xs font-medium shadow-sm backdrop-blur-sm",
            pending && "opacity-60"
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {LOCALES.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {dict.locale[loc]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
