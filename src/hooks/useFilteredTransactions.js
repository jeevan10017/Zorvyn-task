import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllTransactions } from "../store/slices/transactionsSlice";
import { selectFilters } from "../store/slices/filtersSlice";
import { subDays, parseISO, isAfter } from "date-fns";

export const useFilteredTransactions = () => {
  const transactions = useSelector(selectAllTransactions);
  const filters = useSelector(selectFilters);

  return useMemo(() => {
    let result = [...transactions];

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          String(t.amount).includes(q)
      );
    }

    // Category
    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }

    // Type
    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    // Status
    if (filters.status !== "all") {
      result = result.filter((t) => t.status === filters.status);
    }

    // Date range
    if (filters.dateRange !== "all") {
      const days = { "7d": 7, "30d": 30, "90d": 90, "180d": 180 }[filters.dateRange];
      if (days) {
        const cutoff = subDays(new Date(), days);
        result = result.filter((t) => isAfter(parseISO(t.date), cutoff));
      }
    }

    // Sort
    result.sort((a, b) => {
      let va, vb;
      switch (filters.sortBy) {
        case "amount": va = a.amount; vb = b.amount; break;
        case "category": va = a.category; vb = b.category; break;
        case "description": va = a.description; vb = b.description; break;
        default: va = a.date; vb = b.date; break;
      }
      if (va < vb) return filters.sortDir === "asc" ? -1 : 1;
      if (va > vb) return filters.sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [transactions, filters]);
};
