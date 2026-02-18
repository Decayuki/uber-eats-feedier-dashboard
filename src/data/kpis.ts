import { KPI } from "@/lib/types";

export const kpis: KPI[] = [
  {
    label: "NPS Global",
    value: "42",
    trend: "stable",
    trendIsPositive: false,
    comment: "Objectif interne : 50",
  },
  {
    label: "NPS Centre-ville",
    value: "61",
    trend: "up",
    trendIsPositive: true,
    comment: "Porteur, densité livreurs élevée",
  },
  {
    label: "NPS Périurbain",
    value: "38",
    trend: "stable",
    trendIsPositive: false,
    comment: "Stable mais sous objectif",
  },
  {
    label: "NPS Banlieue",
    value: "22",
    trend: "down",
    trendIsPositive: false,
    comment: "Zone critique, déficit livreurs",
  },
  {
    label: "CSAT Global",
    value: "3.8/5",
    trend: "stable",
    trendIsPositive: false,
    comment: "Moyenne secteur : 4.0",
  },
  {
    label: "CES (effort client)",
    value: "2.9/5",
    trend: "stable",
    trendIsPositive: false,
    comment: "Seuil alerte : > 3.0",
  },
  {
    label: "Taux de réclamation",
    value: "14%",
    trend: "up",
    trendIsPositive: false,
    comment: "En hausse de 3 pts sur 6 mois",
  },
  {
    label: "Délai moyen",
    value: "34 min",
    trend: "stable",
    trendIsPositive: false,
    comment: "Objectif : < 30 min",
  },
  {
    label: "Commandes conformes",
    value: "87%",
    trend: "down",
    trendIsPositive: false,
    comment: "Cible : 95%",
  },
];

export const headlineKpiLabels = [
  "NPS Global",
  "CSAT Global",
  "CES (effort client)",
  "Taux de réclamation",
  "Délai moyen",
] as const;
