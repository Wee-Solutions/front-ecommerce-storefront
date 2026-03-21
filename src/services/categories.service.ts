import { gatewayFetch } from "@/services/http/gateway-fetch";
import type {
  CategoryTreeRequest,
  CategoryTreeResponse,
} from "@/types/api/category";

const REVALIDATE = 300;

export async function getCategoryTree(
  vendorCode: string,
  request: CategoryTreeRequest = {},
  language = "en"
) {
  const raw = await gatewayFetch<CategoryTreeResponse>({
    vendorCode,
    path: "/categories/GetTree",
    method: "POST",
    body: request,
    language,
    next: { revalidate: REVALIDATE },
  });
  const categoriesTree =
    raw.categoriesTree ?? raw.CategoriesTree ?? [];
  return { categoriesTree };
}
