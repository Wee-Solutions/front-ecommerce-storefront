export const env = {
  gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL ?? "http://localhost:5000",
  /** Fallback vendor when host has no mapping (e.g. plain localhost). */
  defaultVendorCode:
    process.env.NEXT_PUBLIC_DEFAULT_VENDOR_CODE ?? "DEMO_VENDOR",
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
