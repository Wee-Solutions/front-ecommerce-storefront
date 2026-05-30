import { gatewayFetch } from "@/services/http/gateway-fetch";
import type { TrackEventsRequest } from "@/types/api/events";

export type EventGatewayContext = {
  language?: string;
  accessToken?: string | null;
};

function eventFetchOptions(ctx: EventGatewayContext = {}) {
  const { language = "en", accessToken } = ctx;
  return {
    language,
    accessToken: accessToken ?? undefined,
    cache: "no-store" as const,
  };
}

/** POST /api/v1/client/events/Track — anonymous; standard client headers only. */
export function trackEvents(
  body: TrackEventsRequest,
  ctx: EventGatewayContext = {},
) {
  return gatewayFetch<void>({
    path: "/events/Track",
    method: "POST",
    body,
    ...eventFetchOptions(ctx),
  });
}
