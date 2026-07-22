// features/layout/components/desktop-nav/user-menu.tsx
// User menu dropdown with avatar and actions.

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ChevronDown, LogOut, Settings, User, Wallet, HelpCircle } from "lucide-react";
import { Avatar } from "@/components/ui/data-display";
import type { UserMenuItem } from "@/features/layout/types";

interface UserMenuProps {
  name: string;
  email: string;
  avatar?: string;
  menuItems: UserMenuItem[];
  className?: string;
}

const UserMenu = ({ name, email, avatar, menuItems, className }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const iconMap: Record<string, React.ReactNode> = {
    profile: <User className="size-4" />,
    bets: <Wallet className="size-4" />,
    settings: <Settings className="size-4" />,
    help: <HelpCircle className="size-4" />,
    logout: <LogOut className="size-4" />,
  };

  return (
    <div className={cn("relative", className)}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-background-hover transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar src={avatar} alt={name} fallback={name} size="sm" />
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-sm font-medium text-foreground leading-none">{name}</span>
          <span className="text-xs text-foreground-muted leading-none">{email}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="size-4 text-foreground-muted" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-56 bg-background-card border border-border rounded-xl shadow-xl z-dropdown overflow-hidden"
          >
            <div className="p-2">
              {menuItems.map((item) => {
                if (item.divider) {
                  return <div key={item.id} className="h-px bg-border my-1" />;
                }

                const Icon = item.icon || iconMap[item.id];

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => {
                        item.onClick?.();
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors",
                        item.danger
                          ? "text-error hover:bg-error/10"
                          : "text-foreground hover:bg-background-hover"
                      )}
                    >
                      {Icon && <span className="size-4">{Icon}</span>}
                      {item.label}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { UserMenu };
export type { UserMenuProps };
