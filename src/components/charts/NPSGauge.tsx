"use client";

interface NPSGaugeProps {
  value: number;
}

function polar(cx: number, cy: number, radius: number, angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy - radius * Math.sin(rad),
  };
}

export function NPSGauge({ value }: NPSGaugeProps) {
  const capped = Math.max(0, Math.min(100, value));
  const fill = capped >= 50 ? "#06C167" : capped >= 30 ? "#F9AB00" : "#D93025";
  const radius = 72;
  const arcLength = Math.PI * radius;
  const progress = (capped / 100) * arcLength;
  const ticks = [0, 25, 50, 75, 100];

  return (
    <div
      title="Jauge NPS: vert au-dessus de 50, jaune entre 30 et 50, rouge en dessous de 30."
      aria-label={`Jauge NPS à ${capped}`}
      className="mx-auto w-full max-w-[240px]"
    >
      <svg viewBox="0 0 220 140" className="h-32 w-full">
        <path
          d={`M ${110 - radius} 90 A ${radius} ${radius} 0 0 1 ${110 + radius} 90`}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d={`M ${110 - radius} 90 A ${radius} ${radius} 0 0 1 ${110 + radius} 90`}
          fill="none"
          stroke={fill}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${arcLength}`}
        />

        {ticks.map((tick) => {
          const angle = 180 - tick * 1.8;
          const inner = polar(110, 90, radius + 2, angle);
          const outer = polar(110, 90, radius + 8, angle);
          return (
            <line
              key={tick}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="#9CA3AF"
              strokeWidth="1.4"
            />
          );
        })}

        {[0, 50, 100].map((tick) => {
          const angle = 180 - tick * 1.8;
          const label = polar(110, 90, radius + 20, angle);
          return (
            <text
              key={tick}
              x={label.x}
              y={label.y}
              textAnchor="middle"
              fontSize="10"
              fill="#6B7280"
              fontWeight={600}
            >
              {tick}
            </text>
          );
        })}
      </svg>
      <p className="-mt-2 text-center font-mono text-2xl font-semibold text-zinc-900">{capped}</p>
    </div>
  );
}
