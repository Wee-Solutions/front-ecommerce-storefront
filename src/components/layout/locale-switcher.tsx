"use client";

import { useEffect, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setUserLocale } from "@/app/actions/locale";
import { type Locale } from "@/lib/i18n/locale-config";
import { useTranslations } from "@/contexts/locale-context";
import {
  getLanguageOptionLabel,
  type StoreLanguageOption,
} from "@/features/store-configuration/store-language-options";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  current: Locale;
  /** Resolved on the server from `/Configurations`. */
  languages: StoreLanguageOption[];
};

export function LocaleSwitcher({ current, languages }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const dict = useTranslations();

  const options = useMemo(
    () =>
      languages.map((item) => ({
        locale: item.locale,
        label: getLanguageOptionLabel(item),
      })),
    [languages],
  );

  const defaultLocale = useMemo(
    () =>
      languages.find((item) => item.isDefault)?.locale ??
      languages[0]?.locale ??
      null,
    [languages],
  );

  const selectValue =
    options.find((item) => item.locale === current)?.locale ??
    defaultLocale ??
    current;

  const currentLabel =
    options.find((item) => item.locale === selectValue)?.label ?? selectValue;

  useEffect(() => {
    if (!defaultLocale || languages.length === 0) return;
    const allowed = languages.some((item) => item.locale === current);
    if (allowed) return;

    startTransition(async () => {
      await setUserLocale(defaultLocale);
      router.refresh();
    });
  }, [current, defaultLocale, languages, router, startTransition]);

  if (options.length <= 1) {
    return null;
  }

  return (
    <div className="relative shrink-0">
      <Label htmlFor="sf-locale" className="sr-only">
        {dict.locale.label}
      </Label>
      <Select
        value={selectValue}
        disabled={pending}
        onValueChange={(next) => {
          if (!next || next === selectValue) return;
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
            "h-8 min-w-[7.25rem] shrink-0 rounded-full border-border/80 bg-card/90 px-3 text-xs font-medium shadow-sm backdrop-blur-sm",
            pending && "opacity-60",
          )}
        >
          <SelectValue>{currentLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent align="end">
          {options.map((item) => (
            <SelectItem key={item.locale} value={item.locale}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
