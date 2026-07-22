// features/account/components/account-layout.tsx
// Shared layout for account pages with sidebar navigation.

"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Shield,
  Key,
  Smartphone,
  Bell,
  ShieldCheck,
  Wallet,
} from "lucide-react";

interface AccountLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: "/account/profile", label: "Profile Overview", icon: User },
  { href: "/account/profile/personal-information", label: "Personal Information", icon: User },
  { href: "/account/profile/security", label: "Security Settings", icon: Shield },
  { href: "/account/profile/change-password", label: "Change Password", icon: Key },
  { href: "/account/profile/two-factor", label: "Two-Factor Authentication", icon: Smartphone },
  { href: "/account/profile/notifications", label: "Notifications", icon: Bell },
  { href: "/account/profile/responsible-gambling", label: "Responsible Gambling", icon: ShieldCheck },
  { href: "/wallet", label: "Wallet", icon: Wallet },
];

const AccountLayout = ({ children }: AccountLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
          <p className="text-foreground-muted mt-1">Manage your profile and preferences</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <nav className="lg:w-64 shrink-0">
            <div className="bg-background-card border border-border rounded-xl p-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
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

export { AccountLayout };
export type { AccountLayoutProps };
