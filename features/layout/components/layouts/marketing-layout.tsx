// features/layout/components/layouts/marketing-layout.tsx
// Marketing layout for public pages.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Footer } from "@/features/layout/components/page-sections";
import type { ReactNode } from "react";

interface MarketingLayoutProps {
  children: ReactNode;
  className?: string;
}

const MarketingLayout = ({ children, className }: MarketingLayoutProps) => {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-sticky bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Header content can be injected here */}
            <div className="flex items-center gap-4">
              {/* Logo placeholder */}
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-foreground-inverse">
                  <span className="text-lg font-bold">P</span>
                </div>
                <span className="text-lg font-bold text-foreground">PREMIUM</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Features</a>
              <a href="#promotions" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Promotions</a>
              <a href="#about" className="text-sm text-foreground-muted hover:text-foreground transition-colors">About</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Log In
              </a>
              <a href="/register" className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-foreground-inverse hover:bg-primary-hover transition-colors">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </motion.header>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export { MarketingLayout };
export type { MarketingLayoutProps };
