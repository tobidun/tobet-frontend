// components/ui/data-display/description-list.tsx
// Description list for structured term-description pairs.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const descriptionListVariants = cva("", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    orientation: {
      horizontal: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-2",
      vertical: "flex flex-col gap-3",
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "vertical",
  },
});

interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement>, VariantProps<typeof descriptionListVariants> {
  items: { term: React.ReactNode; description: React.ReactNode }[];
}

const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ size, orientation, items, className, ...props }, ref) => {
    return (
      <dl ref={ref} className={cn(descriptionListVariants({ size, orientation }), className)} {...props}>
        {items.map((item, i) => (
          <div key={i} className={cn(orientation === "horizontal" && "contents")}>
            <dt className="font-medium text-foreground-muted">{item.term}</dt>
            <dd className="text-foreground">{item.description}</dd>
          </div>
        ))}
      </dl>
    );
  }
);

DescriptionList.displayName = "DescriptionList";

export { DescriptionList, descriptionListVariants };
export type { DescriptionListProps };
