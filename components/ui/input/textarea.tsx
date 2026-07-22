// components/ui/input/textarea.tsx
// Textarea with resize, state, and character count.

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const textareaVariants = cva(
  "flex w-full font-sans text-sm transition-colors duration-200 bg-background border border-border rounded-md placeholder:text-foreground-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-16 px-2.5 py-2 text-xs",
        md: "h-24 px-3 py-2 text-sm",
        lg: "h-32 px-4 py-3 text-base",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
      state: {
        default: "",
        error: "border-error focus-visible:ring-error",
        success: "border-success focus-visible:ring-success",
      },
    },
    defaultVariants: {
      size: "md",
      resize: "vertical",
      state: "default",
    },
  }
);

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  maxLength?: number;
  showCount?: boolean;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size, resize, state, maxLength, showCount, error, className, id, ...props }, ref) => {
    const value = props.value ?? props.defaultValue ?? "";
    const currentLength = typeof value === "string" ? value.length : 0;
    const generatedId = id || props.name;

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          id={generatedId}
          className={cn(
            textareaVariants({ size, resize, state }),
            className
          )}
          maxLength={maxLength}
          aria-invalid={!!error || undefined}
          {...props}
        />
        <div className="flex items-center justify-between mt-1.5">
          {error && <p className="text-xs text-error">{error}</p>}
          {showCount && maxLength && (
            <span className="text-xs text-foreground-subtle ml-auto">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
export type { TextareaProps };
