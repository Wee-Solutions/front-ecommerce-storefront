import { isMockApiEnabled } from "@/config/mock-mode";
import { mockGetCategoryTree } from "@/mocks/mock-categories";
import { gatewayFetch } from "@/services/http/gateway-fetch";
import type {
  CategoryTreeRequest,
  CategoryTreeResponse,
} from "@/types/api/category";

const REVALIDATE = 300;

export async function getCategoryTree(
  request: CategoryTreeRequest = {},
  language = "en",
) {
  if (isMockApiEnabled()) {
    void request;
    void language;
    return mockGetCategoryTree();
  }

  const raw = await gatewayFetch<CategoryTreeResponse>({
    path: "/categories/GetTree",
    method: "POST",
    body: request,
    language,
    next: { revalidate: REVALIDATE },
  });
  const categoriesTree = raw.categoriesTree ?? raw.CategoriesTree ?? [];
  return { categoriesTree };
}
