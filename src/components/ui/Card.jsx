import React from "react";
import { useTheme } from "../../hooks/useTheme";
import { clsx } from "../../utils/helpers";

export default function Card({ children, className = "", hover = false, onClick, noPad = false, color }) {
  const { isDark } = useTheme();

  const glassStyle = color ? {
    background: isDark
      ? `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`
      : `linear-gradient(135deg, ${color}14 0%, ${color}06 100%)`,
    borderColor: isDark ? `${color}22` : `${color}30`,
    boxShadow: `0 4px 24px ${color}12, inset 0 1px 0 ${color}20`,
  } : {};

  const base = color
    ? "border rounded-xl backdrop-blur-md"
    : isDark
      ? "bg-[#111111] border border-[#1a1a1a] rounded-xl"
      : "bg-white border border-[#e5e5e5] rounded-xl shadow-sm";

  const hoverClass = hover
    ? isDark
      ? "hover:border-[#333] transition-colors cursor-pointer"
      : "hover:border-[#ccc] hover:shadow-md transition-all cursor-pointer"
    : "";

  return (
    <div
      className={clsx(base, hoverClass, !noPad && "p-4 lg:p-5", className)}
      style={glassStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
}