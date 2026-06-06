function toValidDate(value: Date | string | number): Date | null {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

/** Formats a date as `dd/MM/yyyy` (e.g. 22/05/2026). */
export function formatDateDDMMYYYY(value: Date | string | number): string {
  const date = toValidDate(value);
  if (!date) return "";

  return `${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()}`;
}

/** Formats a date-time as `dd/MM/yyyy HH:mm:ss` (e.g. 22/05/2026 14:30:45). */
export function formatDateTimeDDMMYYYYHHMMSS(
  value: Date | string | number,
): string {
  const date = toValidDate(value);
  if (!date) return "";

  return `${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()} ${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}
