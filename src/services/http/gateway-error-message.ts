import { GatewayRequestError } from "@/types/api/gateway";

/** Reads `errorMessage` / `ErrorMessage` (or code) from a gateway error payload. */
export function readGatewayErrorMessage(raw: unknown): string | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const message = obj.errorMessage ?? obj.ErrorMessage;
  const code = obj.errorCode ?? obj.ErrorCode;
  if (typeof message === "string" && message.trim()) return message.trim();
  if (typeof code === "string" && code.trim()) return code.trim();
  return null;
}

export function getGatewayRequestErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (error instanceof GatewayRequestError) {
    const fromBody = readGatewayErrorMessage(error.body);
    if (fromBody) return fromBody;
    if (error.message.trim()) return error.message.trim();
  }
  return fallback;
}
