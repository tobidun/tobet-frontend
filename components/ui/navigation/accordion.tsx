// components/ui/navigation/accordion.tsx
// Accordion with single/multiple expansion modes.

"use client";

import { forwardRef, useState, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const accordionVariants = cva("border border-border rounded-lg", {
  variants: {
    variant: {
      default: "bg-background-card",
      ghost: "bg-transparent border-none divide-y divide-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AccordionProps extends VariantProps<typeof accordionVariants> {
  type?: "single" | "multiple";
  value?: string[];
  onValueChange?: (value: string[]) => void;
  children: React.ReactNode;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", value = [], onValueChange, variant, children, ...props }, ref) => {
    const toggle = (itemValue: string) => {
      if (type === "single") {
        onValueChange?.(value.includes(itemValue) ? [] : [itemValue]);
      } else {
        onValueChange?.(
          value.includes(itemValue)
            ? value.filter((v) => v !== itemValue)
            : [...value, itemValue]
        );
      }
    };

    return (
      <div ref={ref} className={cn(accordionVariants({ variant }), "divide-y divide-border")} {...props}>
        {children}
      </div>
    );
  }
);

Accordion.displayName = "Accordion";

interface AccordionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  value: string;
  title: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, title, disabled, children, className, ...props }, ref) => {
    const id = useId();
    const titleId = `${id}-title`;
    const contentId = `${id}-content`;

    return (
      <div ref={ref} className={cn("border-b border-border last:border-b-0", className)} {...props}>
        <h3>
          <button
            id={titleId}
            aria-controls={contentId}
            aria-expanded={props["aria-expanded"]}
            disabled={disabled}
            className={cn(
              "flex w-full items-center justify-between gap-4 px-4 py-3 text-sm font-medium text-left transition-colors",
              "hover:bg-background-hover focus:bg-background-hover focus:outline-none",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {title}
            <ChevronDown className="size-4 shrink-0 transition-transform duration-200" aria-hidden="true" />
          </button>
        </h3>
        <div id={contentId} role="region" aria-labelledby={titleId} hidden>
          <div className="px-4 pb-3 text-sm text-foreground-muted">{children}</div>
        </div>
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

export { Accordion, AccordionItem };
export type { AccordionProps, AccordionItemProps };
