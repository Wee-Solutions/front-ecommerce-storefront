import type { StorefrontProductReview } from "@/types/storefront-review";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(Math.min(5, Math.max(0, rating)));
  return (
    <span className="text-primary" aria-hidden>
      {"★".repeat(full)}
      <span className="text-muted-foreground/35">
        {"★".repeat(5 - full)}
      </span>
    </span>
  );
}

export function ReviewSection({
  productId,
  title,
  description,
  reviews,
}: {
  productId: string;
  title: string;
  description: string;
  /** When set (e.g. mock mode), renders a full review list instead of the placeholder. */
  reviews?: StorefrontProductReview[];
}) {
  if (reviews && reviews.length > 0) {
    return (
      <section
        className="mt-16 rounded-2xl border border-border/70 bg-card/60 p-6 shadow-sm ring-1 ring-border/30 backdrop-blur-sm md:mt-20 md:p-10"
        aria-labelledby={`reviews-${productId}`}
      >
        <h2
          id={`reviews-${productId}`}
          className="font-heading text-xl font-medium text-foreground md:text-2xl"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {reviews.length}{" "}
          {reviews.length === 1 ? "review" : "reviews"} from verified clients
        </p>
        <ul className="mt-8 flex flex-col gap-8">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="border-b border-border/50 pb-8 last:border-0 last:pb-0"
            >
              <div className="flex flex-wrap items-center gap-2 gap-y-1">
                <Stars rating={r.rating} />
                <span className="sr-only">{r.rating} out of 5 stars</span>
                {r.verified ? (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary uppercase">
                    Verified
                  </span>
                ) : null}
              </div>
              <p className="mt-2 font-medium text-foreground">{r.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {r.body}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {r.author} · {r.date}
              </p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      className="mt-14 rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-[var(--sf-color-surface)]/80 p-6 shadow-[var(--sf-shadow-sm)] backdrop-blur-sm md:p-8"
      aria-labelledby={`reviews-${productId}`}
    >
      <h2
        id={`reviews-${productId}`}
        className="text-lg font-semibold text-[var(--sf-color-primary)]"
      >
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sf-color-muted)]">
        {description}
      </p>
    </section>
  );
}
