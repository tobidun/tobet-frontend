// components/ui/button/button.tsx
// Accessible button component with variants, sizes, icons, and loading state.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-foreground-inverse hover:bg-primary-hover active:bg-primary-active shadow-sm hover:shadow-md",
        secondary:
          "bg-background-card text-foreground border border-border hover:bg-background-hover hover:border-border-subtle active:bg-background-active shadow-sm",
        outline:
          "border border-border text-foreground hover:bg-background-hover hover:border-border-subtle active:bg-background-active",
        ghost:
          "text-foreground hover:bg-background-hover active:bg-background-active",
        success:
          "bg-success text-foreground-inverse hover:bg-success/90 active:bg-success/80 shadow-sm",
        danger:
          "bg-error text-foreground-inverse hover:bg-error/90 active:bg-error/80 shadow-sm",
        warning:
          "bg-warning text-foreground-inverse hover:bg-warning/90 active:bg-warning/80 shadow-sm",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-md",
        sm: "h-8 px-3 text-sm rounded-md",
        md: "h-9 px-4 text-sm rounded-md",
        lg: "h-10 px-5 text-base rounded-lg",
        xl: "h-11 px-6 text-base rounded-lg",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  loading?: boolean;
  as?: "button" | "a" | "div";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth,
      iconLeft: IconLeft,
      iconRight: IconRight,
      loading = false,
      disabled,
      className,
      children,
      as = "button",
      ...props
    },
    ref
  ) => {
    const Component = as as React.ElementType;
    const isDisabled = disabled || loading;

    return (
      <Component
        ref={ref as never}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          className
        )}
        disabled={as === "button" ? isDisabled : undefined}
        aria-disabled={isDisabled || undefined}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin shrink-0" aria-hidden="true" />
        ) : (
          <>
            {IconLeft && <IconLeft className="size-4 shrink-0" aria-hidden="true" />}
            {children}
            {IconRight && <IconRight className="size-4 shrink-0" aria-hidden="true" />}
          </>
        )}
      </Component>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
