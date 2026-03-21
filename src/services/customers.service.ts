import { gatewayFetch } from "@/services/http/gateway-fetch";
import type { RegisterRequest, RegisterResponse } from "@/types/api/auth";

export function registerCustomer(
  vendorCode: string,
  body: RegisterRequest,
  language = "en"
) {
  return gatewayFetch<RegisterResponse>({
    vendorCode,
    path: "/customers/Register",
    method: "POST",
    body,
    language,
    cache: "no-store",
  });
}
