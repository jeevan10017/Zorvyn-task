import React from "react";
import { useSelector } from "react-redux";
import { selectSidebarOpen } from "../../store/slices/uiSlice";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useTheme } from "../../hooks/useTheme";

export default function Layout({ children }) {
  const { isDark }    = useTheme();
  const sidebarOpen   = useSelector(selectSidebarOpen);
  const mainBg        = isDark ? "bg-[#050505]" : "bg-[#fafafa]";
  const patternClass  = isDark ? "grid-pattern" : "grid-pattern-light";

  return (
    <div className={`min-h-screen ${mainBg} ${isDark ? "text-white" : "text-black"}`}>
      <Sidebar />

      {/* Content area — shifts right only on desktop */}
      <div
        className={[
          "transition-all duration-300",
          // On mobile: no margin (sidebar is a drawer overlay)
          "ml-0",
          // On desktop: push content right based on sidebar state
          sidebarOpen ? "lg:ml-56" : "lg:ml-16",
        ].join(" ")}
      >
        <Topbar />
        <main className={`min-h-[calc(100vh-56px)] ${patternClass} relative`}>
          <div className="p-3 sm:p-4 lg:p-6 max-w-[1400px] mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
