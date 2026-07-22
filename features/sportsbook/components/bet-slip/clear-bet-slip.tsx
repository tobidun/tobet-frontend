// features/sportsbook/components/bet-slip/clear-bet-slip.tsx
// Clear bet slip button with confirmation state.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClearBetSlipProps {
  onClear?: () => void;
  className?: string;
}

const ClearBetSlip = ({ onClear, className }: ClearBetSlipProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        className={cn("text-error hover:text-error hover:bg-error/10 w-full", className)}
      >
        <Trash2 className="size-4 mr-2" />
        Clear Bet Slip
      </Button>
    </motion.div>
  );
};

export { ClearBetSlip };
export type { ClearBetSlipProps };
