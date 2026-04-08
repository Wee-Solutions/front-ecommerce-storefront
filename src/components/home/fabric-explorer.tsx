import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const SEARCH_TERMS = [
  { key: "fabricSilk" as const, q: "silk" },
  { key: "fabricCashmere" as const, q: "cashmere" },
  { key: "fabricLinen" as const, q: "linen" },
  { key: "fabricLeather" as const, q: "leather" },
  { key: "fabricWool" as const, q: "wool" },
] as const;

export function FabricExplorer({ dict }: { dict: Dictionary }) {
  return (
    <section
      className="rounded-3xl border border-border/50 bg-muted/20 px-5 py-8 ring-1 ring-inset ring-white/40 md:px-8 md:py-10"
      aria-labelledby="fabric-explorer-heading"
    >
      <h2
        id="fabric-explorer-heading"
        className="font-heading text-center text-2xl font-medium tracking-tight text-foreground md:text-3xl"
      >
        {dict.home.shopByFabric}
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground">
        {dict.home.fabricExplorerBlurb}
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
        {SEARCH_TERMS.map(({ key, q }) => (
          <li key={q}>
            <Link
              href={`/search?q=${encodeURIComponent(q)}`}
              className="inline-flex min-h-11 items-center rounded-full border border-border/80 bg-card px-6 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md"
            >
              {dict.home[key]}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
