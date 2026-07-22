// components/ui/feedback/spinner.tsx
// Loading spinner with size and color variants.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const spinnerVariants = cva("animate-spin rounded-full border-2 border-current border-t-transparent", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
      xl: "size-10",
    },
    variant: {
      default: "text-foreground-muted",
      primary: "text-primary",
      accent: "text-accent",
      success: "text-success",
      error: "text-error",
      inverse: "text-foreground-inverse",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, VariantProps<typeof spinnerVariants> {}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size, variant, className, ...props }, ref) => {
    return <div ref={ref} className={cn(spinnerVariants({ size, variant }), className)} role="status" aria-label="Loading" {...props} />;
  }
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
export type { SpinnerProps };
