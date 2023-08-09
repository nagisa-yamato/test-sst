import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function useCustomQueryClient(): {
  customQueryClient: QueryClient;
} {
  const [customQueryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1_000 * 60 * 1,
          },
        },
      }),
  );

  return { customQueryClient };
}
