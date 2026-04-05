import { createSlice } from "@reduxjs/toolkit";
import { mockTransactions } from "../../data/mockData";
import { format } from "date-fns";

const STORAGE_KEY = "fintrack_transactions";

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
};

const initialTransactions = loadFromStorage() || mockTransactions;

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    items: initialTransactions,
    loading: false,
    selectedId: null,
    editingId: null,
  },
  reducers: {
    addTransaction: (state, action) => {
      const newTx = {
        ...action.payload,
        id: `t${Date.now()}`,
        date: action.payload.date || format(new Date(), "yyyy-MM-dd"),
        status: "completed",
      };
      state.items.unshift(newTx);
      saveToStorage(state.items);
    },
    updateTransaction: (state, action) => {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload };
        saveToStorage(state.items);
      }
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      saveToStorage(state.items);
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },
    resetToMockData: (state) => {
      state.items = mockTransactions;
      saveToStorage(mockTransactions);
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setSelectedId,
  setEditingId,
  resetToMockData,
} = transactionsSlice.actions;

// Selectors
export const selectAllTransactions = (state) => state.transactions.items;
export const selectTransactionById = (id) => (state) =>
  state.transactions.items.find((t) => t.id === id);
export const selectTotalBalance = (state) => {
  return state.transactions.items.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 42000); // starting balance
};
export const selectTotalIncome = (state) =>
  state.transactions.items
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
export const selectTotalExpenses = (state) =>
  state.transactions.items
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

export default transactionsSlice.reducer;
