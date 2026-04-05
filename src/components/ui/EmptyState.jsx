import React from "react";
import { SearchX } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function EmptyState({ title = "No data found", description = "Try adjusting your filters.", icon: Icon = SearchX }) {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? "bg-[#1a1a1a]" : "bg-[#f0f0f0]"}`}>
        <Icon size={20} className={isDark ? "text-[#555]" : "text-[#aaa]"} />
      </div>
      <p className={`font-medium text-sm ${isDark ? "text-[#888]" : "text-[#666]"}`}>{title}</p>
      {description && <p className={`text-xs ${isDark ? "text-[#555]" : "text-[#999]"}`}>{description}</p>}
    </div>
  );
}
