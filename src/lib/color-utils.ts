import type { PropertyValueAdditionalData } from "@/types/api/product";

const HEX_PATTERN = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

function expandShortHex(hex: string): string {
  if (hex.length !== 4) return hex;
  const [, r, g, b] = hex;
  return `#${r}${r}${g}${g}${b}${b}`;
}

/** Reads `#rrggbb` from property value additional data (camelCase or PascalCase). */
export function resolvePropertyColorHex(
  additionalData?: PropertyValueAdditionalData | null,
): string | null {
  if (!additionalData || typeof additionalData !== "object") return null;

  const raw =
    ("color" in additionalData ? additionalData.color : undefined) ??
    ("Color" in additionalData
      ? (additionalData as { Color?: string }).Color
      : undefined);

  const trimmed = raw?.trim();
  if (!trimmed || !HEX_PATTERN.test(trimmed)) return null;

  const normalized =
    trimmed.length === 4 ? expandShortHex(trimmed) : trimmed.toLowerCase();

  return normalized;
}

/** True when a hex fill needs a darker edge/check for visibility (e.g. white, cream). */
export function isLightHexColor(hex: string): boolean {
  const value = hex.replace("#", "");
  if (value.length !== 6) return false;

  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.72;
}
