/** Matches Ecommerce.Domain.Entities.Auth.Enums */
export const VerificationType = {
  CustomerRegistration: 1,
  CustomerLogin: 2,
  CustomerUpdatePhone: 3,
  SystemUserLogin: 4,
} as const;

export const DispatchMethod = {
  SMS: 0,
  Email: 1,
} as const;

export type SendVerificationCodeRequest = {
  type: number;
  dispatchMethod: number;
  destination: string;
};

export type SendVerificationCodeResponse = {
  verificationId: string;
  expiresAt: string;
  isResendAvailable: boolean;
};

export type ResendVerificationCodeRequest = {
  verificationId: string;
};

export type ResendVerificationCodeResponse = {
  isResendAvailable: boolean;
  expiresAt: string;
};

export type LoginRequest = {
  verificationId: string;
  verificationCode: string;
  phoneNumber?: string | null;
  email?: string | null;
  isPersistentLogin: boolean;
};

export type LoginResponse = {
  accessToken: string;
  tokenExpiresAt: string;
  customerId: string;
};

export type RegisterRequest = {
  verificationId: string;
  verificationCode: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phoneNumber: string;
};

export type RegisterResponse = {
  accessToken: string;
  tokenExpiresAt: string;
  customerId: string;
};
