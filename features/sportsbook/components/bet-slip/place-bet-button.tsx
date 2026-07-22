// features/sportsbook/components/bet-slip/place-bet-button.tsx
// Place bet button with loading state.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

interface PlaceBetButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  className?: string;
}

const PlaceBetButton = ({ onClick, disabled, loading, label = "Place Bet", className }: PlaceBetButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <Button
        variant="primary"
        size="lg"
        onClick={onClick}
        disabled={disabled || loading}
        loading={loading}
        className={cn("w-full font-semibold", className)}
      >
        {label}
      </Button>
    </motion.div>
  );
};

export { PlaceBetButton };
export type { PlaceBetButtonProps };
