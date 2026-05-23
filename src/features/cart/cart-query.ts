import type { QueryClient } from "@tanstack/react-query";

export function cartQueryKey(language: string, accessToken: string | null) {
  return ["cart", language, accessToken ?? "guest"] as const;
}

export function invalidateCartQueries(
  queryClient: QueryClient,
  language: string,
) {
  return queryClient.invalidateQueries({
    queryKey: ["cart", language],
  });
}
