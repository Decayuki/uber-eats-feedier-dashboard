import { Badge } from "@/components/ui/Badge";
import { Verbatim } from "@/lib/types";
import { hasNpsSentimentDecorrelation } from "@/lib/filters";
import { cn } from "@/lib/utils";

interface VerbatimCardProps {
  item: Verbatim;
  selected?: boolean;
  onClick?: () => void;
}

export function VerbatimCard({ item, selected, onClick }: VerbatimCardProps) {
  const sentimentVariant =
    item.sentiment === "Positif" ? "positive" : item.sentiment === "Négatif" ? "negative" : "warning";
  const hasDecorrelation = hasNpsSentimentDecorrelation(item);

  return (
    <button
      type="button"
      onClick={onClick}
      title={`Verbatim ${item.id} - ${item.sentiment}, NPS ${item.nps}, ${item.delai}, ${item.zone}`}
      className={cn(
        "w-full rounded-xl border p-4 text-left shadow-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md",
        selected ? "border-emerald-500 bg-emerald-50" : "border-zinc-200 bg-white",
      )}
    >
      <p className="text-sm font-bold text-zinc-900">{item.id}</p>
      <p className="mt-1 text-sm leading-relaxed text-zinc-700">{item.texte}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <Badge variant={sentimentVariant}>{item.sentiment}</Badge>
        <Badge>NPS {item.nps}</Badge>
        <Badge>{item.zone}</Badge>
        <Badge>{item.delai}</Badge>
        <Badge>{item.theme}</Badge>
        <Badge>{item.type}</Badge>
        {hasDecorrelation ? <Badge variant="warning">Décorrélation NPS / sentiment</Badge> : null}
      </div>
    </button>
  );
}
