// components/ui/data-display/avatar.tsx
// Avatar with image, fallback, and group support.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const avatarVariants = cva("relative inline-flex items-center justify-center shrink-0 overflow-hidden bg-background-hover font-sans font-medium text-foreground-muted", {
  variants: {
    size: {
      xs: "size-6 text-xs",
      sm: "size-8 text-sm",
      md: "size-10 text-base",
      lg: "size-12 text-lg",
      xl: "size-14 text-xl",
    },
    shape: {
      circle: "rounded-full",
      rounded: "rounded-md",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
});

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  status?: "online" | "offline" | "busy" | "away";
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size, shape, src, alt = "Avatar", fallback, status, className, ...props }, ref) => {
    const initials = fallback
      ? fallback
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : alt.slice(0, 2).toUpperCase();

    const statusColors = {
      online: "bg-success",
      offline: "bg-foreground-subtle",
      busy: "bg-error",
      away: "bg-warning",
    };

    return (
      <div ref={ref} className={cn("relative inline-flex", className)} {...props}>
        <div className={avatarVariants({ size, shape })}>
          {src ? (
            <img src={src} alt={alt} className="size-full object-cover" />
          ) : (
            <span aria-hidden="true">{initials}</span>
          )}
        </div>
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background-card",
              statusColors[status]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 4, className, ...props }, ref) => {
    const childrenArray = Array.isArray(children) ? children : [children];
    const visible = childrenArray.slice(0, max);
    const remaining = childrenArray.length - max;

    return (
      <div ref={ref} className={cn("flex items-center -space-x-2", className)} {...props}>
        {visible}
        {remaining > 0 && (
          <div className="size-10 rounded-full bg-background-hover border-2 border-background-card flex items-center justify-center text-xs font-medium text-foreground-muted z-10">
            +{remaining}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup, avatarVariants };
export type { AvatarProps, AvatarGroupProps };
