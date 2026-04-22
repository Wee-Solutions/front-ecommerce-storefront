/** Matches Ecommerce.Domain.Entities.Auth.Enums */
export enum VerificationType {
  CustomerRegistration = 1,
  CustomerLogin = 2,
  CustomerUpdatePhone = 3,
  SystemUserLogin = 4,
}

export enum DispatchMethod {
  SMS = 0,
  Email = 1,
}

export type SendVerificationCodeRequest = {
  type: VerificationType;
  dispatchMethod: DispatchMethod;
  destination: string;
};

export type SendVerificationCodeResponse = {
  verificationId: string;
  expiresAt: string;
  isResendAvailable: boolean;
  codeLength: number;
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
  /**
   * Backend expects `isPersistent`; keep `isPersistentLogin` for backwards compatibility.
   */
  isPersistent?: boolean;
  isPersistentLogin?: boolean;
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
