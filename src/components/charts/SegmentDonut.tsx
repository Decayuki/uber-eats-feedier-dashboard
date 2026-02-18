"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface SegmentDonutItem {
  name: string;
  value: number;
}

interface SegmentDonutProps {
  data: SegmentDonutItem[];
}

const COLORS = ["#06C167", "#F9AB00", "#D93025"];

export function SegmentDonut({ data }: SegmentDonutProps) {
  return (
    <div
      title="Répartition en anneau des proportions par catégorie."
      aria-label="Diagramme en anneau de distribution"
      className="h-56 w-full"
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value ?? 0}%`, ""]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
