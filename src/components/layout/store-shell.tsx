"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { ChevronDown, Menu } from "lucide-react";
import type { CategoryTreeItem } from "@/types/api/category";
import type { Locale } from "@/lib/i18n/locale-config";
import { useTranslations } from "@/contexts/locale-context";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartDrawer } from "@/features/cart/cart-drawer";
import { useStoreDisplayName } from "@/features/store-configuration/store-configuration-store";
import {
  getCategoryIdFromPathname,
  isCategoryBranchActive,
} from "@/lib/category-tree";
import { CartIconButton } from "./cart-icon-button";
import { HeaderCategoryNav } from "./header-category-nav";
import { MobileCategorySubtree } from "./mobile-category-subtree";
import { LocaleSwitcher } from "./locale-switcher";
import { SearchBar } from "./search-bar";
import { cn } from "@/lib/utils";

function subscribeDocumentDir(onChange: () => void) {
  const el = document.documentElement;
  const obs = new MutationObserver(onChange);
  obs.observe(el, { attributes: true, attributeFilter: ["dir"] });
  return () => obs.disconnect();
}

function getDocumentDirRtl() {
  return document.documentElement.dir === "rtl";
}

export function StoreShell({
  storeName,
  categories,
  currentLocale,
  children,
}: {
  storeName: string;
  categories: CategoryTreeItem[];
  currentLocale: Locale;
  children: React.ReactNode;
}) {
  const [mobileNav, setMobileNav] = useState(false);
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<Set<string>>(
    () => new Set(),
  );

  function toggleCategoryExpanded(id: string) {
    setExpandedCategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  const rtl = useSyncExternalStore(
    subscribeDocumentDir,
    getDocumentDirRtl,
    () => false,
  );
  const t = useTranslations();
  const displayName = useStoreDisplayName(storeName);
  const pathname = usePathname() ?? "";
  const activeCategoryId = getCategoryIdFromPathname(pathname);
  const searchActive = pathname === "/search" || pathname.startsWith("/search?");

  return (
    <>
      <div className="border-b border-border/60 bg-primary/10 py-2 text-center text-[11px] font-medium tracking-[0.2em] text-foreground/80 uppercase">
        <p className="mx-auto max-w-5xl px-4 leading-relaxed">
          {t.nav.announcement}
        </p>
      </div>
      <header className="sticky top-0 z-40 w-full min-w-0 border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/80">
        {/* Row 1: brand · search (centered) · actions */}
        <div className="mx-auto flex w-full min-w-0 max-w-7xl items-center gap-3 px-4 py-3.5 md:gap-4">
          <Link href="/" className="group block shrink-0 text-start transition">
            <span
              className="mb-2 block h-px w-8 bg-gradient-to-r from-primary to-primary/30 transition-[width] duration-300 group-hover:w-11"
              aria-hidden
            />
            <span className="font-heading text-lg font-semibold tracking-[0.02em] text-foreground md:text-xl">
              {displayName}
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 justify-center px-2 md:flex">
            <div className="w-full max-w-md lg:max-w-lg">
              <SearchBar />
            </div>
          </div>

          <div className="ms-auto flex shrink-0 items-center gap-0.5 md:ms-0 md:gap-1">
            <LocaleSwitcher current={currentLocale} />
            <Link
              href="/account"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "hidden rounded-full sm:inline-flex",
              )}
            >
              {t.nav.account}
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "hidden rounded-full font-medium sm:inline-flex",
              )}
            >
              {t.nav.signIn}
            </Link>
            <CartIconButton />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-expanded={mobileNav}
              aria-controls="mobile-nav-sheet"
              onClick={() => setMobileNav(true)}
              aria-label={t.nav.menu}
            >
              <Menu className="size-5" strokeWidth={1.75} />
            </Button>
          </div>
        </div>

        {/* Row 2: categories — desktop only, centered, multi-line wrap */}
        {categories.length > 0 ? (
          <div className="hidden w-full min-w-0 border-t border-border/55 bg-gradient-to-b from-muted/25 to-muted/10 md:block">
            <HeaderCategoryNav categories={categories} />
          </div>
        ) : null}

        <div className="border-t border-border/60 px-4 py-2.5 md:hidden">
          <SearchBar />
        </div>
      </header>

      <Sheet
        open={mobileNav}
        onOpenChange={(open) => {
          setMobileNav(open);
          if (!open) setExpandedCategoryIds(new Set());
        }}
      >
        <SheetContent
          side={rtl ? "right" : "left"}
          className="w-[min(100%,20rem)] gap-0 p-0 sm:max-w-xs"
          id="mobile-nav-sheet"
        >
          <SheetHeader className="border-b border-border px-4 py-4 text-center sm:text-start">
            <SheetTitle className="font-heading">{t.nav.menu}</SheetTitle>
          </SheetHeader>
          <nav
            className="flex max-h-[min(70vh,28rem)] flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-4"
            aria-label={t.nav.main}
          >
            <div className="flex w-full flex-col items-center gap-1 sm:items-stretch">
              {categories.map((c) => {
                const active = isCategoryBranchActive(c, activeCategoryId);
                const subs = c.subCategories ?? [];
                const hasChildren = subs.length > 0;
                const expanded = expandedCategoryIds.has(c.id);

                if (!hasChildren) {
                  return (
                    <Link
                      key={c.id}
                      href={`/c/${c.id}`}
                      onClick={() => setMobileNav(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "h-11 w-full max-w-[18rem] justify-center rounded-xl px-3 text-center sm:max-w-none sm:justify-start sm:text-start",
                        active
                          ? "border border-primary/40 bg-primary/12 font-semibold text-primary shadow-sm hover:bg-primary/16"
                          : "border border-transparent font-normal",
                      )}
                    >
                      <span className="line-clamp-2">{c.name}</span>
                    </Link>
                  );
                }

                return (
                  <div
                    key={c.id}
                    className="w-full max-w-[18rem] sm:max-w-none"
                  >
                    <div
                      className={cn(
                        "flex h-11 w-full overflow-hidden rounded-xl border shadow-sm transition-colors",
                        active
                          ? "border-primary/40 bg-primary/12"
                          : "border-border/50 bg-card/40",
                      )}
                    >
                      <Link
                        href={`/c/${c.id}`}
                        onClick={() => setMobileNav(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "h-11 min-w-0 flex-1 justify-center rounded-none px-3 text-center sm:justify-start sm:text-start",
                          active
                            ? "font-semibold text-primary hover:bg-primary/16"
                            : "font-normal",
                        )}
                      >
                        <span className="line-clamp-2">{c.name}</span>
                      </Link>
                      <button
                        type="button"
                        className={cn(
                          "inline-flex w-11 shrink-0 items-center justify-center border-s border-border/50 bg-transparent text-foreground transition-colors",
                          "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        )}
                        aria-expanded={expanded}
                        aria-controls={`mobile-subcats-${c.id}`}
                        aria-label={`${t.nav.subcategoriesMenu}: ${c.name}`}
                        onClick={() => toggleCategoryExpanded(c.id)}
                      >
                        <ChevronDown
                          className={cn(
                            "size-4 opacity-80 transition-transform duration-200",
                            expanded && "rotate-180",
                          )}
                          strokeWidth={2}
                          aria-hidden
                        />
                      </button>
                    </div>
                    {expanded ? (
                      <div id={`mobile-subcats-${c.id}`} className="mt-1 py-0.5">
                        <MobileCategorySubtree
                          items={subs}
                          activeCategoryId={activeCategoryId}
                          expandedIds={expandedCategoryIds}
                          toggleExpanded={toggleCategoryExpanded}
                          depth={0}
                          onNavigate={() => {
                            setMobileNav(false);
                            setExpandedCategoryIds(new Set());
                          }}
                          subcategoriesMenuLabel={t.nav.subcategoriesMenu}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <Separator className="my-3" />
            <div className="flex flex-col items-center gap-1 sm:items-stretch">
              <Link
                href="/search"
                onClick={() => setMobileNav(false)}
                aria-current={searchActive ? "page" : undefined}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-11 w-full max-w-[18rem] justify-center rounded-xl sm:max-w-none sm:justify-start",
                  searchActive
                    ? "border border-primary/40 bg-primary/12 font-semibold text-primary hover:bg-primary/16"
                    : "font-medium text-primary",
                )}
              >
                {t.search.allProducts}
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileNav(false)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-11 w-full max-w-[18rem] justify-center rounded-xl px-3 font-normal sm:max-w-none sm:justify-start",
                )}
              >
                {t.nav.account}
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileNav(false)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-11 w-full max-w-[18rem] justify-center rounded-xl px-3 font-normal sm:max-w-none sm:justify-start",
                )}
              >
                {t.nav.signIn}
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      <main className="mx-auto w-full min-w-0 max-w-7xl flex-1 px-4 py-12 md:py-16">
        {children}
      </main>
      <footer className="mt-auto border-t border-border bg-gradient-to-b from-muted/25 to-muted/40 py-14 text-sm text-muted-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <p className="font-heading text-lg font-medium text-foreground">
              {displayName}
            </p>
            <p className="mt-3 max-w-sm text-pretty leading-relaxed">
              {t.nav.announcement}
            </p>
          </div>
          <div>
            <p className="sf-section-eyebrow mb-3 text-muted-foreground">
              {t.nav.main}
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/search"
                  className="transition hover:text-foreground"
                >
                  {t.nav.search}
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="transition hover:text-foreground"
                >
                  {t.nav.cart}
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="transition hover:text-foreground"
                >
                  {t.nav.account}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="sf-section-eyebrow mb-3 text-muted-foreground">
              {t.account.title}
            </p>
            <Link
              href="/login"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {t.nav.signIn}
            </Link>
            <p className="mt-6 text-xs text-muted-foreground">
              © {new Date().getFullYear()} {displayName}
            </p>
          </div>
        </div>
      </footer>
      <CartDrawer />
    </>
  );
}
