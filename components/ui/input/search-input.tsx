// components/ui/input/search-input.tsx
// Search input with clear button.

"use client";

import { forwardRef, useState } from "react";
import { Input, type InputProps } from "./input-base";
import { Search, X } from "lucide-react";

const SearchInput = forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  ({ value, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    const clear = () => {
      setInternalValue("");
      onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <Input
        ref={ref}
        type="search"
        value={value ?? internalValue}
        onChange={handleChange}
        leftIcon={<Search className="size-4" />}
        rightIcon={
          internalValue ? (
            <button
              type="button"
              onClick={clear}
              className="hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          ) : undefined
        }
        {...props}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
