"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "@/contexts/locale-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getCategoryIdFromPathname,
  isCategoryBranchActive,
} from "@/lib/category-tree";
import type { CategoryTreeItem } from "@/types/api/category";
import { cn } from "@/lib/utils";

/** Narrow, dense popover — reads as a menu, not a modal. */
const menuPanel = cn(
  "max-h-[min(72vh,18rem)] w-[min(calc(100vw-1rem),17.25rem)] overflow-y-auto overflow-x-hidden",
  "rounded-xl border border-border/50 bg-popover p-0 shadow-md ring-1 ring-black/[0.04]",
);

const subPanel = cn(
  "min-w-[13.5rem] max-w-[min(17.25rem,calc(100vw-1rem))] max-h-[min(65vh,16rem)] overflow-y-auto",
  "rounded-xl border border-border/50 bg-popover p-0.5 shadow-md ring-1 ring-black/[0.04]",
);

const itemRow = cn(
  "mx-0.5 flex min-h-8 cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm leading-snug outline-none",
  "transition-colors duration-100",
  "data-highlighted:bg-primary/10 data-highlighted:text-foreground",
);

const subTriggerRow = cn(
  itemRow,
  "min-w-0 pe-0.5 font-normal text-foreground",
  "data-popup-open:bg-muted/50 data-open:bg-muted/50",
  "[&>svg:last-child]:size-3 [&>svg:last-child]:shrink-0 [&>svg:last-child]:opacity-60",
);

