// components/ui/stack/stack.tsx
// Flex layout component with direction, spacing, alignment, and justification.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const stackVariants = cva("flex", {
  variants: {
    direction: {
      column: "flex-col",
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    direction: "column",
    align: "stretch",
    justify: "start",
    wrap: false,
  },
});

interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
  as?: "div" | "ul" | "ol" | "nav" | "section" | "main" | "article";
  children: React.ReactNode;
}

const spacingToClass: Record<number, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
};

const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      as = "div",
      direction,
      align,
      justify,
      wrap,
      spacing = 4,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as as React.ElementType;
    return (
      <Component
        ref={ref}
        className={cn(
          stackVariants({ direction, align, justify, wrap }),
          spacingToClass[spacing],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Stack.displayName = "Stack";

export { Stack, stackVariants };
export type { StackProps };
