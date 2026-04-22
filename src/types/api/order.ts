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

