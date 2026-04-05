import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function Modal({ title, children, onClose, size = "md" }) {
  const { isDark } = useTheme();

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    // Prevent body scroll while modal open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const maxW = { sm: "sm:max-w-sm", md: "sm:max-w-lg", lg: "sm:max-w-2xl", xl: "sm:max-w-4xl" };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel
          Mobile  → full-width sheet slides up from bottom, rounded top corners
          Desktop → centered dialog with rounded corners all around
      */}
      <div
        className={[
          "relative w-full flex flex-col",
          // Mobile: bottom sheet
          "rounded-t-2xl max-h-[92dvh]",
          // sm+: centered dialog
          `sm:rounded-2xl ${maxW[size]}`,
          "border shadow-2xl animate-slide-up",
          isDark ? "bg-[#111] border-[#2a2a2a]" : "bg-white border-[#e5e5e5]",
        ].join(" ")}
      >
        {/* Drag handle — mobile only */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className={`w-10 h-1 rounded-full ${isDark ? "bg-[#333]" : "bg-[#ddd]"}`} />
        </div>

        {/* Header */}
        <div className={`flex items-center justify-between px-5 sm:px-6 py-4 border-b flex-shrink-0 ${isDark ? "border-[#1a1a1a]" : "border-[#f0f0f0]"}`}>
          <h2 className={`font-semibold text-sm ${isDark ? "text-white" : "text-black"}`}>{title}</h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${isDark ? "text-[#888] hover:text-white hover:bg-[#222]" : "text-[#888] hover:text-black hover:bg-[#f5f5f5]"}`}
          >
            <X size={14} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
