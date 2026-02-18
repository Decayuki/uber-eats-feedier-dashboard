import { ActionItem } from "@/lib/types";

// Code du magnifique professeur par défaut. Modifiez cette constante pour changer le code d'accès.
export const UNLOCK_CODE = "FEEDIER2026";

export const actionPlan: ActionItem[] = [
  {
    id: 1,
    title: "Programme 'Zones prioritaires' — Recrutement ciblé de livreurs en banlieue",
    segment: "Expérience de livraison",
    theme: "Rapidité",
    impact: "Élevé",
    effort: "Élevé",
    owner: "Ops (Thomas Vernier)",
    timeline: "3-6 mois",
    description:
      "Lancer un programme d'incentives pour recruter et fidéliser des livreurs dans les zones sous-couvertes (banlieue). Objectif : réduire le délai moyen de 34 à 28 minutes et le NPS banlieue de 22 à 35.",
    supportingVerbatims: ["V006", "V008", "V010", "V042"],
  },
  {
    id: 2,
    title: "Packaging thermique obligatoire — Certification restaurant partenaire",
    segment: "Qualité de la commande",
    theme: "Température",
    impact: "Élevé",
    effort: "Moyen",
    owner: "Qualité (Inès Dalloul)",
    timeline: "2-4 mois",
    description:
      "Imposer un standard d'emballage thermique pour tous les restaurants partenaires avec un seuil de commandes > 50/semaine. Fournir des sacs isothermes subventionnés. Les données montrent que la température est le 2e facteur le plus corrélé au délai après la rapidité.",
    supportingVerbatims: ["V016", "V020", "V043", "V015"],
  },
  {
    id: 3,
    title: "Quick Win — Notification proactive à T+35 minutes",
    segment: "Expérience de livraison",
    theme: "Communication livreur",
    impact: "Moyen",
    effort: "Faible",
    owner: "Tech / Product",
    timeline: "2 semaines",
    description:
      "Envoyer automatiquement un SMS/push au client quand le délai dépasse 35 minutes avec un message empathique, un ETA actualisé, et un bon de réduction de 2€ sur la prochaine commande. Le seuil de 35 min est le point de bascule identifié dans la matrice de corrélation.",
    supportingVerbatims: ["V009", "V011", "V049"],
  },
  {
    id: 4,
    title: "Refonte du parcours réclamation — Accès humain en 2 clics",
    segment: "Interface & parcours digital",
    theme: "Gestion réclamations",
    impact: "Élevé",
    effort: "Moyen",
    owner: "CX (Clara Fontaine) + Tech",
    timeline: "1-3 mois",
    description:
      "Remplacer le chatbot actuel par un parcours hybride : automatisation pour les cas simples (remboursement automatique < 15€), escalade humaine garantie en < 5 min pour les cas complexes. Le taux de sentiment négatif sur 'Gestion réclamations' atteint 55% au-delà de 35 min.",
    supportingVerbatims: ["V027", "V029", "V045"],
  },
  {
    id: 5,
    title: "Checklist de conformité digitale — Vérification restaurant avant envoi",
    segment: "Qualité de la commande",
    theme: "Conformité",
    impact: "Moyen",
    effort: "Moyen",
    owner: "Ops + Partenariats restaurants",
    timeline: "2-4 mois",
    description:
      "Intégrer une étape de validation obligatoire côté restaurant (photo de la commande complète avant remise au livreur) pour les restaurants dont le taux de conformité est < 90%. Le taux actuel de 87% est très en dessous de la cible de 95%.",
    supportingVerbatims: ["V017", "V019", "V039"],
  },
  {
    id: 6,
    title: "Programme de reconnaissance livreurs — 'Étoiles Uber Eats'",
    segment: "Relation livreur",
    theme: "Professionnalisme",
    impact: "Moyen",
    effort: "Faible",
    owner: "Marketing + Ops",
    timeline: "1-2 mois",
    description:
      "Créer un programme de gamification pour les livreurs basé sur les verbatims positifs clients. Les livreurs cités positivement reçoivent des badges visibles dans l'app, des bonus financiers, et une priorité d'attribution de courses. Renforce la motivation et la rétention.",
    supportingVerbatims: ["V030", "V031", "V032", "V041"],
  },
  {
    id: 7,
    title: "Transparence tarifaire — Refonte de l'affichage des frais",
    segment: "Interface & parcours digital",
    theme: "Paiement",
    impact: "Moyen",
    effort: "Faible",
    owner: "Product + Marketing",
    timeline: "3-4 semaines",
    description:
      "Afficher dès la page restaurant le prix total TTC incluant frais de service, livraison et supplément petit panier. Les 127 verbatims non étiquetés identifiés par Feedier portent majoritairement sur l'opacité tarifaire. Quick win à fort potentiel de réduction des détracteurs.",
    supportingVerbatims: ["V028", "V050"],
  },
];
