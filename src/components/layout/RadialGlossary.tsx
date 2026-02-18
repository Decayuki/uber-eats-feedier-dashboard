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
            "pointer-events-none absolute bottom-16 right-1/2 translate-x-1/2 rounded-xl border border-zinc-200 bg-white/95 p-3 shadow-xl backdrop-blur transition-all duration-200",
            open ? "w-[320px] opacity-100" : "w-0 overflow-hidden opacity-0",
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Glossaire pédagogique</p>
          <p className="mt-1 text-sm font-bold text-zinc-900">{active.term}</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">{active.definition}</p>
          <p className="mt-2 rounded-lg bg-zinc-50 p-2 text-xs leading-relaxed text-zinc-600">Contexte: {active.context}</p>
        </div>

        {glossaryItems.map((item, index) => {
          const angle = (index / glossaryItems.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 118;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <button
              key={item.id}
              type="button"
              title={`${item.term} — ${item.definition}`}
              aria-label={item.term}
              onClick={() => {
                setActiveId(item.id);
                setOpen(true);
              }}
              className={cn(
                "pointer-events-none absolute bottom-7 right-7 inline-flex h-12 min-w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white px-2 text-[10px] font-bold text-zinc-700 shadow-md transition-all duration-300",
                open ? "pointer-events-auto opacity-100" : "opacity-0",
                activeId === item.id && "border-emerald-300 bg-emerald-50 text-emerald-700",
              )}
              style={{
                transform: open
                  ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  : "translate(-50%, -50%)",
              }}
            >
              {item.shortLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
