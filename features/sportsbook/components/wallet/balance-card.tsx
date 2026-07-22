// features/sportsbook/components/wallet/balance-card.tsx
// Balance display card with breakdown.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Surface } from "@/components/ui/surface";
import type { Transaction } from "@/features/sportsbook/types";

interface BalanceCardProps {
  availableBalance: number;
  pendingBalance: number;
  currency?: string;
  recentTransactions?: Transaction[];
  className?: string;
}

const BalanceCard = ({ availableBalance, pendingBalance, currency = "$", recentTransactions, className }: BalanceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Surface variant="default" padding="md" rounded="lg" shadow="none" className={cn("flex flex-col gap-4", className)}>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-foreground-muted uppercase tracking-wider">Available Balance</span>
          <span className="text-3xl font-bold font-mono text-foreground">
            {currency}{availableBalance.toFixed(2)}
          </span>
        </div>
        {pendingBalance > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground-muted">Pending:</span>
            <span className="text-sm font-mono text-warning">{currency}{pendingBalance.toFixed(2)}</span>
          </div>
        )}
        {recentTransactions && recentTransactions.length > 0 && (
          <div className="pt-3 border-t border-border">
            <span className="text-xs text-foreground-muted uppercase tracking-wider mb-2 block">Recent</span>
            <div className="flex flex-col gap-2">
              {recentTransactions.slice(0, 3).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between text-sm">
                  <span className="text-foreground truncate">{tx.description}</span>
                  <span className={cn("font-mono font-medium", tx.type.includes("won") || tx.type === "deposit" ? "text-success" : "text-error")}>
                    {tx.type.includes("won") || tx.type === "deposit" ? "+" : "-"}
                    {currency}{tx.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Surface>
    </motion.div>
  );
};

export { BalanceCard };
export type { BalanceCardProps };
