// features/sportsbook/components/wallet/transaction-card.tsx
// Transaction history card.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Surface } from "@/components/ui/surface";
import type { Transaction } from "@/features/sportsbook/types";

interface TransactionCardProps {
  transactions: Transaction[];
  currency?: string;
  className?: string;
}

const TransactionCard = ({ transactions, currency = "$", className }: TransactionCardProps) => {
  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed": return "text-success";
      case "pending": return "text-warning";
      case "failed": return "text-error";
      default: return "text-foreground-muted";
    }
  };

  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit": return "↓";
      case "withdrawal": return "↑";
      case "bet_placed": return "→";
      case "bet_won": return "✓";
      case "bet_lost": return "✗";
      default: return "•";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Surface variant="default" padding="md" rounded="lg" shadow="none" className={cn("flex flex-col gap-3", className)}>
        <h3 className="text-sm font-semibold text-foreground">Transaction History</h3>
        <div className="flex flex-col gap-2">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-background-hover/50">
              <div className="flex items-center gap-3">
                <span className="text-lg">{getTypeIcon(tx.type)}</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground">{tx.description}</span>
                  <span className="text-xs text-foreground-subtle">
                    {new Date(tx.timestamp).toLocaleDateString()} {new Date(tx.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className={cn("text-sm font-bold font-mono", getStatusColor(tx.status))}>
                  {tx.type.includes("won") || tx.type === "deposit" ? "+" : "-"}
                  {currency}{tx.amount.toFixed(2)}
                </span>
                <span className={cn("text-xs capitalize", getStatusColor(tx.status))}>{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Surface>
    </motion.div>
  );
};

export { TransactionCard };
export type { TransactionCardProps };
