import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search, SortAsc, SortDesc, Trash2, Pencil, Filter, X, RotateCcw, ChevronUp, ChevronDown
} from "lucide-react";
import {
  deleteTransaction, selectAllTransactions,
} from "../../store/slices/transactionsSlice";
import {
  setSearch, setCategory, setType, setSortBy, toggleSortDir,
  setDateRange, setStatus, resetFilters, selectFilters,
} from "../../store/slices/filtersSlice";
import { openModal } from "../../store/slices/uiSlice";
import { selectIsAdmin } from "../../store/slices/authSlice";
import { useFilteredTransactions } from "../../hooks/useFilteredTransactions";
import { useTheme } from "../../hooks/useTheme";
import { CATEGORIES, getCategoryById } from "../../data/mockData";
import Badge from "../ui/Badge";
import EmptyState from "../ui/EmptyState";
import { Select } from "../ui/Select";
import { TextInput, FieldLabel } from "../ui/Inputs";
import { formatCurrency, formatDate } from "../../utils/helpers";
import toast from "react-hot-toast";

const SORT_COLS = [
  { key: "date",        label: "Date" },
  { key: "amount",      label: "Amount" },
  { key: "description", label: "Description" },
  { key: "category",    label: "Category" },
];

const TYPE_OPTIONS     = [{ value: "all", label: "All Types" }, { value: "income", label: "Income" }, { value: "expense", label: "Expense" }];
const DATE_OPTIONS     = [{ value: "all", label: "All Time" }, { value: "7d", label: "Last 7 days" }, { value: "30d", label: "Last 30 days" }, { value: "90d", label: "Last 90 days" }];
const STATUS_OPTIONS   = [{ value: "all", label: "All Statuses" }, { value: "completed", label: "Completed" }, { value: "pending", label: "Pending" }];
const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  ...CATEGORIES.map((c) => ({ value: c.id, label: c.label, color: c.color })),
];

