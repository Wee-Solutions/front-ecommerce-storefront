"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { VendorProvider } from "@/contexts/vendor-context";
import { makeQueryClient } from "@/lib/query-client";

export function AppProviders({
  children,
  vendorCode,
  language = "en",
}: {
  children: React.ReactNode;
  vendorCode: string;
  language?: string;
}) {
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <VendorProvider value={{ vendorCode, language }}>
        {children}
      </VendorProvider>
    </QueryClientProvider>
  );
}
