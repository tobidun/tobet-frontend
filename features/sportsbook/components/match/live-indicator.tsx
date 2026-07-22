// features/sportsbook/components/match/live-indicator.tsx
// Animated live indicator dot.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface LiveIndicatorProps {
  className?: string;
  showText?: boolean;
}

const LiveIndicator = ({ className, showText = true }: LiveIndicatorProps) => {
  return (
    <motion.div
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={cn("flex items-center gap-1.5", className)}
    >
      <span className="relative flex size-2">
        <span className="absolute inset-0 rounded-full bg-success opacity-75 animate-ping" />
        <span className="relative rounded-full size-2 bg-success" />
      </span>
      {showText && <span className="text-xs font-semibold text-success uppercase tracking-wide">Live</span>}
    </motion.div>
  );
};

export { LiveIndicator };
export type { LiveIndicatorProps };
