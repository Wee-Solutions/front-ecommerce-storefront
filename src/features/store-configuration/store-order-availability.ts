import type { StoreConfiguration } from "@/types/api/configuration";

function readBooleanFlag(
  config: StoreConfiguration,
  camel: "acceptOrders",
  pascal: "AcceptOrders",
): boolean | undefined {
  const raw =
    config[camel] ??
    (config as StoreConfiguration & { AcceptOrders?: unknown }).AcceptOrders;
  if (typeof raw === "boolean") return raw;
  return undefined;
}

function readOptionalString(
  config: StoreConfiguration,
  camel: "ordersClosedMessage",
  pascal: "OrdersClosedMessage",
): string | null {
  const raw =
    config[camel] ??
    (config as StoreConfiguration & { OrdersClosedMessage?: unknown })
      .OrdersClosedMessage;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/** Defaults to true when the flag is missing (matches backend default). */
export function isStoreAcceptingOrders(
  config: StoreConfiguration | null | undefined,
): boolean {
  if (!config) return true;
  return readBooleanFlag(config, "acceptOrders", "AcceptOrders") !== false;
}

export function getOrdersClosedMessage(
  config: StoreConfiguration | null | undefined,
  fallback: string,
): string {
  if (!config) return fallback;
  return readOptionalString(config, "ordersClosedMessage", "OrdersClosedMessage") ?? fallback;
}
