// features/sportsbook/components/sports-navigation/competition-header.tsx
// Competition header with back button and title.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { League } from "@/features/sportsbook/types";

interface CompetitionHeaderProps {
  league?: League;
  onBack?: () => void;
  className?: string;
}

const CompetitionHeader = ({ league, onBack, className }: CompetitionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-center gap-3 p-4 border-b border-border", className)}
    >
      {onBack && (
        <Button variant="ghost" size="xs" onClick={onBack} aria-label="Back" className="px-2">
          <ArrowLeft className="size-4" />
        </Button>
      )}
      {league && (
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">{league.logo}</span>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-sm font-semibold text-foreground">{league.name}</h2>
            <span className="text-xs text-foreground-muted">{league.country}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export { CompetitionHeader };
export type { CompetitionHeaderProps };
