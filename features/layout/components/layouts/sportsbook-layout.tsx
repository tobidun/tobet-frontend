// features/layout/components/layouts/sportsbook-layout.tsx
// Sportsbook layout with bet slip sidebar.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { BetSlip } from "@/features/sportsbook/components/bet-slip";
import type { ReactNode } from "react";
import type { BetSelection } from "@/features/sportsbook/types";

interface SportsbookLayoutProps {
  children: ReactNode;
  betSlipSelections: BetSelection[];
  betSlipStake: number;
  onBetSlipStakeChange: (stake: number) => void;
  onBetSlipRemove: (id: string) => void;
  onBetSlipClear: () => void;
  onPlaceBet: () => void;
  isPlacingBet?: boolean;
  className?: string;
}

const SportsbookLayout = ({
  children,
  betSlipSelections,
  betSlipStake,
  onBetSlipStakeChange,
  onBetSlipRemove,
  onBetSlipClear,
  onPlaceBet,
  isPlacingBet = false,
  className,
}: SportsbookLayoutProps) => {
  return (
    <div className={cn("min-h-screen bg-background flex", className)}>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
      {betSlipSelections.length > 0 && (
        <motion.aside
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed right-0 top-14 h-[calc(100vh-3.5rem)] w-80 bg-background-card border-l border-border shadow-xl z-sticky hidden lg:block"
        >
          <BetSlip
            selections={betSlipSelections}
            stake={betSlipStake}
            onStakeChange={onBetSlipStakeChange}
            onSelectionRemove={onBetSlipRemove}
            onClearAll={onBetSlipClear}
            onPlaceBet={onPlaceBet}
            isPlacing={isPlacingBet}
          />
        </motion.aside>
      )}
    </div>
  );
};

export { SportsbookLayout };
export type { SportsbookLayoutProps };
