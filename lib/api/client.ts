// lib/api/client.ts
// Lightweight HTTP client wrapper (no external deps).
// Backend integrations are out of scope; this is a thin fetch wrapper
// for future use and to keep the API layer mockable.

export interface ApiRequestConfig {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
}

export const apiClient = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
  defaults: {
    headers: {
      common: {} as Record<string, string>,
    },
  },
};

export async function apiRequest<T = unknown>(
  path: string,
  config: ApiRequestConfig = {}
): Promise<T> {
  const res = await fetch(`${apiClient.baseURL}${path}`, {
    method: config.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...apiClient.defaults.headers.common,
      ...config.headers,
    },
    body: config.body ? JSON.stringify(config.body) : undefined,
    signal: config.signal,
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}

export const setAuthToken = (token: string) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete apiClient.defaults.headers.common["Authorization"];
};
