"use client";

// app/page-client.tsx
// SUREBET247 dark sports betting home page interface with interactive betslip & Auth Modal popup.

import { useState, useEffect } from "react";
import { SureBetHeader } from "@/features/layout/components/desktop-nav/surebet-header";
import { SureBetSidebar } from "@/features/layout/components/sidebar/surebet-sidebar";
import { SportsCountRibbon } from "@/features/sportsbook/components/sports-navigation/sports-count-ribbon";
import { PromoBannersGrid } from "@/features/layout/components/page-sections/promo-banners-grid";
import {
  InPlayMatchesGrid,
  LiveMatchData,
  MatchOdd,
} from "@/features/sportsbook/components/match/in-play-matches-grid";
import {
  SureBetBetslip,
  SelectedBetItem,
} from "@/features/sportsbook/components/bet-slip/surebet-betslip";
import { FloatingChatButton } from "@/features/layout/components/utilities/floating-chat-button";
import { AuthModal, AuthMode } from "@/features/layout/components/desktop-nav/auth-modal";

export function HomePageClient() {
  const [activeHeaderTab, setActiveHeaderTab] = useState("sports");
  const [activeSidebarItem, setActiveSidebarItem] = useState("sports-lobby");
  const [selectedSportRibbon, setSelectedSportRibbon] = useState("football");
  const [isLoading, setIsLoading] = useState(true);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const handleOpenAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // State for user's betslip selections
  const [selections, setSelections] = useState<SelectedBetItem[]>([]);

  // Simulate skeleton load on initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Toggle selection on odds button click
  const handleSelectOdd = (match: LiveMatchData, odd: MatchOdd) => {
    const itemKey = `${match.id}-${odd.label}`;
    setSelections((prev) => {
      const exists = prev.some((item) => item.id === itemKey);
      if (exists) {
        return prev.filter((item) => item.id !== itemKey);
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            matchId: match.id,
            matchTitle: `${match.homeTeam} vs ${match.awayTeam}`,
            market: match.category,
            selection: odd.label,
            odds: odd.odds,
          },
        ];
      }
    });
  };

  const handleRemoveSelection = (id: string) => {
    setSelections((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setSelections([]);
  };

  const selectedOddsIds = selections.map((s) => s.id);

  return (
    <div className="min-h-screen bg-[#0B0D10] text-gray-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top SUREBET247 Header */}
      <SureBetHeader
        activeTab={activeHeaderTab}
        onTabSelect={(tabId) => setActiveHeaderTab(tabId)}
        onOpenAuth={handleOpenAuthModal}
      />

      {/* Main Layout Grid */}
      <div className="flex-1 flex overflow-hidden max-w-[1700px] w-full mx-auto">
        {/* Left Sidebar */}
        <div className="hidden md:block">
          <SureBetSidebar
            activeItem={activeSidebarItem}
            onSelect={(id) => setActiveSidebarItem(id)}
          />
        </div>

        {/* Center Main Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5 space-y-4">
          {/* Breadcrumb Header */}
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium tracking-wide">
            <span className="text-gray-300 font-bold">Lobby</span>
            <span>•</span>
            <span className="text-gray-400">Live</span>
            <span>•</span>
            <span className="text-gray-400">Sports</span>
          </div>

          {/* Sports Categories Icon Ribbon */}
          <SportsCountRibbon
            selectedSportId={selectedSportRibbon}
            onSelectSport={(id) => setSelectedSportRibbon(id)}
          />

          {/* Promotional Banners Carousel/Grid */}
          <PromoBannersGrid />

          {/* In-Play Live Matches Grid with Skeleton Loader */}
          <InPlayMatchesGrid
            isLoading={isLoading}
            onSelectOdd={handleSelectOdd}
            selectedOddsIds={selectedOddsIds}
          />
        </main>

        {/* Right Sidebar (Betslip) */}
        <div className="hidden lg:block">
          <SureBetBetslip
            selections={selections}
            onRemoveSelection={handleRemoveSelection}
            onClearAll={handleClearAll}
          />
        </div>
      </div>

      {/* Floating Live Chat Support Widget */}
      <FloatingChatButton onClick={() => alert("Connecting to live chat support...")} />

      {/* Auth Modal Dialog (Sign Up & Log In) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
