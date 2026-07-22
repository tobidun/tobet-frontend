// components/ui/data-display/timeline.tsx
// Timeline for chronological events.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import type { LucideIcon } from "lucide-react";

const timelineVariants = cva("relative", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof timelineVariants> {
  children: React.ReactNode;
}

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(({ size, className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(timelineVariants({ size }), className)} role="list" {...props}>
      {children}
    </div>
  );
});

Timeline.displayName = "Timeline";

interface TimelineItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: LucideIcon;
  title: React.ReactNode;
  description?: React.ReactNode;
  timestamp?: string;
  status?: "completed" | "active" | "pending";
}

const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ icon: Icon, title, description, timestamp, status = "completed", className, ...props }, ref) => {
    const statusColors: Record<string, string> = {
      completed: "bg-success border-success",
      active: "bg-primary border-primary",
      pending: "bg-background-hover border-border",
    };

    return (
      <div ref={ref} role="listitem" className={cn("relative flex gap-4 pb-6 last:pb-0", className)} {...props}>
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-full border-2 shrink-0",
              statusColors[status]
            )}
          >
            {Icon && <Icon className="size-4 text-foreground-inverse" aria-hidden="true" />}
          </div>
          <div className="flex-1 w-px bg-border mt-2" aria-hidden="true" />
        </div>
        <div className="flex-1 pt-1">
          <div className="flex items-center gap-2">
            <p className="font-medium text-foreground">{title}</p>
            {timestamp && <span className="text-xs text-foreground-subtle">{timestamp}</span>}
          </div>
          {description && <p className="mt-1 text-sm text-foreground-muted">{description}</p>}
        </div>
      </div>
    );
  }
);

TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem, timelineVariants };
export type { TimelineProps, TimelineItemProps };
