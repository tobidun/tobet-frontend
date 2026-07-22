// features/layout/components/desktop-nav/wallet-button.tsx
// Wallet button with balance display.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface WalletButtonProps {
  balance: number;
  currency?: string;
  onClick?: () => void;
  className?: string;
}

const WalletButton = ({ balance, currency = "$", onClick, className }: WalletButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant="secondary"
        size="sm"
        onClick={onClick}
        className={cn("flex items-center gap-2", className)}
      >
        <Wallet className="size-4" />
        <span className="font-mono font-semibold">{currency}{balance.toFixed(2)}</span>
      </Button>
    </motion.div>
  );
};

export { WalletButton };
export type { WalletButtonProps };
