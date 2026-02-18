export interface GlossaryItem {
  id: string;
  term: string;
  shortLabel: string;
  definition: string;
  context: string;
}

export const glossaryItems: GlossaryItem[] = [
  {
    id: "cx",
    term: "Expérience client (CX)",
    shortLabel: "CX",
    definition:
      "Perception globale d'un client sur l'ensemble du parcours: recherche, commande, livraison, SAV et fidélisation.",
    context:
      "Dans ce dashboard Uber Eats, la CX est analysée via 4 segments: livraison, qualité de commande, parcours digital et relation livreur.",
  },
  {
    id: "voc",
    term: "Voix du client (VoC)",
    shortLabel: "VoC",
    definition:
      "Ensemble des retours clients quantitatifs et qualitatifs collectés pour piloter des décisions produit, ops et service.",
    context:
      "Les verbatims V001 à V050 représentent ici la VoC: ils servent à relier KPI, causes opérationnelles et priorités d'action.",
  },
  {
    id: "nps",
    term: "NPS (Net Promoter Score)",
    shortLabel: "NPS",
    definition:
      "Indicateur de recommandation calculé à partir de la question 0-10. Plus le score est élevé, plus l'intention de recommandation est forte.",
    context:
      "Le NPS global simulé est à 42, avec un écart fort entre Centre-ville (61) et Banlieue (22), ce qui guide les priorités d'amélioration.",
  },
  {
    id: "csat",
    term: "CSAT (Customer Satisfaction)",
    shortLabel: "CSAT",
    definition:
      "Score de satisfaction immédiate sur une interaction ou une expérience précise, souvent exprimé sur 5.",
    context:
      "Le CSAT global est à 3.8/5: il confirme une satisfaction correcte mais en dessous de la moyenne de référence indiquée dans le dashboard.",
  },
  {
    id: "ces",
    term: "CES (Customer Effort Score)",
    shortLabel: "CES",
    definition:
      "Mesure de l'effort perçu par le client pour atteindre son objectif (commander, se faire rembourser, contacter le support).",
    context:
      "Ici, le CES à 2.9/5 montre que l'effort reste sensible, surtout sur la gestion des réclamations et les délais élevés.",
  },
  {
    id: "verbatim",
    term: "Verbatim",
    shortLabel: "Verbatim",
    definition:
      "Citation textuelle brute d'un client, non reformulée, utilisée pour comprendre l'intention, l'émotion et la cause racine.",
    context:
      "Les verbatims permettent de justifier les décisions de plan d'action, par exemple V006/V008/V010 pour la criticité banlieue.",
  },
  {
    id: "segment",
    term: "Segmentation d'insights",
    shortLabel: "Segment",
    definition:
      "Regroupement des retours par grandes dimensions d'expérience pour rendre l'analyse actionnable.",
    context:
      "Le dashboard segmente les retours en 4 blocs pédagogiques afin d'apprendre à diagnostiquer un problème CX par domaine.",
  },
  {
    id: "corr",
    term: "Corrélation",
    shortLabel: "Corr",
    definition:
      "Lien statistique entre deux variables. Une corrélation forte n'implique pas automatiquement une causalité.",
    context:
      "La heatmap montre la relation délai x perception positive: le seuil 35-45 min est utilisé comme signal de bascule pour argumenter les priorités.",
  },
  {
    id: "detracteur",
    term: "Détracteur / Promoteur",
    shortLabel: "NPS+/-",
    definition:
      "En NPS, les notes basses représentent des détracteurs, les notes hautes des promoteurs. Leur écart structure le score global.",
    context:
      "Les retards longs et les incidents de conformité font progresser les détracteurs, en particulier dans les zones banlieue.",
  },
  {
    id: "quick-win",
    term: "Quick win",
    shortLabel: "QW",
    definition:
      "Action à faible effort et impact rapide, utile pour enclencher un progrès visible à court terme.",
    context:
      "Dans le plan IA, la notification proactive à T+35 min est qualifiée de quick win car elle améliore l'expérience sans refonte lourde.",
  },
];
