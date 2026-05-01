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
};
