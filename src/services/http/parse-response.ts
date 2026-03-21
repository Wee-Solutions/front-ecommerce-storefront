import type { GatewayResponse } from "@/types/api/gateway";
import { GatewayRequestError } from "@/types/api/gateway";

function isGatewayEnvelope(
  json: unknown
): json is GatewayResponse<unknown> & Record<string, unknown> {
  return (
    json !== null &&
    typeof json === "object" &&
    ("data" in json || "errorMessage" in json || "errorCode" in json)
  );
}

/**
 * Unwraps `GatewayResponse<T>` or returns JSON as T (e.g. client Login).
 */
export function parseClientJson<T>(json: unknown): T {
  if (isGatewayEnvelope(json)) {
    const err = json.errorMessage ?? json.errorCode;
    if (err) {
      throw new GatewayRequestError(String(err), 400, json);
    }
    if ("data" in json && json.data !== undefined) {
      return json.data as T;
    }
  }
  return json as T;
}

export async function readJsonSafe(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}
