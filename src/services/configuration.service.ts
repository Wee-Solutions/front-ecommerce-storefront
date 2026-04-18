import { cache } from "react";
import { env } from "@/config/env";
import { gatewayFetch } from "@/services/http/gateway-fetch";
import type { StoreConfiguration } from "@/types/api/configuration";

/** Vendor-facing config changes rarely; align with “load once” UX via long ISR. */
const CONFIG_REVALIDATE_SECONDS = 3600;

/**
 * Fetches store configuration once per server request for a given locale
 * (dedupes `generateMetadata` + layout). `Vendor-Code` comes from env.
 */
export const getStoreConfiguration = cache(
  async (language = "en"): Promise<StoreConfiguration> => {
    return gatewayFetch<StoreConfiguration>({
      path: "/Configurations",
      method: "GET",
      language,
      next: {
        revalidate: CONFIG_REVALIDATE_SECONDS,
        tags: [`store-config:${env.vendorCode}`],
      },
    });
  },
);
