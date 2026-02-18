"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Header } from "@/components/layout/Header";
import { FilterPanel } from "@/components/verbatims/FilterPanel";
import { VerbatimTable } from "@/components/verbatims/VerbatimTable";
import { filterVerbatims, computeFilteredKpis, sentimentBreakdownByDelay } from "@/lib/filters";
import { verbatims } from "@/data/verbatims";
import { Segment, Sentiment, Theme, TrancheDelai, TypeCommande, Zone } from "@/lib/types";

type ExplorationFilters = {
  segment: Segment | "Tous";
  theme: Theme | "Tous";
  zone: Zone | "Toutes";
  delai: TrancheDelai | "Tous";
  type: TypeCommande | "Tous";
  sentiment: Sentiment | "Tous";
};

const baseFilters: ExplorationFilters = {
  segment: "Tous",
  theme: "Tous",
  zone: "Toutes",
  delai: "Tous",
  type: "Tous",
  sentiment: "Tous",
};

export default function ExplorationPage() {
  const [filters, setFilters] = useState<ExplorationFilters>(baseFilters);

  const filtered = useMemo(() => filterVerbatims(verbatims, filters), [filters]);
  const metrics = useMemo(() => computeFilteredKpis(filtered), [filtered]);
  const byDelay = useMemo(() => sentimentBreakdownByDelay(filtered), [filtered]);

  const sentimentData = [
    { name: "Positif", value: metrics.count ? Math.round((metrics.positive / metrics.count) * 100) : 0, color: "#06C167" },
    { name: "Neutre", value: metrics.count ? Math.round((metrics.neutral / metrics.count) * 100) : 0, color: "#A1A1AA" },
    { name: "Négatif", value: metrics.count ? Math.round((metrics.negative / metrics.count) * 100) : 0, color: "#D93025" },
  ];

  return (
    <div className="space-y-5">
      <Header
        title="Exploration par attributs"
        subtitle="Filtrage multi-dimensionnel pour analyser l'impact de chaque attribut sur le ressenti client"
      />

      <FilterPanel
        values={filters}
        onChange={(field, value) => setFilters((prev) => ({ ...prev, [field]: value } as ExplorationFilters))}
        onReset={() => setFilters(baseFilters)}
      />

      <section className="grid gap-4 xl:grid-cols-[1fr_1.4fr]">
        <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-base font-bold">KPIs filtrés</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Volume" value={`${metrics.count}`} />
            <MetricCard label="NPS" value={`${metrics.nps}`} />
            <MetricCard label="CSAT moyen" value={`${metrics.csat}/5`} />
            <MetricCard
              label="Distribution"
              value={`${metrics.positive}P / ${metrics.neutral}N / ${metrics.negative}Nég`}
            />
          </div>
          <p className="mt-3 text-sm text-zinc-600">{metrics.count} verbatims correspondent à vos filtres.</p>
        </article>

        <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-base font-bold">Distribution sentiment</h2>
          <div className="h-60">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={sentimentData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={90}>
                  {sentimentData.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value ?? 0}%`, "Part"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-base font-bold">NPS par tranche de délai</h2>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={byDelay} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
              <XAxis dataKey="delay" />
              <YAxis domain={[0, 10]} />
              <Tooltip formatter={(value) => [value ?? 0, "NPS moyen"]} />
              <ReferenceArea x1="45-60 min" x2="60+ min" y1={0} y2={10} fill="#FEE2E2" fillOpacity={0.5} />
              <Bar dataKey="nps" radius={[8, 8, 0, 0]}>
                {byDelay.map((item) => (
                  <Cell key={item.delay} fill={item.delay === "45-60 min" || item.delay === "60+ min" ? "#D93025" : "#06C167"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-sm font-medium text-red-700">Zone critique au-delà de 45 minutes.</p>
      </section>

      <VerbatimTable data={filtered} />
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-zinc-900">{value}</p>
    </article>
  );
}
