"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TrendLineProps {
  data: Record<string, number | string>[];
  xKey: string;
  lineKeys: Array<{ key: string; label: string; color: string }>;
  yDomain?: [number, number];
  ySuffix?: string;
}

export function TrendLine({ data, xKey, lineKeys, yDomain = [-1, 1], ySuffix = "" }: TrendLineProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
          <YAxis domain={yDomain} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }}
            formatter={(value) => [`${value ?? 0}${ySuffix}`, "Valeur"]}
          />
          <Legend />
          {lineKeys.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.label}
              stroke={line.color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
