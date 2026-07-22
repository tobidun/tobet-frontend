// components/ui/input/number-input.tsx
// Number input with increment/decrement controls.

"use client";

import { forwardRef } from "react";
import { Input, type InputProps } from "./input-base";
import { ChevronUp, ChevronDown } from "lucide-react";

const NumberInput = forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  ({ onChange, ...props }, ref) => {
    const clamp = (value: number, min?: number, max?: number) => {
      if (min !== undefined && value < min) return min;
      if (max !== undefined && value > max) return max;
      return value;
    };

    const adjust = (delta: number) => {
      const current = parseFloat(String((ref as React.RefObject<HTMLInputElement>)?.current?.value || "0"));
      const min = props.min !== undefined ? parseFloat(String(props.min)) : undefined;
      const max = props.max !== undefined ? parseFloat(String(props.max)) : undefined;
      const next = clamp(current + delta, min, max);
      onChange?.({
        target: { value: String(next) },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className="relative flex items-center">
        <Input
          ref={ref}
          type="number"
          onChange={onChange}
          rightIcon={
            <span className="flex flex-col -my-1">
              <button
                type="button"
                onClick={() => adjust(1)}
                className="p-0.5 hover:text-foreground transition-colors"
                aria-label="Increase"
              >
                <ChevronUp className="size-3" />
              </button>
              <button
                type="button"
                onClick={() => adjust(-1)}
                className="p-0.5 hover:text-foreground transition-colors"
                aria-label="Decrease"
              >
                <ChevronDown className="size-3" />
              </button>
            </span>
          }
          className="pr-9"
          {...props}
        />
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput };
