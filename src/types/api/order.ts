/** Mirrors `Ecommerce.Domain.Entities.Payments.PaymentMethod`. */
export const PaymentMethod = {
  Cash: 1,
  CreditCard: 2,
  BankTransfer: 3,
} as const;

export type PaymentMethodValue = (typeof PaymentMethod)[keyof typeof PaymentMethod];

/** Mirrors `Ecommerce.Domain.Entities.Orders.OrderPaymentStatus`. */
export const OrderPaymentStatus = {
  Unpaid: 0,
  Paid: 1,
  Failed: 2,
} as const;

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
  customerNotes?: string | null;
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
  accessToken?: string | null;
  /**
   * Required for guest checkout so `Create` and `GetPaymentEmbeddedFrame` resolve the same guest.
   * Omit when `accessToken` is set (logged-in customer).
   */
  guestIdentifier?: string | null;
};

