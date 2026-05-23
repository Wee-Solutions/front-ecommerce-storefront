const STORAGE_KEY = "sf-guest-external-id";

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/**
 * Stable anonymous id sent as `Guest-Identifier` on storefront client APIs.
 * Persists across sessions so guest carts and orders stay linked until login merge.
 */
export function getOrCreateGuestIdentifier(): string {
  if (typeof window === "undefined") {
    return "";
  }
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing && existing.trim().length > 0) {
      return existing.trim();
    }
    const next = randomId();
    window.localStorage.setItem(STORAGE_KEY, next);
    return next;
  } catch {
    return randomId();
  }
}
