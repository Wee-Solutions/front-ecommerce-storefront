import { env, getGatewayBaseUrl } from "@/config/env";
import { getOrCreateGuestIdentifier } from "@/lib/guest-identifier";
import { GatewayRequestError } from "@/types/api/gateway";
import { readGatewayErrorMessage } from "./gateway-error-message";
import { parseClientJson, readJsonSafe } from "./parse-response";

const API = "/api/v1/client";

export type GatewayFetchOptions = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  language?: string;
  /** Customer Bearer token when required */
  accessToken?: string | null;
  /**
   * Overrides the default `Guest-Identifier` header.
   * When omitted in the browser, a persisted anonymous id is sent automatically.
   */
  guestIdentifier?: string | null;
  /** When true, do not attach `Guest-Identifier` even in the browser. */
  skipGuestIdentifier?: boolean;
  cache?: RequestCache;
  next?: { revalidate?: number; tags?: string[] };
};

export async function gatewayFetch<T>(
  options: GatewayFetchOptions,
): Promise<T> {
  const {
    path,
    method = "GET",
    body,
    language = "en",
    accessToken,
    guestIdentifier,
    skipGuestIdentifier = false,
    cache,
    next,
  } = options;

  const url = `${getGatewayBaseUrl()}${API}${path}`;
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Accept-Language": language,
    "Vendor-Code": env.vendorCode,
    "Frontend-Platform": "W",
    "Frontend-Platform-Version": "1",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  if (!skipGuestIdentifier) {
    const guestHeader =
      guestIdentifier?.trim() ||
      (typeof window !== "undefined"
        ? getOrCreateGuestIdentifier().trim()
        : "");
    if (guestHeader) {
      headers["Guest-Identifier"] = guestHeader;
    }
  }

  const usesNextDataCache =
    next?.revalidate !== undefined || (next?.tags?.length ?? 0) > 0;

  const init: RequestInit = {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };

  if (next) {
    init.next = next;
  }

  // Next.js forbids combining `cache: "no-store"` with `next.revalidate`.
  if (!usesNextDataCache) {
    init.cache = cache ?? "no-store";
  }

  const res = await fetch(url, init);
  const raw = await readJsonSafe(res);

  if (!res.ok) {
    const msg = readGatewayErrorMessage(raw) ?? res.statusText;
    throw new GatewayRequestError(msg, res.status, raw);
  }

  try {
    return parseClientJson<T>(raw);
  } catch (e) {
    if (e instanceof GatewayRequestError) throw e;
    throw new GatewayRequestError(
      e instanceof Error ? e.message : "Invalid response",
      res.status,
      raw,
    );
  }
}
