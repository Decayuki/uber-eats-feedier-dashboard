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
        <Header title="Plan d'action IA Feedier" subtitle="Cette section reste verrouillée jusqu'à validation du code formateur" />
        <LockScreen onValidate={handleUnlock} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Header
        title="Plan d'action — Proposition IA Feedier"
        subtitle="Vue déverrouillée pour comparer les recommandations IA avec les plans étudiants"
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
