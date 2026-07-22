// components/ui/form/checkbox.tsx
// Accessible checkbox with label and indeterminate state.

"use client";

import { forwardRef, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { Check } from "lucide-react";

const checkboxVariants = cva(
  "flex items-center justify-center border transition-colors duration-200 shrink-0",
  {
    variants: {
      size: {
        sm: "size-4 rounded",
        md: "size-5 rounded-md",
        lg: "size-6 rounded-lg",
      },
      state: {
        default: "border-border bg-background hover:border-border-subtle",
        checked: "bg-primary border-primary",
        indeterminate: "bg-primary border-primary",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
);

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ size, label, description, error, disabled, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const descriptionId = description ? `${inputId}-desc` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const descriptionFor = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={inputId}
          className={cn(
            "flex items-start gap-3 cursor-pointer",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <span className="relative flex items-center shrink-0">
            <input
              ref={ref}
              id={inputId}
              type="checkbox"
              disabled={disabled}
              className="sr-only"
              aria-describedby={descriptionFor}
              {...props}
            />
            <span
              className={cn(
                checkboxVariants({ size, state: props.checked ? "checked" : "default" }),
                disabled && "state-disabled"
              )}
              aria-hidden="true"
            >
              {(props.checked || props.indeterminate) && (
                <Check className="size-3 text-foreground-inverse" strokeWidth={3} />
              )}
            </span>
          </span>
          {(label || description) && (
            <span className="flex flex-col gap-0.5">
              {label && <span className="text-sm font-medium text-foreground">{label}</span>}
              {description && (
                <span id={descriptionId} className="text-xs text-foreground-muted">
                  {description}
                </span>
              )}
            </span>
          )}
        </label>
        {error && (
          <p id={errorId} className="text-xs text-error ml-8">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
export type { CheckboxProps };
