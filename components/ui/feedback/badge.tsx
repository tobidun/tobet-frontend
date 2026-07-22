// components/ui/feedback/badge.tsx
// Badge for status, labels, and counts.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-sans font-medium text-xs transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "bg-background-hover text-foreground-muted",
        primary: "bg-primary-subtle text-primary",
        secondary: "bg-background-card text-foreground-muted border border-border-subtle",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        error: "bg-error/10 text-error",
        info: "bg-info/10 text-info",
        accent: "bg-accent-subtle text-accent",
      },
      size: {
        sm: "h-5 px-1.5 rounded-sm",
        md: "h-6 px-2 rounded-md",
        lg: "h-7 px-2.5 rounded-md",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rounded",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, size, shape, dot, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, shape }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "size-1.5 rounded-full shrink-0",
              variant === "success" && "bg-success",
              variant === "warning" && "bg-warning",
              variant === "error" && "bg-error",
              variant === "info" && "bg-info",
              variant === "accent" && "bg-accent",
              variant === "primary" && "bg-primary",
              !variant && "bg-foreground-muted"
            )}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
export type { BadgeProps };
