import React, { useState } from "react";
import { Provider, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Transactions from "./components/transactions/Transactions";
import Insights from "./components/insights/Insights";
import TransactionModal from "./components/ui/TransactionModal";
import { selectActivePage, selectActiveModal } from "./store/slices/uiSlice";
import { useTheme } from "./hooks/useTheme";

function AppContent() {
  const activePage = useSelector(selectActivePage);
  const activeModal = useSelector(selectActiveModal);
  const { isDark } = useTheme();
  const [editData, setEditData] = useState(null);

  const pages = {
    dashboard: <Dashboard />,
    transactions: <Transactions />,
    insights: <Insights />,
  };

  return (
    <>
      <Layout>
        {pages[activePage] || <Dashboard />}
      </Layout>

      {/* Modals */}
      {(activeModal === "addTransaction" || activeModal === "editTransaction") && (
        <TransactionModal editData={activeModal === "editTransaction" ? editData : null} />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: isDark ? "#111" : "#fff",
            color: isDark ? "#fff" : "#000",
            border: isDark ? "1px solid #2a2a2a" : "1px solid #e5e5e5",
            borderRadius: "12px",
            fontSize: "13px",
            fontWeight: "500",
          },
          success: { iconTheme: { primary: "#22c55e", secondary: isDark ? "#111" : "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: isDark ? "#111" : "#fff" } },
        }}
      />
    </>
  );
}

function ThemeBootstrap() {
  // Apply theme class to html element on first render
  useTheme();
  return <AppContent />;
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeBootstrap />
    </Provider>
  );
}
