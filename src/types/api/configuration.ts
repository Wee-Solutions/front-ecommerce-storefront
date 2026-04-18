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
    type: string;
    link: string;
  }[];
};
