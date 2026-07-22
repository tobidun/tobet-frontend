// features/sportsbook/components/score/match-statistics.tsx
// Match statistics display (possession, shots, etc.).

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface StatItemProps {
  label: string;
  homeValue: number;
  awayValue: number;
  unit?: string;
  className?: string;
}

const StatItem = ({ label, homeValue, awayValue, unit = "", className }: StatItemProps) => {
  const total = homeValue + awayValue;
  const homePercent = total > 0 ? (homeValue / total) * 100 : 50;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-foreground">{homeValue}{unit}</span>
        <span className="text-foreground-muted text-xs">{label}</span>
        <span className="text-foreground">{awayValue}{unit}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-background-hover rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${homePercent}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

interface MatchStatisticsProps {
  stats: Array<{ label: string; homeValue: number; awayValue: number; unit?: string }>;
  className?: string;
}

const MatchStatistics = ({ stats, className }: MatchStatisticsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col gap-4", className)}
    >
      <h3 className="text-sm font-semibold text-foreground">Match Statistics</h3>
      <div className="flex flex-col gap-3">
        {stats.map((stat, i) => (
          <StatItem key={i} {...stat} />
        ))}
      </div>
    </motion.div>
  );
};

export { MatchStatistics, StatItem };
export type { MatchStatisticsProps, StatItemProps };
