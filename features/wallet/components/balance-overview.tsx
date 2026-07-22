// features/wallet/components/balance-overview.tsx
// Wallet balance summary with four breakdowns.

"use client";

import { motion } from "framer-motion";
import { Wallet, Gift, Lock, Clock } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { formatCurrency } from "@/lib/utils/format";
import type { WalletBalance } from "@/types/wallet";

interface BalanceOverviewProps {
  balance: WalletBalance;
  className?: string;
}

const items = (b: WalletBalance) => [
  {
    key: "available",
    label: "Available Balance",
    value: formatCurrency(b.available, b.currency),
    icon: <Wallet className="size-5" />,
    tone: "text-success",
    bg: "bg-success/10",
  },
  {
    key: "bonus",
    label: "Bonus Balance",
    value: formatCurrency(b.bonus, b.currency),
    icon: <Gift className="size-5" />,
    tone: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "locked",
    label: "Locked Balance",
    value: formatCurrency(b.locked, b.currency),
    icon: <Lock className="size-5" />,
    tone: "text-warning",
    bg: "bg-warning/10",
  },
  {
    key: "pending",
    label: "Pending Withdrawals",
    value: formatCurrency(b.pendingWithdrawals, b.currency),
    icon: <Clock className="size-5" />,
    tone: "text-info",
    bg: "bg-info/10",
  },
];

const BalanceOverview = ({ balance, className }: BalanceOverviewProps) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 ${className ?? ""}`}
    >
      {items(balance).map((item, i) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <Surface variant="default" padding="md" rounded="lg" shadow="none" className="flex flex-col gap-3">
            <div className={`size-10 rounded-lg flex items-center justify-center ${item.bg} ${item.tone}`}>
              {item.icon}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-foreground-muted uppercase tracking-wider">
                {item.label}
              </span>
              <span className="text-2xl font-bold font-mono text-foreground">
                {item.value}
              </span>
            </div>
          </Surface>
        </motion.div>
      ))}
    </div>
  );
};

export { BalanceOverview };
export type { BalanceOverviewProps };
