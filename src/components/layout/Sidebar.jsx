import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  ChevronLeft, ChevronRight, TrendingUp, X
} from "lucide-react";
import {
  setActivePage, selectActivePage,
  toggleSidebar, selectSidebarOpen
} from "../../store/slices/uiSlice";
import { useTheme } from "../../hooks/useTheme";

const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights",     label: "Insights",     icon: Lightbulb },
];

export default function Sidebar() {
  const dispatch    = useDispatch();
  const activePage  = useSelector(selectActivePage);
  const sidebarOpen = useSelector(selectSidebarOpen);
  const { isDark }  = useTheme();

  const bg          = isDark ? "bg-[#000] border-[#1a1a1a]" : "bg-white border-[#e5e5e5]";
  const text        = isDark ? "text-white" : "text-black";
  const muted       = isDark ? "text-[#666]" : "text-[#999]";
  const hover       = isDark ? "hover:bg-[#111] hover:text-white" : "hover:bg-[#f5f5f5] hover:text-black";
  const activeClass = isDark
    ? "bg-[#111] text-white border border-[#2a2a2a]"
    : "bg-[#f0f0f0] text-black border border-[#ddd]";
  const borderColor = isDark ? "border-[#1a1a1a]" : "border-[#e5e5e5]";

  const navigate = (id) => {
    dispatch(setActivePage(id));
    if (window.innerWidth < 1024) dispatch(toggleSidebar());
  };

  return (
    <>
      {/* Backdrop — mobile only */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-30 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* Sidebar panel */}
      <aside
        style={{ width: sidebarOpen ? "14rem" : undefined }}
        className={[
          "fixed top-0 left-0 h-full z-40 flex flex-col border-r",
          bg, text,
          // Mobile: slide drawer
          "transition-transform duration-300 ease-in-out w-56",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible, width transitions
          "lg:translate-x-0",
          sidebarOpen ? "lg:w-56" : "lg:w-16",
          "lg:transition-all lg:duration-300",
        ].join(" ")}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 h-14 border-b ${borderColor} flex-shrink-0 overflow-hidden`}>
          {/* <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? "bg-white" : "bg-black"}`}>
            <TrendingUp size={14} className={isDark ? "text-black" : "text-white"} />
          </div> */}
          {sidebarOpen && (
            <span className={`font-semibold text-lg tracking-tight whitespace-nowrap ${text}`}>FinTrack</span>
          )}
          {/* Mobile close */}
          <button
            className={`ml-auto p-1.5 rounded-md lg:hidden ${muted} hover:${text} transition-colors flex-shrink-0`}
            onClick={() => dispatch(toggleSidebar())}
          >
            <X size={15} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = activePage === id;
            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                title={!sidebarOpen ? label : undefined}
                className={[
                  "w-full flex items-center rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap",
                  sidebarOpen ? "gap-3 px-3 py-2.5" : "gap-0 px-0 py-2.5 justify-center",
                  isActive ? activeClass : `${muted} ${hover}`,
                ].join(" ")}
              >
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && <span className="truncate">{label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Desktop collapse toggle */}
        <div className={`hidden lg:flex items-center justify-end px-3 py-3 border-t ${borderColor}`}>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className={`p-1.5 rounded-md ${muted} ${hover} transition-colors`}
          >
            {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>
      </aside>
    </>
  );
}
