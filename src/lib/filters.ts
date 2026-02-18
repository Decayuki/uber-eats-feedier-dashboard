import { Verbatim, VerbatimFilters, Sentiment } from "./types";
import { sentimentToScore } from "./utils";

export function filterVerbatims(verbatims: Verbatim[], filters: VerbatimFilters) {
  return verbatims.filter((item) => {
    if (filters.segment && filters.segment !== "Tous" && item.segment !== filters.segment) return false;
    if (filters.theme && filters.theme !== "Tous" && item.theme !== filters.theme) return false;
    if (filters.zone && filters.zone !== "Toutes" && item.zone !== filters.zone) return false;
    if (filters.delai && filters.delai !== "Tous" && item.delai !== filters.delai) return false;
    if (filters.type && filters.type !== "Tous" && item.type !== filters.type) return false;
    if (filters.sentiment && filters.sentiment !== "Tous" && item.sentiment !== filters.sentiment) return false;

    if (filters.search) {
      const query = filters.search.toLowerCase().trim();
      const inText = item.texte.toLowerCase().includes(query);
      const inMeta = `${item.id} ${item.segment} ${item.theme} ${item.zone} ${item.type}`
        .toLowerCase()
        .includes(query);
      if (!inText && !inMeta) return false;
    }

    return true;
  });
}

export function computeFilteredKpis(verbatims: Verbatim[]) {
  const total = verbatims.length;
  if (!total) {
    return {
      count: 0,
      nps: 0,
      csat: 0,
      positive: 0,
      neutral: 0,
      negative: 0,
      sentimentAverage: 0,
    };
  }

  const promoters = verbatims.filter((v) => v.nps >= 9).length;
  const detractors = verbatims.filter((v) => v.nps <= 6).length;
  const nps = Math.round(((promoters - detractors) / total) * 100);

  const sentimentAverage =
    verbatims.reduce((acc, cur) => acc + sentimentToScore(cur.sentiment), 0) / total;

  const csat = Number(
    (
      verbatims.reduce((acc, cur) => {
        if (cur.nps >= 9) return acc + 5;
        if (cur.nps >= 7) return acc + 4;
        if (cur.nps >= 5) return acc + 3;
        if (cur.nps >= 3) return acc + 2;
        return acc + 1;
      }, 0) / total
    ).toFixed(1),
  );

  const positive = verbatims.filter((v) => v.sentiment === "Positif").length;
  const neutral = verbatims.filter((v) => v.sentiment === "Neutre").length;
  const negative = verbatims.filter((v) => v.sentiment === "Négatif").length;

  return {
    count: total,
    nps,
    csat,
    positive,
    neutral,
    negative,
    sentimentAverage,
  };
}

export function sentimentBreakdownByDelay(verbatims: Verbatim[]) {
  const buckets: Record<string, { total: number; score: number }> = {
    "15-25 min": { total: 0, score: 0 },
    "25-35 min": { total: 0, score: 0 },
    "35-45 min": { total: 0, score: 0 },
    "45-60 min": { total: 0, score: 0 },
    "60+ min": { total: 0, score: 0 },
  };

  verbatims.forEach((item) => {
    buckets[item.delai].total += 1;
    buckets[item.delai].score += item.nps;
  });

  return Object.entries(buckets).map(([delay, info]) => ({
    delay,
    nps: info.total ? Math.round(info.score / info.total) : 0,
    count: info.total,
  }));
}

export function getMostFrequentThemesBySentiment(
  verbatims: Verbatim[],
  sentiment: Sentiment,
  limit = 5,
) {
  const map = new Map<string, number>();

  verbatims
    .filter((item) => item.sentiment === sentiment)
    .forEach((item) => {
      map.set(item.theme, (map.get(item.theme) ?? 0) + 1);
    });

  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([theme, count]) => ({ theme, count }));
}

export function monthlySentiment(verbatims: Verbatim[]) {
  const byMonth = new Map<string, { score: number; total: number }>();

  verbatims.forEach((item) => {
    const month = item.date.slice(0, 7);
    const prev = byMonth.get(month) ?? { score: 0, total: 0 };
    prev.score += sentimentToScore(item.sentiment);
    prev.total += 1;
    byMonth.set(month, prev);
  });

  return [...byMonth.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, value]) => ({
      month,
      score: Number((value.score / value.total).toFixed(2)),
      total: value.total,
    }));
}

export function hasNpsSentimentDecorrelation(verbatim: Verbatim) {
  return (
    (verbatim.nps >= 7 && verbatim.sentiment === "Négatif") ||
    (verbatim.nps <= 4 && verbatim.sentiment === "Positif")
  );
}
