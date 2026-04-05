import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon, Menu, Shield, Eye, Download, Plus, ChevronDown } from "lucide-react";
import { toggleSidebar, selectActivePage, openModal } from "../../store/slices/uiSlice";
import { selectRole, setRole, selectUser, selectIsAdmin } from "../../store/slices/authSlice";
import { useTheme } from "../../hooks/useTheme";
import { selectAllTransactions } from "../../store/slices/transactionsSlice";
import { exportToCSV, exportToJSON } from "../../utils/helpers";
import { Select } from "../ui/Select";

const PAGE_LABELS = {
  dashboard:    "Dashboard",
  transactions: "Transactions",
  insights:     "Insights",
};

const ROLE_OPTIONS = [
  { value: "admin",  label: "Admin" },
  { value: "viewer", label: "Viewer" },
];

export default function Topbar() {
  const dispatch      = useDispatch();
  const { isDark, toggle } = useTheme();
  const activePage    = useSelector(selectActivePage);
  const role          = useSelector(selectRole);
  const user          = useSelector(selectUser);
  const isAdmin       = useSelector(selectIsAdmin);
  const transactions  = useSelector(selectAllTransactions);
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef(null);

  // Close export dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const border  = isDark ? "border-[#1a1a1a]" : "border-[#e5e5e5]";
  const bg      = isDark ? "bg-[#000]" : "bg-white";
  const text    = isDark ? "text-white" : "text-black";
  const btnBase = isDark
    ? "p-2 rounded-lg text-[#666] hover:text-white hover:bg-[#111] transition-colors flex-shrink-0"
    : "p-2 rounded-lg text-[#aaa] hover:text-black hover:bg-[#f5f5f5] transition-colors flex-shrink-0";

  return (
    <header className={`h-14 flex items-center justify-between px-3 sm:px-4 border-b ${border} ${bg} sticky top-0 z-20 gap-2`}>

      {/* ── Left ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 min-w-0">
        <button onClick={() => dispatch(toggleSidebar())} className={btnBase} aria-label="Toggle sidebar">
          <Menu size={16} />
        </button>
        <h1 className={`font-semibold text-sm truncate ${text}`}>{PAGE_LABELS[activePage]}</h1>
      </div>

      {/* ── Right ────────────────────────────────────────── */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">

        {/* Role switcher — hidden label on xs, shown on sm+ */}
        <div className="flex items-center gap-1.5">
          {role === "admin"
            ? <Shield size={11} className="text-emerald-500 flex-shrink-0 hidden sm:block" />
            : <Eye    size={11} className="text-blue-500 flex-shrink-0 hidden sm:block" />
          }
          <div className="w-24 sm:w-28">
            <Select
              value={role}
              onValueChange={(v) => dispatch(setRole(v))}
              options={ROLE_OPTIONS}
              size="sm"
            />
          </div>
        </div>

        {/* Export dropdown */}
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => setExportOpen((v) => !v)}
            className={btnBase}
            title="Export data"
          >
            <Download size={15} />
          </button>
          {exportOpen && (
            <div className={[
              "absolute right-0 top-full mt-1 w-36 rounded-xl border shadow-2xl z-50 overflow-hidden",
              isDark ? "bg-[#111] border-[#242424]" : "bg-white border-[#e2e2e2]",
            ].join(" ")}>
              {[
                { label: "Export CSV",  action: () => { exportToCSV(transactions);  setExportOpen(false); } },
                { label: "Export JSON", action: () => { exportToJSON(transactions); setExportOpen(false); } },
              ].map(({ label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className={[
                    "w-full text-left px-4 py-2.5 text-xs font-medium transition-colors",
                    isDark
                      ? "text-[#aaa] hover:bg-[#1a1a1a] hover:text-white"
                      : "text-[#666] hover:bg-[#f5f5f5] hover:text-black",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add transaction — icon-only on xs, label on sm+ */}
        {isAdmin && (
          <button
            onClick={() => dispatch(openModal("addTransaction"))}
            className={[
              "flex items-center gap-1 rounded-lg font-semibold transition-all active:scale-95 flex-shrink-0",
              "px-2 py-1.5 sm:px-3 sm:py-1.5",
              "text-xs",
              isDark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90",
            ].join(" ")}
          >
            <Plus size={13} />
            <span className="hidden sm:inline">Add</span>
          </button>
        )}

        {/* Theme toggle */}
        <button onClick={toggle} className={btnBase} title="Toggle theme">
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Avatar */}
        <div className={[
          "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
          isDark ? "bg-[#222] text-white" : "bg-[#111] text-white",
        ].join(" ")}>
          {user.avatar}
        </div>
      </div>
    </header>
  );
}
