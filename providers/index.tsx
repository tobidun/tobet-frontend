// providers/index.tsx
// Composed application providers.
// Wrap the app with all top-level providers in the correct order.

"use client";

import { type ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { AppAuthProvider } from "./auth-provider";
import type { User } from "@/types/auth";

interface ProvidersProps {
  children: ReactNode;
  initialUser?: User | null;
}

export function Providers({ children, initialUser }: ProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider
        defaultTheme="dark"
        enableSystem
        attribute="class"
      >
        <AppAuthProvider initialUser={initialUser}>
          {children}
        </AppAuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
