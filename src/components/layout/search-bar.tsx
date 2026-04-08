"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "@/contexts/locale-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const t = useTranslations();
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("w-full", className)}
      role="search"
      aria-label={t.nav.search}
    >
      <Label htmlFor="sf-search" className="sr-only">
        {t.search.placeholder}
      </Label>
      <div className="group flex overflow-hidden rounded-full border border-input/80 bg-card/95 shadow-md shadow-primary/5 ring-1 ring-border/50 backdrop-blur-md transition-[box-shadow,ring-color,transform] focus-within:-translate-y-px focus-within:border-ring/40 focus-within:shadow-lg focus-within:ring-2 focus-within:ring-ring/20">
        <div className="relative flex min-w-0 flex-1 items-center">
          <Search
            className="pointer-events-none absolute start-3 size-4 text-muted-foreground transition-colors group-focus-within:text-primary"
            strokeWidth={1.75}
            aria-hidden
          />
          <Input
            id="sf-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search.placeholder}
            className="h-10 border-0 bg-transparent ps-10 pe-3 shadow-none focus-visible:ring-0"
          />
        </div>
        <Button
          type="submit"
          size="sm"
          className="h-10 shrink-0 rounded-none rounded-e-full px-5"
        >
          {t.search.submit}
        </Button>
      </div>
    </form>
  );
}
