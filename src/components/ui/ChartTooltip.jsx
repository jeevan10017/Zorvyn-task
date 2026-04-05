import React from "react";
import { useTheme } from "../../hooks/useTheme";
import { formatCurrency } from "../../utils/helpers";

export default function ChartTooltip({ active, payload, label }) {
  const { isDark } = useTheme();
  if (!active || !payload || !payload.length) return null;

  return (
    <div className={`rounded-xl border px-3 py-2.5 shadow-2xl text-xs ${
      isDark ? "bg-[#111] border-[#2a2a2a] text-white" : "bg-white border-[#e5e5e5] text-black shadow-xl"
    }`}>
      {label && <p className={`font-semibold mb-1.5 ${isDark ? "text-[#888]" : "text-[#666]"}`}>{label}</p>}
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
          <span className={isDark ? "text-[#888]" : "text-[#666]"}>{entry.name}:</span>
          <span className="font-semibold font-mono">
            {typeof entry.value === "number" && entry.value > 100
              ? formatCurrency(entry.value)
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}
