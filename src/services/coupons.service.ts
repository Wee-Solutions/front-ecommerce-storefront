import { gatewayFetch } from "@/services/http/gateway-fetch";
import type {
  ValidateCouponRequest,
  ValidateCouponResponse,
} from "@/types/api/coupon";

export function validateCoupon(
  body: ValidateCouponRequest,
  accessToken: string,
  language = "en",
) {
  return gatewayFetch<ValidateCouponResponse>({
    path: "/coupons/Validate",
    method: "POST",
    body,
    language,
    accessToken,
    cache: "no-store",
  });
}
