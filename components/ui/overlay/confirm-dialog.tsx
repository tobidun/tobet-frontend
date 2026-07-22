// components/ui/overlay/confirm-dialog.tsx
// Confirmation dialog for destructive or irreversible actions.

"use client";

import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Dialog } from "./dialog";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
}

const ConfirmDialog = forwardRef<HTMLDivElement, ConfirmDialogProps>(
  ({ open, onClose, onConfirm, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", variant = "danger", loading }, ref) => {
    const variantClasses = {
      danger: "text-error",
      warning: "text-warning",
      info: "text-info",
    };

    const buttonVariant = {
      danger: "danger" as const,
      warning: "warning" as const,
      info: "primary" as const,
    };

    return (
      <Dialog open={open} onClose={onClose}>
        <div ref={ref} className="max-w-sm w-full mx-4 rounded-xl bg-background-card border border-border shadow-xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className={cn("size-6 shrink-0 mt-0.5", variantClasses[variant])} aria-hidden="true" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              {description && (
                <p className="text-sm text-foreground-muted mt-1">{description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              {cancelLabel}
            </Button>
            <Button variant={buttonVariant[variant]} onClick={onConfirm} loading={loading}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
);

ConfirmDialog.displayName = "ConfirmDialog";

export { ConfirmDialog };
export type { ConfirmDialogProps };
