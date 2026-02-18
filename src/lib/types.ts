export type Sentiment = "Positif" | "Neutre" | "Négatif";

export type Zone = "Centre-ville" | "Périurbain" | "Banlieue";

export type TypeCommande = "Restaurant" | "Épicerie" | "Pharmacie";

export type TrancheDelai =
  | "15-25 min"
  | "25-35 min"
  | "35-45 min"
  | "45-60 min"
  | "60+ min";

export type Segment =
  | "Expérience de livraison"
  | "Qualité de la commande"
  | "Interface & parcours digital"
  | "Relation livreur";

export type Theme =
  | "Rapidité"
  | "Suivi GPS"
  | "Communication livreur"
  | "Température"
  | "Conformité"
  | "Emballage"
  | "UX application"
  | "Paiement"
  | "Gestion réclamations"
  | "Politesse"
  | "Professionnalisme"
  | "Gestion problèmes";

export interface Verbatim {
  id: string;
  segment: Segment;
  theme: Theme;
  sentiment: Sentiment;
  nps: number;
  delai: TrancheDelai;
  zone: Zone;
  type: TypeCommande;
  texte: string;
  date: string;
}

export interface KPI {
  label: string;
  value: string;
  trend: "up" | "down" | "stable";
  trendIsPositive: boolean;
  comment: string;
}

export interface SegmentData {
  name: Segment;
  verbatimCount: number;
  percentage: number;
  nps: number;
  themes: string[];
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface CorrelationCell {
  theme: string;
  delai: TrancheDelai;
  positiveRate: number;
}

export interface CorrelationRow {
  theme: string;
  "15-25 min": number;
  "25-35 min": number;
  "35-45 min": number;
  "45-60 min": number;
  "60+ min": number;
}

export interface ActionItem {
  id: number;
  title: string;
  segment: Segment;
  theme: Theme;
  impact: "Élevé" | "Moyen" | "Faible";
  effort: "Élevé" | "Moyen" | "Faible";
  owner: string;
  timeline: string;
  description: string;
  supportingVerbatims: string[];
}

export interface VerbatimFilters {
  segment?: Segment | "Tous";
  theme?: Theme | "Tous";
  zone?: Zone | "Toutes";
  delai?: TrancheDelai | "Tous";
  type?: TypeCommande | "Tous";
  sentiment?: Sentiment | "Tous";
  search?: string;
}
