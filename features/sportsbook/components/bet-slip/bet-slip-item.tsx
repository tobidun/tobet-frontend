// features/sportsbook/components/bet-slip/bet-slip-item.tsx
// Individual bet slip item with selection details and remove button.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BetSelection } from "@/features/sportsbook/types";

interface BetSlipItemProps {
  selection: BetSelection;
  onRemove?: (id: string) => void;
  onUpdateStake?: (id: string, stake: number) => void;
  className?: string;
}

const BetSlipItem = ({ selection, onRemove, onUpdateStake, className }: BetSlipItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={cn("flex flex-col gap-2 p-3 rounded-lg bg-background-hover/50 border border-border", className)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs text-foreground-muted truncate">
            {selection.match.homeTeam.name} vs {selection.match.awayTeam.name}
          </span>
          <span className="text-sm font-medium text-foreground truncate">{selection.selection.name}</span>
          <span className="text-xs text-foreground-subtle">{selection.market.name}</span>
        </div>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onRemove?.(selection.id)}
          className="shrink-0 size-6 px-0"
          aria-label={`Remove ${selection.selection.name} from bet slip`}
        >
          <X className="size-3" />
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold font-mono text-primary">{selection.selection.odds.toFixed(2)}</span>
      </div>
    </motion.div>
  );
};

export { BetSlipItem };
export type { BetSlipItemProps };
