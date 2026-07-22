// features/layout/components/sidebar/sports-categories.tsx
// Sports categories navigation in sidebar.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import type { Category } from "@/features/layout/types";

interface SportsCategoriesProps {
  categories: Category[];
  activeSportId?: string;
  collapsed?: boolean;
  className?: string;
}

const SportsCategories = ({ categories, activeSportId, collapsed, className }: SportsCategoriesProps) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {!collapsed && (
        <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider px-2 mb-2">
          Sports
        </h3>
      )}
      {categories.map((category) => (
        <div key={category.id} className="flex flex-col gap-1">
          {!collapsed && (
            <div className="flex items-center gap-2 px-2 py-1.5">
              <span className="text-lg" aria-hidden="true">{category.icon}</span>
              <span className="text-sm font-medium text-foreground">{category.name}</span>
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            {category.items.slice(0, collapsed ? 3 : 6).map((item) => (
              <Link
                key={item.id}
                href={item.href || "#"}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
                  item.id === activeSportId
                    ? "bg-primary/10 text-primary"
                    : "text-foreground-muted hover:text-foreground hover:bg-background-hover",
                  collapsed && "justify-center px-1"
                )}
              >
                {collapsed && <span className="text-base">{category.icon}</span>}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { SportsCategories };
export type { SportsCategoriesProps };
