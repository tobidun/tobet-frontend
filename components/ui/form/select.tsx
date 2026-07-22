// components/ui/form/select.tsx
// Custom select with styled native option rendering.

"use client";

import { forwardRef, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { ChevronDown } from "lucide-react";

const selectVariants = cva(
  "flex w-full appearance-none font-sans text-sm transition-colors duration-200 bg-background border border-border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 pr-7 text-xs",
        md: "h-9 px-3 pr-9 text-sm",
        lg: "h-10 px-4 pr-10 text-base",
      },
      state: {
        default: "",
        error: "border-error focus-visible:ring-error",
        success: "border-success focus-visible:ring-success",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
);

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  error?: string;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ size, state, error, placeholder, className, id, children, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = error ? `${selectId}-error` : undefined;

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          id={selectId}
          className={cn(selectVariants({ size, state }), className)}
          aria-invalid={!!error || undefined}
          aria-describedby={errorId}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-foreground-muted">
          <ChevronDown className="size-4" aria-hidden="true" />
        </span>
        {error && (
          <p id={errorId} className="mt-1.5 text-xs text-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select, selectVariants };
export type { SelectProps };
