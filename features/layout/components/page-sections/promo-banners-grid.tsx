"use client";

// features/layout/components/page-sections/promo-banners-grid.tsx
// Dual promotional hero cards ("Incredible X Aviator" & "Wheel of Fortune - Toyota Camry").

import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

interface PromoBannersGridProps {
  className?: string;
}

export function PromoBannersGrid({ className }: PromoBannersGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 w-full my-3", className)}>
      {/* Aviator Banner Card */}
      <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-[#0a2318] via-[#103023] to-[#0c1a14] border border-emerald-500/30 p-4 min-h-[160px] flex items-center justify-between shadow-xl">
        <div className="z-10 max-w-[60%] flex flex-col justify-between h-full space-y-2">
          <div className="space-y-1">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 w-max inline-block">
              HOT GAME
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white italic tracking-tight leading-none drop-shadow">
              Incredible X <br />
              <span className="text-red-500 underline decoration-red-500/50">Aviator</span>
            </h3>
          </div>
          <div>
            <Button
              size="sm"
              className="bg-[#00C853] hover:bg-[#00E676] text-black font-extrabold text-xs px-4 py-1.5 rounded uppercase shadow-md transition-all hover:scale-105"
            >
              PLAY NOW
            </Button>
          </div>
        </div>
        {/* Banner Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] h-full opacity-90 group-hover:scale-105 transition-transform duration-500">
          <Image
            src="/images/promos/aviator.png"
            alt="Incredible X Aviator"
            fill
            className="object-cover object-center rounded-r-xl"
            priority
          />
        </div>
      </div>

      {/* Wheel of Fortune Banner Card */}
      <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-[#0c2e20] via-[#123827] to-[#0d2118] border border-emerald-500/30 p-4 min-h-[160px] flex items-center justify-between shadow-xl">
        <div className="z-10 max-w-[60%] flex flex-col justify-between h-full space-y-2">
          <div className="space-y-1">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/20 w-max inline-block">
              SPECIAL PRIZE
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight leading-tight drop-shadow">
              Wheel of <span className="text-amber-400">Fortune</span>
            </h3>
            <p className="text-[11px] text-emerald-200 font-semibold leading-snug">
              Spin & Win YOUR NEW <br />
              <span className="text-white font-extrabold underline decoration-amber-400">TOYOTA CAMRY!</span>
            </p>
          </div>
          <div>
            <Button
              size="sm"
              className="bg-[#00C853] hover:bg-[#00E676] text-black font-extrabold text-xs px-4 py-1.5 rounded uppercase shadow-md transition-all hover:scale-105"
            >
              PLAY NOW!
            </Button>
          </div>
        </div>
        {/* Banner Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] h-full opacity-90 group-hover:scale-105 transition-transform duration-500">
          <Image
            src="/images/promos/wheel.png"
            alt="Wheel of Fortune Toyota Camry"
            fill
            className="object-cover object-center rounded-r-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
