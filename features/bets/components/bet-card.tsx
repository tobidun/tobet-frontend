// features/bets/components/bet-card.tsx
// Compact card summarizing a placed bet for the My Bets list.

"use client";

import { motion } from "framer-motion";
import { Surface } from "@/components/ui/surface";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/format";
import { BetStatusBadge } from "./bet-status-badge";
import type { PlacedBet } from "@/types/bets";

interface BetCardProps {
  bet: PlacedBet;
  onOpen?: (id: string) => void;
  onCashOut?: (id: string) => void;
  className?: string;
}

const BetCard = ({ bet, onOpen, onCashOut, className }: BetCardProps) => {
  const canCashOut = bet.cashOut?.available ?? false;
  const first = bet.selections[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Surface
        variant="default"
        padding="md"
        rounded="lg"
        shadow="none"
        className="flex flex-col gap-3 cursor-pointer hover:border-border-subtle transition-colors"
        onClick={() => onOpen?.(bet.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen?.(bet.id);
          }
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-mono text-foreground-muted">{bet.ticketNumber}</p>
            <p className="text-sm font-medium text-foreground truncate">
              {bet.selections.length > 1
                ? `${bet.selections.length}-fold ${bet.betType}`
                : first?.selection.name}
            </p>
            <p className="text-xs text-foreground-subtle truncate">
              {first?.match.homeTeam.name} vs {first?.match.awayTeam.name}
            </p>
          </div>
          <BetStatusBadge status={bet.status} />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-[11px] uppercase text-foreground-subtle">Stake</p>
            <p className="text-sm font-mono text-foreground">{formatCurrency(bet.stake, bet.currency)}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase text-foreground-subtle">Odds</p>
            <p className="text-sm font-mono text-foreground">{bet.totalOdds.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase text-foreground-subtle">To Win</p>
            <p className="text-sm font-mono text-success">{formatCurrency(bet.potentialWin, bet.currency)}</p>
          </div>
        </div>

        {canCashOut && (
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onCashOut?.(bet.id);
            }}
          >
            Cash Out {formatCurrency(bet.cashOut!.fullValue, bet.currency)}
          </Button>
        )}
      </Surface>
    </motion.div>
  );
};

export { BetCard };
export type { BetCardProps };
