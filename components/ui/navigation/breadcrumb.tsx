// components/ui/navigation/breadcrumb.tsx
// Breadcrumb navigation with separator and current page indication.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { ChevronRight } from "lucide-react";
import { Caption } from "@/components/ui/typography";

const breadcrumbVariants = cva("flex items-center", {
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

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof breadcrumbVariants> {
  items: {
    label: string;
    href?: string;
    onClick?: () => void;
    isCurrent?: boolean;
  }[];
  separator?: React.ReactNode;
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, size, separator, className, ...props }, ref) => {
    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn(breadcrumbVariants({ size }), className)} {...props}>
        <ol className="flex items-center gap-1.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-foreground-subtle" aria-hidden="true">
                  {separator || <ChevronRight className="size-3.5" />}
                </span>
              )}
              {item.isCurrent ? (
                <Caption textColor="muted" className="font-medium">
                  {item.label}
                </Caption>
              ) : (
                <Caption textColor="subtle">
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </Caption>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb, breadcrumbVariants };
export type { BreadcrumbProps };
