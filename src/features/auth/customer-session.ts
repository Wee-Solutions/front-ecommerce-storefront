"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CustomerSession = {
  accessToken: string | null;
  customerId: string | null;
  tokenExpiresAt: string | null;
  setSession: (payload: {
    accessToken: string;
    customerId: string;
    tokenExpiresAt: string;
  }) => void;
  clear: () => void;
};

export const useCustomerSession = create<CustomerSession>()(
  persist(
    (set) => ({
      accessToken: null,
      customerId: null,
      tokenExpiresAt: null,
      setSession: ({ accessToken, customerId, tokenExpiresAt }) =>
        set({ accessToken, customerId, tokenExpiresAt }),
      clear: () =>
        set({ accessToken: null, customerId: null, tokenExpiresAt: null }),
    }),
    { name: "sf-customer-session" }
  )
);
