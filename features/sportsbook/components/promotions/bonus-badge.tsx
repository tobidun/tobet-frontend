// features/sportsbook/components/promotions/bonus-badge.tsx
// Badge component for promotion highlights.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface BonusBadgeProps {
  text: string;
  variant?: "default" | "accent" | "success";
  className?: string;
}

const BonusBadge = ({ text, variant = "default", className }: BonusBadgeProps) => {
  const variantClasses = {
    default: "bg-primary/10 text-primary border-primary/20",
    accent: "bg-accent/10 text-accent border-accent/20",
    success: "bg-success/10 text-success border-success/20",
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border",
        variantClasses[variant],
        className
      )}
    >
      {text}
    </motion.span>
  );
};

export { BonusBadge };
export type { BonusBadgeProps };
