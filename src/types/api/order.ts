/** Mirrors `Ecommerce.Domain.Entities.Payments.PaymentMethod`. */
export const PaymentMethod = {
  Cash: 1,
  CreditCard: 2,
  BankTransfer: 3,
} as const;

export type PaymentMethodValue = (typeof PaymentMethod)[keyof typeof PaymentMethod];

/** Mirrors `Ecommerce.Domain.Entities.Orders.OrderShippingMethod`. */
export const OrderShippingMethod = {
  Delivery: 0,
  Pickup: 1,
} as const;

export type OrderShippingMethodValue =
  (typeof OrderShippingMethod)[keyof typeof OrderShippingMethod];

/** Mirrors `Ecommerce.Domain.Entities.Orders.OrderPaymentStatus`. */
export const OrderPaymentStatus = {
  Unpaid: 0,
  Paid: 1,
  Failed: 2,
  CreditJ5: 3,
} as const;

/** Mirrors `Ecommerce.Domain.Entities.Orders.OrderStatus`. */
export const OrderStatus = {
  Pending: 0,
  Confirmed: 1,
  Cancelled: 2,
  Done: 3,
} as const;

/** Mirrors backend `OrderShipmentStatus`. */
export const OrderShipmentStatus = {
  Pending: 0,
  Prepared: 1,
  ReadyForPickup: 2,
  OutForDelivery: 3,
  Delivered: 4,
} as const;

export type OrderShipmentStatusValue =
  (typeof OrderShipmentStatus)[keyof typeof OrderShipmentStatus];

/** Delivery: Pending → Prepared → Out for delivery → Delivered. */
export const SHIPMENT_PROGRESS_STATUSES_DELIVERY = [
  OrderShipmentStatus.Pending,
  OrderShipmentStatus.Prepared,
  OrderShipmentStatus.OutForDelivery,
  OrderShipmentStatus.Delivered,
] as const;

/** Pickup: Pending → Prepared → Ready for pickup → Delivered. */
export const SHIPMENT_PROGRESS_STATUSES_PICKUP = [
  OrderShipmentStatus.Pending,
  OrderShipmentStatus.Prepared,
  OrderShipmentStatus.ReadyForPickup,
  OrderShipmentStatus.Delivered,
] as const;

export type ShipmentProgressStatus =
  | (typeof SHIPMENT_PROGRESS_STATUSES_DELIVERY)[number]
  | (typeof SHIPMENT_PROGRESS_STATUSES_PICKUP)[number];

/** Progress steps for the order shipment stepper (depends on shipping method). */
export function getShipmentProgressStatuses(
  shippingMethod: number,
): readonly ShipmentProgressStatus[] {
  return shippingMethod === OrderShippingMethod.Pickup
    ? SHIPMENT_PROGRESS_STATUSES_PICKUP
    : SHIPMENT_PROGRESS_STATUSES_DELIVERY;
}

export type CustomerOrderLineProperty = {
  propertyName: string;
  propertyValueName: string;
};

export type CustomerOrderLine = {
  id: string;
  productId: string;
  mainImage?: string | null;
  title: string;
  quantity: number;
  price: number;
  finalPrice: number;
  customerNotes: string;
  properties: CustomerOrderLineProperty[];
};

export type CustomerOrderCoupon = {
  code: string;
};

export type CustomerOrderShipment = {
  shippingMethod: number;
  shipmentStatus: number;
  finalPrice: number;
  requiresAddress: boolean;
  customerShippingAddressId?: string | null;
  cityId?: string | null;
  cityName?: string | null;
  areaId?: string | null;
  areaName?: string | null;
  street?: string | null;
  streetNumber?: string | null;
  apartmentNumber?: string | null;
  apartmentFloor?: string | null;
  apartmentEntrance?: string | null;
  apartmentEntranceCode?: string | null;
  additionalEntranceCode?: string | null;
  addressNotes?: string | null;
  zipCode?: string | null;
};

export type CustomerOrderDetail = {
  id: string;
  number: number;
  productsTotalPriceAfterTax: number;
  totalSaved: number;
  finalPrice: number;
  coupon?: CustomerOrderCoupon | null;
  shipment?: CustomerOrderShipment | null;
  orderStatus: number;
  paymentMethod: number;
  paymentStatus: number;
  customerNotes: string;
  products: CustomerOrderLine[];
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderProductLine = {
  productId: string;
  quantity: number;
  price: number;
  isWeightBased?: boolean;
  customerNotes?: string | null;
  propertyValueIds: string[];
};

export type CheckoutOrderRequest = {
  couponCode?: string | null;
  shippingMethod: OrderShippingMethodValue;
  shippingAddressId?: string | null;
  orderProducts: CreateOrderProductLine[];
};

export type CheckoutOrderResponse = {
  taxPercentage: number;
  productsTotalPriceBeforeTax: number;
  productsTotalPriceAfterTax: number;
  productsTotalPriceBeforeTaxWithDiscount: number;
  totalPriceBeforeTax: number;
  totalPriceBeforeTaxWithDiscount: number;
  discountAmount: number;
  totalTaxAmount: number;
  /** Shipping amount included in checkout total (API: `shippingFinalPrice`). */
  shippingFinalPrice: number;
  totalSaved: number;
  finalPrice: number;
};

export type CreateOrderRequest = {
  paymentMethod: PaymentMethodValue;
  shippingMethod: OrderShippingMethodValue;
  shippingAddressId?: string | null;
  customerNotes?: string | null;
  couponCode?: string | null;
  tenantId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  orderProducts: CreateOrderProductLine[];
};

export type CreateOrderResponse = {
  orderId: string;
  orderNumber: number;
};

export type GetPaymentEmbeddedFrameRequest = {
  orderId: string;
};

export type GetPaymentEmbeddedFrameResponse = {
  embeddedFrameURL: string;
};

export type GetOrderPaymentStatusResponse = {
  orderId: string;
  paymentStatus: number;
  orderStatus: number;
};

export type CustomerOrderListItem = {
  id: string;
  number: number;
  orderStatus: number;
  paymentMethod: number;
  paymentStatus: number;
  finalPrice: number;
  createdAt: string;
};

export type SearchCustomerOrdersRequest = {
  orderStatus?: number | null;
  take?: number | null;
  skip?: number | null;
};

export type SearchCustomerOrdersResponse = {
  records: CustomerOrderListItem[];
  totalCount: number;
};

export type OrderGatewayContext = {
  language?: string;
  accessToken: string;
};

