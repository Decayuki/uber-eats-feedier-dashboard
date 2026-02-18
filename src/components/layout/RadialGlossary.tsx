"use client";

import { useMemo, useState } from "react";
import { BookOpen, X } from "lucide-react";
import { glossaryItems } from "@/data/glossary";
import { cn } from "@/lib/utils";

export function RadialGlossary() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(glossaryItems[0].id);

  const active = useMemo(() => glossaryItems.find((item) => item.id === activeId) ?? glossaryItems[0], [activeId]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
      <div className="pointer-events-auto relative">
        <button
          type="button"
          aria-label={open ? "Fermer le glossaire" : "Ouvrir le glossaire"}
          title="Glossaire CX: définitions et contexte du cas Uber Eats"
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-zinc-950 text-white shadow-lg transition-all duration-200 hover:scale-105",
            open && "bg-emerald-600",
          )}
        >
          {open ? <X className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
        </button>

        <div
          className={cn(
            "absolute bottom-16 right-0 rounded-xl border border-zinc-200 bg-white/95 p-3 shadow-xl backdrop-blur transition-all duration-200",
            open ? "w-[min(94vw,420px)] opacity-100" : "pointer-events-none w-0 overflow-hidden opacity-0",
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Glossaire pédagogique</p>

          <div className="mt-3 grid grid-cols-4 gap-2 rounded-xl bg-zinc-50 p-2">
            {glossaryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                title={item.term}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "rounded-lg border border-zinc-200 bg-white px-2 py-2 text-[11px] font-bold text-zinc-700",
                  activeId === item.id && "border-emerald-300 bg-emerald-50 text-emerald-700",
                )}
              >
                {item.shortLabel}
              </button>
            ))}
          </div>

          <p className="mt-3 text-sm font-bold text-zinc-900">{active.term}</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">{active.definition}</p>
          <p className="mt-2 rounded-lg bg-zinc-50 p-2 text-xs leading-relaxed text-zinc-600">Contexte: {active.context}</p>
        </div>
      </div>
    </div>
  );
}
