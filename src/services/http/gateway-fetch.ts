import { env, getGatewayBaseUrl } from "@/config/env";
import { GatewayRequestError } from "@/types/api/gateway";
import { parseClientJson, readJsonSafe } from "./parse-response";

const API = "/api/v1/client";

export type GatewayFetchOptions = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  language?: string;
  /** Customer Bearer token when required */
  accessToken?: string | null;
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
    "Tenant-Id": env.tenantId,
    "Vendor-Id": env.vendorId,
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const init: RequestInit = {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: cache ?? "default",
    next,
  };

  const res = await fetch(url, init);
  const raw = await readJsonSafe(res);

  if (!res.ok) {
    const msg =
      raw &&
      typeof raw === "object" &&
      raw !== null &&
      "errorMessage" in raw &&
      typeof (raw as { errorMessage?: string }).errorMessage === "string"
        ? (raw as { errorMessage: string }).errorMessage
        : typeof raw === "object" &&
            raw !== null &&
            "errorCode" in raw &&
            typeof (raw as { errorCode?: string }).errorCode === "string"
          ? (raw as { errorCode: string }).errorCode
          : res.statusText;
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
