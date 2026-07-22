// components/ui/overlay/dialog.tsx
// Headless dialog wrapper for custom dialog implementations.

"use client";

import { forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
}

const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ open, onClose, children, closeOnOverlay = true, closeOnEsc = true, className }, ref) => {
    const { containerRef } = useFocusTrap<HTMLDivElement>(open);
    const isMounted = useRef(false);

    useEffect(() => {
      isMounted.current = true;
      return () => { isMounted.current = false; };
    }, []);

    useEffect(() => {
      if (open && closeOnEsc) {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      }
    }, [open, onClose, closeOnEsc]);

    useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);

    if (!isMounted.current || typeof document === "undefined") return null;

    return createPortal(
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-modal flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-background-overlay/60 backdrop-blur-sm"
              onClick={closeOnOverlay ? onClose : undefined}
              aria-hidden="true"
            />
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn("relative z-10", className)}
              role="dialog"
              aria-modal="true"
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    );
  }
);

Dialog.displayName = "Dialog";

export { Dialog };
export type { DialogProps };
