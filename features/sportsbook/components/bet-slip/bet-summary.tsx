// features/sportsbook/components/bet-slip/bet-summary.tsx
// Bet summary showing total stake, odds, and potential win.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface BetSummaryProps {
  selections: Array<{ selectionName: string; odds: number }>;
  totalOdds: number;
  stake: number;
  potentialWin: number;
  currency?: string;
  className?: string;
}

const BetSummary = ({ selections, totalOdds, stake, potentialWin, currency = "$", className }: BetSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col gap-3", className)}
    >
      <div className="flex flex-col gap-2">
        {selections.map((sel, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-foreground-muted truncate">{sel.selectionName}</span>
            <span className="text-foreground font-mono">{sel.odds.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-sm font-medium text-foreground">Total Odds</span>
        <span className="text-sm font-bold font-mono text-foreground">{totalOdds.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Stake</span>
        <span className="text-sm font-bold font-mono text-foreground">{currency}{stake.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-sm font-semibold text-foreground">Potential Win</span>
        <motion.span
          key={potentialWin}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-base font-bold font-mono text-primary"
        >
          {currency}{potentialWin.toFixed(2)}
        </motion.span>
      </div>
    </motion.div>
  );
};

export { BetSummary };
export type { BetSummaryProps };
