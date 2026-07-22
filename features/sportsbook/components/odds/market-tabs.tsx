// features/sportsbook/components/odds/market-tabs.tsx
// Tabs for switching between betting markets.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { Market } from "@/features/sportsbook/types";

interface MarketTabsProps {
  markets: Market[];
  activeMarketId?: string;
  onMarketChange?: (market: Market) => void;
  className?: string;
}

const MarketTabs = ({ markets, activeMarketId, onMarketChange, className }: MarketTabsProps) => {
  return (
    <div className={cn("flex items-center gap-1 border-b border-border overflow-x-auto", className)}>
      {markets.map((market) => {
        const isActive = market.id === activeMarketId;
        return (
          <motion.button
            key={market.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => onMarketChange?.(market)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative",
              isActive ? "text-primary" : "text-foreground-muted hover:text-foreground"
            )}
          >
            {market.name}
            {isActive && (
              <motion.div
                layoutId="market-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export { MarketTabs };
export type { MarketTabsProps };
