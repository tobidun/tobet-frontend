// features/layout/components/desktop-nav/search-bar.tsx
// Search bar with keyboard shortcut.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "auto" }}
      className={cn("relative", className)}
    >
      <Input
        type="search"
        placeholder="Search events, teams..."
        leftIcon={<Search className="size-4" />}
        onChange={(e) => onSearch?.(e.target.value)}
        className="w-64 pl-9"
      />
      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-foreground-muted bg-background-hover rounded border border-border">
        ⌘K
      </kbd>
    </motion.div>
  );
};

export { SearchBar };
export type { SearchBarProps };
