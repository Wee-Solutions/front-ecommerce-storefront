import type { StorefrontProductReview } from "@/types/storefront-review";

/** Curated mock reviews for development (fashion tone). */
const REVIEWS_BY_PRODUCT: Record<string, StorefrontProductReview[]> = {
  "11111111-1111-4111-8111-000000000001": [
    {
      id: "r1",
      author: "Camille R.",
      rating: 5,
      date: "2025-02-12",
      title: "Stunning drape",
      body: "The silk catches light beautifully. I took my usual size and the length is perfect with heels.",
      verified: true,
    },
    {
      id: "r2",
      author: "Elena M.",
      rating: 4,
      date: "2025-01-28",
      title: "Worth the investment",
      body: "Feels expensive on the skin. Only note: dry clean only, so plan accordingly.",
      verified: true,
    },
  ],
  "11111111-1111-4111-8111-000000000002": [
    {
      id: "r3",
      author: "Jordan K.",
      rating: 5,
      date: "2025-02-02",
      title: "Cloud-soft",
      body: "My most-worn knit this winter. No pilling yet after several gentle washes.",
      verified: true,
    },
  ],
  "11111111-1111-4111-8111-000000000005": [
    {
      id: "r4",
      author: "Priya S.",
      rating: 5,
      date: "2025-01-15",
      title: "Carryall dream",
      body: "Fits laptop + water bottle + makeup bag. Leather has a gorgeous patina starting.",
      verified: true,
    },
    {
      id: "r5",
      author: "Louise T.",
      rating: 4,
      date: "2024-12-08",
      title: "Structured and chic",
      body: "Heavier than expected in a good way — feels substantial. Straps are comfortable.",
      verified: false,
    },
  ],
};

const GENERIC: StorefrontProductReview[] = [
  {
    id: "rg1",
    author: "Verified buyer",
    rating: 5,
    date: "2025-02-18",
    title: "Love it",
    body: "Beautiful quality and fast packaging. Will order again.",
    verified: true,
  },
];

export function getMockReviewsForProduct(
  productId: string
): StorefrontProductReview[] {
  return REVIEWS_BY_PRODUCT[productId] ?? GENERIC;
}
