// components/ui/navigation/tooltip.tsx
// Tooltip with Framer Motion animation.

"use client";

import { forwardRef, useState, useId, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  delay?: number;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, side = "top", align = "center", delay = 300, className, children, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const id = useId();

    const handleMouseEnter = () => {
      timerRef.current = setTimeout(() => setOpen(true), delay);
    };

    const handleMouseLeave = () => {
      clearTimeout(timerRef.current);
      setOpen(false);
    };

    const sideClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
      left: "right-full top-1/2 -translate-y-1/2 mr-1.5",
      right: "left-full top-1/2 -translate-y-1/2 ml-1.5",
    };

    const arrowClasses = {
      top: "top-full left-1/2 -translate-x-1/2 -mt-1 border-l-4 border-r-4 border-t-4 border-transparent border-t-background-card",
      bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1 border-l-4 border-r-4 border-b-4 border-transparent border-b-background-card",
      left: "left-full top-1/2 -translate-y-1/2 -ml-1 border-t-4 border-b-4 border-l-4 border-transparent border-l-background-card",
      right: "right-full top-1/2 -translate-y-1/2 -mr-1 border-t-4 border-b-4 border-r-4 border-transparent border-r-background-card",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        {...props}
      >
        {children}
        <AnimatePresence>
          {open && (
            <motion.div
              id={id}
              role="tooltip"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className={cn(
                "absolute z-tooltip pointer-events-none",
                sideClasses[side],
                align === "start" && side === "top" && "left-0 -translate-x-0",
                align === "end" && side === "top" && "right-0 translate-x-0 left-auto"
              )}
            >
              <div className="relative rounded-md bg-background-card px-3 py-1.5 text-xs text-foreground shadow-md border border-border-subtle">
                {content}
                <span className={cn("absolute", arrowClasses[side])} aria-hidden="true" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
export type { TooltipProps };
