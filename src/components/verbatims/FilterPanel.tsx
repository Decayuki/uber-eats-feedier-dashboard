import { Select } from "@/components/ui/Select";
import { Segment, Sentiment, Theme, TrancheDelai, TypeCommande, Zone } from "@/lib/types";

interface FilterPanelProps {
  values: {
    segment: string;
    theme: string;
    zone: string;
    delai: string;
    type: string;
    sentiment: string;
  };
  onChange: (field: string, value: string) => void;
  onReset: () => void;
}

const segmentOptions: Array<Segment | "Tous"> = [
  "Tous",
  "Expérience de livraison",
  "Qualité de la commande",
  "Interface & parcours digital",
  "Relation livreur",
];
const themeOptions: Array<Theme | "Tous"> = [
  "Tous",
  "Rapidité",
  "Suivi GPS",
  "Communication livreur",
  "Température",
  "Conformité",
  "Emballage",
  "UX application",
  "Paiement",
  "Gestion réclamations",
  "Politesse",
  "Professionnalisme",
  "Gestion problèmes",
];
const zoneOptions: Array<Zone | "Toutes"> = ["Toutes", "Centre-ville", "Périurbain", "Banlieue"];
const delayOptions: Array<TrancheDelai | "Tous"> = ["Tous", "15-25 min", "25-35 min", "35-45 min", "45-60 min", "60+ min"];
const typeOptions: Array<TypeCommande | "Tous"> = ["Tous", "Restaurant", "Épicerie", "Pharmacie"];
const sentimentOptions: Array<Sentiment | "Tous"> = ["Tous", "Positif", "Neutre", "Négatif"];

export function FilterPanel({ values, onChange, onReset }: FilterPanelProps) {
  return (
    <section className="sticky top-0 z-10 rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-sm backdrop-blur">
      <div className="flex flex-wrap items-end gap-3">
        <Select
          label="Segment"
          helpText="Regroupe les verbatims par grande dimension d'expérience."
          value={values.segment}
          options={segmentOptions}
          onChange={(value) => onChange("segment", value)}
        />
        <Select
          label="Thème"
          helpText="Filtre fin à l'intérieur d'un segment (ex: Rapidité, Paiement, Conformité)."
          value={values.theme}
          options={themeOptions}
          onChange={(value) => onChange("theme", value)}
        />
        <Select
          label="Zone"
          helpText="Compare les retours entre Centre-ville, Périurbain et Banlieue."
          value={values.zone}
          options={zoneOptions}
          onChange={(value) => onChange("zone", value)}
        />
        <Select
          label="Délai"
          helpText="Permet d'identifier les seuils de bascule de satisfaction selon le temps d'attente."
          value={values.delai}
          options={delayOptions}
          onChange={(value) => onChange("delai", value)}
        />
        <Select
          label="Type commande"
          helpText="Différencie les parcours Restaurant, Épicerie et Pharmacie."
          value={values.type}
          options={typeOptions}
          onChange={(value) => onChange("type", value)}
        />
        <Select
          label="Sentiment"
          helpText="Filtre les verbatims selon leur tonalité perçue (positif, neutre, négatif)."
          value={values.sentiment}
          options={sentimentOptions}
          onChange={(value) => onChange("sentiment", value)}
        />
        <button
          type="button"
          onClick={onReset}
          title="Réinitialiser tous les filtres et revenir à la vue complète."
          className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition-all duration-200 hover:bg-zinc-100"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
