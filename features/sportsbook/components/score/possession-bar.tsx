// features/sportsbook/components/score/possession-bar.tsx
// Possession bar for displaying ball possession stats.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface PossessionBarProps {
  homeValue: number;
  awayValue: number;
  homeLabel?: string;
  awayLabel?: string;
  className?: string;
}

const PossessionBar = ({ homeValue, awayValue, homeLabel, awayLabel, className }: PossessionBarProps) => {
  const homePercent = Math.round(homeValue);

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.8 }}
      animate={{ opacity: 1, scaleX: 1 }}
      className={cn("flex flex-col gap-2", className)}
    >
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-foreground">{homeLabel || "Home"} {homePercent}%</span>
        <span className="text-foreground-muted">Possession</span>
        <span className="text-foreground">{awayLabel || "Away"} {100 - homePercent}%</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-background-hover">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${homePercent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-primary rounded-l-full"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${100 - homePercent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-accent rounded-r-full"
        />
      </div>
    </motion.div>
  );
};

export { PossessionBar };
export type { PossessionBarProps };
