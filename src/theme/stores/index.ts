import store1 from "./store1.theme.json";
import store2 from "./store2.theme.json";
import type { StoreTheme } from "@/theme/types";

export const themes: Record<string, StoreTheme> = {
  store1: store1 as StoreTheme,
  store2: store2 as StoreTheme,
};
