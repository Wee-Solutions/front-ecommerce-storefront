"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";
import {
  AtSign,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Link as LinkIcon,
  Menu,
  MessageCircle,
  Music2,
  Phone,
  Send,
  Youtube,
} from "lucide-react";
import type { CategoryTreeItem } from "@/types/api/category";
import {
  VendorSocialMediaType,
  type StoreConfiguration,
} from "@/types/api/configuration";
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
import { useCustomerSession } from "@/features/auth/customer-session";
import {
  getOrdersClosedMessage,
  isStoreAcceptingOrders,
} from "@/features/store-configuration/store-order-availability";
import { OrdersClosedBanner } from "@/components/layout/orders-closed-banner";
import {
  getCategoryIdFromPathname,
  isCategoryBranchActive,
} from "@/lib/category-tree";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { CartIconButton } from "./cart-icon-button";
import { HeaderCategoryNav } from "./header-category-nav";
import { MobileCategorySubtree } from "./mobile-category-subtree";
import type { StoreLanguageOption } from "@/features/store-configuration/store-language-options";
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

function toExternalHref(raw: string) {
  const value = raw.trim();
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}

function toWhatsAppHref(raw: string) {
  const value = raw.trim();
  if (!value) return "";
  const lower = value.toLowerCase();
  if (lower.includes("wa.me/") || lower.includes("whatsapp.com")) {
    return toExternalHref(value);
  }
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return `https://wa.me/${digits}`;
}

function toSocialHref(type: VendorSocialMediaType, raw: string) {
  if (type === VendorSocialMediaType.WhatsApp) {
    return toWhatsAppHref(raw);
  }
  return toExternalHref(raw);
}

function resolveSocialMediaType(
  value: string | VendorSocialMediaType,
): VendorSocialMediaType | null {
  if (typeof value === "number" && VendorSocialMediaType[value] != null) {
    return value;
  }

  const raw = String(value).trim();
  if (!raw) return null;

  const asNumber = Number(raw);
  if (
    Number.isInteger(asNumber) &&
    VendorSocialMediaType[asNumber as VendorSocialMediaType] != null
  ) {
    return asNumber as VendorSocialMediaType;
  }
  return null;
}

function iconForSocialType(type: VendorSocialMediaType) {
  switch (type) {
    case VendorSocialMediaType.Instagram:
      return Instagram;
    case VendorSocialMediaType.Facebook:
      return Facebook;
    case VendorSocialMediaType.TikTok:
      return Music2;
    case VendorSocialMediaType.YouTube:
      return Youtube;
    case VendorSocialMediaType.X:
      return AtSign;
    case VendorSocialMediaType.LinkedIn:
      return Linkedin;
    case VendorSocialMediaType.Snapchat:
      return MessageCircle;
    case VendorSocialMediaType.Telegram:
      return Send;
    case VendorSocialMediaType.WhatsApp:
      return WhatsAppIcon;
    default:
      return LinkIcon;
  }
}

function socialMediaTypeName(type: VendorSocialMediaType) {
  return VendorSocialMediaType[type] ?? "Link";
}

