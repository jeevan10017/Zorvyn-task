import React from "react";
import { useTheme } from "../../hooks/useTheme";

export default function GlassCard({ color = "#888", className = "", noPad = false, children }) {
  const { isDark } = useTheme();
  return (
    <div
      className={`rounded-2xl border backdrop-blur-md transition-transform hover:scale-[1.005] ${noPad ? "" : "p-4"} ${className}`}
      style={{
        background: isDark
          ? `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`
          : `linear-gradient(135deg, ${color}14 0%, ${color}06 100%)`,
        borderColor: isDark ? `${color}22` : `${color}30`,
        boxShadow: `0 4px 24px ${color}12, inset 0 1px 0 ${color}20`,
      }}
    >
      {children}
    </div>
  );
}