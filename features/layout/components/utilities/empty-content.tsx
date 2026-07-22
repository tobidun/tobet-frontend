// features/layout/components/utilities/empty-content.tsx
// Empty state for when content is not available.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyContentProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyContent = ({ title, description, actionLabel, onAction, icon, className }: EmptyContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("flex flex-col items-center justify-center text-center py-16 px-4", className)}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-4"
      >
        {icon || <Inbox className="size-16 text-foreground-muted" />}
      </motion.div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && <p className="text-sm text-foreground-muted max-w-md mb-6">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export { EmptyContent };
export type { EmptyContentProps };
