"use client";

// features/layout/components/utilities/floating-chat-button.tsx
// Floating green live chat support widget button in the bottom-right corner.

import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface FloatingChatButtonProps {
  onClick?: () => void;
  className?: string;
}

export function FloatingChatButton({ onClick, className }: FloatingChatButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Live Support Chat"
      className={cn(
        "fixed bottom-5 right-5 z-tooltip size-12 rounded-full bg-[#00C853] hover:bg-[#00E676] text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 hover:scale-110 transition-transform cursor-pointer border border-emerald-400/40",
        className
      )}
    >
      <MessageSquare className="size-6 fill-white stroke-none" />
    </button>
  );
}
