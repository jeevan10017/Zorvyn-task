import { createSlice } from "@reduxjs/toolkit";

const THEME_KEY = "fintrack_theme";
const SIDEBAR_KEY = "fintrack_sidebar";

const getSavedTheme = () => {
  try { return localStorage.getItem(THEME_KEY) || "dark"; } catch { return "dark"; }
};
const getSavedSidebar = () => {
  try { return localStorage.getItem(SIDEBAR_KEY) !== "false"; } catch { return true; }
};

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: getSavedTheme(),
    sidebarOpen: getSavedSidebar(),
    sidebarCollapsed: false,
    activeModal: null,
    notification: null,
    activePage: "dashboard",
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem(THEME_KEY, state.theme); } catch {}
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      try { localStorage.setItem(THEME_KEY, action.payload); } catch {}
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
      try { localStorage.setItem(SIDEBAR_KEY, state.sidebarOpen); } catch {}
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarCollapsed,
  openModal,
  closeModal,
  setActivePage,
  showNotification,
  clearNotification,
} = uiSlice.actions;

export const selectTheme = (state) => state.ui.theme;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed;
export const selectActiveModal = (state) => state.ui.activeModal;
export const selectActivePage = (state) => state.ui.activePage;

export default uiSlice.reducer;
