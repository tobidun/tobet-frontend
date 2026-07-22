// components/ui/icon-wrapper/icon-wrapper.tsx
// Icon wrapper component for consistent icon sizing, color, and background.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import type { LucideIcon } from "lucide-react";

const iconWrapperVariants = cva("inline-flex items-center justify-center shrink-0", {
  variants: {
    size: {
      xs: "size-4",
      sm: "size-5",
      md: "size-6",
      lg: "size-8",
      xl: "size-10",
      "2xl": "size-12",
    },
    iconColor: {
      default: "text-foreground",
      muted: "text-foreground-muted",
      subtle: "text-foreground-subtle",
      primary: "text-primary",
      accent: "text-accent",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
      inverse: "text-foreground-inverse",
    },
    background: {
      none: "bg-transparent",
      subtle: "bg-primary-subtle",
      muted: "bg-background-hover",
      default: "bg-background-card",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      default: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    size: "md",
    iconColor: "default",
    background: "none",
    rounded: "default",
  },
});

interface IconWrapperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof iconWrapperVariants> {
  icon: LucideIcon;
}

const IconWrapper = forwardRef<HTMLDivElement, IconWrapperProps>(
  ({ icon: Icon, size, iconColor, background, rounded, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          iconWrapperVariants({ size, iconColor, background, rounded }),
          className
        )}
        {...props}
      >
        <Icon className={cn("size-[75%]")} />
      </div>
    );
  }
);

IconWrapper.displayName = "IconWrapper";

export { IconWrapper, iconWrapperVariants };
export type { IconWrapperProps };
