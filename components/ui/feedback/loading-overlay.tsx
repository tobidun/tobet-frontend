// components/ui/feedback/loading-overlay.tsx
// Full or contained loading overlay with backdrop.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { Spinner } from "./spinner";

const overlayVariants = cva("flex items-center justify-center", {
  variants: {
    backdrop: {
      true: "fixed inset-0 z-overlay bg-background-overlay/60 backdrop-blur-sm",
      false: "absolute inset-0 z-dropdown bg-background-overlay/40 rounded-inherit",
    },
  },
  defaultVariants: {
    backdrop: false,
  },
});

interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof overlayVariants> {
  label?: string;
}

const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ backdrop, label, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(overlayVariants({ backdrop }), className)} {...props}>
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" variant="primary" />
          {label && <span className="text-sm text-foreground-muted">{label}</span>}
        </div>
      </div>
    );
  }
);

LoadingOverlay.displayName = "LoadingOverlay";

export { LoadingOverlay, overlayVariants };
export type { LoadingOverlayProps };
