// features/sportsbook/components/odds/market-group.tsx
// Grouped odds display for a single market.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { OddsGrid } from "./odds-grid";
import { OddsMovementIndicator } from "./odds-movement-indicator";
import type { Market } from "@/features/sportsbook/types";

interface MarketGroupProps {
  market: Market;
  onOddsClick?: (market: Market, selectionId: string) => void;
  className?: string;
}

const MarketGroup = ({ market, onOddsClick, className }: MarketGroupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col gap-3", className)}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">{market.name}</h4>
        {market.isLive && (
          <span className="text-xs text-success font-medium">Live</span>
        )}
      </div>
      <OddsGrid
        selections={market.selections}
        onOddsClick={(selection) => onOddsClick?.(market, selection.id)}
      />
    </motion.div>
  );
};

export { MarketGroup };
export type { MarketGroupProps };
