// features/auth/components/auth-layout.tsx
// Shared layout for authentication pages.

"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

const AuthLayout = ({ children, title, subtitle, className }: AuthLayoutProps) => {
  return (
    <div className={cn("min-h-screen flex", className)}>
      <div className="hidden lg:flex lg:w-1/2 bg-background-elevated relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background-elevated to-accent/10" />
        <div className="relative z-10 flex flex-col justify-center px-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center size-12 rounded-xl bg-primary text-foreground-inverse">
              <span className="text-2xl font-bold">P</span>
            </div>
            <span className="text-2xl font-bold text-foreground">PREMIUM SPORTSBOOK</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by thousands of bettors</h2>
          <p className="text-lg text-foreground-muted max-w-md">
            Experience competitive odds, live betting, and instant payouts on the world's most popular sports.
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center justify-center size-10 rounded-xl bg-primary text-foreground-inverse">
              <span className="text-xl font-bold">P</span>
            </div>
            <span className="text-xl font-bold text-foreground">PREMIUM SPORTSBOOK</span>
          </div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
            {subtitle && <p className="text-foreground-muted">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export { AuthLayout };
export type { AuthLayoutProps };
