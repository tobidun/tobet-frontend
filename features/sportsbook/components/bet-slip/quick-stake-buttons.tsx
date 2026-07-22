// features/sportsbook/components/bet-slip/quick-stake-buttons.tsx
// Quick stake preset buttons.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

interface QuickStakeButtonsProps {
  amounts: number[];
  currency?: string;
  onSelect?: (amount: number) => void;
  selectedAmount?: number;
  className?: string;
}

const QuickStakeButtons = ({ amounts, currency = "$", onSelect, selectedAmount, className }: QuickStakeButtonsProps) => {
  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      {amounts.map((amount) => (
        <motion.div
          key={amount}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={selectedAmount === amount ? "primary" : "secondary"}
            size="sm"
            onClick={() => onSelect?.(amount)}
            className="font-mono text-xs"
          >
            {currency}{amount}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export { QuickStakeButtons };
export type { QuickStakeButtonsProps };
