// components/ui/form/switch.tsx
// Toggle switch with accessible label.

"use client";

import { forwardRef, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const switchTrackVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      size: {
        sm: "size-5",
        md: "size-6",
        lg: "size-7",
      },
      state: {
        off: "bg-background-hover",
        on: "bg-primary",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      size: "md",
      state: "off",
    },
  }
);

interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof switchTrackVariants> {
  label?: string;
  description?: string;
  error?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ size, label, description, error, disabled, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const descriptionId = description ? `${inputId}-desc` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const descriptionFor = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
    const isOn = props.checked;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={inputId}
          className={cn(
            "flex items-center gap-3 cursor-pointer",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <span className="relative flex items-center shrink-0">
            <input
              ref={ref}
              id={inputId}
              type="checkbox"
              role="switch"
              disabled={disabled}
              className="sr-only"
              aria-describedby={descriptionFor}
              {...props}
            />
            <span
              className={cn(
                switchTrackVariants({ size, state: disabled ? "disabled" : isOn ? "on" : "off" }),
                className
              )}
              aria-hidden="true"
            >
              <span
                className={cn(
                  "pointer-events-none inline-block size-3.5 rounded-full bg-foreground-inverse shadow-sm transform transition-transform duration-200",
                  size === "sm" && "size-2.5",
                  size === "lg" && "size-4",
                  isOn ? "translate-x-2.5" : "translate-x-0.5"
                )}
              />
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
          <p id={errorId} className="text-xs text-error ml-9">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchTrackVariants };
export type { SwitchProps };
