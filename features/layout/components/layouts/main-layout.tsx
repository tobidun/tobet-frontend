// features/layout/components/layouts/main-layout.tsx
// Main layout wrapper for the application.

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Logo, MainNav, SportsDropdown, SearchBar, WalletButton, Notifications, UserMenu } from "@/features/layout/components/desktop-nav";
import { BottomNav, MobileDrawer, MobileSearch, MobileMenu } from "@/features/layout/components/mobile-nav";
import { Sidebar } from "@/features/layout/components/sidebar";
import { BetSlipDrawer } from "@/features/bets/components";
import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
  sidebarContent?: ReactNode;
  className?: string;
}

const MainLayout = ({ children, sidebarOpen = true, onSidebarToggle, sidebarContent, className }: MainLayoutProps) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <header className="sticky top-0 z-sticky bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between h-14 px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <MobileMenu />
            <Logo showText={false} />
            <div className="hidden lg:block">
              <MainNav
                items={[
                  { id: "sportsbook", label: "Sportsbook", href: "/sportsbook", isActive: true },
                  { id: "live", label: "Live", href: "/live" },
                  { id: "in-play", label: "In-Play", href: "/in-play" },
                ]}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="hidden lg:block">
              <SportsDropdown
                categories={[
                  {
                    id: "team-sports",
                    name: "Team Sports",
                    icon: "⚽",
                    items: [
                      { id: "football", label: "Football", href: "/sports/football" },
                      { id: "basketball", label: "Basketball", href: "/sports/basketball" },
                      { id: "tennis", label: "Tennis", href: "/sports/tennis" },
                    ],
                  },
                ]}
                favoriteLeagues={[]}
              />
            </div>
            <WalletButton balance={1250.50} />
            <Notifications
              notifications={[
                { id: "1", title: "Bet Won!", message: "Your bet won $105.00", timestamp: new Date().toISOString(), read: false, type: "bet" },
              ]}
            />
            <UserMenu
              name="John Doe"
              email="john@example.com"
              menuItems={[
                { id: "profile", label: "My Profile", href: "/profile" },
                { id: "bets", label: "My Bets", href: "/bets" },
                { id: "wallet", label: "Wallet", href: "/wallet" },
                { id: "settings", label: "Settings", href: "/settings" },
                { id: "divider", label: "", divider: true },
                { id: "logout", label: "Log Out", onClick: () => {}, danger: true },
              ]}
            />
          </div>
        </div>
      </header>
      <Sidebar open={sidebarOpen} onToggle={onSidebarToggle || (() => {})}>
        {sidebarContent}
      </Sidebar>
      <main className={cn("pt-14 pb-16 md:pb-0 transition-all duration-200", sidebarOpen ? "md:ml-[280px]" : "md:ml-[72px]")}>
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
      <MobileSearch open={false} onClose={() => {}} />
      <MobileDrawer
        open={false}
        onClose={() => {}}
        categories={[]}
        leagues={[]}
      />
      <BottomNav
        items={[
          { id: "home", label: "Home", href: "/", isActive: true },
          { id: "sportsbook", label: "Sports", href: "/sportsbook" },
          { id: "search", label: "Search", href: "/search" },
          { id: "wallet", label: "Wallet", href: "/wallet" },
          { id: "user", label: "Account", href: "/account" },
        ]}
      />
      <BetSlipDrawer />
    </div>
  );
};

export { MainLayout };
export type { MainLayoutProps };
