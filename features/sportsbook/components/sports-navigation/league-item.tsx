// features/sportsbook/components/sports-navigation/league-item.tsx
// League item for navigation.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { League } from "@/features/sportsbook/types";

interface LeagueItemProps {
  league: League;
  isActive?: boolean;
  onClick?: (league: League) => void;
  className?: string;
}

const LeagueItem = ({ league, isActive, onClick, className }: LeagueItemProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(league)}
      className={cn(
        "flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-left",
        isActive
          ? "bg-primary/10 text-primary border border-primary/20"
          : "text-foreground hover:bg-background-hover border border-transparent",
        !league.isActive && "opacity-40",
        className
      )}
      aria-pressed={isActive}
    >
      <span className="text-lg" aria-hidden="true">{league.logo}</span>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-medium truncate">{league.name}</span>
        <span className="text-xs text-foreground-muted">{league.country}</span>
      </div>
    </motion.button>
  );
};

export { LeagueItem };
export type { LeagueItemProps };
