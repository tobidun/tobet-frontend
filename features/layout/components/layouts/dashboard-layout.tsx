// features/layout/components/layouts/dashboard-layout.tsx
// Dashboard layout with stats and charts placeholder.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Surface } from "@/components/ui/surface";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

const DashboardLayout = ({ children, title, subtitle, actions, className }: DashboardLayoutProps) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && <p className="text-sm text-foreground-muted mt-1">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>
          <Surface variant="default" padding="lg" rounded="lg" shadow="none">
            {children}
          </Surface>
        </motion.div>
      </div>
    </div>
  );
};

export { DashboardLayout };
export type { DashboardLayoutProps };
