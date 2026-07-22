// config/query.ts
// React Query client defaults and global options.

export const defaultQueryOptions = {
  staleTime: 1000 * 60,
  gcTime: 1000 * 60 * 60,
  retry: 2,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
} as const;

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      ...defaultQueryOptions,
    },
    mutations: {
      retry: false,
    },
  },
} as const;
