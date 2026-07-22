// components/ui/overlay/modal.tsx
// Accessible modal with focus trap and Framer Motion animations.

"use client";

import { forwardRef, useEffect, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/use-focus-trap";

const modalVariants = cva("relative bg-background-card border border-border shadow-xl", {
  variants: {
    size: {
      sm: "max-w-sm w-full mx-4 rounded-lg",
      md: "max-w-md w-full mx-4 rounded-lg",
      lg: "max-w-lg w-full mx-4 rounded-xl",
      xl: "max-w-xl w-full mx-4 rounded-xl",
      full: "max-w-full w-full h-full rounded-none",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    size: "md",
    padding: "md",
  },
});

interface ModalProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof modalVariants> {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  closeButton?: boolean;
  footer?: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, size, padding, title, description, children, closeButton = true, footer, className }, ref) => {
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

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-modal flex items-center justify-center">
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
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? "modal-title" : undefined}
              aria-describedby={description ? "modal-desc" : undefined}
              className={cn(modalVariants({ size, padding }), className)}
            >
              {(title || closeButton) && (
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {title && (
                      <h2 id="modal-title" className="text-lg font-semibold text-foreground">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p id="modal-desc" className="text-sm text-foreground-muted mt-0.5">
                        {description}
                      </p>
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
              <div className={cn(title && "max-h-[60vh] overflow-y-auto")}>{children}</div>
              {footer && <div className="mt-6 flex items-center justify-end gap-3">{footer}</div>}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

Modal.displayName = "Modal";

export { Modal, modalVariants };
export type { ModalProps };
