export function ReviewSection({
  productId,
  title,
  description,
}: {
  productId: string;
  title: string;
  description: string;
}) {
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
