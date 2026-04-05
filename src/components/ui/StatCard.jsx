import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { formatCurrency, formatCurrencyCompact } from "../../utils/helpers";

export default function StatCard({ title, value, change, changeLabel, icon: Icon, iconColor, prefix, compact }) {
  const { isDark } = useTheme();
  const muted = isDark ? "text-[#888]" : "text-[#737373]";
  const text  = isDark ? "text-white"  : "text-black";
  const isPositive = change >= 0;

  const formatted = compact ? formatCurrencyCompact(value) : formatCurrency(value);
  const color = iconColor || "#888";

  return (
    <div
      className="rounded-2xl p-4 border backdrop-blur-md transition-transform hover:scale-[1.02]"
      style={{
        background: isDark
          ? `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`
          : `linear-gradient(135deg, ${color}14 0%, ${color}06 100%)`,
        borderColor: isDark ? `${color}22` : `${color}30`,
        boxShadow: `0 4px 24px ${color}12, inset 0 1px 0 ${color}20`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`text-xs font-medium uppercase tracking-widest ${muted}`}>{title}</span>
        {/* {Icon && <Icon size={14} style={{ color }} />} */}
      </div>

      <div className="space-y-2">
        <p className={`text-2xl font-bold tracking-tight ${text} font-mono`}>
          {formatted}
        </p>
        {change !== undefined && (
          <div className="flex items-center gap-1">
            {isPositive
              ? <TrendingUp  size={11} className="text-emerald-500" />
              : <TrendingDown size={11} className="text-red-500" />
            }
            <span className={`text-xs font-semibold ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}{change.toFixed(1)}%
            </span>
            {changeLabel && (
              <span className={`text-xs ${muted}`}>{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}