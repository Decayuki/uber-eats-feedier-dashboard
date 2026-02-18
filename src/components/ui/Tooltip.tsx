import { Info } from "lucide-react";

interface TooltipProps {
  text: string;
  className?: string;
}

export function Tooltip({ text, className }: TooltipProps) {
  return (
    <span className={className} title={text} aria-label={text}>
      <Info className="h-4 w-4 text-zinc-400" />
    </span>
  );
}
