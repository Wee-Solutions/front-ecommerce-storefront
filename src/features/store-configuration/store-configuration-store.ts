"use client";

import { create } from "zustand";
import type { StoreConfiguration } from "@/types/api/configuration";

type StoreConfigurationState = {
  config: StoreConfiguration | null;
  setConfig: (config: StoreConfiguration | null) => void;
  reset: () => void;
};

export const useStoreConfiguration = create<StoreConfigurationState>((set) => ({
  config: null,
  setConfig: (config) => set({ config }),
  reset: () => set({ config: null }),
}));

/** Resolved store label for UI (empty if not loaded). */
export function useStoreDisplayName(fallback: string) {
  return useStoreConfiguration(
    (s) => s.config?.name?.trim() || fallback
  );
}
