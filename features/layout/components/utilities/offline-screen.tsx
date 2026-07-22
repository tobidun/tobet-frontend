// features/layout/components/utilities/offline-screen.tsx
// Offline screen for network connectivity issues.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OfflineScreenProps {
  onRetry?: () => void;
  className?: string;
}

const OfflineScreen = ({ onRetry, className }: OfflineScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("flex flex-col items-center justify-center text-center py-16 px-4", className)}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-6"
      >
        <WifiOff className="size-16 text-foreground-muted" />
      </motion.div>
      <h2 className="text-2xl font-bold text-foreground mb-2">You're Offline</h2>
      <p className="text-sm text-foreground-muted max-w-md mb-6">
        It looks like you've lost your internet connection. Please check your connection and try again.
      </p>
      {onRetry && (
        <Button variant="primary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export { OfflineScreen };
export type { OfflineScreenProps };
