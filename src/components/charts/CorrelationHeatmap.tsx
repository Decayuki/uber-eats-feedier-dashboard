"use client";

import { Fragment } from "react";
import { useMemo, useState } from "react";
import { CorrelationRow, TrancheDelai, Verbatim } from "@/lib/types";
import { getHeatColor } from "@/lib/utils";
import { correlationThemeToVerbatimTheme } from "@/data/correlation";

const delays: TrancheDelai[] = ["15-25 min", "25-35 min", "35-45 min", "45-60 min", "60+ min"];

interface CorrelationHeatmapProps {
  matrix: CorrelationRow[];
  verbatims: Verbatim[];
  onCellClick?: (theme: string, delay: TrancheDelai) => void;
}

export function CorrelationHeatmap({ matrix, verbatims, onCellClick }: CorrelationHeatmapProps) {
  const [hovered, setHovered] = useState<{ theme: string; delay: TrancheDelai; value: number } | null>(null);

  const representative = useMemo(() => {
    if (!hovered) return null;
    const mappedThemes = correlationThemeToVerbatimTheme[hovered.theme] ?? [hovered.theme];
    return verbatims.find((item) => mappedThemes.includes(item.theme) && item.delai === hovered.delay);
  }, [hovered, verbatims]);

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <div className="min-w-[720px] rounded-xl border border-zinc-200 bg-white p-2">
          <div className="grid grid-cols-[180px_repeat(5,minmax(80px,1fr))] gap-1 text-sm">
            <div />
            {delays.map((delay) => (
              <div
                key={delay}
                className={`rounded-lg p-2 text-center font-semibold ${delay === "35-45 min" ? "border-2 border-zinc-900" : ""}`}
              >
                {delay}
              </div>
            ))}

            {matrix.map((row) => (
              <Fragment key={row.theme}>
                <div className="rounded-lg bg-zinc-50 p-2 font-semibold text-zinc-700">
                  {row.theme}
                </div>
                {delays.map((delay) => {
                  const value = row[delay];
                  return (
                    <button
                      key={`${row.theme}-${delay}`}
                      className={`rounded-lg p-2 font-mono text-sm font-semibold text-zinc-900 transition-all duration-200 hover:scale-[1.02] ${
                        delay === "35-45 min" ? "border-2 border-zinc-900" : "border border-transparent"
                      }`}
                      style={{ backgroundColor: getHeatColor(value) }}
                      onMouseEnter={() => setHovered({ theme: row.theme, delay, value })}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => onCellClick?.(row.theme, delay)}
                    >
                      {value}%
                    </button>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-600">
        {hovered ? (
          <div>
            <p className="font-semibold text-zinc-800">
              {hovered.theme} • {hovered.delay} • {hovered.value}% positif
            </p>
            <p className="mt-1 text-zinc-600">
              {representative
                ? `Verbatim représentatif (${representative.id}) : ${representative.texte}`
                : "Aucun verbatim représentatif trouvé pour cette combinaison."}
            </p>
          </div>
        ) : (
          <p>Survoler une cellule pour afficher le détail et cliquer pour filtrer la vue verbatims.</p>
        )}
      </div>
    </div>
  );
}
