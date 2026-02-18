import { SegmentData } from "@/lib/types";

export const segments: SegmentData[] = [
  {
    name: "Expérience de livraison",
    verbatimCount: 812,
    percentage: 43,
    nps: 38,
    themes: ["Rapidité", "Suivi GPS", "Communication livreur"],
    sentimentBreakdown: { positive: 42, neutral: 15, negative: 43 },
  },
  {
    name: "Qualité de la commande",
    verbatimCount: 623,
    percentage: 33,
    nps: 44,
    themes: ["Température", "Conformité", "Emballage"],
    sentimentBreakdown: { positive: 48, neutral: 12, negative: 40 },
  },
  {
    name: "Interface & parcours digital",
    verbatimCount: 341,
    percentage: 18,
    nps: 52,
    themes: ["UX application", "Paiement", "Gestion réclamations"],
    sentimentBreakdown: { positive: 55, neutral: 18, negative: 27 },
  },
  {
    name: "Relation livreur",
    verbatimCount: 224,
    percentage: 12,
    nps: 47,
    themes: ["Politesse", "Professionnalisme", "Gestion problèmes"],
    sentimentBreakdown: { positive: 51, neutral: 8, negative: 41 },
  },
];
