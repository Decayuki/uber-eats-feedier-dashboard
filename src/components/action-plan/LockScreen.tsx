"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

interface LockScreenProps {
  onValidate: (code: string) => boolean;
}

export function LockScreen({ onValidate }: LockScreenProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    const ok = onValidate(code);
    if (!ok) {
      setError("Code invalide. Vérifiez auprès du génialissime professeur.");
      setShake(true);
      setTimeout(() => setShake(false), 350);
      return;
    }
    setError("");
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="mx-auto max-w-xl text-center">
        <div className="mb-4 inline-flex rounded-full bg-zinc-100 p-4 text-zinc-700">
          <Lock className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900">Accès restreint — Code du magnifique professeur</h2>
        <p className="mt-2 text-zinc-600">
          {"Cette vue contient le plan d'action réalisé par votre magnifique professeur. Construisez d'abord votre propre plan (Mission 4), puis comparez."}
        </p>

        <div className={`mx-auto mt-6 flex max-w-md gap-2 ${shake ? "animate-shake" : ""}`}>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
            title="Saisissez le code communiqué par le génialissime professeur pour accéder à sa proposition."
            className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500"
            placeholder="Entrez le code du magnifique professeur"
            aria-label="Code du magnifique professeur"
          />
          <button
            type="button"
            onClick={handleSubmit}
            title="Valider le code d'accès."
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Valider
          </button>
        </div>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <p className="mt-4 text-sm text-zinc-500">Demandez le code au magnifique professeur une fois la Mission 4 terminée.</p>
      </div>
    </section>
  );
}
