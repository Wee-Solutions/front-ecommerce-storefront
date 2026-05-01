import type { OrderGatewayContext } from "@/types/api/order";

export function authenticatedOrderContext(
  locale: string,
  accessToken: string,
): OrderGatewayContext {
  return { language: locale, accessToken };
}
