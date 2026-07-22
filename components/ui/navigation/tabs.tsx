// components/ui/navigation/tabs.tsx
// Tabs component with accessible keyboard navigation.

"use client";

import { forwardRef, useState, useId, createContext, useContext } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const tabsListVariants = cva("relative", {
  variants: {
    variant: {
      default: "border-b border-border",
      pills: "flex gap-1 bg-background-hover p-1 rounded-lg",
      underline: "border-b border-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  variant: string;
}

const TabsContext = createContext<TabsContextValue>({
  value: "",
  onChange: () => {},
  variant: "default",
});

interface TabsProps extends VariantProps<typeof tabsListVariants> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value: controlledValue, onValueChange, variant, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const value = controlledValue ?? internalValue;

    const handleChange = (newValue: string) => {
      if (controlledValue === undefined) setInternalValue(newValue);
      onValueChange?.(newValue);
    };

    return (
      <div ref={ref} {...props}>
        <TabsContext.Provider value={{ value, onChange: handleChange, variant: variant || "default" }}>
          <div className={tabsListVariants({ variant })} role="tablist" aria-orientation="horizontal">
            {children}
          </div>
        </TabsContext.Provider>
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsListVariants> {}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(({ variant, className, children, ...props }, ref) => {
  return (
    <div ref={ref} role="tablist" className={cn(tabsListVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
});

TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    const isSelected = context.value === value;
    const variant = context.variant;

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        tabIndex={isSelected ? 0 : -1}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-sans text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          variant === "pills" && [
            "rounded-md px-3 py-1.5",
            isSelected
              ? "bg-background-card text-foreground shadow-sm"
              : "text-foreground-muted hover:text-foreground",
          ],
          (variant === "default" || variant === "underline") && [
            "-mb-px border-b-2 px-4 py-2.5",
            isSelected
              ? "border-primary text-primary"
              : "border-transparent text-foreground-muted hover:text-foreground hover:border-border",
          ],
          className
        )}
        onClick={() => context.onChange(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    const isSelected = context.value === value;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        className={cn("mt-4 focus:outline-none", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps };
