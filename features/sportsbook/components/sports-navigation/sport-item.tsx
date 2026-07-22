// features/sportsbook/components/sports-navigation/sport-item.tsx
// Individual sport navigation item with active state.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { Sport } from "@/features/sportsbook/types";

interface SportItemProps {
  sport: Sport;
  isActive?: boolean;
  onClick?: (sport: Sport) => void;
  className?: string;
}

const SportItem = ({ sport, isActive, onClick, className }: SportItemProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick?.(sport)}
      className={cn(
        "flex flex-col items-center gap-1.5 p-3 rounded-xl min-w-[72px] transition-colors",
        isActive
          ? "bg-primary text-foreground-inverse shadow-sm"
          : "text-foreground-muted hover:text-foreground hover:bg-background-hover",
        !sport.isActive && "opacity-40",
        className
      )}
      aria-pressed={isActive}
      aria-label={sport.name}
    >
      <span className="text-xl" aria-hidden="true">{sport.icon}</span>
      <span className="text-xs font-medium truncate w-full text-center">{sport.name}</span>
    </motion.button>
  );
};

export { SportItem };
export type { SportItemProps };