function renderCategoryMenuLevel(
  items: CategoryTreeItem[],
  router: ReturnType<typeof useRouter>,
  viewAllLabel: string,
  activeCategoryId: string | null,
): ReactNode {
  return items.map((sub) => {
    const nested = sub.subCategories ?? [];
    if (nested.length > 0) {
      const branchActive = isCategoryBranchActive(sub, activeCategoryId);
      return (
        <DropdownMenuSub key={sub.id}>
          <DropdownMenuSubTrigger
            className={cn(
              subTriggerRow,
              branchActive && "bg-primary/10 font-medium text-primary",
            )}
          >
            <span className="line-clamp-2 min-w-0 flex-1 text-start">
              {sub.name}
            </span>
            {sub.productsCount > 0 ? (
              <span
                className={cn(
                  "shrink-0 tabular-nums text-[10px] text-muted-foreground",
                  branchActive && "text-primary/80",
                )}
              >
                {sub.productsCount}
              </span>
            ) : null}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent
            sideOffset={4}
            alignOffset={-2}
            className={subPanel}
          >
            <DropdownMenuItem
              className={cn(
                "mx-0.5 mb-0.5 mt-0.5 flex cursor-pointer items-center rounded-md px-2 py-1.5 text-xs font-medium text-primary",
                "data-highlighted:bg-primary/12",
              )}
              onClick={() => router.push(`/c/${sub.id}`)}
            >
              {viewAllLabel}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="mx-0 my-0.5 bg-border/50" />
            {renderCategoryMenuLevel(
              nested,
              router,
              viewAllLabel,
              activeCategoryId,
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }

    const isActive = activeCategoryId === sub.id;
    return (
      <DropdownMenuItem
        key={sub.id}
        className={cn(
          itemRow,
          isActive && "bg-primary/10 font-medium text-primary",
        )}
        onClick={() => router.push(`/c/${sub.id}`)}
      >
        <span className="line-clamp-2 min-w-0 flex-1 text-start">{sub.name}</span>
        {sub.productsCount > 0 ? (
          <span
            className={cn(
              "shrink-0 tabular-nums text-[10px] text-muted-foreground",
              isActive && "text-primary/80",
            )}
          >
            {sub.productsCount}
          </span>
        ) : null}
      </DropdownMenuItem>
    );
  });
}

function pillParts(active: boolean) {
  return {
    shell: cn(
      "inline-flex max-w-[min(100%,14rem)] overflow-hidden rounded-full border shadow-sm sm:max-w-[16rem]",
      active
        ? "border-primary/50 bg-primary text-primary-foreground ring-1 ring-primary/30"
        : "border-border/60 bg-background/80 text-foreground",
    ),
    link: cn(
      "inline-flex min-w-0 flex-1 items-center justify-center px-3.5 py-2.5 text-center text-[13px] font-medium leading-snug tracking-tight transition-colors sm:px-4 sm:text-sm",
      active
        ? "text-primary-foreground hover:bg-primary/92"
        : "text-foreground hover:bg-primary/8",
    ),
    trigger: cn(
      "inline-flex shrink-0 items-center justify-center border-s px-2.5 py-2.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      active
        ? "border-primary-foreground/25 bg-primary text-primary-foreground hover:bg-primary/88"
        : "border-border/55 bg-background/90 hover:bg-muted/60",
    ),
  };
}

/**
 * Category ribbon: top-level categories; items with children use a split control
 * (go to collection · open subcategory menu).
 */
export function HeaderCategoryNav({
  categories,
}: {
  categories: CategoryTreeItem[];
}) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const activeCategoryId = getCategoryIdFromPathname(pathname);
  const searchActive = pathname === "/search" || pathname.startsWith("/search?");

  if (categories.length === 0) return null;

  return (
    <nav
      className="mx-auto w-full min-w-0 max-w-7xl px-4 py-3 sm:py-3.5"
      aria-label={t.nav.main}
    >
      <ul
        className={cn(
          "flex w-full min-w-0 flex-wrap items-center justify-center gap-x-1 gap-y-2",
          "sm:gap-x-2 sm:gap-y-2.5",
        )}
      >
        {categories.map((c) => {
          const active = isCategoryBranchActive(c, activeCategoryId);
          const subs = c.subCategories ?? [];
          const hasChildren = subs.length > 0;

          if (!hasChildren) {
            return (
              <li key={c.id} className="flex max-w-full justify-center">
                <Link
                  href={`/c/${c.id}`}
                  title={c.name}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex max-w-[min(100%,14rem)] items-center justify-center rounded-full border px-3.5 py-2.5 text-center text-[13px] font-medium leading-snug tracking-tight shadow-sm",
                    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "sm:max-w-[16rem] sm:px-4 sm:text-sm",
                    active
                      ? "border-primary/50 bg-primary text-primary-foreground shadow-md ring-1 ring-primary/30 hover:bg-primary/92 hover:text-primary-foreground"
                      : "border-border/60 bg-background/80 text-foreground hover:border-primary/35 hover:bg-primary/8",
                  )}
                >
                  <span className="line-clamp-2 pb-px text-pretty sm:line-clamp-1">
                    {c.name}
                  </span>
                  {c.productsCount > 0 ? (
                    <span
                      className={cn(
                        "ms-1.5 shrink-0 tabular-nums text-[11px] font-normal sm:text-xs",
                        active
                          ? "text-primary-foreground/85"
                          : "text-muted-foreground",
                      )}
                    >
                      {c.productsCount}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          }

          const p = pillParts(active);
          return (
            <li key={c.id} className="flex max-w-full justify-center">
              <div className={p.shell}>
                <Link
                  href={`/c/${c.id}`}
                  title={c.name}
                  aria-current={active ? "page" : undefined}
                  className={p.link}
                >
                  <span className="line-clamp-2 pb-px text-pretty sm:line-clamp-1">
                    {c.name}
                  </span>
                  {c.productsCount > 0 ? (
                    <span
                      className={cn(
                        "ms-1.5 shrink-0 tabular-nums text-[11px] font-normal sm:text-xs",
                        active
                          ? "text-primary-foreground/85"
                          : "text-muted-foreground",
                      )}
                    >
                      {c.productsCount}
                    </span>
                  ) : null}
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={p.trigger}
                    aria-label={`${t.nav.subcategoriesMenu}: ${c.name}`}
                  >
                    <ChevronDown
                      className="size-3.5 opacity-85"
                      strokeWidth={2}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="center"
                    sideOffset={6}
                    className={menuPanel}
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="border-b border-border/40 px-3 py-2 text-start">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {t.category.browse}
                        </span>
                        <span className="mt-0.5 block truncate font-heading text-sm font-medium tracking-tight text-foreground">
                          {c.name}
                        </span>
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        className={cn(
                          "mx-1 my-1 flex cursor-pointer items-center rounded-md px-2 py-1.5 text-xs font-medium text-primary",
                          "data-highlighted:bg-primary/12",
                        )}
                        onClick={() => router.push(`/c/${c.id}`)}
                      >
                        {t.home.viewAll}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="mx-0 my-0 h-px bg-border/50" />
                    {renderCategoryMenuLevel(
                      subs,
                      router,
                      t.home.viewAll,
                      activeCategoryId,
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          );
        })}
        <li className="flex justify-center">
          <Link
            href="/search"
            aria-current={searchActive ? "page" : undefined}
            className={cn(
              "inline-flex items-center rounded-full border px-3.5 py-2.5 text-[13px] font-semibold leading-snug sm:px-4 sm:text-sm",
              "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              searchActive
                ? "border-primary bg-primary/12 text-primary shadow-sm ring-1 ring-primary/25 hover:bg-primary/18"
                : "border-dashed border-primary/40 bg-primary/5 text-primary hover:border-primary/55 hover:bg-primary/10",
            )}
          >
            {t.search.allProducts}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