export function StoreShell({
  storeName,
  storeConfig,
  categories,
  currentLocale,
  languages,
  children,
}: {
  storeName: string;
  storeConfig: StoreConfiguration | null;
  categories: CategoryTreeItem[];
  currentLocale: Locale;
  languages: StoreLanguageOption[];
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
  const displayName = storeConfig?.name?.trim() || storeName;
  const rawMarqueeTexts =
    storeConfig?.marqueeTexts ??
    (storeConfig as StoreConfiguration & { MarqueeTexts?: string[] })
      ?.MarqueeTexts;
  const configMarqueeTexts =
    rawMarqueeTexts
      ?.map((item) => item.trim())
      .filter((item) => item.length > 0) ?? [];
  const marqueeTexts = configMarqueeTexts.length > 0 ? configMarqueeTexts : [];
  const socialLinks = (storeConfig?.socialMediaLinks ?? [])
    .map((item) => ({
      ...item,
      typeValue: resolveSocialMediaType(item.type),
    }))
    .filter(
      (
        item,
      ): item is typeof item & {
        typeValue: VendorSocialMediaType;
      } => item.typeValue != null && Boolean(item.link?.trim()),
    );
  const supportEmail = storeConfig?.supportEmail?.trim() || null;
  const supportPhoneNumber = storeConfig?.supportPhoneNumber?.trim() || null;
  const footerSocialItems = useMemo(() => {
    const hasWhatsAppLink = socialLinks.some(
      (item) => item.typeValue === VendorSocialMediaType.WhatsApp,
    );
    const fromPhone =
      supportPhoneNumber && !hasWhatsAppLink
        ? [
            {
              id: "support-whatsapp",
              typeValue: VendorSocialMediaType.WhatsApp,
              link: supportPhoneNumber,
            },
          ]
        : [];
    return [
      ...socialLinks.map((item) => ({
        id: `${item.type}-${item.link}`,
        typeValue: item.typeValue,
        link: item.link,
      })),
      ...fromPhone,
    ];
  }, [socialLinks, supportPhoneNumber]);
  const accessToken = useCustomerSession((s) => s.accessToken);
  const customerId = useCustomerSession((s) => s.customerId);
  const isSignedIn = Boolean(accessToken && customerId);
  const pathname = usePathname() ?? "";
  const activeCategoryId = getCategoryIdFromPathname(pathname);
  const searchActive =
    pathname === "/search" || pathname.startsWith("/search?");
  const acceptingOrders = isStoreAcceptingOrders(storeConfig);
  const ordersClosedMessage = getOrdersClosedMessage(
    storeConfig,
    t.checkout.ordersUnavailable,
  );
  return (
    <>
      <div className="sf-top-marquee border-b border-border/60 py-2 text-center text-[11px] font-semibold tracking-[0.16em] text-foreground/85 uppercase">
        {marqueeTexts.length > 0 ? (
          <div className="sf-marquee mx-auto max-w-7xl px-4 leading-relaxed">
            <div className="sf-marquee-track">
              {[0, 1].map((dup) => (
                <div className="sf-marquee-group" key={dup}>
                  {marqueeTexts.map((text, idx) => (
                    <span
                      key={`${dup}-${text}-${idx}`}
                      className="sf-marquee-pill inline-flex items-center whitespace-nowrap"
                    >
                      {idx > 0 ? (
                        <span className="me-3 opacity-50">•</span>
                      ) : null}
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="sticky top-0 z-40 w-full min-w-0">
        {storeConfig && !acceptingOrders ? (
          <OrdersClosedBanner message={ordersClosedMessage} />
        ) : null}
        <header className="w-full min-w-0 border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-xl backdrop-saturate-150 supports-backdrop-filter:bg-background/80">
        {/* Row 1: brand · search (centered) · actions */}
        <div className="mx-auto flex w-full min-w-0 max-w-7xl items-center gap-3 px-4 py-3.5 md:gap-4">
          <Link href="/" className="group block shrink-0 text-start transition">
            <span
              className="mb-2 block h-px w-8 bg-linear-to-r from-primary to-primary/30 transition-[width] duration-300 group-hover:w-11"
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
            <LocaleSwitcher current={currentLocale} languages={languages} />
            <Link
              href="/account"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "hidden rounded-full sm:inline-flex",
              )}
            >
              {t.nav.account}
            </Link>
            {!isSignedIn ? (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "hidden rounded-full font-medium sm:inline-flex",
                )}
              >
                {t.nav.signIn}
              </Link>
            ) : null}
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
          <div className="hidden w-full min-w-0 border-t border-border/55 bg-linear-to-b from-muted/25 to-muted/10 md:block">
            <HeaderCategoryNav categories={categories} />
          </div>
        ) : null}

        <div className="border-t border-border/60 px-4 py-2.5 md:hidden">
          <SearchBar />
        </div>
        </header>
      </div>

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
                      <div
                        id={`mobile-subcats-${c.id}`}
                        className="mt-1 py-0.5"
                      >
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
              {!isSignedIn ? (
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
              ) : null}
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      <main className="mx-auto w-full min-w-0 max-w-7xl flex-1 px-4 py-12 md:py-16">
        {children}
      </main>
      <footer className="mt-auto border-t border-border bg-linear-to-b from-muted/25 to-muted/40 py-14 text-sm text-muted-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <p className="font-heading text-lg font-medium text-foreground">
              {displayName}
            </p>
            <p className="mt-3 max-w-sm text-pretty leading-relaxed">
              {marqueeTexts[0]}
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
                <Link href="/cart" className="transition hover:text-foreground">
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
              {t.checkout.contact}
            </p>
            <div className="space-y-2">
              {supportEmail ? (
                <a
                  href={`mailto:${supportEmail}`}
                  className="block transition hover:text-foreground"
                >
                  {supportEmail}
                </a>
              ) : null}
              {supportPhoneNumber ? (
                <a
                  href={`tel:${supportPhoneNumber}`}
                  className="inline-flex items-center gap-2 transition hover:text-foreground"
                >
                  <Phone className="size-3.5 opacity-70" />
                  {supportPhoneNumber}
                </a>
              ) : null}
            </div>
            {footerSocialItems.length > 0 ? (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {footerSocialItems.map((item) => {
                  const href = toSocialHref(item.typeValue, item.link);
                  if (!href) return null;
                  const Icon = iconForSocialType(item.typeValue);
                  const typeName = socialMediaTypeName(item.typeValue);
                  return (
                    <a
                      key={item.id}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={typeName}
                      title={typeName}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/60 text-foreground/80 transition hover:border-primary/35 hover:text-foreground"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            ) : null}
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
