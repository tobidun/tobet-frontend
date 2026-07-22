// features/layout/components/mobile-nav/mobile-menu.tsx
// Mobile menu button with hamburger icon.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  onClick?: () => void;
  className?: string;
}

const MobileMenu = ({ onClick, className }: MobileMenuProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="xs"
        onClick={onClick}
        className={cn("md:hidden px-2", className)}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>
    </motion.div>
  );
};

export { MobileMenu };
export type { MobileMenuProps };
