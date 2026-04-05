import React from "react";
import { useTheme } from "../../hooks/useTheme";

const TYPE_STYLES = {
  income: { bg: "bg-emerald-500/10", text: "text-emerald-500", dot: "bg-emerald-500" },
  expense: { bg: "bg-red-500/10", text: "text-red-500", dot: "bg-red-500" },
  completed: { bg: "bg-emerald-500/10", text: "text-emerald-500", dot: "bg-emerald-500" },
  pending: { bg: "bg-amber-500/10", text: "text-amber-500", dot: "bg-amber-500" },
  failed: { bg: "bg-red-500/10", text: "text-red-500", dot: "bg-red-500" },
};

export default function Badge({ label, variant = "income", dot = false }) {
  const style = TYPE_STYLES[variant] || TYPE_STYLES.income;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${style.bg} ${style.text}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />}
      {label}
    </span>
  );
}
