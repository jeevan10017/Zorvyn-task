import { createSlice } from "@reduxjs/toolkit";
import { MOCK_USER } from "../../data/mockData";

const ROLE_KEY = "fintrack_role";
const getSavedRole = () => {
  try { return localStorage.getItem(ROLE_KEY) || "admin"; } catch { return "admin"; }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { ...MOCK_USER, role: getSavedRole() },
    role: getSavedRole(),
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      state.user = { ...state.user, role: action.payload };
      try { localStorage.setItem(ROLE_KEY, action.payload); } catch {}
    },
  },
});

export const { setRole } = authSlice.actions;
export const selectRole = (state) => state.auth.role;
export const selectUser = (state) => state.auth.user;
export const selectIsAdmin = (state) => state.auth.role === "admin";
export const selectIsViewer = (state) => state.auth.role === "viewer";

export default authSlice.reducer;
