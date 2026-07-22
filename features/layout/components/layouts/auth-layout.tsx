// features/layout/components/layouts/auth-layout.tsx
// Auth layout for login/register pages.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { Logo } from "@/features/layout/components/desktop-nav";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

const AuthLayout = ({ children, title, subtitle, className }: AuthLayoutProps) => {
  return (
    <div className={cn("min-h-screen flex items-center justify-center bg-background p-4", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Logo href="/" className="justify-center mb-6" />
          {title && <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>}
          {subtitle && <p className="text-sm text-foreground-muted">{subtitle}</p>}
        </div>
        <div className="bg-background-card border border-border rounded-2xl p-6 shadow-xl">
          {children}
        </div>
        <p className="text-center text-xs text-foreground-muted mt-6">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
};

export { AuthLayout };
export type { AuthLayoutProps };
