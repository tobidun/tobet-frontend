// features/layout/components/mobile-nav/bottom-nav.tsx
// Bottom navigation for mobile devices.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { Home, Trophy, Search, Wallet, User } from "lucide-react";
import type { NavItem } from "@/features/layout/types";

interface BottomNavProps {
  items: NavItem[];
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="size-5" />,
  sportsbook: <Trophy className="size-5" />,
  search: <Search className="size-5" />,
  wallet: <Wallet className="size-5" />,
  user: <User className="size-5" />,
};

const BottomNav = ({ items, className }: BottomNavProps) => {
  return (
    <nav
      className={cn("fixed bottom-0 left-0 right-0 z-sticky bg-background-card border-t border-border md:hidden", className)}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-14">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href || "#"}
            className={cn(
              "flex flex-col items-center gap-0.5 p-2 transition-colors",
              item.isActive ? "text-primary" : "text-foreground-muted"
            )}
            aria-current={item.isActive ? "page" : undefined}
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center"
            >
              {iconMap[item.id] || item.icon}
            </motion.div>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export { BottomNav };
export type { BottomNavProps };
