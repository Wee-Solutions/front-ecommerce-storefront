import Link from "next/link";
import type { CategoryTreeItem } from "@/types/api/category";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

export function CategoryRail({
  categories,
  dict,
}: {
  categories: CategoryTreeItem[];
  dict: Dictionary;
}) {
  if (categories.length === 0) return null;

  return (
    <section
      className="scroll-mt-4"
      aria-labelledby="category-rail-heading"
    >
      <div className="mx-auto mb-6 max-w-3xl text-center md:mb-8">
        <h2
          id="category-rail-heading"
          className="font-heading text-xl font-medium tracking-tight text-foreground md:text-2xl"
        >
          {dict.home.shopCategories}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          {dict.home.shopCategoriesHint}
        </p>
      </div>

      <ul
        className={cn(
          "mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2",
          "sm:gap-2.5 md:gap-3",
        )}
      >
        {categories.map((c) => (
          <li key={c.id} className="flex justify-center">
            <Link
              href={`/c/${c.id}`}
              title={c.name}
              className={cn(
                "inline-flex max-w-[min(100%,15rem)] items-center justify-center rounded-full border border-border/65 bg-card/90 px-4 py-2.5 text-center text-sm font-medium text-foreground shadow-sm",
                "transition-colors hover:border-primary/35 hover:bg-primary/8 hover:shadow-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
            >
              <span className="line-clamp-2 text-pretty leading-snug">
                {c.name}
              </span>
              {c.productsCount > 0 ? (
                <span className="ms-2 shrink-0 tabular-nums text-xs font-normal text-muted-foreground">
                  {c.productsCount}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
        <li className="flex justify-center">
          <Link
            href="/search"
            className={cn(
              "inline-flex items-center rounded-full border border-dashed border-primary/45 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary",
              "transition-colors hover:border-primary/60 hover:bg-primary/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
          >
            {dict.home.viewAll}
          </Link>
        </li>
      </ul>
    </section>
  );
}
