import type { CustomerOrderShipment } from "@/types/api/order";

function joinParts(parts: (string | null | undefined)[]): string {
  return parts.filter((p) => p?.trim()).join(" · ");
}

/** Street, locality, and postal code lines for delivery shipment. */
export function formatOrderShipmentAddressLines(
  shipment: CustomerOrderShipment,
): string[] {
  const lines: string[] = [];

  const streetLine = joinParts([
    shipment.street?.trim(),
    shipment.streetNumber?.trim(),
  ]);
  if (streetLine) lines.push(streetLine);

  const locality = joinParts([
    shipment.areaName?.trim(),
    shipment.cityName?.trim(),
  ]);
  if (locality) lines.push(locality);

  if (shipment.zipCode?.trim()) lines.push(shipment.zipCode.trim());

  return lines;
}

export function formatOrderShipmentApartmentLines(
  shipment: CustomerOrderShipment,
  labels: {
    entrance: string;
    entranceCode: string;
    additionalEntranceCode: string;
    apartmentFloor: string;
    apartmentNumber: string;
    addressNotes: string;
  },
): string[] {
  const lines: string[] = [];

  const entrance = shipment.apartmentEntrance?.trim();
  if (entrance) lines.push(`${labels.entrance}: ${entrance}`);

  const entranceCode = shipment.apartmentEntranceCode?.trim();
  if (entranceCode) lines.push(`${labels.entranceCode}: ${entranceCode}`);

  const additional = shipment.additionalEntranceCode?.trim();
  if (additional) lines.push(`${labels.additionalEntranceCode}: ${additional}`);

  const floor = shipment.apartmentFloor?.trim();
  if (floor) lines.push(`${labels.apartmentFloor}: ${floor}`);

  const apt = shipment.apartmentNumber?.trim();
  if (apt) lines.push(`${labels.apartmentNumber}: ${apt}`);

  const notes = shipment.addressNotes?.trim();
  if (notes) lines.push(`${labels.addressNotes}: ${notes}`);

  return lines;
}
