// providers/auth-provider.tsx
// Auth provider wrapping the application.

'use client';

import { AuthProvider } from '@/features/auth';
import type { User } from '@/types/auth';

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

export function AppAuthProvider({ children, initialUser }: AuthProviderProps) {
  return <AuthProvider initialUser={initialUser}>{children}</AuthProvider>;
}
