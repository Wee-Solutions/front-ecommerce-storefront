"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { CategoryTreeItem } from "@/types/api/category";
import { buttonVariants } from "@/components/ui/button";
import { isCategoryBranchActive } from "@/lib/category-tree";
import { cn } from "@/lib/utils";

export function MobileCategorySubtree({
  items,
  activeCategoryId,
  expandedIds,
  toggleExpanded,
  depth,
  onNavigate,
  subcategoriesMenuLabel,
}: {
  items: CategoryTreeItem[];
  activeCategoryId: string | null;
  expandedIds: Set<string>;
  toggleExpanded: (id: string) => void;
  depth: number;
  onNavigate: () => void;
  subcategoriesMenuLabel: string;
}) {
  return (
    <ul
      className={cn(
        "space-y-0.5",
        depth > 0 && "mt-1 border-s-2 border-primary/12 ps-3 ms-1",
      )}
      role="list"
    >
      {items.map((sub) => {
        const nested = sub.subCategories ?? [];
        const hasNested = nested.length > 0;
        const expanded = expandedIds.has(sub.id);
        const lineActive = isCategoryBranchActive(sub, activeCategoryId);

        if (!hasNested) {
          return (
            <li key={sub.id}>
              <Link
                href={`/c/${sub.id}`}
                onClick={onNavigate}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-9 w-full justify-center rounded-lg px-2 text-center text-sm sm:justify-start sm:text-start",
                  lineActive
                    ? "font-semibold text-primary"
                    : "font-normal text-muted-foreground",
                )}
              >
                <span className="line-clamp-2">{sub.name}</span>
                {sub.productsCount > 0 ? (
                  <span className="ms-1.5 tabular-nums text-xs opacity-80">
                    {sub.productsCount}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        }

        return (
          <li key={sub.id} className="space-y-0.5">
            <div
              className={cn(
                "flex h-9 w-full overflow-hidden rounded-lg border border-border/45 bg-card/30",
                lineActive && "border-primary/30 bg-primary/8",
              )}
            >
              <Link
                href={`/c/${sub.id}`}
                onClick={onNavigate}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-9 min-w-0 flex-1 justify-center rounded-none px-2 text-center text-sm sm:justify-start sm:text-start",
                  lineActive ? "font-semibold text-primary" : "font-normal",
                )}
              >
                <span className="line-clamp-2">{sub.name}</span>
              </Link>
              <button
                type="button"
                className={cn(
                  "inline-flex w-10 shrink-0 items-center justify-center border-s border-border/50 bg-transparent",
                  "hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                aria-expanded={expanded}
                aria-controls={`mcat-${sub.id}`}
                aria-label={`${subcategoriesMenuLabel}: ${sub.name}`}
                onClick={() => toggleExpanded(sub.id)}
              >
                <ChevronDown
                  className={cn(
                    "size-3.5 opacity-80 transition-transform duration-200",
                    expanded && "rotate-180",
                  )}
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
            </div>
            {expanded ? (
              <div id={`mcat-${sub.id}`}>
                <MobileCategorySubtree
                  items={nested}
                  activeCategoryId={activeCategoryId}
                  expandedIds={expandedIds}
                  toggleExpanded={toggleExpanded}
                  depth={depth + 1}
                  onNavigate={onNavigate}
                  subcategoriesMenuLabel={subcategoriesMenuLabel}
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
