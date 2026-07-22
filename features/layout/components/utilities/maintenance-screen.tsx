// features/layout/components/utilities/maintenance-screen.tsx
// Maintenance mode screen.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Wrench } from "lucide-react";

interface MaintenanceScreenProps {
  message?: string;
  estimatedTime?: string;
  className?: string;
}

const MaintenanceScreen = ({ message = "We're currently performing maintenance", estimatedTime, className }: MaintenanceScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("fixed inset-0 z-modal flex flex-col items-center justify-center bg-background p-4", className)}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-6"
      >
        <Wrench className="size-16 text-foreground-muted" />
      </motion.div>
      <h1 className="text-3xl font-bold text-foreground mb-4">Under Maintenance</h1>
      <p className="text-lg text-foreground-muted text-center max-w-md mb-6">
        {message}
      </p>
      {estimatedTime && (
        <p className="text-sm text-foreground-subtle">
          Estimated time: {estimatedTime}
        </p>
      )}
      <p className="text-sm text-foreground-muted mt-8">
        We'll be back shortly. Thank you for your patience.
      </p>
    </motion.div>
  );
};

export { MaintenanceScreen };
export type { MaintenanceScreenProps };
