import Papa from "papaparse";

export const formatCurrency = (amount, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 2 }).format(amount);

export const formatCurrencyCompact = (amount) => {
  if (Math.abs(amount) >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (Math.abs(amount) >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
  return formatCurrency(amount);
};

export const formatDate = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const formatDateShort = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const clsx = (...classes) => classes.filter(Boolean).join(" ");

export const exportToCSV = (transactions, filename = "transactions") => {
  const data = transactions.map((t) => ({
    Date: t.date,
    Description: t.description,
    Category: t.category,
    Type: t.type,
    Amount: t.amount,
    Status: t.status,
  }));
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (transactions, filename = "transactions") => {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const getPercentChange = (current, previous) => {
  if (!previous) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};

export const generateId = () => `t${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
