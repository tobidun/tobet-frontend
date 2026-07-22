// components/ui/feedback/skeleton.tsx
// Skeleton loading placeholder with animation.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const skeletonVariants = cva("animate-pulse bg-background-hover", {
  variants: {
    variant: {
      default: "rounded-md",
      circle: "rounded-full",
      text: "rounded h-3",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant, width, height, className, style, ...props }, ref) => {
    const customStyle: React.CSSProperties = {
      ...style,
      ...(width ? { width: typeof width === "number" ? `${width}px` : width } : {}),
      ...(height ? { height: typeof height === "number" ? `${height}px` : height } : {}),
    };

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        style={customStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
export type { SkeletonProps };
