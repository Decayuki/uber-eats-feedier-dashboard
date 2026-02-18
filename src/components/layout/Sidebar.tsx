"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Circle, Search, MessageSquareText, Lock, Unlock, CalendarDays, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/synthese", label: "Synthèse", icon: BarChart3 },
  { href: "/exploration", label: "Exploration", icon: Search },
  { href: "/verbatims", label: "Verbatims", icon: MessageSquareText },
  { href: "/correlation", label: "Corrélation", icon: Circle },
  { href: "/action-plan", label: "Plan d'action", icon: Lock },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const [actionUnlocked, setActionUnlocked] = useState(false);

  useEffect(() => {
    const updateLockState = () => {
      setActionUnlocked(sessionStorage.getItem("actionPlanUnlocked") === "true");
    };

    updateLockState();
    window.addEventListener("action-plan-unlocked", updateLockState);

    return () => {
      window.removeEventListener("action-plan-unlocked", updateLockState);
    };
  }, [pathname]);

  return (
    <aside className="w-full rounded-2xl border border-white/40 bg-zinc-950 p-4 text-zinc-50 shadow-lg md:sticky md:top-5 md:h-[calc(100vh-2.5rem)] md:w-[260px]">
      <div className="mb-8 space-y-1 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2 text-lg font-bold tracking-wide">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Feedier
        </div>
        <p className="text-sm text-zinc-300">Uber Eats France</p>
        <p className="text-xs text-zinc-400">2 000 feedbacks</p>
      </div>

      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.href === "/action-plan" ? (actionUnlocked ? Unlock : Lock) : item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={`Accéder à la vue ${item.label}`}
              className={cn(
                "flex items-center gap-3 rounded-xl border-l-[3px] px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                active
                  ? "border-emerald-500 bg-emerald-50 text-zinc-900"
                  : "border-transparent text-zinc-200 hover:bg-zinc-900 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-zinc-800 pt-4 text-xs text-zinc-400">
        <p title="Période couverte par l'étude pédagogique." className="mb-2 inline-flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5" /> Sept 2025 - Jan 2026
        </p>
        <p title="Volume total de feedbacks simulés dans le cas d'étude." className="mb-2 inline-flex items-center gap-2">
          <FileText className="h-3.5 w-3.5" /> 2 000 feedbacks
        </p>
        <p title="Part des feedbacks contenant un commentaire textuel exploitable.">52% avec verbatim</p>
      </div>
    </aside>
  );
}
