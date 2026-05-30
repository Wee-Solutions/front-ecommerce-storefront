"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";
import { StoreConfigProvider } from "@/components/providers/store-config-provider";
import { EventTrackerLifecycle } from "@/features/events/event-tracker-lifecycle";
import { VendorProvider } from "@/contexts/vendor-context";
import { makeQueryClient } from "@/lib/query-client";
import type { StoreConfiguration } from "@/types/api/configuration";

export function AppProviders({
  children,
  language = "en",
  initialStoreConfig = null,
}: {
  children: React.ReactNode;
  language?: string;
  initialStoreConfig?: StoreConfiguration | null;
}) {
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <VendorProvider value={{ language }}>
        <StoreConfigProvider initialConfig={initialStoreConfig}>
          <EventTrackerLifecycle />
          {children}
        </StoreConfigProvider>
        <Toaster richColors position="top-right" />
      </VendorProvider>
    </QueryClientProvider>
  );
}
