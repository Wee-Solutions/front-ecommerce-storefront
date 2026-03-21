import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { RelatedProducts } from "@/components/catalog/related-products";
import { ProductGallery } from "@/components/product/product-gallery";
import { ReviewSection } from "@/components/product/review-section";
import { ProductPurchasePanel } from "@/features/catalog/product-purchase-panel";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { isGuid } from "@/lib/guards";
import { getServerStoreContext } from "@/lib/tenant/server-store";
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
    const product = await getProductById(ctx.vendorCode, id, locale);
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
  if (!isGuid(id)) notFound();

  const ctx = await getServerStoreContext();
  if (!ctx) return null;

  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  let product;
  try {
    product = await getProductById(ctx.vendorCode, id, locale);
  } catch (e) {
    if (e instanceof GatewayRequestError && e.status === 404) notFound();
    throw e;
  }

  const categoryIds = product.categories.map((c) => c.id);

  return (
    <div>
      <nav className="mb-6 text-sm text-[var(--sf-color-muted)]">
        <Link
          href="/"
          className="transition hover:text-[var(--sf-color-primary)]"
        >
          {dict.product.home}
        </Link>
        {product.categories[0] && (
          <>
            <span className="mx-2 opacity-50">/</span>
            <Link
              href={`/c/${product.categories[0].id}`}
              className="transition hover:text-[var(--sf-color-primary)]"
            >
              {product.categories[0].name}
            </Link>
          </>
        )}
        <span className="mx-2 opacity-50">/</span>
        <span className="line-clamp-1 text-[var(--sf-color-primary)]">
          {product.title}
        </span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery
          mainImage={product.mainImage}
          images={product.images}
          title={product.title}
        />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--sf-color-primary)] sm:text-3xl md:text-4xl">
            {product.title}
          </h1>
          {product.subTitle && (
            <p className="mt-3 text-sm leading-relaxed text-[var(--sf-color-muted)]">
              {product.subTitle}
            </p>
          )}
          <ProductPurchasePanel product={product} />
          <div className="mt-10 space-y-3 text-sm leading-relaxed">
            {product.description?.includes("<") ? (
              <div
                className="text-[var(--sf-color-muted)] [&_a]:text-[var(--sf-color-accent)] [&_a]:underline"
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />
            ) : (
              <p className="whitespace-pre-wrap text-[var(--sf-color-muted)]">
                {product.description || dict.product.noDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      <ReviewSection
        productId={product.id}
        title={dict.product.reviewsTitle}
        description={dict.product.reviewsPlaceholder}
      />

      <Suspense
        fallback={
          <div className="sf-shimmer mt-16 h-40 rounded-[var(--sf-radius)]" />
        }
      >
        <RelatedProducts
          vendorCode={ctx.vendorCode}
          categoryIds={categoryIds}
          excludeProductId={product.id}
          language={locale}
          title={dict.product.related}
        />
      </Suspense>
    </div>
  );
}
