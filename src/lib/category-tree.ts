import type { CategoryTreeItem } from "@/types/api/category";

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
