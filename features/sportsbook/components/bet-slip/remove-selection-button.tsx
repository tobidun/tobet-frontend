// features/sportsbook/components/bet-slip/remove-selection-button.tsx
// Remove selection button with animation.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RemoveSelectionButtonProps {
  onClick?: () => void;
  className?: string;
}

const RemoveSelectionButton = ({ onClick, className }: RemoveSelectionButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        variant="ghost"
        size="xs"
        onClick={onClick}
        className={cn("size-6 px-0 text-foreground-muted hover:text-error hover:bg-error/10", className)}
        aria-label="Remove selection"
      >
        <X className="size-3" />
      </Button>
    </motion.div>
  );
};

export { RemoveSelectionButton };
export type { RemoveSelectionButtonProps };
