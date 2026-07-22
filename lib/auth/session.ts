// lib/auth/session.ts
// Session management utilities.

import { apiRequest } from "@/lib/api/client";
import type { Session } from "@/types/auth";

export const getSession = async (): Promise<Session | null> => {
  try {
    return await apiRequest<Session>("/auth/session");
  } catch {
    return null;
  }
};

export const setAuthToken = (token: string) => {
  // Token is forwarded via headers in apiRequest; kept for API parity.
  if (typeof window !== "undefined") {
    window.localStorage.setItem("auth_token", token);
  }
};

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("auth_token");
  }
};
