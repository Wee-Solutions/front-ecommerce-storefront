export type CustomerProfile = {
  id: string;
  number: number;
  firstName: string;
  lastName: string;
  email?: string | null;
  phoneNumber: string;
  createdAt: string;
};

export type UpdateCustomerProfileRequest = {
  firstName: string;
  lastName: string;
  email?: string | null;
};

export type UpdateCustomerPhoneRequest = {
  newPhoneNumber: string;
  verificationId: string;
  verificationCode: string;
};

export type ShipmentInfo = {
  id: string;
  cityId?: string | null;
  cityDescription: string;
  street: string;
  streetNumber: string;
  apartmentNumber: string;
  apartmentFloor: string;
  apartmentEnterance: string;
  apartmentEnteranceCode: string;
  additionalEnteranceCode: string;
  addressNotes: string;
  zipCode: string;
  isActive: boolean;
};

export type GetShipmentInfosResponse = {
  records: ShipmentInfo[];
};

export type UpsertShipmentInfoRequest = {
  cityId?: string | null;
  cityDescription: string;
  street: string;
  streetNumber: string;
  apartmentNumber: string;
  apartmentFloor: string;
  apartmentEnterance: string;
  apartmentEnteranceCode: string;
  additionalEnteranceCode: string;
  addressNotes: string;
  zipCode: string;
};

