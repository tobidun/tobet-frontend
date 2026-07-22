"use client";

// features/layout/components/desktop-nav/auth-modal.tsx
// SUREBET247 Auth Modal component for Login and Sign Up tabbed dialogs.

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { X, Eye, EyeOff, Ticket, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AuthMode = "login" | "signup";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Form State
  const [showPassword, setShowPassword] = useState(false);
  const [hasBonusCode, setHasBonusCode] = useState(false);
  const [bonusCode, setBonusCode] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Inputs
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+234");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      alert(`Logging in with Phone: ${phone}`);
    } else {
      if (!agreedTerms) {
        alert("Please agree to the terms of contract to sign up.");
        return;
      }
      alert(`Signing up with Email: ${email}, Phone: ${phone}`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-99 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#2C2F36] text-white rounded-2xl shadow-2xl overflow-hidden border border-[#3C404B] flex flex-col max-h-[92vh]">
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 size-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="size-5 stroke-[2.5]" />
        </button>

        {/* Hero Welcome Banner Graphic */}
        <div className="relative w-full h-36 sm:h-40 shrink-0 bg-gradient-to-r from-emerald-950 via-green-900 to-emerald-950 overflow-hidden">
          <Image
            src="/images/promos/welcome_modal_banner.png"
            alt="Welcome Bonus Up To N150,000 Sport & Casino"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Tab Switcher Bar */}
        <div className="grid grid-cols-2 bg-[#23262D] border-b border-[#383C46] text-xs font-bold uppercase tracking-wider shrink-0 select-none">
          <button
            onClick={() => setMode("signup")}
            className={cn(
              "py-3.5 text-center transition-colors cursor-pointer",
              mode === "signup"
                ? "text-white bg-[#2C2F36] border-b-2 border-[#00C853] font-black"
                : "text-gray-400 hover:text-white"
            )}
          >
            SIGN UP
          </button>
          <button
            onClick={() => setMode("login")}
            className={cn(
              "py-3.5 text-center transition-colors cursor-pointer",
              mode === "login"
                ? "text-white bg-[#2C2F36] border-b-2 border-[#00C853] font-black"
                : "text-gray-400 hover:text-white"
            )}
          >
            LOG IN
          </button>
        </div>

        {/* Form Body Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 no-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === "signup" && (
              <>
                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#444852] border border-transparent focus:border-[#00C853] text-white rounded-lg px-3.5 py-3 text-xs placeholder-gray-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <label className="absolute left-3.5 top-1.5 text-[10px] text-gray-400 font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#444852] border border-transparent focus:border-[#00C853] text-white rounded-lg px-3.5 pt-4 pb-1.5 text-xs focus:outline-none transition-colors"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#444852] border border-transparent focus:border-[#00C853] text-white rounded-lg pl-3.5 pr-10 py-3 text-xs placeholder-gray-400 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>

                {/* First Name Field */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#444852] border border-transparent focus:border-[#00C853] text-white rounded-lg px-3.5 py-3 text-xs placeholder-gray-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Last Name / Surname Field */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Last Name / Surname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#444852] border border-transparent focus:border-[#00C853] text-white rounded-lg px-3.5 py-3 text-xs placeholder-gray-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Bonus Code Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setHasBonusCode(!hasBonusCode)}
                    className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-emerald-400 transition-colors font-medium cursor-pointer"
                  >
                    <Ticket className="size-4" />
                    <span>I have a <span className="text-[#00C853] underline">Bonus Code</span></span>
                    <ChevronDown className={cn("size-3.5 transition-transform", hasBonusCode && "rotate-180")} />
                  </button>
                  {hasBonusCode && (
                    <input
                      type="text"
                      placeholder="Enter bonus code"
                      value={bonusCode}
                      onChange={(e) => setBonusCode(e.target.value)}
                      className="w-full mt-2 bg-[#444852] border border-transparent focus:border-[#00C853] text-white rounded-lg px-3.5 py-2.5 text-xs placeholder-gray-400 focus:outline-none"
                    />
                  )}
                </div>

                {/* Terms Box */}
                <div className="bg-[#383C45] border border-[#484D59] rounded-xl p-3.5 flex items-start gap-3 justify-between">
                  <p className="text-[11px] text-gray-300 leading-snug">
                    I&apos;m 18+ with no prior Surebet247 account. The information provided is true, and I agree to{" "}
                    <a href="#" className="text-[#00C853] underline hover:text-emerald-300">
                      Surebet247&apos;s terms of contract.
                    </a>
                  </p>
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="size-5 rounded border-gray-600 bg-gray-700 text-[#00C853] focus:ring-0 cursor-pointer shrink-0 mt-0.5"
                  />
                </div>

                {/* SIGN UP Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#00C853] hover:bg-[#00E676] text-white font-extrabold text-xs py-3.5 rounded-lg uppercase tracking-wider shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.01]"
                >
                  SIGN UP
                </Button>

                <p className="text-center text-xs text-gray-400 pt-1">
                  Have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-[#00C853] font-bold underline hover:text-emerald-300 cursor-pointer"
                  >
                    Log In
                  </button>
                </p>
              </>
            )}

            {mode === "login" && (
              <>
                {/* Phone Field */}
                <div className="relative">
                  <label className="absolute left-3.5 top-1.5 text-[10px] text-gray-400 font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#444852] border border-transparent focus:border-[#00C853] text-white rounded-lg px-3.5 pt-4 pb-1.5 text-xs focus:outline-none transition-colors"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#444852] border border-transparent focus:border-[#00C853] text-white rounded-lg pl-3.5 pr-10 py-3 text-xs placeholder-gray-400 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Forgot password flow");
                    }}
                    className="text-xs text-[#00C853] font-medium underline hover:text-emerald-300"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* LOG IN Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#00C853] hover:bg-[#00E676] text-white font-extrabold text-xs py-3.5 rounded-lg uppercase tracking-wider shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.01]"
                >
                  LOG IN
                </Button>

                <p className="text-center text-xs text-gray-400 pt-1">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-[#00C853] font-bold underline hover:text-emerald-300 cursor-pointer"
                  >
                    Sign up
                  </button>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