export default function Transactions() {
  const dispatch       = useDispatch();
  const { isDark }     = useTheme();
  const filters        = useSelector(selectFilters);
  const isAdmin        = useSelector(selectIsAdmin);
  const allTransactions = useSelector(selectAllTransactions);
  const filtered       = useFilteredTransactions();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const text      = isDark ? "text-white" : "text-black";
  const muted     = isDark ? "text-[#888]" : "text-[#737373]";
  const border    = isDark ? "border-[#1a1a1a]" : "border-[#e5e5e5]";
  const cardBg    = isDark ? "bg-[#111]" : "bg-white";
  const hoverRow  = isDark ? "hover:bg-[#0d0d0d]" : "hover:bg-[#fafafa]";
  const divider   = isDark ? "divide-[#141414]" : "divide-[#f5f5f5]";

  const hasActiveFilters =
    filters.category !== "all" || filters.type !== "all" ||
    filters.dateRange !== "all" || filters.status !== "all";

  const handleDelete = (id, description) => {
    if (window.confirm(`Delete "${description}"?`)) {
      dispatch(deleteTransaction(id));
      toast.success("Transaction deleted.");
    }
  };

  const handleEdit = (tx) => {
    dispatch(openModal("editTransaction"));
  };

  const SortIcon = ({ col }) => {
    if (filters.sortBy !== col) return null;
    return filters.sortDir === "asc" ? <ChevronUp size={10} /> : <ChevronDown size={10} />;
  };

  return (
    <div className="space-y-3 animate-slide-up">

      {/* ── Search + Filter toggle ─────────────────────────── */}
      <div className="flex gap-2">
        <TextInput
          className="flex-1"
          icon={Search}
          placeholder="Search transactions…"
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          iconRight={
            filters.search
              ? <button onClick={() => dispatch(setSearch(""))} className={`${muted}`}><X size={12} /></button>
              : null
          }
        />
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className={[
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex-shrink-0",
            hasActiveFilters
              ? isDark ? "border-white/20 text-white bg-white/5" : "border-black/15 text-black bg-black/5"
              : isDark ? "border-[#242424] text-[#666] hover:text-white" : "border-[#e2e2e2] text-[#aaa] hover:text-black",
          ].join(" ")}
        >
          <Filter size={13} />
          <span className="hidden xs:inline sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${isDark ? "bg-white text-black" : "bg-black text-white"}`}>!</span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={() => dispatch(resetFilters())}
            className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-medium ${muted} hover:text-red-500 transition-colors flex-shrink-0`}
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* ── Filter Panel ──────────────────────────────────── */}
      {filtersOpen && (
        <div className={`rounded-xl border p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-slide-up ${cardBg} ${border}`}>
          <div><FieldLabel>Type</FieldLabel>
            <Select value={filters.type}      onValueChange={(v) => dispatch(setType(v))}      options={TYPE_OPTIONS}     size="sm" /></div>
          <div><FieldLabel>Category</FieldLabel>
            <Select value={filters.category}  onValueChange={(v) => dispatch(setCategory(v))}  options={CATEGORY_OPTIONS} size="sm" /></div>
          <div><FieldLabel>Date Range</FieldLabel>
            <Select value={filters.dateRange} onValueChange={(v) => dispatch(setDateRange(v))} options={DATE_OPTIONS}     size="sm" /></div>
          <div><FieldLabel>Status</FieldLabel>
            <Select value={filters.status}    onValueChange={(v) => dispatch(setStatus(v))}    options={STATUS_OPTIONS}   size="sm" /></div>
        </div>
      )}

      {/* Stats bar*/}
      <div className={`flex flex-wrap items-center gap-3 text-xs ${muted}`}>
        <span><span className={`font-semibold ${text}`}>{filtered.length}</span> of {allTransactions.length}</span>
        <span className="text-emerald-500 font-semibold">+{formatCurrency(filtered.filter(t => t.type === "income").reduce((a, t) => a + t.amount, 0))}</span>
        <span className="text-red-500 font-semibold">-{formatCurrency(filtered.filter(t => t.type === "expense").reduce((a, t) => a + t.amount, 0))}</span>
      </div>

      {/*  Desktop Table (hidden on mobile)  */}
      <div className={`hidden sm:block rounded-xl border overflow-hidden ${cardBg} ${border}`}>
        {/* Table header */}
        <div className={`grid grid-cols-12 gap-2 px-4 py-3 border-b ${border} text-[10px] uppercase tracking-widest font-semibold ${muted}`}>
          {SORT_COLS.map((col) => (
            <button
              key={col.key}
              onClick={() => {
                if (filters.sortBy === col.key) dispatch(toggleSortDir());
                else dispatch(setSortBy(col.key));
              }}
              className={`flex items-center gap-1 col-span-3 text-left transition-colors hover:${isDark ? "text-white" : "text-black"}`}
            >
              {col.label} <SortIcon col={col.key} />
            </button>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <EmptyState title="No transactions match" description="Try different search or filter criteria." />
        ) : (
          <div className={`divide-y ${divider}`}>
            {filtered.map((tx) => {
              const cat = getCategoryById(tx.category);
              return (
                <div key={tx.id} className={`grid grid-cols-12 gap-2 px-4 py-2 items-center transition-colors ${hoverRow}`}>
                  <div className="col-span-3">
                    <p className={`text-xs font-medium ${text}`}>{formatDate(tx.date)}</p>
                    <Badge label={tx.status} variant={tx.status} />
                  </div>
                  <div className="col-span-3">
                    <span className={`text-sm font-bold font-mono ${tx.type === "income" ? "text-emerald-500" : "text-red-500"}`}>
                      {tx.type === "income" ? "+" : "−"}{formatCurrency(tx.amount)}
                    </span>
                    <p className={`text-[10px] ${muted} mt-0.5 capitalize`}>{tx.type}</p>
                  </div>
                  <div className="col-span-3">
                    <p className={`text-xs font-medium truncate ${text}`}>{tx.description}</p>
                  </div>
                  <div className="col-span-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className={`text-xs truncate ${muted}`}>{cat.label}</span>
                    </div>
                    {isAdmin && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => handleEdit(tx)} className={`p-1.5 rounded-md transition-colors ${isDark ? "text-[#555] hover:text-white hover:bg-[#1a1a1a]" : "text-[#bbb] hover:text-black hover:bg-[#f0f0f0]"}`}>
                          <Pencil size={12} />
                        </button>
                        <button onClick={() => handleDelete(tx.id, tx.description)} className={`p-1.5 rounded-md transition-colors ${isDark ? "text-[#555] hover:text-red-500 hover:bg-red-500/10" : "text-[#bbb] hover:text-red-500 hover:bg-red-500/10"}`}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/*  Mobile Card List (hidden on sm+)*/}
      <div className={`sm:hidden rounded-xl border overflow-hidden ${cardBg} ${border}`}>
        {filtered.length === 0 ? (
          <EmptyState title="No transactions match" description="Adjust your filters." />
        ) : (
          <div className={`divide-y ${divider}`}>
            {filtered.map((tx) => {
              const cat = getCategoryById(tx.category);
              return (
                <div key={tx.id} className={`flex items-center gap-3 px-4 py-3.5 transition-colors ${hoverRow}`}>
                  {/* Type indicator */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                    tx.type === "income" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                  }`}>
                    {tx.type === "income" ? "+" : "−"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold truncate ${text}`}>{tx.description}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className={`text-[10px] ${muted}`}>{formatDate(tx.date)}</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className={`text-[10px] ${muted}`}>{cat.label}</span>
                      </span>
                    </div>
                  </div>

                  {/* Amount + actions */}
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className={`text-sm font-bold font-mono ${tx.type === "income" ? "text-emerald-500" : "text-red-500"}`}>
                      {tx.type === "income" ? "+" : "−"}{formatCurrency(tx.amount)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Badge label={tx.status} variant={tx.status} />
                      {isAdmin && (
                        <>
                          <button onClick={() => handleEdit(tx)} className={`p-1 rounded transition-colors ${isDark ? "text-[#555] hover:text-white" : "text-[#bbb] hover:text-black"}`}>
                            <Pencil size={11} />
                          </button>
                          <button onClick={() => handleDelete(tx.id, tx.description)} className={`p-1 rounded transition-colors ${isDark ? "text-[#555] hover:text-red-500" : "text-[#bbb] hover:text-red-500"}`}>
                            <Trash2 size={11} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
