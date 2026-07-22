// features/bets/components/bets-layout.tsx
// Shared layout for the betting experience with sidebar navigation.

"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, LayoutGrid } from "lucide-react";

interface BetsLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: "/bets", label: "My Bets", icon: LayoutGrid, exact: true },
];

const BetsLayout = ({ children }: BetsLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Ticket className="size-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Betting</h1>
            <p className="text-foreground-muted mt-1">Manage your bets, slips, and cash outs</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <nav className="lg:w-60 shrink-0">
            <div className="bg-background-card border border-border rounded-xl p-2 lg:sticky lg:top-24">
              {navItems.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground-muted hover:text-foreground hover:bg-background-hover"
                    )}
                  >
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
          <main className="flex-1 min-w-0">
            <div className="bg-background-card border border-border rounded-xl p-6 sm:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export { BetsLayout };
export type { BetsLayoutProps };
