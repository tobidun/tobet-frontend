// features/sportsbook/components/odds/odds-button.tsx
// Odds button with movement indicator.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ArrowUp, ArrowDown, Ban } from "lucide-react";
import type { Selection } from "@/features/sportsbook/types";

interface OddsButtonProps {
  selection: Selection;
  onClick?: () => void;
  className?: string;
}

const OddsButton = ({ selection, onClick, className }: OddsButtonProps) => {
  const getOddsColor = () => {
    if (selection.status === "suspended") return "text-error";
    if (selection.previousOdds && selection.odds > selection.previousOdds) return "text-success";
    if (selection.previousOdds && selection.odds < selection.previousOdds) return "text-error";
    return "text-foreground";
  };

  const getMovementIcon = () => {
    if (selection.status === "suspended") return <Ban className="size-3" />;
    if (selection.previousOdds && selection.odds > selection.previousOdds) return <ArrowUp className="size-3" />;
    if (selection.previousOdds && selection.odds < selection.previousOdds) return <ArrowDown className="size-3" />;
    return null;
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={selection.status === "suspended"}
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded-lg border transition-colors",
        selection.status === "suspended"
          ? "border-error/30 bg-error/5 opacity-50 cursor-not-allowed"
          : "border-border hover:border-primary hover:bg-primary/5 cursor-pointer",
        className
      )}
    >
      <span className="text-xs text-foreground-muted truncate w-full text-center">{selection.name}</span>
      <div className={cn("flex items-center gap-1 font-mono font-bold text-sm", getOddsColor())}>
        {getMovementIcon()}
        <span>{selection.odds.toFixed(2)}</span>
      </div>
    </motion.button>
  );
};

export { OddsButton };
export type { OddsButtonProps };
