import type { Dictionary } from "@/lib/i18n/dictionaries";

export function UnknownStore({
  host,
  dict,
}: {
  host: string;
  dict: Dictionary;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--sf-page-bg)] px-6 text-center">
      <h1 className="text-xl font-semibold text-zinc-900">
        {dict.unknownStore.title}
      </h1>
      <p className="max-w-lg text-sm leading-relaxed text-zinc-600">
        {dict.unknownStore.body}
      </p>
      <p className="font-mono text-xs text-zinc-500">
        <span className="text-zinc-400">Host:</span> {host}
      </p>
    </div>
  );
}
