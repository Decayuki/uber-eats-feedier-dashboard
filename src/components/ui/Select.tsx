import { cn } from "@/lib/utils";

interface SelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

export function Select({ label, value, options, onChange, className }: SelectProps) {
  return (
    <label className={cn("flex min-w-[160px] flex-col gap-1", className)}>
      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</span>
      <select
        aria-label={label}
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
