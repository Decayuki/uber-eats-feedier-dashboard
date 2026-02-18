import { CorrelationRow } from "@/lib/types";

export const correlationMatrix: CorrelationRow[] = [
  { theme: "Rapidité", "15-25 min": 92, "25-35 min": 78, "35-45 min": 54, "45-60 min": 23, "60+ min": 8 },
  { theme: "Température", "15-25 min": 89, "25-35 min": 81, "35-45 min": 62, "45-60 min": 31, "60+ min": 12 },
  {
    theme: "Conformité commande",
    "15-25 min": 91,
    "25-35 min": 85,
    "35-45 min": 79,
    "45-60 min": 68,
    "60+ min": 52,
  },
  { theme: "Emballage", "15-25 min": 85, "25-35 min": 80, "35-45 min": 71, "45-60 min": 58, "60+ min": 45 },
  {
    theme: "Politesse livreur",
    "15-25 min": 88,
    "25-35 min": 84,
    "35-45 min": 82,
    "45-60 min": 65,
    "60+ min": 41,
  },
  {
    theme: "Professionnalisme",
    "15-25 min": 90,
    "25-35 min": 86,
    "35-45 min": 78,
    "45-60 min": 59,
    "60+ min": 33,
  },
  {
    theme: "UX application",
    "15-25 min": 87,
    "25-35 min": 85,
    "35-45 min": 83,
    "45-60 min": 81,
    "60+ min": 79,
  },
  {
    theme: "Gestion réclamations",
    "15-25 min": 72,
    "25-35 min": 68,
    "35-45 min": 55,
    "45-60 min": 34,
    "60+ min": 18,
  },
];

export const correlationThemeToVerbatimTheme: Record<string, string[]> = {
  Rapidité: ["Rapidité"],
  Température: ["Température"],
  "Conformité commande": ["Conformité"],
  Emballage: ["Emballage"],
  "Politesse livreur": ["Politesse"],
  Professionnalisme: ["Professionnalisme"],
  "UX application": ["UX application"],
  "Gestion réclamations": ["Gestion réclamations"],
};
