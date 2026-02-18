import { Sentiment } from "./types";

export const colors = {
  primary: "#06C167",
  primaryLight: "#E8F9EF",
  primaryDark: "#059652",
  black: "#1B1B1B",
  darkGray: "#333333",
  medGray: "#666666",
  lightGray: "#F5F5F5",
  borderGray: "#E5E5E5",
  white: "#FFFFFF",
  positive: "#06C167",
  neutral: "#F9AB00",
  negative: "#D93025",
  blue: "#1A73E8",
  orange: "#F9AB00",
  red: "#D93025",
  purple: "#7B1FA2",
  heat: {
    high: "#E8F9EF",
    medium: "#FFF8E1",
    low: "#FFF3E0",
    critical: "#FFEBEE",
  },
};

export const delayBuckets = [
  "15-25 min",
  "25-35 min",
  "35-45 min",
  "45-60 min",
  "60+ min",
] as const;

export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export function getTrendColor(trendIsPositive: boolean, trend: "up" | "down" | "stable") {
  if (trend === "stable") return "text-zinc-500";
  if (trendIsPositive && trend === "up") return "text-emerald-600";
  if (!trendIsPositive && trend === "up") return "text-red-600";
  if (trendIsPositive && trend === "down") return "text-red-600";
  return "text-emerald-600";
}

export function getSentimentColor(sentiment: Sentiment) {
  if (sentiment === "Positif") return colors.positive;
  if (sentiment === "Neutre") return colors.neutral;
  return colors.negative;
}

export function sentimentToScore(sentiment: Sentiment) {
  if (sentiment === "Positif") return 1;
  if (sentiment === "Neutre") return 0;
  return -1;
}

export function scoreToSentimentLabel(score: number) {
  if (score > 0.2) return "Positif";
  if (score < -0.2) return "Négatif";
  return "Neutre";
}

export function parseNumericValue(value: string): number {
  const normalized = value.replace(",", ".");
  const match = normalized.match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

export function getHeatColor(rate: number) {
  if (rate > 80) return "#22C55E";
  if (rate >= 60) return "#86EFAC";
  if (rate >= 40) return "#FCD34D";
  if (rate >= 20) return "#FB923C";
  return "#F87171";
}

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}
