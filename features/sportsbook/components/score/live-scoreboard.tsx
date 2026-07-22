// features/sportsbook/components/score/live-scoreboard.tsx
// Live scoreboard with animated score updates.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { TeamBadge } from "../match/team-badge";
import { LiveIndicator } from "../match/live-indicator";
import type { Match } from "@/features/sportsbook/types";

interface LiveScoreboardProps {
  match: Match;
  className?: string;
}

const LiveScoreboard = ({ match, className }: LiveScoreboardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("flex items-center justify-between gap-4", className)}
    >
      <TeamBadge name={match.homeTeam.name} shortName={match.homeTeam.shortName} logo={match.homeTeam.logo} color={match.homeTeam.color} />
      <div className="flex flex-col items-center gap-1">
        {match.score && (
          <motion.div
            key={match.score.home + match.score.away}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-3 text-2xl font-bold font-mono"
          >
            <span className="text-foreground">{match.score.home}</span>
            <span className="text-foreground-muted">-</span>
            <span className="text-foreground">{match.score.away}</span>
          </motion.div>
        )}
        <LiveIndicator />
      </div>
      <TeamBadge name={match.awayTeam.name} shortName={match.awayTeam.shortName} logo={match.awayTeam.logo} color={match.awayTeam.color} align="right" />
    </motion.div>
  );
};

export { LiveScoreboard };
export type { LiveScoreboardProps };
