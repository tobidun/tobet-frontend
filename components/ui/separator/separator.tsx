// components/ui/separator/separator.tsx
// Visual divider component with optional label.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { Caption } from "@/components/ui/typography";

const separatorLineVariants = cva("bg-border shrink-0", {
  variants: {
    orientation: {
      horizontal: "w-full h-px",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
}

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", label, className, ...props }, ref) => {
    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={orientation}
          className={cn(
            "flex items-center gap-3 w-full",
            orientation === "vertical" && "flex-col h-full w-auto",
            className
          )}
          {...props}
        >
          <div className={cn(separatorLineVariants({ orientation }), "flex-1")} />
          <Caption textColor="muted" className="shrink-0">
            {label}
          </Caption>
          <div className={cn(separatorLineVariants({ orientation }), "flex-1")} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(separatorLineVariants({ orientation }), className)}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator, separatorLineVariants };
export type { SeparatorProps };
