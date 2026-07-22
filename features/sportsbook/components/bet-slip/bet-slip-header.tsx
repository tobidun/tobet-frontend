// features/sportsbook/components/bet-slip/bet-slip-header.tsx
// Bet slip header with title and clear button.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BetSlipHeaderProps {
  selectionCount: number;
  onClear?: () => void;
  className?: string;
}

const BetSlipHeader = ({ selectionCount, onClear, className }: BetSlipHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-center justify-between p-4 border-b border-border", className)}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground">Bet Slip</h3>
        <span className="text-xs text-foreground-muted bg-background-hover px-2 py-0.5 rounded-full">
          {selectionCount}
        </span>
      </div>
      {selectionCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-error hover:text-error hover:bg-error/10"
        >
          <Trash2 className="size-3.5 mr-1" />
          Clear
        </Button>
      )}
    </motion.div>
  );
};

export { BetSlipHeader };
export type { BetSlipHeaderProps };
