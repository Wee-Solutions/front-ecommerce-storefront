import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CategoryTreeItem } from "@/types/api/category";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function CategoryCard({
  cat,
  productsSuffix,
}: {
  cat: CategoryTreeItem;
  productsSuffix: string;
}) {
  const img =
    cat.mainImageURL ||
    cat.iconImageURL ||
    cat.bannerImages?.[0];
  return (
    <Link
      href={`/c/${cat.id}`}
      className={cn(
        "group block h-full outline-none transition duration-500 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      <Card className="sf-card-shine h-full gap-0 overflow-hidden rounded-2xl border-0 bg-card py-0 shadow-[0_2px_24px_-8px_rgba(61,47,53,0.12)] ring-1 ring-border/40 transition-[box-shadow,ring-color] duration-500 group-hover:shadow-[0_24px_56px_-14px_rgba(61,47,53,0.2)] group-hover:ring-primary/25">
        <div className="relative aspect-[5/3] overflow-hidden bg-muted/40 md:aspect-[16/9]">
          {img ? (
            <Image
              src={img}
              alt=""
              fill
              className="object-cover transition duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              sizes="(max-width:768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center font-heading text-lg text-muted-foreground">
              {cat.name}
            </div>
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 transition duration-500 group-hover:opacity-95"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
            <div className="min-w-0 text-start">
              <h3 className="font-heading text-xl font-medium tracking-tight text-foreground md:text-2xl">
                {cat.name}
              </h3>
              {cat.productsCount > 0 && (
                <p className="mt-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {cat.productsCount} {productsSuffix}
                </p>
              )}
            </div>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card/90 text-primary shadow-md backdrop-blur-sm transition group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-5" strokeWidth={1.75} aria-hidden />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function CategoryGrid({
  roots,
  productsSuffix,
}: {
  roots: CategoryTreeItem[];
  productsSuffix: string;
}) {
  if (roots.length === 0) return null;
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {roots.map((cat) => (
        <li key={cat.id}>
          <CategoryCard cat={cat} productsSuffix={productsSuffix} />
        </li>
      ))}
    </ul>
  );
}
