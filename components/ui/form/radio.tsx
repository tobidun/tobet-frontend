// components/ui/form/radio.tsx
// Accessible radio group with label and description.

"use client";

import { forwardRef, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const radioVariants = cva(
  "flex items-center justify-center border transition-colors duration-200 shrink-0 rounded-full",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
      state: {
        default: "border-border bg-background",
        checked: "border-primary bg-primary",
        disabled: "opacity-50",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
);

interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof radioVariants> {
  label?: string;
  description?: string;
  error?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
              type="radio"
              disabled={disabled}
              className="sr-only"
              aria-describedby={descriptionFor}
              {...props}
            />
            <span
              className={cn(
                radioVariants({ size, state: props.checked ? "checked" : "default" }),
                disabled && "state-disabled"
              )}
              aria-hidden="true"
            >
              {props.checked && <span className="size-2 rounded-full bg-foreground-inverse" />}
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

Radio.displayName = "Radio";

export { Radio, radioVariants };
export type { RadioProps };
