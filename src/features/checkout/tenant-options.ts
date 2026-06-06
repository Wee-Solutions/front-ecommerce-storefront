import type { StoreConfiguration } from "@/types/api/configuration";

export type TenantOption = {
  id: string;
  name: string;
};

function readTenantRow(item: unknown): TenantOption | null {
  if (!item || typeof item !== "object") return null;
  const row = item as Record<string, unknown>;
  const id = row.id ?? row.Id;
  const name = row.name ?? row.Name;
  if (typeof id !== "string" || !id.trim()) return null;
  return {
    id: id.trim(),
    name: typeof name === "string" && name.trim() ? name.trim() : id.trim(),
  };
}

/** Reads tenant options from store config (camelCase or PascalCase). */
export function getTenantOptionsFromConfig(
  config: StoreConfiguration | null | undefined,
): TenantOption[] {
  if (!config) return [];
  const raw =
    config.tenants ??
    (config as StoreConfiguration & { Tenants?: unknown }).Tenants;
  if (!Array.isArray(raw)) return [];
  return raw.map(readTenantRow).filter((tenant): tenant is TenantOption => tenant !== null);
}
