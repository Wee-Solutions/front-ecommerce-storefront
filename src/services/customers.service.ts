import { gatewayFetch } from "@/services/http/gateway-fetch";
import type { RegisterRequest, RegisterResponse } from "@/types/api/auth";

export function registerCustomer(body: RegisterRequest, language = "en") {
  return gatewayFetch<RegisterResponse>({
    path: "/customers/Register",
    method: "POST",
    body,
    language,
    cache: "no-store",
  });
}
