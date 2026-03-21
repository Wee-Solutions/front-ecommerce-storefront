export type ProductSearchRequest = {
  productsIds?: string[] | null;
  searchTerm?: string | null;
  isHomePageProducts?: boolean | null;
  categoriesIds?: string[] | null;
  brandsIds?: number[] | null;
  skip?: number | null;
  take?: number | null;
};

export type ProductListItem = {
  id: string;
  vendorId: string;
  title: string;
  subTitle: string;
  mainImage?: string | null;
  price?: number | null;
  oldPrice?: number | null;
  baseUnit: string;
  quantity?: number | null;
  reserved?: number | null;
  sku?: string | null;
  barcode?: string | null;
  isActive: boolean;
  isDisplayInHomePage: boolean;
  isVATExcluded: boolean;
  isWeightBased: boolean;
};

export type ProductSearchResponse = {
  totalCount?: number;
  TotalCount?: number;
  products?: ProductListItem[];
  Products?: ProductListItem[];
};

export type ImageItem = { id: string; url: string };

export type ProductDetail = {
  id: string;
  vendorId: string;
  title: string;
  subTitle: string;
  description: string;
  mainImage?: ImageItem | null;
  images: ImageItem[];
  price?: number | null;
  oldPrice?: number | null;
  baseUnit: {
    id: string;
    category: number;
    name: string;
  };
  quantity?: number | null;
  reserved?: number | null;
  isVATExcluded: boolean;
  isWeightBased: boolean;
  sku?: string | null;
  barcode?: string | null;
  isDisplayInHomePage: boolean;
  isActive: boolean;
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  properties: {
    propertyId: string;
    propertyName: string;
    values: { propertyValueId: string; value: string }[];
  }[];
  variants: {
    id: string;
    sku?: string | null;
    barcode?: string | null;
    price?: number | null;
    priceByWeight?: number | null;
    oldPrice?: number | null;
    oldPriceByWeight?: number | null;
    images: ImageItem[];
    propertyValues: {
      propertyValueId: string;
      propertyName: string;
      value: string;
    }[];
    inventory?: { quantity: number; reserved: number } | null;
  }[];
};

export type GetProductPriceRequest = {
  productId: string;
  propertyValueIds: string[];
};

export type GetProductPriceResponse = {
  price?: number | null;
  isVariantPrice: boolean;
  variantId?: string | null;
};

export type GetProductInventoryRequest = {
  productId: string;
  propertyValueIds: string[];
};

export type GetProductInventoryResponse = {
  quantity?: number | null;
  reserved?: number | null;
  available?: number | null;
  isVariantInventory: boolean;
  variantId?: string | null;
};
