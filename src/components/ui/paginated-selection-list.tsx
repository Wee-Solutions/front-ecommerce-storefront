"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

export type SelectionListPage = {
  records: { id: string; name: string }[];
  totalCount: number;
};

type PaginatedSelectionListProps = {
  value: string | null;
  label?: string;
  onChange: (
    value: string | null,
    item: { id: string; name: string } | null,
  ) => void;
  fetchPage: (params: {
    searchTerm?: string;
    take: number;
    skip: number;
  }) => Promise<SelectionListPage>;
  queryKey: readonly unknown[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyLabel?: string;
  loadingLabel?: string;
  disabled?: boolean;
  pageSize?: number;
  className?: string;
  /** Ensures the current value is visible before the first page loads. */
  seedOption?: { id: string; name: string } | null;
};

const SCROLL_LOAD_THRESHOLD_PX = 48;

export function PaginatedSelectionList({
  value,
  label,
  onChange,
  fetchPage,
  queryKey,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyLabel = "No results",
  loadingLabel = "Loading…",
  disabled = false,
  pageSize = 20,
  className,
  seedOption,
}: PaginatedSelectionListProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search.trim(), 300);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [...queryKey, debouncedSearch],
      queryFn: ({ pageParam }) =>
        fetchPage({
          searchTerm: debouncedSearch || undefined,
          take: pageSize,
          skip: pageParam,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const loaded = allPages.reduce(
          (sum, page) => sum + page.records.length,
          0,
        );
        return loaded < lastPage.totalCount ? loaded : undefined;
      },
      enabled: open && !disabled,
    });

  const options = useMemo(() => {
    const merged = data?.pages.flatMap((page) => page.records) ?? [];
    if (!seedOption) return merged;
    if (merged.some((item) => item.id === seedOption.id)) return merged;
    return [seedOption, ...merged];
  }, [data, seedOption]);

  const seedLabel =
    seedOption &&
    seedOption.id === value &&
    seedOption.name !== value
      ? seedOption.name
      : undefined;

  const selectedLabel =
    label ??
    options.find((item) => item.id === value)?.name ??
    seedLabel ??
    "";

  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el || !hasNextPage || isFetchingNextPage) return;
    if (
      el.scrollHeight - el.scrollTop - el.clientHeight <
      SCROLL_LOAD_THRESHOLD_PX
    ) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listId : undefined}
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors outline-none",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !selectedLabel && "text-muted-foreground",
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="truncate text-start">
          {selectedLabel || placeholder}
        </span>
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10">
          <div className="border-b border-border/60 p-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              autoFocus
              className="h-8"
            />
          </div>

          <div
            id={listId}
            ref={listRef}
            role="listbox"
            className="max-h-60 overflow-y-auto p-1"
            onScroll={handleScroll}
          >
            {isLoading && options.length === 0 ? (
              <p className="flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground">
                <Loader2Icon className="size-4 animate-spin" />
                {loadingLabel}
              </p>
            ) : options.length === 0 ? (
              <p className="px-2 py-3 text-sm text-muted-foreground">
                {emptyLabel}
              </p>
            ) : (
              options.map((item) => {
                const selected = item.id === value;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={cn(
                      "flex w-full rounded-md px-2 py-1.5 text-start text-sm outline-none transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      selected && "bg-accent text-accent-foreground",
                    )}
                    onClick={() => {
                      onChange(item.id, item);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    {item.name}
                  </button>
                );
              })
            )}

            {isFetchingNextPage ? (
              <p className="flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground">
                <Loader2Icon className="size-3.5 animate-spin" />
                {loadingLabel}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
