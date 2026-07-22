// components/ui/input/password-input.tsx
// Password input with toggle visibility.

"use client";

import { forwardRef, useState } from "react";
import { Input, type InputProps } from "./input-base";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  ({ rightIcon, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        rightIcon={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="hover:text-foreground transition-colors"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
