"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { CorrelationHeatmap } from "@/components/charts/CorrelationHeatmap";
import { TrendLine } from "@/components/charts/TrendLine";
import { Tooltip as Hint } from "@/components/ui/Tooltip";
import { correlationMatrix } from "@/data/correlation";
import { verbatims } from "@/data/verbatims";
import { TrancheDelai } from "@/lib/types";

const delays: TrancheDelai[] = ["15-25 min", "25-35 min", "35-45 min", "45-60 min", "60+ min"];

export default function CorrelationPage() {
  const router = useRouter();

  const lineData = useMemo(() => {
    return delays.map((delay) => {
      const row: Record<string, string | number> = { delay };
      correlationMatrix.forEach((theme) => {
        row[theme.theme] = theme[delay];
      });
      return row;
    });
  }, []);

  return (
    <div className="space-y-5">
      <Header
        title="Corrélation Délai × Thématiques"
        subtitle="Identification des seuils critiques et analyse du débat rapidité versus qualité"
        helpText="Analyse relationnelle: comment la perception des thèmes évolue en fonction du délai."
        helpContext="Point pédagogique clé: distinguer corrélation observée et causalité à valider."
      />

      <section title="Cliquer une cellule pour ouvrir la vue verbatims filtrée." className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 inline-flex items-center gap-1 text-base font-bold text-zinc-900">
          Heatmap principale
          <Hint text="Chaque cellule représente le taux de sentiment positif pour un thème et une tranche de délai." />
        </h2>
        <CorrelationHeatmap
          matrix={correlationMatrix}
          verbatims={verbatims}
          onCellClick={(theme, delay) => router.push(`/verbatims?theme=${encodeURIComponent(theme)}&delai=${encodeURIComponent(delay)}`)}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <article title="Comparaison de la résistance des thèmes face à l'augmentation du délai." className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 inline-flex items-center gap-1 text-base font-bold text-zinc-900">
            Chute par thème
            <Hint text="Les courbes les plus pentues indiquent les dimensions les plus sensibles au retard." />
          </h2>
          <TrendLine
            data={lineData}
            xKey="delay"
            yDomain={[0, 100]}
            ySuffix="%"
            lineKeys={correlationMatrix.map((row, index) => ({
              key: row.theme,
              label: row.theme,
              color: ["#06C167", "#1A73E8", "#F59E0B", "#D93025", "#7B1FA2", "#0EA5E9", "#111827", "#A855F7"][index],
            }))}
          />
        </article>

        <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
          <h2 className="mb-2 text-base font-bold text-zinc-900">Insight clé</h2>
          <p className="text-sm leading-relaxed text-zinc-700">
            {
              "Le seuil de 35 minutes est le point de bascule pour 6 thématiques sur 8. Au-delà de 45 minutes, les indicateurs de qualité s'effondrent rapidement alors que l'UX application reste relativement stable."
            }
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-base font-bold text-zinc-900">Le débat Rapidité vs Qualité</h2>
        <p className="text-sm leading-relaxed text-zinc-700">
          {
            "En dessous de 35 minutes, la qualité perçue (température, emballage, conformité) différencie fortement l'expérience. Au-delà de 45 minutes, le délai domine et écrase les autres leviers. Exception notable: l'UX application est stable quel que soit le délai."
          }
        </p>
      </section>
    </div>
  );
}
