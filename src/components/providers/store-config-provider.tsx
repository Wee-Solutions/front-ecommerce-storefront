"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useStoreConfiguration } from "@/features/store-configuration/store-configuration-store";
import type { StoreConfiguration } from "@/types/api/configuration";

type Props = {
  initialConfig: StoreConfiguration | null;
  children: ReactNode;
};

/**
 * Hydrates the global store from the server snapshot before children render,
 * so any client subtree can read config on first paint without a flash.
 */
export function StoreConfigProvider({ initialConfig, children }: Props) {
  const serializedRef = useRef<string | null>(null);
  const serialized =
    initialConfig === null ? "null" : JSON.stringify(initialConfig);

  useEffect(() => {
    if (serialized === serializedRef.current) return;
    serializedRef.current = serialized;
    useStoreConfiguration.setState({ config: initialConfig });
  }, [initialConfig, serialized]);

  return <>{children}</>;
}
