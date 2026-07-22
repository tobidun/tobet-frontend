// features/sportsbook/components/bet-slip/potential-winnings-card.tsx
// Potential winnings display with animation.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface PotentialWinningsCardProps {
  totalOdds: number;
  stake: number;
  currency?: string;
  className?: string;
}

const PotentialWinningsCard = ({ totalOdds, stake, currency = "$", className }: PotentialWinningsCardProps) => {
  const potentialWin = totalOdds * stake;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("p-4 rounded-lg bg-primary/5 border border-primary/20", className)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-foreground-muted">Total Odds</span>
        <span className="text-sm font-mono font-bold text-foreground">{totalOdds.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-foreground-muted">Stake</span>
        <span className="text-sm font-mono font-bold text-foreground">{currency}{stake.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-primary/20">
        <span className="text-sm font-semibold text-foreground">Potential Winnings</span>
        <motion.span
          key={potentialWin}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-lg font-bold font-mono text-primary"
        >
          {currency}{potentialWin.toFixed(2)}
        </motion.span>
      </div>
    </motion.div>
  );
};

export { PotentialWinningsCard };
export type { PotentialWinningsCardProps };
