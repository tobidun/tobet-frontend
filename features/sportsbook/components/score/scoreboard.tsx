// features/sportsbook/components/score/scoreboard.tsx
// Standard scoreboard for completed or scheduled matches.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { TeamBadge } from "../match/team-badge";
import type { Match } from "@/features/sportsbook/types";

interface ScoreboardProps {
  match: Match;
  className?: string;
}

const Scoreboard = ({ match, className }: ScoreboardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("flex items-center justify-between gap-4", className)}
    >
      <TeamBadge name={match.homeTeam.name} shortName={match.homeTeam.shortName} logo={match.homeTeam.logo} color={match.homeTeam.color} />
      <div className="flex flex-col items-center gap-1">
        {match.score ? (
          <div className="flex items-center gap-3 text-2xl font-bold font-mono">
            <span className="text-foreground">{match.score.home}</span>
            <span className="text-foreground-muted">-</span>
            <span className="text-foreground">{match.score.away}</span>
          </div>
        ) : (
          <span className="text-sm text-foreground-subtle">vs</span>
        )}
        <span className="text-xs text-foreground-muted">
          {match.status === "finished" ? "FT" : match.status === "live" ? `${match.liveMinute}'` : "Scheduled"}
        </span>
      </div>
      <TeamBadge name={match.awayTeam.name} shortName={match.awayTeam.shortName} logo={match.awayTeam.logo} color={match.awayTeam.color} align="right" />
    </motion.div>
  );
};

export { Scoreboard };
export type { ScoreboardProps };
