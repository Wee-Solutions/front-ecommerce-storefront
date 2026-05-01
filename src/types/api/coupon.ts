/** Mirrors `Ecommerce.Domain.CouponDiscountType`. */
export const CouponDiscountType = {
  Percentage: 0,
  FixedAmount: 1,
  FreeShipping: 2,
  PercentageAndFreeShipping: 3,
} as const;

export type ValidateCouponRequest = {
  couponCode: string;
  orderAmount: number;
  productIds: string[];
};

export type ValidateCouponResponse = {
  couponCode: string;
  discountType: number;
  discountValue: number;
  discountAmount: number;
};
