"use client";

import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

interface NPSGaugeProps {
  value: number;
}

export function NPSGauge({ value }: NPSGaugeProps) {
  const capped = Math.max(0, Math.min(100, value));
  const fill = capped >= 50 ? "#06C167" : capped >= 30 ? "#F9AB00" : "#D93025";

  return (
    <div
      title="Jauge NPS: vert au-dessus de 50, jaune entre 30 et 50, rouge en dessous de 30."
      aria-label={`Jauge NPS à ${capped}`}
      className="h-32 w-full"
    >
      <ResponsiveContainer>
        <RadialBarChart
          data={[{ name: "NPS", value: capped }]}
          startAngle={180}
          endAngle={0}
          innerRadius="70%"
          outerRadius="100%"
        >
          <RadialBar background dataKey="value" cornerRadius={999} fill={fill} />
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="-mt-5 text-center font-mono text-2xl font-semibold text-zinc-900">{capped}</p>
    </div>
  );
}
