import { isMockApiEnabled } from "@/config/mock-mode";
import { env } from "@/config/env";
import { isGuid } from "@/lib/guards";
import {
  trackEvents,
  type EventGatewayContext,
} from "@/services/events.service";
import {
  EventType,
  type EventPayload,
  type EventTypeValue,
  type TrackEventItem,
} from "@/types/api/events";

const MAX_BATCH = 50;
const FLUSH_DEBOUNCE_MS = 2000;

let buffer: TrackEventItem[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let flushPromise: Promise<void> | null = null;
let gatewayContext: EventGatewayContext = { language: "en" };

export function setEventGatewayContext(ctx: EventGatewayContext): void {
  gatewayContext = { ...gatewayContext, ...ctx };
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function scheduleFlush(): void {
  if (!isBrowser() || flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flushEventBuffer();
  }, FLUSH_DEBOUNCE_MS);
}

function withTenant(item: TrackEventItem): TrackEventItem {
  if (item.tenantId) return item;
  return { ...item, tenantId: env.tenantId };
}

function validatePayloadObject(
  payload: EventPayload | undefined,
): payload is EventPayload {
  return payload !== undefined && typeof payload === "object";
}

function validateEvent(item: TrackEventItem): boolean {
  switch (item.type as EventTypeValue) {
    case EventType.ViewProduct:
      return Boolean(item.productId && isGuid(item.productId));
    case EventType.ViewCategory:
      return Boolean(item.categoryId && isGuid(item.categoryId));
    case EventType.SearchProducts:
      return Boolean(item.payload?.searchTerm?.trim());
    case EventType.AddProductToCart:
      return (
        Boolean(item.productId && isGuid(item.productId)) &&
        validatePayloadObject(item.payload) &&
        typeof item.payload.quantity === "number" &&
        item.payload.quantity > 0
      );
    case EventType.UpdateCartItem:
      return (
        validatePayloadObject(item.payload) &&
        Boolean(item.payload.cartItemId && isGuid(item.payload.cartItemId)) &&
        typeof item.payload.quantity === "number" &&
        item.payload.quantity > 0
      );
    case EventType.RemoveFromCart:
      return (
        Boolean(item.productId && isGuid(item.productId)) &&
        validatePayloadObject(item.payload)
      );
    case EventType.ViewCart:
    case EventType.BeginCheckout:
    case EventType.Login:
    case EventType.Register:
      return true;
    case EventType.Checkout:
      return (
        Boolean(item.orderId && isGuid(item.orderId)) &&
        Boolean(item.payload?.paymentMethod?.trim())
      );
    case EventType.ApplyCoupon:
    case EventType.RemoveCoupon:
      return Boolean(item.payload?.couponCode?.trim());
    case EventType.ViewOrderConfirmation:
      return Boolean(item.orderId && isGuid(item.orderId));
    default:
      return false;
  }
}

export function enqueueTrackEvent(item: TrackEventItem): void {
  if (!isBrowser() || isMockApiEnabled()) return;

  const normalized = withTenant(item);
  if (!validateEvent(normalized)) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[events] skipped invalid event", normalized);
    }
    return;
  }

  buffer.push(normalized);
  if (buffer.length >= MAX_BATCH) {
    void flushEventBuffer();
  } else {
    scheduleFlush();
  }
}

export function enqueueTrackEvents(items: TrackEventItem[]): void {
  for (const item of items) enqueueTrackEvent(item);
}

export async function flushEventBuffer(): Promise<void> {
  if (!isBrowser() || isMockApiEnabled() || buffer.length === 0) return;

  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }

  if (flushPromise) {
    await flushPromise;
    if (buffer.length === 0) return;
  }

  const batch = buffer.splice(0, MAX_BATCH);
  flushPromise = trackEvents({ events: batch }, gatewayContext)
    .catch(() => {
      buffer.unshift(...batch);
    })
    .finally(() => {
      flushPromise = null;
    });

  await flushPromise;

  if (buffer.length > 0) {
    scheduleFlush();
  }
}
