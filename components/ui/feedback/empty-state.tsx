// components/ui/feedback/empty-state.tsx
// Empty state for when content is absent.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const emptyVariants = cva("flex flex-col items-center justify-center text-center", {
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

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof emptyVariants> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ size, icon: Icon, title, description, action, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(emptyVariants({ size }), className)} {...props}>
        {Icon && <Icon className="size-10 text-foreground-muted shrink-0" aria-hidden="true" />}
        <div className="flex flex-col gap-1 max-w-sm">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {description && <p className="text-sm text-foreground-muted">{description}</p>}
        </div>
        {action && (
          <Button variant="primary" size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

export { EmptyState, emptyVariants };
export type { EmptyStateProps };
