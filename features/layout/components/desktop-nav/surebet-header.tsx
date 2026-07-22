"use client";

// features/layout/components/desktop-nav/surebet-header.tsx
// SUREBET247 styled top navigation bar with brand logo, nav badges, and Auth Modal triggers.

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import type { AuthMode } from "./auth-modal";

interface SureBetHeaderProps {
  activeTab?: string;
  onTabSelect?: (tabId: string) => void;
  onOpenAuth?: (mode: AuthMode) => void;
  className?: string;
}

export function SureBetHeader({
  activeTab = "sports",
  onTabSelect,
  onOpenAuth,
  className,
}: SureBetHeaderProps) {
  const navItems = [
    { id: "sports", label: "Sports", icon: null, badge: null },
    { id: "live", label: "Live", icon: null, badge: null },
    { id: "casino", label: "Casino", icon: null, badge: null },
    {
      id: "aviator",
      label: "Aviator",
      icon: (
        <span className="text-red-500 font-bold inline-flex items-center gap-1">
          ✈️
        </span>
      ),
      badge: null,
    },
    { id: "live-casino", label: "Live Casino", icon: null, badge: null },
    {
      id: "wheel-of-fortune",
      label: "Wheel of Fortune",
      icon: <span className="inline-flex items-center">🎡</span>,
      badge: null,
    },
    { id: "scheduled-virtuals", label: "Scheduled Virtuals", icon: null, badge: null },
    {
      id: "help",
      label: "Help",
      icon: null,
      badge: <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">1</span>,
    },
    { id: "promotions", label: "Promotions", icon: null, badge: null },
    { id: "tournaments", label: "Tournaments", icon: null, badge: null },
    {
      id: "jackpot-sure6",
      label: "Jackpot Sure6",
      icon: null,
      badge: <span className="bg-[#00C853] text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase leading-none">FREE</span>,
    },
  ];

  return (
    <header className={cn("w-full bg-[#121417] text-white border-b border-[#23272F] sticky top-0 z-sticky shadow-lg", className)}>
      <div className="max-w-[1700px] mx-auto px-3 sm:px-4 h-14 flex items-center justify-between gap-3 overflow-hidden">
        {/* Brand Logo */}
        <div className="flex items-center shrink-0 pr-2">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="SureBet247 Logo"
              width={140}
              height={40}
              className="h-9 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform"
              priority
            />
          </Link>
        </div>

        {/* Scrollable Middle Nav Pills */}
        <nav className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar py-1 min-w-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabSelect?.(item.id)}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer",
                  isActive
                    ? "bg-[#2D323A] text-white shadow-sm ring-1 ring-white/10"
                    : "text-gray-300 hover:text-white hover:bg-[#1E2228]"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && <span className="ml-0.5">{item.badge}</span>}
              </button>
            );
          })}
        </nav>

        {/* Fixed Right Auth Buttons (Trigger Modal) */}
        <div className="flex items-center gap-2 shrink-0 border-l border-[#23272F] pl-3 ml-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenAuth?.("login")}
            className="border-gray-500/70 hover:border-gray-400 text-white bg-transparent hover:bg-white/10 font-semibold tracking-wider text-xs px-3 sm:px-4 py-1.5 rounded uppercase whitespace-nowrap cursor-pointer"
          >
            LOGIN
          </Button>
          <Button
            size="sm"
            onClick={() => onOpenAuth?.("signup")}
            className="bg-[#00C853] hover:bg-[#00E676] text-white font-black tracking-wider text-xs px-4 sm:px-5 py-1.5 rounded uppercase shadow-md shadow-emerald-950/40 transition-all hover:scale-[1.02] whitespace-nowrap cursor-pointer"
          >
            REGISTER
          </Button>
        </div>
      </div>
    </header>
  );
}
