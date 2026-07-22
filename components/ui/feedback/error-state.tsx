// components/ui/feedback/error-state.tsx
// Error state for failed content or actions.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const errorVariants = cva("flex flex-col items-center justify-center text-center", {
  variants: {
    size: {
      sm: "p-4 gap-3",
      md: "p-8 gap-4",
      lg: "p-12 gap-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof errorVariants> {
  title: string;
  description?: string;
  retry?: {
    label?: string;
    onClick: () => void;
  };
}

const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ size, title, description, retry, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(errorVariants({ size }), className)} {...props}>
        <AlertCircle className="size-10 text-error shrink-0" aria-hidden="true" />
        <div className="flex flex-col gap-1 max-w-sm">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {description && <p className="text-sm text-foreground-muted">{description}</p>}
        </div>
        {retry && (
          <Button variant="outline" size="sm" onClick={retry.onClick}>
            <RefreshCw className="size-3.5" aria-hidden="true" />
            {retry.label || "Retry"}
          </Button>
        )}
      </div>
    );
  }
);

ErrorState.displayName = "ErrorState";

export { ErrorState, errorVariants };
export type { ErrorStateProps };
