export enum VendorSocialMediaType {
  Instagram = 0,
  Facebook = 1,
  TikTok = 2,
  YouTube = 3,
  X = 4,
  LinkedIn = 5,
  Snapchat = 6,
  Telegram = 7,
  WhatsApp = 8,
}

/** Mirrors `Ecommerce.Domain.Entities.Payments.PaymentMethod` (numeric). */
export type StoreBankInfo = {
  bankName: string;
  branchNumber: string;
  accountNumber: string;
  accountOwnerName: string;
  iban?: string | null;
};

export type SelectionListItem = {
  id: string;
  name: string;
};

export type StoreTenant = {
  id: string;
  name: string;
};

export type GetCitySelectionListRequest = {
  searchTerm?: string;
  take?: number;
  skip?: number;
};

export type GetCitySelectionListResponse = {
  records: SelectionListItem[];
  totalCount: number;
};

export type StoreConfiguration = {
  name: string;
  supportEmail: string;
  supportPhoneNumber: string;
  iconImage?: string | null;
  bannerImage?: string | null;
  favicon?: string | null;
  languages: {
    name?: string;
    languageCode: string;
    isDefault: boolean;
  }[];
  socialMediaLinks: {
    type: VendorSocialMediaType | string;
    link: string;
  }[];
  marqueeTexts: string[];
  /** Enabled payment methods for this vendor (e.g. 1 cash, 2 card, 3 bank). */
  supportedPaymentMethods: number[];
  bankInfo?: StoreBankInfo | null;
  tenants: StoreTenant[];
  /** When false, checkout is disabled and a store-wide notice is shown. */
  acceptOrders?: boolean;
  /** Optional message shown when `acceptOrders` is false. */
  ordersClosedMessage?: string | null;
};
