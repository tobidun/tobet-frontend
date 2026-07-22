// features/layout/components/desktop-nav/main-nav.tsx
// Main desktop navigation with active states.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import type { NavItem } from "@/features/layout/types";

interface MainNavProps {
  items: NavItem[];
  className?: string;
}

const MainNav = ({ items, className }: MainNavProps) => {
  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="Main navigation">
      {items.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <Link
            href={item.href || "#"}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              item.isActive
                ? "bg-primary/10 text-primary"
                : "text-foreground-muted hover:text-foreground hover:bg-background-hover"
            )}
            aria-current={item.isActive ? "page" : undefined}
          >
            {item.icon && <span className="size-4">{item.icon}</span>}
            {item.label}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
};

export { MainNav };
export type { MainNavProps };
