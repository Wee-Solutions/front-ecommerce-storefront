/** Mirrors `Ecommerce.Domain.Entities.Events.EventType` (numeric JSON). */
export const EventType = {
  ViewProduct: 0,
  ViewCategory: 1,
  SearchProducts: 2,
  AddProductToCart: 3,
  UpdateCartItem: 4,
  RemoveFromCart: 5,
  ViewCart: 6,
  BeginCheckout: 7,
  Checkout: 8,
  ApplyCoupon: 9,
  RemoveCoupon: 10,
  ViewOrderConfirmation: 11,
  Login: 12,
  Register: 13,
} as const;

export type EventTypeValue = (typeof EventType)[keyof typeof EventType];

export type EventPayload = {
  quantity?: number;
  propertyValueIds?: string[];
  cartItemId?: string;
  searchTerm?: string;
  paymentMethod?: string;
  couponCode?: string;
};

export type TrackEventItem = {
  type: EventTypeValue;
  occurredAt?: string;
  tenantId?: string;
  productId?: string;
  categoryId?: string;
  orderId?: string;
  cartId?: string;
  payload?: EventPayload;
};

export type TrackEventsRequest = {
  events: TrackEventItem[];
};
