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
};
