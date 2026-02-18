"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Verbatim } from "@/lib/types";

interface VerbatimTableProps {
  data: Verbatim[];
}

type SortKey = "date" | "nps" | "sentiment";

export function VerbatimTable({ data }: VerbatimTableProps) {
  const [selected, setSelected] = useState<Verbatim | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("date");

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sortKey === "nps") return b.nps - a.nps;
      if (sortKey === "sentiment") return a.sentiment.localeCompare(b.sentiment);
      return b.date.localeCompare(a.date);
    });
  }, [data, sortKey]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-zinc-800">Tableau de verbatims filtrés</h3>
        <select
          className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm"
          aria-label="Tri du tableau"
          value={sortKey}
          onChange={(event) => setSortKey(event.target.value as SortKey)}
        >
          <option value="date">Trier par date</option>
          <option value="nps">Trier par NPS</option>
          <option value="sentiment">Trier par sentiment</option>
        </select>
      </div>
      <div className="max-h-[420px] overflow-auto">
        <table className="w-full min-w-[780px] border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-2">ID</th>
              <th className="px-2">Segment</th>
              <th className="px-2">Thème</th>
              <th className="px-2">Sentiment</th>
              <th className="px-2">NPS</th>
              <th className="px-2">Zone</th>
              <th className="px-2">Délai</th>
              <th className="px-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer rounded-lg bg-zinc-50 text-zinc-700 transition hover:bg-zinc-100"
                onClick={() => setSelected(item)}
              >
                <td className="px-2 py-2 font-mono">{item.id}</td>
                <td className="px-2 py-2">{item.segment}</td>
                <td className="px-2 py-2">{item.theme}</td>
                <td className="px-2 py-2">
                  <Badge variant={item.sentiment === "Positif" ? "positive" : item.sentiment === "Négatif" ? "negative" : "warning"}>
                    {item.sentiment}
                  </Badge>
                </td>
                <td className="px-2 py-2 font-mono">{item.nps}</td>
                <td className="px-2 py-2">{item.zone}</td>
                <td className="px-2 py-2">{item.delai}</td>
                <td className="px-2 py-2 font-mono">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 p-4" onClick={() => setSelected(null)}>
          <div
            className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-lg font-bold text-zinc-900">{selected.id}</h4>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg border border-zinc-200 px-3 py-1 text-sm"
              >
                Fermer
              </button>
            </div>
            <p className="mb-4 text-zinc-700">{selected.texte}</p>
            <div className="flex flex-wrap gap-2 text-sm">
              <Badge>{selected.segment}</Badge>
              <Badge>{selected.theme}</Badge>
              <Badge>{selected.sentiment}</Badge>
              <Badge>NPS {selected.nps}</Badge>
              <Badge>{selected.zone}</Badge>
              <Badge>{selected.delai}</Badge>
              <Badge>{selected.type}</Badge>
              <Badge>{selected.date}</Badge>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
