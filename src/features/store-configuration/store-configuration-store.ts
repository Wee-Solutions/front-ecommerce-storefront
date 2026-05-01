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
