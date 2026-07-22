// features/layout/components/mobile-nav/mobile-search.tsx
// Mobile search overlay.

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MobileSearchProps {
  open: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
  className?: string;
}

const MobileSearch = ({ open, onClose, onSearch, className }: MobileSearchProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn("fixed inset-0 z-modal bg-background p-4 md:hidden", className)}
        >
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search events, teams..."
                autoFocus
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full"
              />
            </div>
            <button
              onClick={onClose}
              className="size-10 flex items-center justify-center rounded-lg hover:bg-background-hover transition-colors text-foreground-muted hover:text-foreground"
              aria-label="Close search"
            >
              <X className="size-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { MobileSearch };
export type { MobileSearchProps };
