import Link from "next/link";
import type { CategoryTreeItem } from "@/types/api/category";
import type { Dictionary } from "@/lib/i18n/dictionaries";

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
      <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h2
            id="category-rail-heading"
            className="font-heading text-xl font-medium tracking-tight text-foreground md:text-2xl"
          >
            {dict.home.shopCategories}
          </h2>
          <p className="text-sm text-muted-foreground">
            {dict.home.shopCategoriesHint}
          </p>
        </div>
      </div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-width:thin] md:-mx-2 md:px-2">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/c/${c.id}`}
            className="shrink-0 snap-start rounded-full border border-border/80 bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm ring-1 ring-border/30 transition hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
          >
            {c.name}
            {c.productsCount > 0 ? (
              <span className="ms-2 tabular-nums text-xs text-muted-foreground">
                {c.productsCount}
              </span>
            ) : null}
          </Link>
        ))}
        <Link
          href="/search"
          className="shrink-0 snap-start rounded-full border border-dashed border-primary/40 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10"
        >
          {dict.home.viewAll}
        </Link>
      </div>
    </section>
  );
}
