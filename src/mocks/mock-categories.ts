import { MOCK_CATEGORY_TREE } from "@/mocks/fashion-catalog";

export function mockGetCategoryTree() {
  return {
    categoriesTree: structuredClone(MOCK_CATEGORY_TREE),
  };
}
