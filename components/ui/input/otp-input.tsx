// components/ui/input/otp-input.tsx
// OTP input group with auto-focus and paste support.

"use client";

import { forwardRef, useCallback, useEffect, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const slotVariants = cva(
  "flex items-center justify-center font-sans text-sm transition-all duration-200 bg-background border border-border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      size: {
        sm: "size-9 text-sm",
        md: "size-10 text-base",
        lg: "size-12 text-lg",
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

interface OTPInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">,
    VariantProps<typeof slotVariants> {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  ({ length = 6, size, state, value = "", onChange, className, ...props }, ref) => {
    const slots = Array.from({ length }, () => useRef<HTMLInputElement>(null));
    const containerRef = useRef<HTMLDivElement>(null);

    const focusSlot = useCallback((index: number) => {
      slots[index]?.current?.focus();
    }, [slots]);

    const handleChange = useCallback(
      (index: number, char: string) => {
        const newValue = value.slice(0, index) + char + value.slice(index + 1);
        const next = newValue.slice(0, length);
        onChange?.(next);
        if (char && index < length - 1) {
          focusSlot(index + 1);
        }
      },
      [value, length, onChange, focusSlot]
    );

    const handleKeyDown = useCallback(
      (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
          if (!slots[index].current?.value && index > 0) {
            focusSlot(index - 1);
          }
        } else if (e.key === "ArrowLeft" && index > 0) {
          focusSlot(index - 1);
        } else if (e.key === "ArrowRight" && index < length - 1) {
          focusSlot(index + 1);
        }
      },
      [length, focusSlot]
    );

    const handlePaste = useCallback(
      (e: React.ClipboardEvent) => {
        const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        if (paste) {
          onChange?.(paste);
          const focusIndex = Math.min(paste.length, length - 1);
          focusSlot(focusIndex);
        }
      },
      [length, onChange, focusSlot]
    );

    useEffect(() => {
      const firstEmpty = value.length < length;
      if (firstEmpty) {
        focusSlot(value.length);
      }
    }, [value, length, focusSlot]);

    return (
      <div
        ref={containerRef}
        className={cn("flex gap-2", className)}
        role="group"
        aria-label="One-time password input"
        {...props}
      >
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={slots[i] as React.RefObject<HTMLInputElement>}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ""}
            onChange={(e) => handleChange(i, e.target.value.slice(-1))}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={slotVariants({ size, state })}
            aria-label={`Digit ${i + 1} of ${length}`}
          />
        ))}
      </div>
    );
  }
);

OTPInput.displayName = "OTPInput";

export { OTPInput, slotVariants };
export type { OTPInputProps };
