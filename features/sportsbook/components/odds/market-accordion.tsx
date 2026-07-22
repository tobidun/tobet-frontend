// features/sportsbook/components/odds/market-accordion.tsx
// Accordion for expanding/collapsing market groups.

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronDown } from "lucide-react";
import { MarketGroup } from "./market-group";
import type { Market } from "@/features/sportsbook/types";

interface MarketAccordionProps {
  markets: Market[];
  defaultExpanded?: boolean;
  onOddsClick?: (market: Market, selectionId: string) => void;
  className?: string;
}

const MarketAccordion = ({ markets, defaultExpanded = true, onOddsClick, className }: MarketAccordionProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (markets.length === 0) return null;

  return (
    <div className={cn("border border-border rounded-lg overflow-hidden", className)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-background-card hover:bg-background-hover transition-colors"
      >
        <span className="text-sm font-semibold text-foreground">Betting Markets</span>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-4 text-foreground-muted" />
        </motion.div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4 bg-background">
              {markets.map((market) => (
                <MarketGroup
                  key={market.id}
                  market={market}
                  onOddsClick={onOddsClick}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { MarketAccordion };
export type { MarketAccordionProps };
