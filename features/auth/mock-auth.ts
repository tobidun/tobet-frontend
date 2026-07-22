// features/auth/mock-auth.ts
// Mock authentication service for frontend-only usage.

import type { User, Session } from "@/types/auth";

const MOCK_USER: User = {
  id: "user_1",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  currency: "USD",
  country: "US",
  isVerified: true,
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAuth = {
  login: async (credentials: { email: string; password: string }): Promise<Session> => {
    await delay(800);
    if (!credentials.email || !credentials.password) {
      throw new Error("Invalid email or password");
    }
    return {
      user: MOCK_USER,
      accessToken: "mock_access_token_" + Date.now(),
      refreshToken: "mock_refresh_token_" + Date.now(),
      expiresAt: Date.now() + 3600000,
    };
  },

  register: async (payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<Session> => {
    await delay(800);
    return {
      user: { ...MOCK_USER, email: payload.email, firstName: payload.firstName, lastName: payload.lastName },
      accessToken: "mock_access_token_" + Date.now(),
      refreshToken: "mock_refresh_token_" + Date.now(),
      expiresAt: Date.now() + 3600000,
    };
  },

  forgotPassword: async (email: string): Promise<void> => {
    await delay(600);
    if (!email) throw new Error("Email is required");
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await delay(600);
    if (!token || !password) throw new Error("Invalid request");
  },

  verifyEmail: async (code: string): Promise<void> => {
    await delay(600);
    if (code !== "123456") throw new Error("Invalid verification code");
  },

  verifyPhone: async (code: string): Promise<void> => {
    await delay(600);
    if (code !== "123456") throw new Error("Invalid verification code");
  },

  verifyOTP: async (code: string): Promise<void> => {
    await delay(600);
    if (code !== "123456") throw new Error("Invalid OTP code");
  },

  sendOTP: async (): Promise<void> => {
    await delay(400);
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    await delay(600);
    return { ...MOCK_USER, ...data };
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await delay(600);
    if (!currentPassword || !newPassword) throw new Error("Invalid request");
  },

  toggle2FA: async (enabled: boolean): Promise<void> => {
    await delay(600);
  },

  updateNotifications: async (settings: Record<string, boolean>): Promise<void> => {
    await delay(600);
  },

  updateResponsibleGambling: async (settings: Record<string, unknown>): Promise<void> => {
    await delay(600);
  },
};
