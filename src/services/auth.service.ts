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
  body: SendVerificationCodeRequest,
  language = "en",
) {
  return gatewayFetch<SendVerificationCodeResponse>({
    path: "/auth/SendVerificationCode",
    method: "POST",
    body,
    language,
    cache: "no-store",
  });
}

export function resendVerificationCode(
  body: ResendVerificationCodeRequest,
  language = "en",
) {
  return gatewayFetch<ResendVerificationCodeResponse>({
    path: "/auth/ResendVerificationCode",
    method: "POST",
    body,
    language,
    cache: "no-store",
  });
}

export function loginCustomer(body: LoginRequest, language = "en") {
  const normalizedBody = {
    verificationId: body.verificationId,
    verificationCode: body.verificationCode,
    isPersistent: body.isPersistent ?? body.isPersistentLogin ?? true,
  };

  return gatewayFetch<LoginResponse>({
    path: "/auth/Token",
    method: "POST",
    body: normalizedBody,
    language,
    cache: "no-store",
  });
}
