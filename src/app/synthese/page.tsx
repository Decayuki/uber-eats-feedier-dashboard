"use client";

import { AlertTriangle, Gauge, HandCoins, Hourglass, Smile, Target } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Header } from "@/components/layout/Header";
import { KPICard } from "@/components/layout/KPICard";
import { NPSGauge } from "@/components/charts/NPSGauge";
import { SentimentBar } from "@/components/charts/SentimentBar";
import { Badge } from "@/components/ui/Badge";
import { Tooltip as Hint } from "@/components/ui/Tooltip";
import { headlineKpiLabels, kpis } from "@/data/kpis";
import { segments } from "@/data/segments";
import { verbatims } from "@/data/verbatims";
import { truncate } from "@/lib/utils";

const icons = {
  "NPS Global": <Gauge className="h-4 w-4 text-zinc-500" />,
  "CSAT Global": <Smile className="h-4 w-4 text-zinc-500" />,
  "CES (effort client)": <Target className="h-4 w-4 text-zinc-500" />,
  "Taux de réclamation": <HandCoins className="h-4 w-4 text-zinc-500" />,
  "Délai moyen": <Hourglass className="h-4 w-4 text-zinc-500" />,
};

const kpiHints: Record<string, { text: string; context: string }> = {
  "CSAT Global": {
    text: "CSAT: niveau de satisfaction immédiate après l'expérience de livraison.",
    context: "Ici, 3.8/5 reste légèrement sous la moyenne secteur affichée.",
  },
  "CES (effort client)": {
    text: "CES: effort perçu par le client pour commander, suivre et résoudre un problème.",
    context: "Un score proche ou supérieur à 3 signale une friction opérationnelle.",
  },
  "Taux de réclamation": {
    text: "Part des commandes générant une réclamation client.",
    context: "La hausse indique une pression sur la qualité perçue et le support.",
  },
  "Délai moyen": {
    text: "Temps moyen entre commande et livraison effective.",
    context: "Au-delà de 35-45 minutes, le risque de dégradation du sentiment augmente fortement.",
  },
};

const zoneData = [
  { zone: "Centre-ville", nps: 61, fill: "#06C167" },
  { zone: "Périurbain", nps: 38, fill: "#F9AB00" },
  { zone: "Banlieue", nps: 22, fill: "#D93025" },
];

export default function SynthesePage() {
  const headlineKpis = kpis.filter((item) => headlineKpiLabels.includes(item.label as (typeof headlineKpiLabels)[number]));
  const npsGlobal = Number(kpis.find((item) => item.label === "NPS Global")?.value ?? 0);

  const sentimentBySegment = segments.map((segment) => ({
    name: segment.name,
    positive: segment.sentimentBreakdown.positive,
    neutral: segment.sentimentBreakdown.neutral,
    negative: segment.sentimentBreakdown.negative,
  }));

  const latestVerbatims = [...verbatims].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return (
    <div className="space-y-5">
      <Header
        title="Synthèse globale — Uber Eats France"
        subtitle="Vue d'ensemble CX pour un diagnostic rapide sur septembre 2025 à janvier 2026"
        helpText="Vue macro de la performance CX. Lire cette page avant de passer aux analyses causales."
        helpContext="Objectif pédagogique: formuler un diagnostic initial en 3 minutes à partir des KPI et signaux de segments."
      />

      <section className="grid gap-3 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
        <article
          title="NPS global: indicateur de recommandation net sur l'ensemble du périmètre."
          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
        >
          <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            NPS Global
            <Hint text="Score global de recommandation. Plus il est élevé, plus la propension à recommander est forte." />
          </p>
          <NPSGauge value={npsGlobal} />
        </article>

        {headlineKpis
          .filter((item) => item.label !== "NPS Global")
          .map((item) => (
            <KPICard
              key={item.label}
              item={item}
              icon={icons[item.label as keyof typeof icons]}
              hintText={kpiHints[item.label]?.text}
              hintContext={kpiHints[item.label]?.context}
            />
          ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_1.4fr]">
        <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 inline-flex items-center gap-1 text-base font-bold text-zinc-900">
            Répartition NPS par zone
            <Hint text="Compare les écarts de satisfaction entre zones géographiques pour cibler les investissements opérationnels." />
          </h2>
          <div className="h-[280px]">
            <ResponsiveContainer>
              <BarChart data={zoneData} layout="vertical" margin={{ top: 6, right: 18, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" domain={[0, 70]} />
                <YAxis dataKey="zone" type="category" width={110} />
                <Tooltip formatter={(value) => [`${value ?? 0}`, "NPS"]} />
                <ReferenceLine x={50} stroke="#111827" strokeDasharray="5 5" label="Objectif 50" />
                <Bar dataKey="nps" radius={[0, 8, 8, 0]}>
                  {zoneData.map((entry) => <Cell key={entry.zone} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 inline-flex items-center gap-1 text-base font-bold text-zinc-900">
            Sentiment global par segment
            <Hint text="Lecture qualitative par segment: part de positif, neutre et négatif." />
          </h2>
          <SentimentBar data={sentimentBySegment} />
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {segments.map((segment) => (
          <article
            key={segment.name}
            title={`Segment ${segment.name}: NPS ${segment.nps}, volume ${segment.verbatimCount}`}
            className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-zinc-900">{segment.name}</h3>
                <p className="text-sm text-zinc-500">{segment.verbatimCount} verbatims</p>
              </div>
              <p className="font-mono text-3xl font-semibold tabular-nums text-zinc-900">NPS {segment.nps}</p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {segment.themes.map((theme) => (
                <Badge key={theme} variant="primary" className="cursor-help" title={`Thématique clé du segment: ${theme}`}>
                  {theme}
                </Badge>
              ))}
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
              <div className="flex h-full">
                <div className="bg-emerald-500" style={{ width: `${segment.sentimentBreakdown.positive}%` }} />
                <div className="bg-zinc-400" style={{ width: `${segment.sentimentBreakdown.neutral}%` }} />
                <div className="bg-red-500" style={{ width: `${segment.sentimentBreakdown.negative}%` }} />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 inline-flex items-center gap-1 text-base font-bold text-zinc-900">
          Top 5 verbatims les plus récents
          <Hint text="Extraits les plus récents pour repérer les signaux faibles et les incidents émergents." />
        </h2>
        <div className="max-h-[320px] space-y-3 overflow-auto pr-1">
          {latestVerbatims.map((item) => (
            <article
              key={item.id}
              title={`Verbatim ${item.id}: ${item.sentiment}, NPS ${item.nps}, ${item.zone}`}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-3"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge>{item.id}</Badge>
                <Badge variant={item.sentiment === "Positif" ? "positive" : item.sentiment === "Négatif" ? "negative" : "warning"}>
                  {item.sentiment}
                </Badge>
                <Badge>NPS {item.nps}</Badge>
                <Badge>{item.zone}</Badge>
                <Badge>{item.date}</Badge>
              </div>
              <p className="text-sm text-zinc-700">{truncate(item.texte, 110)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <AlertTriangle className="mt-0.5 h-5 w-5" />
        <p>{"127 verbatims non étiquetés détectés. Suggestion Feedier: créer un segment Tarification pour traiter l'opacité perçue des frais."}</p>
      </section>
    </div>
  );
}
