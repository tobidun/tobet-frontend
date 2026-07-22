// types/auth.ts
// Authentication and session types.

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  currency: string;
  country: string;
  isVerified: boolean;
}

export interface Session {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}
