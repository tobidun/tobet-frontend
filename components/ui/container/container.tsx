// components/ui/container/container.tsx
// Responsive container component with max-width, padding, and centering.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full",
      fluid: "max-w-none",
    },
    padding: {
      none: "px-0",
      sm: "px-4 sm:px-6",
      md: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-8 lg:px-12",
    },
    centered: {
      true: "mx-auto",
      false: "mx-0",
    },
  },
  defaultVariants: {
    size: "xl",
    padding: "md",
    centered: true,
  },
});

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: "div" | "main" | "section" | "article" | "header" | "footer";
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ as = "div", size, padding, centered, className, ...props }, ref) => {
    const Component = as as React.ElementType;
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({ size, padding, centered }),
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants };
export type { ContainerProps };
