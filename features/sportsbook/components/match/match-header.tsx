// features/sportsbook/components/match/match-header.tsx
// Match header with league, time, and status.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { MatchStatus } from "./match-status";
import { CountdownTimer } from "./countdown-timer";
import { LiveIndicator } from "./live-indicator";
import type { Match } from "@/features/sportsbook/types";

interface MatchHeaderProps {
  match: Match;
  className?: string;
}

const MatchHeader = ({ match, className }: MatchHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("flex items-center justify-between", className)}
    >
      <div className="flex items-center gap-2">
        {match.isLive ? (
          <LiveIndicator showText={false} />
        ) : (
          <MatchStatus status={match.status} minute={match.liveMinute} />
        )}
      </div>
      <div className="flex items-center gap-2">
        {match.status === "scheduled" && (
          <CountdownTimer startTime={match.startTime} />
        )}
        {match.isLive && match.liveMinute && (
          <span className="text-xs font-mono text-foreground-muted">{match.liveMinute}'</span>
        )}
      </div>
    </motion.div>
  );
};

export { MatchHeader };
export type { MatchHeaderProps };
