import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/Tooltip";

interface SelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  helpText?: string;
  helpContext?: string;
  className?: string;
}

export function Select({ label, value, options, onChange, helpText, helpContext, className }: SelectProps) {
  return (
    <label className={cn("flex min-w-[160px] flex-col gap-1", className)}>
      <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
        {helpText ? <Tooltip text={helpText} context={helpContext} /> : null}
      </span>
      <select
        aria-label={label}
        title={helpText ?? label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm outline-none transition-all duration-200 hover:shadow-md focus:border-emerald-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
