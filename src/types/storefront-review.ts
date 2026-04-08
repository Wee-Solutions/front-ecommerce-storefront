/** Client-facing review row (e.g. mock catalog or future API). */
export type StorefrontProductReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
};
