export type CartLineRequest = {
  productId: string;
  quantity: number;
  unitPrice: number;
  isWeightBased: boolean;
  customerNotes?: string | null;
  propertyValueIds: string[];
};

export type CartItemData = {
  id: string;
  productId: string;
  mainImage?: string | null;
  title: string;
  quantity: number;
  unitPrice: number;
  currentUnitPrice: number;
  totalPrice: number;
  isPriceChanged: boolean;
  isWeightBased: boolean;
  customerNotes: string;
  propertyValueIds: string[];
};

export type RemovedCartProductData = {
  cartItemId: string;
  productId: string;
  mainImage?: string | null;
  title: string;
  quantity: number;
  propertyValueIds: string[];
};

export type CartResponse = {
  cartId: string;
  customerId?: string | null;
  guestId?: string | null;
  items: CartItemData[];
  removedProducts: RemovedCartProductData[];
};

export type AddCartItemRequest = {
  line: CartLineRequest;
};

export type UpdateCartItemRequest = {
  cartItemId: string;
  line: CartLineRequest;
};
