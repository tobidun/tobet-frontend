// features/layout/components/desktop-nav/sports-dropdown.tsx
// Sports dropdown menu with categories.

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ChevronDown, Star } from "lucide-react";
import Link from "next/link";
import type { Category, League } from "@/features/layout/types";

interface SportsDropdownProps {
  categories: Category[];
  favoriteLeagues?: League[];
  className?: string;
}

const SportsDropdown = ({ categories, favoriteLeagues, className }: SportsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-background-hover transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Sports</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="size-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-[600px] bg-background-card border border-border rounded-xl shadow-xl z-dropdown"
          >
            <div className="flex">
              <div className="flex-1 p-4">
                <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">Categories</h3>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-background-hover">
                        <span className="text-lg" aria-hidden="true">{category.icon}</span>
                        <span className="text-sm font-medium text-foreground">{category.name}</span>
                      </div>
                      <div className="flex flex-col gap-1 pl-2">
                        {category.items.slice(0, 4).map((item) => (
                          <Link
                            key={item.id}
                            href={item.href || "#"}
                            className="text-xs text-foreground-muted hover:text-foreground transition-colors py-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {favoriteLeagues && favoriteLeagues.length > 0 && (
                <div className="w-56 p-4 border-l border-border">
                  <h3 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Star className="size-3 fill-accent text-accent" aria-hidden="true" />
                    Favorites
                  </h3>
                  <div className="flex flex-col gap-1">
                    {favoriteLeagues.map((league) => (
                      <Link
                        key={league.id}
                        href={`/league/${league.id}`}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-background-hover transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-sm" aria-hidden="true">{league.logo}</span>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-xs font-medium text-foreground truncate">{league.name}</span>
                          <span className="text-xs text-foreground-muted">{league.country}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { SportsDropdown };
export type { SportsDropdownProps };
