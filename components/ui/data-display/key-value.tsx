// components/ui/data-display/key-value.tsx
// Key-value pair display for metadata.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { Caption } from "@/components/ui/typography";

const keyValueVariants = cva("flex items-center gap-3", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col gap-1",
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
});

interface KeyValueProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof keyValueVariants> {
  label: React.ReactNode;
  value: React.ReactNode;
}

const KeyValue = forwardRef<HTMLDivElement, KeyValueProps>(
  ({ size, orientation, label, value, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(keyValueVariants({ size, orientation }), className)} {...props}>
        <dt className={cn("font-medium text-foreground-muted", orientation === "horizontal" && "shrink-0 w-32")}>
          {label}
        </dt>
        <dd className={cn("text-foreground", orientation === "horizontal" && "flex-1")}>{value}</dd>
      </div>
    );
  }
);

KeyValue.displayName = "KeyValue";

interface KeyValueListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: { label: React.ReactNode; value: React.ReactNode }[];
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  divider?: boolean;
}

const KeyValueList = forwardRef<HTMLDListElement, KeyValueListProps>(
  ({ items, orientation = "horizontal", size, divider, className, ...props }, ref) => {
    return (
      <dl ref={ref} className={cn("divide-y", divider && "divide-border", className)} {...props}>
        {items.map((item, i) => (
          <div key={i} className={cn(orientation === "horizontal" && "contents")}>
            <dt className="font-medium text-foreground-muted">{item.label}</dt>
            <dd className="text-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>
    );
  }
);

KeyValueList.displayName = "KeyValueList";

export { KeyValue, KeyValueList, keyValueVariants };
export type { KeyValueProps, KeyValueListProps };
