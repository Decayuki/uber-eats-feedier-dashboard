"use client";

import Link from "next/link";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { Badge } from "@/components/ui/Badge";
import { Tooltip as Hint } from "@/components/ui/Tooltip";
import { ActionItem } from "@/lib/types";

interface ActionPlanContentProps {
  actions: ActionItem[];
}

const effortToValue: Record<ActionItem["effort"], number> = { Faible: 1, Moyen: 2, Élevé: 3 };
const impactToValue: Record<ActionItem["impact"], number> = { Faible: 1, Moyen: 2, Élevé: 3 };
const segmentColor: Record<ActionItem["segment"], string> = {
  "Expérience de livraison": "#06C167",
  "Qualité de la commande": "#1A73E8",
  "Interface & parcours digital": "#7B1FA2",
  "Relation livreur": "#F9AB00",
};

export function ActionPlanContent({ actions }: ActionPlanContentProps) {
  const priorityOrder = [...actions].sort((a, b) => {
    if (a.id === 3) return -1;
    if (b.id === 3) return 1;
    return impactToValue[b.impact] - impactToValue[a.impact] || effortToValue[a.effort] - effortToValue[b.effort];
  });

  const scatterData = actions.map((action) => ({
    ...action,
    x: effortToValue[action.effort],
    y: impactToValue[action.impact],
    z: 100,
    color: segmentColor[action.segment],
  }));

  return (
    <div className="space-y-5">
      <section title="Positionnement des actions selon leur potentiel et la charge de mise en oeuvre." className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 inline-flex items-center gap-1 text-lg font-bold text-zinc-900">
          Matrice Impact / Effort
          <Hint text="Prioriser d'abord les actions à fort impact et effort faible ou moyen." />
        </h3>
        <div className="h-[320px]">
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis
                type="number"
                dataKey="x"
                name="Effort"
                domain={[0.5, 3.5]}
                ticks={[1, 2, 3]}
                tickFormatter={(value) => (value === 1 ? "Faible" : value === 2 ? "Moyen" : "Élevé")}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Impact"
                domain={[0.5, 3.5]}
                ticks={[1, 2, 3]}
                tickFormatter={(value) => (value === 1 ? "Faible" : value === 2 ? "Moyen" : "Élevé")}
              />
              <ZAxis type="number" dataKey="z" range={[380, 380]} />
              <Tooltip
                cursor={{ strokeDasharray: "4 4" }}
                formatter={(_, __, props) => [props.payload.title, `Action ${props.payload.id}`]}
              />
              <Scatter
                data={scatterData}
                shape={(props) => {
                  const payload = props.payload as (typeof scatterData)[number];
                  const cx = props.cx ?? 0;
                  const cy = props.cy ?? 0;
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r={16} fill={payload.color} fillOpacity={0.9} />
                      <text
                        x={cx}
                        y={cy + 4}
                        textAnchor="middle"
                        fontSize={12}
                        fontWeight={700}
                        fill="#ffffff"
                      >
                        {payload.id}
                      </text>
                    </g>
                  );
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="space-y-3">
        {priorityOrder.map((action) => (
          <article
            key={action.id}
            title={`Action ${action.id}: impact ${action.impact}, effort ${action.effort}, owner ${action.owner}`}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h4 className="text-base font-bold text-zinc-900">
                  {action.id}. {action.title}
                </h4>
                <p className="mt-1 text-sm text-zinc-600">
                  Segment: {action.segment} | Thème: {action.theme}
                </p>
              </div>
              <div className="flex gap-2">
                {action.id === 3 ? <Badge variant="primary">Quick win</Badge> : null}
                <Badge variant={action.impact === "Élevé" ? "negative" : "warning"}>Impact: {action.impact}</Badge>
                <Badge variant={action.effort === "Faible" ? "positive" : "neutral"}>Effort: {action.effort}</Badge>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-zinc-700">{action.description}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
              <Badge>Owner: {action.owner}</Badge>
              <Badge>Timeline: {action.timeline}</Badge>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold text-zinc-600">Verbatims supports:</span>
              {action.supportingVerbatims.map((id) => (
                <Link
                  key={id}
                  href={`/verbatims?search=${id}`}
                  title={`Ouvrir le verbatim ${id} dans la vue d'analyse détaillée.`}
                  className="rounded-lg border border-zinc-200 px-2 py-1 font-mono text-xs text-zinc-700 transition hover:bg-zinc-100"
                >
                  {id}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <h3 className="text-base font-bold text-zinc-900">Comparaison pédagogique</h3>
        <p className="mt-2 text-sm text-zinc-700">
          {
            "Comparez maintenant votre plan d'action avec cette proposition du magnifique professeur. Identifiez les écarts de priorisation, les quick wins manqués et les hypothèses différentes sur l'effort."
          }
        </p>
      </section>
    </div>
  );
}
