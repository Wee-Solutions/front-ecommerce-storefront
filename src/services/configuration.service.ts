import { cache } from "react";
import { gatewayFetch } from "@/services/http/gateway-fetch";
import type {
  GetCitySelectionListRequest,
  GetCitySelectionListResponse,
  StoreConfiguration,
} from "@/types/api/configuration";

/**
 * Fetches store configuration once per server request for a given locale
 * (dedupes `generateMetadata` + layout). `Vendor-Code` comes from env.
 */
export function getCitySelectionList(
  body: GetCitySelectionListRequest,
  accessToken: string,
  language = "en",
) {
  return gatewayFetch<GetCitySelectionListResponse>({
    path: "/Configurations/GetCitySelectionList",
    method: "POST",
    body,
    language,
    accessToken,
    cache: "no-store",
  });
}

export const getStoreConfiguration = cache(
  async (language = "en"): Promise<StoreConfiguration> => {
    return gatewayFetch<StoreConfiguration>({
      path: "/Configurations",
      method: "GET",
      language,
      cache: "no-store",
    });
  },
);
