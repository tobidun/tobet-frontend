// features/layout/components/sidebar/sidebar.tsx
// Main sidebar container with collapse state.

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

const Sidebar = ({ open, onToggle, children, className }: SidebarProps) => {
  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: open ? 280 : 72 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-background-card border-r border-border z-sticky hidden md:flex flex-col",
          className
        )}
      >
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-3">
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {children}
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex flex-col items-center gap-2"
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="p-3 border-t border-border">
          <Button
            variant="ghost"
            size="xs"
            onClick={onToggle}
            className="w-full flex items-center justify-center"
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          >
            {open ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
          </Button>
        </div>
      </motion.aside>
      {open && (
        <div
          className="fixed inset-0 top-14 bg-background/80 z-sticky hidden md:block"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export { Sidebar };
export type { SidebarProps };
