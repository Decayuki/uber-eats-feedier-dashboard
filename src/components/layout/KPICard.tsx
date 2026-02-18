import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { KPI } from "@/lib/types";
import { cn, getTrendColor } from "@/lib/utils";

interface KPICardProps {
  item: KPI;
  icon?: React.ReactNode;
}

export function KPICard({ item, icon }: KPICardProps) {
  const TrendIcon = item.trend === "up" ? ArrowUpRight : item.trend === "down" ? ArrowDownRight : ArrowRight;

  return (
    <article className="group rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{item.label}</p>
        {icon}
      </div>

      <p className="font-mono text-3xl font-semibold tabular-nums text-zinc-900">{item.value}</p>

      <div className="mt-3 flex items-center justify-between">
        <p className="max-w-[85%] text-xs text-zinc-500">{item.comment}</p>
        <span className={cn("inline-flex items-center gap-1 text-xs font-semibold", getTrendColor(item.trendIsPositive, item.trend))}>
          <TrendIcon className="h-3.5 w-3.5" />
          {item.trend}
        </span>
      </div>
    </article>
  );
}
