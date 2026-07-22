// components/ui/overlay/drawer.tsx
// Drawer sliding panel from screen edges with Framer Motion.

"use client";

import { forwardRef, useEffect, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/use-focus-trap";

const drawerVariants = cva("fixed bg-background-card border border-border shadow-xl", {
  variants: {
    side: {
      top: "inset-x-0 top-0 rounded-b-xl max-h-[80vh]",
      bottom: "inset-x-0 bottom-0 rounded-t-xl max-h-[80vh]",
      left: "inset-y-0 left-0 rounded-r-xl w-full max-w-sm",
      right: "inset-y-0 right-0 rounded-l-xl w-full max-w-sm",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    side: "right",
    padding: "md",
  },
});

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof drawerVariants> {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  closeButton?: boolean;
  footer?: React.ReactNode;
}

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ open, onClose, side, padding, title, description, children, closeButton = true, footer, className }, ref) => {
    const { containerRef } = useFocusTrap<HTMLDivElement>(open);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      },
      [onClose]
    );

    useEffect(() => {
      if (open) {
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }, [open, handleKeyDown]);

    const slideAnimation = {
      top: { y: "-100%" },
      bottom: { y: "100%" },
      left: { x: "-100%" },
      right: { x: "100%" },
    };

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-background-overlay/60 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.div
              ref={containerRef}
              initial={slideAnimation[side || "right"]}
              animate={{ x: 0, y: 0 }}
              exit={slideAnimation[side || "right"]}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={cn(drawerVariants({ side, padding }), className)}
            >
              {(title || closeButton) && (
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {title && (
                      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                    )}
                    {description && (
                      <p className="text-sm text-foreground-muted mt-0.5">{description}</p>
                    )}
                  </div>
                  {closeButton && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="size-8 flex items-center justify-center rounded-md hover:bg-background-hover transition-colors text-foreground-muted hover:text-foreground"
                      aria-label="Close"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
              )}
              <div className="flex-1 overflow-y-auto">{children}</div>
              {footer && <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">{footer}</div>}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

Drawer.displayName = "Drawer";

export { Drawer, drawerVariants };
export type { DrawerProps };
