import { Tooltip } from "@/components/ui/Tooltip";

interface HeaderProps {
  title: string;
  subtitle?: string;
  helpText?: string;
  helpContext?: string;
  rightSlot?: React.ReactNode;
}

export function Header({ title, subtitle, helpText, helpContext, rightSlot }: HeaderProps) {
  return (
    <header className="rounded-2xl border border-white/60 bg-white/90 p-5 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">{title}</h1>
            <Tooltip
              text={helpText ?? "Données pédagogiques fictives issues d'une étude CX Uber Eats France."}
              context={helpContext ?? "Utilisation en TD: diagnostiquer, prioriser et argumenter un plan d'action CX."}
            />
          </div>
          {subtitle ? <p className="text-sm text-zinc-600">{subtitle}</p> : null}
        </div>
        {rightSlot}
      </div>
    </header>
  );
}
