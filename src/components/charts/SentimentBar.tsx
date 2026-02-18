"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface SentimentBarItem {
  name: string;
  positive: number;
  neutral: number;
  negative: number;
}

interface SentimentBarProps {
  data: SentimentBarItem[];
}

export function SentimentBar({ data }: SentimentBarProps) {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} unit="%" />
          <YAxis type="category" dataKey="name" width={170} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }}
            formatter={(value, name) => [`${value ?? 0}%`, name]}
          />
          <Bar dataKey="positive" name="Positif" stackId="sentiment" fill="#06C167" radius={[6, 0, 0, 6]} />
          <Bar dataKey="neutral" name="Neutre" stackId="sentiment" fill="#A1A1AA" />
          <Bar dataKey="negative" name="Négatif" stackId="sentiment" fill="#D93025" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
