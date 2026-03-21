import Image from "next/image";
import Link from "next/link";
import type { CategoryTreeItem } from "@/types/api/category";

function CategoryCard({
  cat,
  productsSuffix,
}: {
  cat: CategoryTreeItem;
  productsSuffix: string;
}) {
  const img = cat.mainImageURL || cat.iconImageURL;
  return (
    <Link
      href={`/c/${cat.id}`}
      className="sf-card group flex flex-col overflow-hidden outline-none transition duration-300 ease-out hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--sf-color-surface)]">
        {img ? (
          <Image
            src={img}
            alt=""
            fill
            className="object-cover transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-[var(--sf-color-muted)]">
            {cat.name}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[var(--sf-color-primary)]">
          {cat.name}
        </h3>
        {cat.productsCount > 0 && (
          <p className="mt-1 text-xs text-[var(--sf-color-muted)]">
            {cat.productsCount} {productsSuffix}
          </p>
        )}
      </div>
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
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {roots.map((cat) => (
        <li key={cat.id}>
          <CategoryCard cat={cat} productsSuffix={productsSuffix} />
        </li>
      ))}
    </ul>
  );
}
