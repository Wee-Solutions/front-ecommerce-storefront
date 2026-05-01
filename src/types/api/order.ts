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
  totalPriceAfterTax: number;
  customerNotes: string;
  properties: CustomerOrderLineProperty[];
};

export type CustomerOrderDetail = {
  id: string;
  number: number;
  taxRatePercentage: number;
  totalPriceBeforeTax: number;
  totalTaxAmount: number;
  totalPriceAfterTax: number;
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
  totalPriceAfterTax: number;
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

