// lib/api/interceptors.ts
// Response interceptor hook for the API client.
// Backend integrations are out of scope; this is a no-op placeholder
// kept for parity with the intended API layer structure.

import { removeAuthToken } from "@/lib/auth/session";

export function registerInterceptors() {
  // No-op: real interceptors would live here once a backend exists.
  void removeAuthToken;
}
