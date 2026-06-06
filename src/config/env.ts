export const env = {
  gatewayUrl:
    process.env.NEXT_PUBLIC_GATEWAY_URL ??
    "https://ecommercegateway.orangegrass-5a987816.uaenorth.azurecontainerapps.io/",
  /** Fallback vendor when host has no mapping (e.g. plain localhost). */
  // defaultVendorCode:
  //   process.env.NEXT_PUBLIC_DEFAULT_VENDOR_CODE ?? "DEMO_VENDOR",
  /** Sent on every gateway request as the `Vendor-Code` header. */
  vendorCode: process.env.NEXT_PUBLIC_VENDOR_CODE ?? "selva",
  /**
   * ISO 4217 code for price display (default Israeli new shekel).
   * Override with `NEXT_PUBLIC_STORE_CURRENCY` (e.g. USD, EUR). Legacy: `NEXT_PUBLIC_CURRENCY`.
   */
  storeCurrency:
    process.env.NEXT_PUBLIC_STORE_CURRENCY ??
    process.env.NEXT_PUBLIC_CURRENCY ??
    "ILS",
  defaultThemeId: process.env.NEXT_PUBLIC_DEFAULT_THEME_ID ?? "store1",
  isDev: process.env.NODE_ENV === "development",
  /**
   * When true, product/category APIs use `src/mocks` instead of the gateway.
   * @see `src/config/mock-mode.ts`
   */
  useMockApi: process.env.NEXT_PUBLIC_USE_MOCK_API === "true",
};

export function getGatewayBaseUrl(): string {
  return env.gatewayUrl.replace(/\/$/, "");
}
