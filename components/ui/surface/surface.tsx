// components/ui/surface/surface.tsx
// Surface component for cards, panels, and elevated content areas.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const surfaceVariants = cva(
  "transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-background-card border border-border-subtle",
        elevated: "bg-background-elevated shadow-lg",
        ghost: "bg-transparent border-none",
        outlined: "bg-transparent border border-border",
        interactive:
          "bg-background-card border border-border-subtle hover:bg-background-hover hover:border-border cursor-pointer",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        default: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        full: "rounded-full",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        default: "shadow-default",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      rounded: "md",
      shadow: "none",
    },
  }
);

interface SurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceVariants> {
  as?: "div" | "section" | "article" | "aside" | "main" | "header" | "footer";
}

const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  (
    {
      as = "div",
      variant,
      padding,
      rounded,
      shadow,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(
          surfaceVariants({ variant, padding, rounded, shadow }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Surface.displayName = "Surface";

export { Surface, surfaceVariants };
export type { SurfaceProps };
