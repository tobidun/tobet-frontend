// features/sportsbook/components/match/live-match-card.tsx
// Live match card with animated score and live indicator.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Surface } from "@/components/ui/surface";
import { TeamBadge } from "./team-badge";
import { MatchHeader } from "./match-header";
import { OddsButton } from "@/features/sportsbook/components/odds/odds-button";
import { LiveIndicator } from "./live-indicator";
import type { Match } from "@/features/sportsbook/types";

interface LiveMatchCardProps {
  match: Match;
  onOddsClick?: (match: Match, selectionId: string) => void;
  className?: string;
}

const LiveMatchCard = ({ match, onOddsClick, className }: LiveMatchCardProps) => {
  const primaryMarket = match.markets?.[0];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Surface variant="default" padding="md" rounded="lg" shadow="none" className={cn("flex flex-col gap-3 border-l-4 border-l-success", className)}>
        <MatchHeader match={match} />
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <TeamBadge name={match.homeTeam.name} shortName={match.homeTeam.shortName} logo={match.homeTeam.logo} color={match.homeTeam.color} />
            <div className="flex flex-col items-center gap-1">
              {match.score && (
                <motion.div
                  key={match.score.home + match.score.away}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 text-lg font-bold font-mono"
                >
                  <span className="text-foreground">{match.score.home}</span>
                  <span className="text-foreground-muted">-</span>
                  <span className="text-foreground">{match.score.away}</span>
                </motion.div>
              )}
              <LiveIndicator />
            </div>
            <TeamBadge name={match.awayTeam.name} shortName={match.awayTeam.shortName} logo={match.awayTeam.logo} color={match.awayTeam.color} align="right" />
          </div>
          {primaryMarket && (
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
              {primaryMarket.selections.map((selection) => (
                <OddsButton
                  key={selection.id}
                  selection={selection}
                  onClick={() => onOddsClick?.(match, selection.id)}
                />
              ))}
            </div>
          )}
        </div>
      </Surface>
    </motion.div>
  );
};

export { LiveMatchCard };
export type { LiveMatchCardProps };
