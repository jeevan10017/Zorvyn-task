import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    category: "all",
    type: "all",
    sortBy: "date",
    sortDir: "desc",
    dateRange: "all",
    status: "all",
  },
  reducers: {
    setSearch: (state, action) => { state.search = action.payload; },
    setCategory: (state, action) => { state.category = action.payload; },
    setType: (state, action) => { state.type = action.payload; },
    setSortBy: (state, action) => { state.sortBy = action.payload; },
    setSortDir: (state, action) => { state.sortDir = action.payload; },
    toggleSortDir: (state) => { state.sortDir = state.sortDir === "asc" ? "desc" : "asc"; },
    setDateRange: (state, action) => { state.dateRange = action.payload; },
    setStatus: (state, action) => { state.status = action.payload; },
    resetFilters: (state) => {
      state.search = "";
      state.category = "all";
      state.type = "all";
      state.sortBy = "date";
      state.sortDir = "desc";
      state.dateRange = "all";
      state.status = "all";
    },
  },
});

export const {
  setSearch, setCategory, setType,
  setSortBy, setSortDir, toggleSortDir,
  setDateRange, setStatus, resetFilters,
} = filtersSlice.actions;

export const selectFilters = (state) => state.filters;

export default filtersSlice.reducer;
