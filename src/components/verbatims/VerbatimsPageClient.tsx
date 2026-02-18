"use client";

import { useMemo, useRef, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Header } from "@/components/layout/Header";
import { VerbatimCard } from "@/components/verbatims/VerbatimCard";
import { Select } from "@/components/ui/Select";
import { Tooltip as Hint } from "@/components/ui/Tooltip";
import { filterVerbatims, getMostFrequentThemesBySentiment, monthlySentiment } from "@/lib/filters";
import { scoreToSentimentLabel } from "@/lib/utils";
import { verbatims } from "@/data/verbatims";
import { Segment, Sentiment, Theme, TrancheDelai } from "@/lib/types";

const segmentOptions: Array<Segment | "Tous"> = [
  "Tous",
  "Expérience de livraison",
  "Qualité de la commande",
  "Interface & parcours digital",
  "Relation livreur",
];

const themeOptions: Array<Theme | "Tous"> = [
  "Tous",
  "Rapidité",
  "Suivi GPS",
  "Communication livreur",
  "Température",
  "Conformité",
  "Emballage",
  "UX application",
  "Paiement",
  "Gestion réclamations",
  "Politesse",
  "Professionnalisme",
  "Gestion problèmes",
];

const sentimentOptions: Array<Sentiment | "Tous"> = ["Tous", "Positif", "Neutre", "Négatif"];
const delayOptions: Array<TrancheDelai | "Tous"> = ["Tous", "15-25 min", "25-35 min", "35-45 min", "45-60 min", "60+ min"];

const mappedThemeFromCorrelation: Record<string, Theme> = {
  "Conformité commande": "Conformité",
  "Politesse livreur": "Politesse",
};

function sanitizeOption<T extends string>(raw: string | undefined, options: T[], fallback: T): T {
  if (!raw) return fallback;
  return options.includes(raw as T) ? (raw as T) : fallback;
}

interface VerbatimsPageClientProps {
  initialParams: {
    search?: string;
    segment?: string;
    theme?: string;
    sentiment?: string;
    delai?: string;
  };
}

export function VerbatimsPageClient({ initialParams }: VerbatimsPageClientProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState(initialParams.search ?? "");
  const [segment, setSegment] = useState<Segment | "Tous">(
    sanitizeOption(initialParams.segment, segmentOptions, "Tous"),
  );
  const [theme, setTheme] = useState<Theme | "Tous">(() => {
    const normalized = initialParams.theme
      ? (mappedThemeFromCorrelation[initialParams.theme] ?? initialParams.theme)
      : undefined;
    return sanitizeOption(normalized, themeOptions, "Tous");
  });
  const [sentiment, setSentiment] = useState<Sentiment | "Tous">(
    sanitizeOption(initialParams.sentiment, sentimentOptions, "Tous"),
  );
  const [delai] = useState<TrancheDelai | "Tous">(sanitizeOption(initialParams.delai, delayOptions, "Tous"));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      filterVerbatims(verbatims, {
        search,
        segment,
        theme,
        sentiment,
        delai,
      }),
    [search, segment, theme, sentiment, delai],
  );

  const positiveThemes = useMemo(() => getMostFrequentThemesBySentiment(filtered, "Positif"), [filtered]);
  const negativeThemes = useMemo(() => getMostFrequentThemesBySentiment(filtered, "Négatif"), [filtered]);
  const evolution = useMemo(() => monthlySentiment(filtered), [filtered]);

  const counts = {
    positive: filtered.filter((item) => item.sentiment === "Positif").length,
    neutral: filtered.filter((item) => item.sentiment === "Neutre").length,
    negative: filtered.filter((item) => item.sentiment === "Négatif").length,
  };

  return (
    <div className="space-y-5">
      <Header
        title="Analyse des verbatims"
        subtitle="Recherche textuelle et lecture qualitative des signaux client"
        helpText="Vue qualitative pour comprendre les causes derrière les KPI."
        helpContext="Repérer les patterns récurrents, les irritants et les signaux de décorrélation NPS/sentiment."
      />

      <section title="Utiliser la recherche libre et les filtres pour isoler un problème précis." className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <label className="min-w-[260px] flex-1">
            <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Recherche
              <Hint text="Recherche plein texte dans le contenu et les métadonnées (ID, segment, thème, zone)." />
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Recherche textuelle..."
              title="Recherche plein texte dans les verbatims."
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </label>
          <Select
            label="Segment"
            helpText="Regroupe les retours par domaine d'expérience."
            value={segment}
            options={segmentOptions}
            onChange={(value) => setSegment(value as Segment | "Tous")}
          />
          <Select
            label="Thème"
            helpText="Filtre par sujet précis du retour client."
            value={theme}
            options={themeOptions}
            onChange={(value) => setTheme(value as Theme | "Tous")}
          />
          <Select
            label="Sentiment"
            helpText="Concentre l'analyse sur une tonalité émotionnelle."
            value={sentiment}
            options={sentimentOptions}
            onChange={(value) => setSentiment(value as Sentiment | "Tous")}
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <article title="Cliquez une carte pour focaliser l'analyse dans le panneau d'insights." className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 inline-flex items-center gap-1 text-base font-bold text-zinc-900">
            Verbatims filtrés ({filtered.length})
            <Hint text="Liste qualitative des retours correspondant aux filtres actifs." />
          </h2>
          <div className="max-h-[65vh] space-y-3 overflow-auto pr-1">
            {filtered.map((item) => (
              <VerbatimCard
                key={item.id}
                item={item}
                selected={selectedId === item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            ))}
          </div>
        </article>

        <aside ref={panelRef} className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="inline-flex items-center gap-1 text-base font-bold text-zinc-900">
            Insights dynamiques
            <Hint text="Synthèse automatique des thèmes dominants positifs/négatifs et de l'évolution mensuelle." />
          </h2>

          <section>
            <p className="text-sm font-semibold text-emerald-700">Aspects positifs</p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
              {positiveThemes.slice(0, 5).map((item) => (
                <li key={item.theme}>
                  {item.theme} ({item.count})
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="text-sm font-semibold text-red-700">Aspects négatifs</p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
              {negativeThemes.slice(0, 5).map((item) => (
                <li key={item.theme}>
                  {item.theme} ({item.count})
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
            {counts.positive} positifs / {counts.neutral} neutres / {counts.negative} négatifs
          </section>

          <section>
            <p className="mb-2 text-sm font-semibold text-zinc-700">Évolution sentiment</p>
            <div className="h-52">
              <ResponsiveContainer>
                <LineChart data={evolution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[-1, 1]} />
                  <Tooltip
                    formatter={(value) => [scoreToSentimentLabel(Number(value ?? 0)), "Tendance"]}
                    labelFormatter={(label) => `Mois: ${label}`}
                  />
                  <Line type="monotone" dataKey="score" stroke="#06C167" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
