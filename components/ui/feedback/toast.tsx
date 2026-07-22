// components/ui/feedback/toast.tsx
// Toast wrapper using Sonner for notifications.

"use client";

import { Toaster } from "sonner";

export function Toast() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      duration={4000}
      theme="dark"
      className="toast-container"
    />
  );
}
