// features/sportsbook/components/wallet/wallet-summary-card.tsx
// Wallet summary with balance and quick actions.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

interface WalletSummaryCardProps {
  balance: number;
  currency?: string;
  onDeposit?: () => void;
  onWithdraw?: () => void;
  className?: string;
}

const WalletSummaryCard = ({ balance, currency = "$", onDeposit, onWithdraw, className }: WalletSummaryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Wallet className="size-5" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-foreground-muted uppercase tracking-wider">Wallet Balance</span>
          <span className="text-2xl font-bold font-mono text-foreground">
            {currency}{balance.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" size="sm" onClick={onDeposit} className="flex-1">
          <ArrowDownToLine className="size-4 mr-1.5" />
          Deposit
        </Button>
        <Button variant="secondary" size="sm" onClick={onWithdraw} className="flex-1">
          <ArrowUpFromLine className="size-4 mr-1.5" />
          Withdraw
        </Button>
      </div>
    </motion.div>
  );
};

export { WalletSummaryCard };
export type { WalletSummaryCardProps };
