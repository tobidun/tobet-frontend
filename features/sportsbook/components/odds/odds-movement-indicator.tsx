// features/sportsbook/components/odds/odds-movement-indicator.tsx
// Visual indicator for odds movement.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ArrowUp, ArrowDown, Ban } from "lucide-react";

interface OddsMovementIndicatorProps {
  previousOdds?: number;
  currentOdds: number;
  status?: string;
  className?: string;
}

const OddsMovementIndicator = ({ previousOdds, currentOdds, status, className }: OddsMovementIndicatorProps) => {
  if (status === "suspended") {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("inline-flex items-center gap-1 text-error", className)}
      >
        <Ban className="size-3" />
        <span className="text-xs font-semibold">SUSPENDED</span>
      </motion.span>
    );
  }

  if (!previousOdds) return null;

  const diff = currentOdds - previousOdds;
  const isUp = diff > 0;
  const isDown = diff < 0;

  if (!isUp && !isDown) return null;

  return (
    <motion.span
      initial={{ opacity: 0, x: isUp ? 10 : -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("inline-flex items-center gap-0.5", isUp ? "text-success" : "text-error", className)}
    >
      {isUp ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
      <span className="text-xs font-mono font-bold">{Math.abs(diff).toFixed(2)}</span>
    </motion.span>
  );
};

export { OddsMovementIndicator };
export type { OddsMovementIndicatorProps };
