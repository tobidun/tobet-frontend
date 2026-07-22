// features/sportsbook/components/match/compact-match-card.tsx
// Compact match card for list views.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Surface } from "@/components/ui/surface";
import { TeamBadge } from "./team-badge";
import { MatchHeader } from "./match-header";
import { OddsButton } from "@/features/sportsbook/components/odds/odds-button";
import type { Match } from "@/features/sportsbook/types";

interface CompactMatchCardProps {
  match: Match;
  onOddsClick?: (match: Match, selectionId: string) => void;
  className?: string;
}

const CompactMatchCard = ({ match, onOddsClick, className }: CompactMatchCardProps) => {
  const primaryMarket = match.markets?.[0];

  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
      transition={{ duration: 0.15 }}
    >
      <Surface variant="ghost" padding="sm" rounded="none" shadow="none" className={cn("flex items-center justify-between gap-4", className)}>
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <MatchHeader match={match} />
          <div className="flex items-center justify-between gap-4">
            <TeamBadge name={match.homeTeam.name} shortName={match.homeTeam.shortName} logo={match.homeTeam.logo} color={match.homeTeam.color} size="sm" />
            {match.score && (
              <span className="text-sm font-bold font-mono text-foreground">
                {match.score.home} - {match.score.away}
              </span>
            )}
            {!match.score && (
              <span className="text-xs text-foreground-subtle">vs</span>
            )}
            <TeamBadge name={match.awayTeam.name} shortName={match.awayTeam.shortName} logo={match.awayTeam.logo} color={match.awayTeam.color} size="sm" align="right" />
          </div>
        </div>
        {primaryMarket && (
          <div className="flex gap-1.5 shrink-0">
            {primaryMarket.selections.slice(0, 3).map((selection) => (
              <OddsButton
                key={selection.id}
                selection={selection}
                onClick={() => onOddsClick?.(match, selection.id)}
              />
            ))}
          </div>
        )}
      </Surface>
    </motion.div>
  );
};

export { CompactMatchCard };
export type { CompactMatchCardProps };
