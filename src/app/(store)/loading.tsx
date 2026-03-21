export default function StoreLoading() {
  return (
    <div className="space-y-10 py-4" aria-busy="true" aria-label="Loading">
      <div className="sf-shimmer h-52 rounded-[var(--sf-radius)]" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="sf-shimmer h-80 rounded-[var(--sf-radius)]"
          />
        ))}
      </div>
    </div>
  );
}
