// components/ui/grid/grid.tsx
// CSS Grid layout component with responsive columns and gap.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const gridVariants = cva("grid", {
  variants: {
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch",
    },
  },
  defaultVariants: {
    align: "stretch",
    justify: "stretch",
  },
});

type ColsValue =
  | number
  | "auto-fit"
  | "auto-fill"
  | { sm?: number; md?: number; lg?: number; xl?: number; "2xl"?: number };

interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  cols?: ColsValue;
  minColWidth?: string;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
  as?: "div" | "section" | "main" | "article" | "ul";
  children: React.ReactNode;
}

const gapToClass: Record<number, string> = {
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

function buildColsClass(cols: ColsValue, minColWidth?: string): string {
  if (typeof cols === "object" && !Array.isArray(cols)) {
    const responsive: string[] = [];
    if (cols.sm) responsive.push(`grid-cols-${cols.sm}`);
    if (cols.md) responsive.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) responsive.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) responsive.push(`xl:grid-cols-${cols.xl}`);
    if (cols["2xl"]) responsive.push(`2xl:grid-cols-${cols["2xl"]}`);
    return responsive.join(" ");
  }

  if (typeof cols === "number") {
    return `grid-cols-${cols}`;
  }

  if (cols === "auto-fit" || cols === "auto-fill") {
    const minWidth = minColWidth ? `,${minColWidth}` : ",minmax(0,1fr)";
    return `grid-cols-[repeat(${cols}${minWidth})]`;
  }

  return "grid-cols-1";
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      as = "div",
      cols = 1,
      minColWidth,
      gap = 4,
      align,
      justify,
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
          gridVariants({ align, justify }),
          buildColsClass(cols, minColWidth),
          gapToClass[gap],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = "Grid";

export { Grid, gridVariants };
export type { GridProps, ColsValue };
