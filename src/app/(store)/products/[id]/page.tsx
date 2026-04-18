import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { RelatedProducts } from "@/components/catalog/related-products";
import { ReviewSection } from "@/components/product/review-section";
import { ProductDetailCommerce } from "@/features/catalog/product-detail-commerce";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { isGuid } from "@/lib/guards";
import { isMockApiEnabled } from "@/config/mock-mode";
import { detailHighlights } from "@/lib/product-display";
import { getServerStoreContext } from "@/lib/tenant/server-store";
import { getMockReviewsForProduct } from "@/mocks/mock-reviews";
import { getProductById } from "@/services/products.service";
import { GatewayRequestError } from "@/types/api/gateway";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const ctx = await getServerStoreContext();
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  if (!ctx || !isGuid(id)) return { title: dict.product.pageFallback };
  try {
    const product = await getProductById(id, locale);
    const desc =
      product.subTitle ||
      (product.description?.includes("<")
        ? undefined
        : product.description?.slice(0, 160));
    return {
      title: product.title,
      description: desc,
      openGraph: {
        title: product.title,
        description: desc,
        images: product.mainImage?.url ? [{ url: product.mainImage.url }] : [],
      },
    };
  } catch {
    return { title: dict.product.pageFallback };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const ctx = await getServerStoreContext();
  if (!ctx) return null;

  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  let product;
  try {
    product = await getProductById(id, locale);
  } catch (e) {
    if (e instanceof GatewayRequestError && e.status === 404) notFound();
    throw e;
  }

  const categoryIds = product.categories.map((c) => c.id);
  const pdpHighlights = detailHighlights(product, 6);

  return (
    <div>
      <nav
        className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="rounded-full border border-border/70 bg-card/80 px-3 py-1 transition hover:border-primary/30 hover:text-foreground"
        >
          {dict.product.home}
        </Link>
        {product.categories[0] && (
          <>
            <span className="text-border" aria-hidden>
              /
            </span>
            <Link
              href={`/c/${product.categories[0].id}`}
              className="rounded-full border border-border/70 bg-card/80 px-3 py-1 transition hover:border-primary/30 hover:text-foreground"
            >
              {product.categories[0].name}
            </Link>
          </>
        )}
        <span className="text-border" aria-hidden>
          /
        </span>
        <span className="line-clamp-1 max-w-[min(100%,14rem)] rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-foreground sm:max-w-md">
          {product.title}
        </span>
      </nav>

      <ProductDetailCommerce
        product={product}
        highlights={pdpHighlights}
        labels={{
          styleCode: dict.product.styleCode,
          details: dict.product.details,
          noDescription: dict.product.noDescription,
        }}
      />

      <ReviewSection
        productId={product.id}
        title={dict.product.reviewsTitle}
        description={dict.product.reviewsPlaceholder}
        reviews={
          isMockApiEnabled() ? getMockReviewsForProduct(product.id) : undefined
        }
      />

      <Suspense
        fallback={
          <div className="sf-shimmer mt-16 h-40 rounded-[var(--sf-radius)]" />
        }
      >
        <RelatedProducts
          categoryIds={categoryIds}
          excludeProductId={product.id}
          language={locale}
          title={dict.product.related}
        />
      </Suspense>
    </div>
  );
}
