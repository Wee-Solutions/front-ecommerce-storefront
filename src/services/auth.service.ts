import { gatewayFetch } from "@/services/http/gateway-fetch";
import type {
  LoginRequest,
  LoginResponse,
  ResendVerificationCodeRequest,
  ResendVerificationCodeResponse,
  SendVerificationCodeRequest,
  SendVerificationCodeResponse,
} from "@/types/api/auth";

export function sendVerificationCode(
  vendorCode: string,
  body: SendVerificationCodeRequest,
  language = "en"
) {
  return gatewayFetch<SendVerificationCodeResponse>({
    vendorCode,
    path: "/auth/SendVerificationCode",
    method: "POST",
    body,
    language,
    cache: "no-store",
  });
}

export function resendVerificationCode(
  vendorCode: string,
  body: ResendVerificationCodeRequest,
  language = "en"
) {
  return gatewayFetch<ResendVerificationCodeResponse>({
    vendorCode,
    path: "/auth/ResendVerificationCode",
    method: "POST",
    body,
    language,
    cache: "no-store",
  });
}

export function loginCustomer(
  vendorCode: string,
  body: LoginRequest,
  language = "en"
) {
  return gatewayFetch<LoginResponse>({
    vendorCode,
    path: "/auth/Login",
    method: "POST",
    body,
    language,
    cache: "no-store",
  });
}
