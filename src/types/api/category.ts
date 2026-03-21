export type CategoryTreeItem = {
  id: string;
  name: string;
  description: string;
  iconImageURL?: string;
  mainImageURL?: string;
  bannerImages: string[];
  parentCategoryId?: string | null;
  productsCount: number;
  subCategories: CategoryTreeItem[];
};

export type CategoryTreeRequest = {
  categoryId?: string | null;
};

export type CategoryTreeResponse = {
  categoriesTree?: CategoryTreeItem[];
  /** Some serializers may emit PascalCase */
  CategoriesTree?: CategoryTreeItem[];
};
