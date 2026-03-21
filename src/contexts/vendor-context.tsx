"use client";

import { createContext, useContext } from "react";

export type VendorContextValue = {
  vendorCode: string;
  language: string;
};

const VendorContext = createContext<VendorContextValue | null>(null);

export function VendorProvider({
  value,
  children,
}: {
  value: VendorContextValue;
  children: React.ReactNode;
}) {
  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
}

export function useVendor(): VendorContextValue {
  const ctx = useContext(VendorContext);
  if (!ctx) {
    throw new Error("useVendor must be used within VendorProvider");
  }
  return ctx;
}
