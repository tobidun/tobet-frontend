// lib/auth/auth-client.ts
// Auth client utilities (mock-friendly, no backend dependency).

import { apiRequest } from "@/lib/api/client";
import type { User, Session } from "@/types/auth";

export const authClient = {
  login: async (credentials: { email: string; password: string }) => {
    return apiRequest<Session>("/auth/login", {
      method: "POST",
      body: credentials,
    });
  },
  register: async (payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    return apiRequest<Session>("/auth/register", {
      method: "POST",
      body: payload,
    });
  },
  getMe: async (): Promise<User> => {
    return apiRequest<User>("/auth/me");
  },
};
