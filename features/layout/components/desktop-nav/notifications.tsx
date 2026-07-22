// features/layout/components/desktop-nav/notifications.tsx
// Notifications dropdown with badge.

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Bell } from "lucide-react";
import type { Notification } from "@/features/layout/types";

interface NotificationsProps {
  notifications: Notification[];
  onMarkRead?: (id: string) => void;
  className?: string;
}

const Notifications = ({ notifications, onMarkRead, className }: NotificationsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className={cn("relative", className)}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative size-10 flex items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-hover transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={isOpen}
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 size-4 flex items-center justify-center rounded-full bg-error text-foreground-inverse text-xs font-bold"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-80 bg-background-card border border-border rounded-xl shadow-xl z-dropdown overflow-hidden"
          >
            <div className="p-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-foreground-muted">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "p-3 border-b border-border last:border-b-0 cursor-pointer transition-colors",
                      !notification.read && "bg-primary/5"
                    )}
                    onClick={() => onMarkRead?.(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "size-2 rounded-full mt-1.5 shrink-0",
                        notification.type === "bet" && "bg-primary",
                        notification.type === "promotion" && "bg-accent",
                        notification.type === "system" && "bg-foreground-muted"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{notification.title}</p>
                        <p className="text-xs text-foreground-muted mt-0.5">{notification.message}</p>
                        <p className="text-xs text-foreground-subtle mt-1">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Notifications };
export type { NotificationsProps };
