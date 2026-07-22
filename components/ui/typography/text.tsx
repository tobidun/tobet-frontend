// components/ui/typography/text.tsx
// Polymorphic text component with design system variants.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const textVariants = cva(
  "font-sans transition-colors duration-200",
  {
    variants: {
      variant: {
        hero: "text-5xl font-bold leading-tight tracking-tighter",
        display: "text-4xl font-bold leading-tight tracking-tight",
        h1: "text-3xl font-bold leading-tight tracking-tight",
        h2: "text-2xl font-semibold leading-snug tracking-tight",
        h3: "text-xl font-semibold leading-snug tracking-normal",
        h4: "text-lg font-semibold leading-snug tracking-normal",
        title: "text-lg font-medium leading-normal tracking-normal",
        body: "text-base font-normal leading-normal tracking-normal",
        bodySmall: "text-sm font-normal leading-normal tracking-normal",
        caption: "text-xs font-normal leading-snug tracking-normal",
        label: "text-sm font-medium leading-snug tracking-wide uppercase",
        overline: "text-xs font-medium leading-snug tracking-widest uppercase",
      },
      textColor: {
        default: "text-foreground",
        muted: "text-foreground-muted",
        subtle: "text-foreground-subtle",
        primary: "text-primary",
        accent: "text-accent",
        success: "text-success",
        warning: "text-warning",
        error: "text-error",
        info: "text-info",
        inverse: "text-foreground-inverse",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      truncate: {
        1: "line-clamp-1",
        2: "line-clamp-2",
        3: "line-clamp-3",
        4: "line-clamp-4",
      },
    },
    defaultVariants: {
      variant: "body",
      textColor: "default",
      align: "left",
    },
  }
);

type TextElement =
  | "p"
  | "span"
  | "div"
  | "label"
  | "strong"
  | "em"
  | "small"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "a";

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
  truncate?: 1 | 2 | 3 | 4;
}

const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = "p",
      variant = "body",
      textColor = "default",
      align = "left",
      truncate,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          textVariants({ variant, textColor, align, truncate }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

export type { TextElement, TextProps };

export { Text, textVariants };
