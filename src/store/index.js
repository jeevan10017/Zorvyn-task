import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactionsSlice";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import filtersReducer from "./slices/filtersSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    ui: uiReducer,
    auth: authReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
