"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
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
import { CartIconButton } from "./cart-icon-button";
import { LocaleSwitcher } from "./locale-switcher";
import { SearchBar } from "./search-bar";
import { cn } from "@/lib/utils";

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
  const [rtl, setRtl] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setRtl(document.documentElement.dir === "rtl");
  }, []);

  return (
    <>
      <div className="border-b border-border/60 bg-primary/10 py-2 text-center text-[11px] font-medium tracking-[0.2em] text-foreground/80 uppercase">
        <p className="mx-auto max-w-5xl px-4 leading-relaxed">
          {t.nav.announcement}
        </p>
      </div>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 shadow-sm backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3.5 md:gap-5">
          <Link href="/" className="group block text-start transition">
            <span
              className="mb-2 block h-px w-8 bg-gradient-to-r from-primary to-primary/30 transition-[width] duration-300 group-hover:w-11"
              aria-hidden
            />
            <span className="font-heading text-lg font-semibold tracking-[0.02em] text-foreground md:text-xl">
              {storeName}
            </span>
          </Link>
          <nav
            className="hidden flex-1 items-center gap-0.5 md:flex"
            aria-label={t.nav.main}
          >
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/c/${c.id}`}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "relative rounded-full text-muted-foreground after:absolute after:inset-x-2 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-primary after:transition-transform hover:text-foreground hover:after:scale-x-100"
                )}
              >
                {c.name}
              </Link>
            ))}
          </nav>
          <div className="hidden min-w-[180px] flex-1 md:block md:max-w-xs md:flex-none">
            <SearchBar />
          </div>
          <div className="ms-auto flex items-center gap-0.5 md:gap-1">
            <LocaleSwitcher current={currentLocale} />
            <Link
              href="/account"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "hidden rounded-full sm:inline-flex"
              )}
            >
              {t.nav.account}
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "hidden rounded-full font-medium sm:inline-flex"
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
        <div className="border-t border-border/60 px-4 py-2 md:hidden">
          <SearchBar />
        </div>
      </header>

      <Sheet open={mobileNav} onOpenChange={setMobileNav}>
        <SheetContent
          side={rtl ? "right" : "left"}
          className="w-[min(100%,20rem)] gap-0 p-0 sm:max-w-xs"
          id="mobile-nav-sheet"
        >
          <SheetHeader className="border-b border-border px-4 py-4 text-start">
            <SheetTitle className="font-heading">{t.nav.menu}</SheetTitle>
          </SheetHeader>
          <nav
            className="flex flex-col gap-1 p-4"
            aria-label={t.nav.main}
          >
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/c/${c.id}`}
                onClick={() => setMobileNav(false)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-11 justify-start rounded-xl px-3 font-normal"
                )}
              >
                {c.name}
              </Link>
            ))}
            <Separator className="my-2" />
            <Link
              href="/account"
              onClick={() => setMobileNav(false)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-11 justify-start rounded-xl px-3 font-normal"
              )}
            >
              {t.nav.account}
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileNav(false)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-11 justify-start rounded-xl px-3 font-normal"
              )}
            >
              {t.nav.signIn}
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 md:py-16">
        {children}
      </main>
      <footer className="mt-auto border-t border-border bg-gradient-to-b from-muted/25 to-muted/40 py-14 text-sm text-muted-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <p className="font-heading text-lg font-medium text-foreground">
              {storeName}
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
              © {new Date().getFullYear()} {storeName}
            </p>
          </div>
        </div>
      </footer>
      <CartDrawer />
    </>
  );
}
