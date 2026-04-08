/**
 * Mock API mode — no backend required.
 *
 * Enable: set `NEXT_PUBLIC_USE_MOCK_API=true` in `.env.local` (or the environment).
 * Disable: remove the variable or set to anything other than `true`.
 *
 * All catalog traffic is served from `src/mocks/`; `gatewayFetch` is not called for
 * products/categories while this is on. Connect the real API by turning this off.
 */
export function isMockApiEnabled(): boolean {
  return process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
}
