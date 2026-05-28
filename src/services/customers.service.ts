import { gatewayFetch } from "@/services/http/gateway-fetch";
import type { RegisterRequest, RegisterResponse } from "@/types/api/auth";
import type {
  CustomerProfile,
  GetShipmentInfosResponse,
  UpsertShipmentInfoRequest,
  UpdateCustomerPhoneRequest,
  UpdateCustomerProfileRequest,
} from "@/types/api/customer";

export function registerCustomer(body: RegisterRequest, language = "en") {
  return gatewayFetch<RegisterResponse>({
    path: "/customers/Register",
    method: "POST",
    body,
    language,
    cache: "no-store",
  });
}

export function getCustomerProfile(
  accessToken: string,
  language = "en",
) {
  return gatewayFetch<CustomerProfile>({
    path: "/customers/GetProfile",
    method: "GET",
    language,
    accessToken,
    cache: "no-store",
  });
}

export function updateCustomerProfile(
  body: UpdateCustomerProfileRequest,
  accessToken: string,
  language = "en",
) {
  return gatewayFetch<Record<string, never>>({
    path: "/customers/UpdateProfile",
    method: "PUT",
    body,
    language,
    accessToken,
    cache: "no-store",
  });
}

export function updateCustomerPhoneNumber(
  body: UpdateCustomerPhoneRequest,
  accessToken: string,
  language = "en",
) {
  return gatewayFetch<Record<string, never>>({
    path: "/customers/UpdatePhoneNumber",
    method: "PUT",
    body,
    language,
    accessToken,
    cache: "no-store",
  });
}

export function getCustomerShipmentInfos(
  accessToken: string,
  language = "en",
) {
  return gatewayFetch<GetShipmentInfosResponse>({
    path: "/customers/GetShippingAddresses",
    method: "GET",
    language,
    accessToken,
    cache: "no-store",
  });
}

export function createCustomerShipmentInfo(
  body: UpsertShipmentInfoRequest,
  accessToken: string,
  language = "en",
) {
  return gatewayFetch<{ id: string }>({
    path: "/customers/CreateShippingAddress",
    method: "POST",
    body,
    language,
    accessToken,
    cache: "no-store",
  });
}

export function updateCustomerShipmentInfo(
  shipmentInfoId: string,
  body: UpsertShipmentInfoRequest & { isActive: boolean },
  accessToken: string,
  language = "en",
) {
  return gatewayFetch<Record<string, never>>({
    path: `/customers/UpdateShippingAddress/${shipmentInfoId}`,
    method: "PUT",
    body,
    language,
    accessToken,
    cache: "no-store",
  });
}

export function deleteCustomerShipmentInfo(
  shipmentInfoId: string,
  accessToken: string,
  language = "en",
) {
  return gatewayFetch<Record<string, never>>({
    path: `/customers/DeleteShippingAddress/${shipmentInfoId}`,
    method: "DELETE",
    language,
    accessToken,
    cache: "no-store",
  });
}
