import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "positive" | "negative" | "warning" | "primary";

const variantClass: Record<BadgeVariant, string> = {
  neutral: "bg-zinc-100 text-zinc-700",
  positive: "bg-emerald-100 text-emerald-700",
  negative: "bg-red-100 text-red-700",
  warning: "bg-amber-100 text-amber-700",
  primary: "bg-emerald-100 text-emerald-700",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  title?: string;
}

export function Badge({ children, variant = "neutral", className, title }: BadgeProps) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
