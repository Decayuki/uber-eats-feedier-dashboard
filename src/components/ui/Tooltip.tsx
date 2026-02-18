import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface TooltipProps {
  text: string;
  context?: string;
  className?: string;
  side?: "top" | "bottom";
}

export function Tooltip({ text, context, className, side = "top" }: TooltipProps) {
  return (
    <span className={cn("group relative inline-flex", className)} aria-label={text}>
      <Info className="h-4 w-4 text-zinc-400 transition-colors duration-200 group-hover:text-zinc-700" />
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 z-30 w-72 -translate-x-1/2 rounded-lg border border-zinc-200 bg-white p-2.5 text-xs font-medium leading-relaxed text-zinc-700 opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100",
          side === "top" ? "bottom-[120%]" : "top-[120%]",
        )}
      >
        <span>{text}</span>
        {context ? <span className="mt-1 block text-[11px] text-zinc-500">Contexte: {context}</span> : null}
      </span>
    </span>
  );
}
