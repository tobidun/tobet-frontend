// lib/query/client.ts
// React Query client initialization.

import { QueryClient } from "@tanstack/react-query";
import { queryClientOptions } from "@/config/query";

export const queryClient = new QueryClient(queryClientOptions);
