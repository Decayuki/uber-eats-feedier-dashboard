import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { Tooltip as Hint } from "@/components/ui/Tooltip";
import { KPI } from "@/lib/types";
import { cn, getTrendColor } from "@/lib/utils";

interface KPICardProps {
  item: KPI;
  icon?: React.ReactNode;
  hintText?: string;
  hintContext?: string;
}

export function KPICard({ item, icon, hintText, hintContext }: KPICardProps) {
  const TrendIcon = item.trend === "up" ? ArrowUpRight : item.trend === "down" ? ArrowDownRight : ArrowRight;

  return (
    <article
      title={`${item.label}: ${item.comment}`}
      className="group rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {item.label}
          <Hint text={hintText ?? item.comment} context={hintContext} />
        </p>
        <span title={`Icône KPI: ${item.label}`} aria-label={`Icône ${item.label}`}>
          {icon}
        </span>
      </div>

      <p title={`Valeur ${item.label}: ${item.value}`} className="font-mono text-3xl font-semibold tabular-nums text-zinc-900">
        {item.value}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <p title={`Commentaire KPI: ${item.comment}`} className="max-w-[85%] text-xs text-zinc-500">{item.comment}</p>
        <span
          title={`Tendance ${item.label}: ${item.trend}`}
          className={cn("inline-flex items-center gap-1 text-xs font-semibold", getTrendColor(item.trendIsPositive, item.trend))}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          {item.trend}
        </span>
      </div>
    </article>
  );
}
