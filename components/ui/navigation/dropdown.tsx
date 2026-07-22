// components/ui/navigation/dropdown.tsx
// Dropdown menu with accessible keyboard navigation.

"use client";

import { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const dropdownVariants = cva("min-w-[8rem] overflow-hidden rounded-md border border-border bg-background-card p-1 shadow-lg", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface DropdownProps extends VariantProps<typeof dropdownVariants> {
  trigger: React.ReactNode;
  items: {
    label: string;
    value: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    selected?: boolean;
    onSelect?: () => void;
  }[];
  align?: "start" | "center" | "end";
  side?: "top" | "bottom";
  className?: string;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ trigger, items, size, align = "end", side = "bottom", className }, ref) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleToggle = useCallback(() => {
      setOpen((prev) => !prev);
      setActiveIndex(-1);
    }, []);

    const handleClose = useCallback(() => {
      setOpen(false);
      setActiveIndex(-1);
      triggerRef.current?.focus();
    }, []);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!open) return;
        const enabledItems = items.filter((i) => !i.disabled);
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % enabledItems.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((prev) => (prev - 1 + enabledItems.length) % enabledItems.length);
        } else if (e.key === "Enter" && activeIndex >= 0) {
          e.preventDefault();
          const item = enabledItems[activeIndex];
          if (item) {
            item.onSelect?.();
            handleClose();
          }
        } else if (e.key === "Escape") {
          handleClose();
        }
      },
      [open, items, activeIndex, handleClose]
    );

    useEffect(() => {
      if (open && activeIndex >= 0 && menuRef.current) {
        const items = menuRef.current.querySelectorAll("[data-dropdown-item]");
        (items[activeIndex] as HTMLElement)?.scrollIntoView({ block: "nearest" });
      }
    }, [open, activeIndex]);

    return (
      <div ref={ref} className={cn("relative inline-block", className)}>
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {trigger}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: side === "top" ? 4 : -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: side === "top" ? 4 : -4 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute z-dropdown mt-1.5",
                side === "top" && "bottom-full mb-1.5",
                align === "start" && "left-0",
                align === "center" && "left-1/2 -translate-x-1/2",
                align === "end" && "right-0"
              )}
              role="menu"
              aria-orientation="vertical"
              onKeyDown={handleKeyDown}
            >
              <div className={dropdownVariants({ size })}>
                {items.map((item, index) => (
                  <button
                    key={item.value}
                    data-dropdown-item
                    role="menuitem"
                    disabled={item.disabled}
                    aria-selected={item.selected}
                    tabIndex={open ? 0 : -1}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left transition-colors",
                      "hover:bg-background-hover focus:bg-background-hover focus:outline-none",
                      "disabled:pointer-events-none disabled:opacity-50",
                      activeIndex === index && "bg-background-hover"
                    )}
                    onClick={() => {
                      item.onSelect?.();
                      handleClose();
                    }}
                  >
                    {item.icon && <span className="size-4 flex items-center justify-center">{item.icon}</span>}
                    <span className="flex-1">{item.label}</span>
                    {item.selected && <Check className="size-4 text-primary" aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export { Dropdown, dropdownVariants };
export type { DropdownProps };
