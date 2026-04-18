import type { CategoryTreeItem } from "@/types/api/category";

/** `/c/<uuid>` segment from the pathname, or `null`. */
export function getCategoryIdFromPathname(pathname: string): string | null {
  const m = pathname.match(/^\/c\/([^/]+)/);
  return m?.[1] ?? null;
}

/** True if `id` is `branch` or any of its descendants (for nav highlighting). */
export function isCategoryBranchActive(
  branch: CategoryTreeItem,
  id: string | null,
): boolean {
  if (!id) return false;
  return findCategoryInTree([branch], id) !== null;
}

/** Path from root to the category with `id` (inclusive), or `[]` if not found. */
export function findCategoryPath(
  roots: CategoryTreeItem[],
  id: string,
): CategoryTreeItem[] {
  for (const root of roots) {
    const path = findCategoryPathDepth(root, id, []);
    if (path) return path;
  }
  return [];
}

function findCategoryPathDepth(
  node: CategoryTreeItem,
  id: string,
  prefix: CategoryTreeItem[],
): CategoryTreeItem[] | null {
  const path = [...prefix, node];
  if (node.id === id) return path;
  for (const sub of node.subCategories ?? []) {
    const found = findCategoryPathDepth(sub, id, path);
    if (found) return found;
  }
  return null;
}

export function findCategoryInTree(
  roots: CategoryTreeItem[],
  id: string
): CategoryTreeItem | null {
  for (const root of roots) {
    const found = findCategoryInTreeDepth(root, id);
    if (found) return found;
  }
  return null;
}

function findCategoryInTreeDepth(
  node: CategoryTreeItem,
  id: string
): CategoryTreeItem | null {
  if (node.id === id) return node;
  for (const sub of node.subCategories ?? []) {
    const found = findCategoryInTreeDepth(sub, id);
    if (found) return found;
  }
  return null;
}
