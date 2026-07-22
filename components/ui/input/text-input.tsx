// components/ui/input/text-input.tsx
// Text input with standard accessibility.

"use client";

import { forwardRef } from "react";
import { Input, type InputProps } from "./input-base";

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", ...props }, ref) => <Input ref={ref} type={type} {...props} />
);

TextInput.displayName = "TextInput";

export { TextInput };
