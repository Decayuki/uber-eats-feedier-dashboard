"use client";

import { useState } from "react";
import { LockOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { LockScreen } from "@/components/action-plan/LockScreen";
import { ActionPlanContent } from "@/components/action-plan/ActionPlanContent";
import { actionPlan, UNLOCK_CODE } from "@/data/action-plan";

export default function ActionPlanPage() {
  const [isUnlocked, setIsUnlocked] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem("actionPlanUnlocked") === "true",
  );

  const handleUnlock = (inputCode: string) => {
    const valid = inputCode.toUpperCase() === UNLOCK_CODE;
    if (!valid) {
      return false;
    }

    setIsUnlocked(true);
    sessionStorage.setItem("actionPlanUnlocked", "true");
    window.dispatchEvent(new Event("action-plan-unlocked"));
    return true;
  };

  if (!isUnlocked) {
    return (
      <div className="space-y-5">
        <Header
          title="Plan d'action réalisé par votre magnifique professeur"
          subtitle="Cette section reste verrouillée jusqu'à validation du code du génialissime professeur"
          helpText="Le verrouillage évite le biais d'ancrage: les étudiants construisent d'abord leur propre plan."
          helpContext="Ensuite seulement, comparaison avec la proposition du magnifique professeur pour discussion critique."
        />
        <LockScreen onValidate={handleUnlock} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Header
        title="Plan d'action — Proposition du magnifique professeur"
        subtitle="Vue déverrouillée pour comparer les recommandations du génialissime professeur avec les plans étudiants"
        helpText="Cette vue transforme les insights en actions priorisées selon impact et effort."
        helpContext="Comparer la logique de priorisation du magnifique professeur avec vos propres hypothèses de travail."
        rightSlot={
          <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700">
            <LockOpen className="h-4 w-4" /> Déverrouillé
          </span>
        }
      />
      <ActionPlanContent actions={actionPlan} />
    </div>
  );
}
