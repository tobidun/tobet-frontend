// features/sportsbook/components/bet-slip/bet-slip.tsx
// Main bet slip component composing all bet slip parts.

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { BetSlipHeader } from "./bet-slip-header";
import { BetSlipItem } from "./bet-slip-item";
import { StakeInput } from "./stake-input";
import { QuickStakeButtons } from "./quick-stake-buttons";
import { PotentialWinningsCard } from "./potential-winnings-card";
import { BetSummary } from "./bet-summary";
import { ClearBetSlip } from "./clear-bet-slip";
import { PlaceBetButton } from "./place-bet-button";
import type { BetSelection } from "@/features/sportsbook/types";

interface BetSlipProps {
  selections: BetSelection[];
  stake: number;
  onStakeChange: (stake: number) => void;
  onSelectionRemove: (id: string) => void;
  onClearAll: () => void;
  onPlaceBet: () => void;
  isPlacing?: boolean;
  className?: string;
}

const BetSlip = ({
  selections,
  stake,
  onStakeChange,
  onSelectionRemove,
  onClearAll,
  onPlaceBet,
  isPlacing = false,
  className,
}: BetSlipProps) => {
  const totalOdds = selections.reduce((acc, sel) => acc * sel.selection.odds, 1);
  const potentialWin = totalOdds * stake;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={cn("flex flex-col h-full bg-background-card border-l border-border", className)}
    >
      <BetSlipHeader selectionCount={selections.length} onClear={onClearAll} />
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {selections.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center py-12"
            >
              <p className="text-sm text-foreground-muted">Your bet slip is empty</p>
              <p className="text-xs text-foreground-subtle mt-1">Add selections to place a bet</p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {selections.map((selection) => (
                  <BetSlipItem
                    key={selection.id}
                    selection={selection}
                    onRemove={onSelectionRemove}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
      {selections.length > 0 && (
        <div className="p-4 border-t border-border flex flex-col gap-4">
          <StakeInput
            value={stake}
            onChange={(e) => onStakeChange(parseFloat(e.target.value) || 0)}
            minStake={1}
            maxStake={10000}
          />
          <QuickStakeButtons
            amounts={[5, 10, 25, 50, 100]}
            selectedAmount={stake}
            onSelect={onStakeChange}
          />
          <PotentialWinningsCard
            totalOdds={totalOdds}
            stake={stake}
          />
          <PlaceBetButton
            onClick={onPlaceBet}
            disabled={selections.length === 0 || stake <= 0}
            loading={isPlacing}
          />
        </div>
      )}
    </motion.div>
  );
};

export { BetSlip };
export type { BetSlipProps };
