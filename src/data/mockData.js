import { subDays, format, subMonths } from "date-fns";

export const CATEGORIES = [
  { id: "housing", label: "Housing", color: "#6366f1", icon: "Home" },
  { id: "food", label: "Food & Dining", color: "#f59e0b", icon: "UtensilsCrossed" },
  { id: "transport", label: "Transport", color: "#14b8a6", icon: "Car" },
  { id: "entertainment", label: "Entertainment", color: "#ec4899", icon: "Tv" },
  { id: "shopping", label: "Shopping", color: "#8b5cf6", icon: "ShoppingBag" },
  { id: "health", label: "Health", color: "#22c55e", icon: "Heart" },
  { id: "utilities", label: "Utilities", color: "#f97316", icon: "Zap" },
  { id: "salary", label: "Salary", color: "#3b82f6", icon: "Briefcase" },
  { id: "freelance", label: "Freelance", color: "#06b6d4", icon: "Code2" },
  { id: "investment", label: "Investment", color: "#a855f7", icon: "TrendingUp" },
  { id: "education", label: "Education", color: "#eab308", icon: "BookOpen" },
  { id: "other", label: "Other", color: "#6b7280", icon: "MoreHorizontal" },
];

export const getCategoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];

const now = new Date();

const txBase = [
  // Income
  { id: "t001", type: "income", category: "salary", description: "Monthly Salary - Acme Corp", amount: 8500, date: format(subDays(now, 2), "yyyy-MM-dd"), status: "completed" },
  { id: "t002", type: "income", category: "freelance", description: "UI Design Project - StartupXYZ", amount: 1200, date: format(subDays(now, 5), "yyyy-MM-dd"), status: "completed" },
  { id: "t003", type: "income", category: "investment", description: "Dividend - VTSAX", amount: 340, date: format(subDays(now, 8), "yyyy-MM-dd"), status: "completed" },
  { id: "t004", type: "income", category: "freelance", description: "React Consulting - TechCo", amount: 850, date: format(subDays(now, 14), "yyyy-MM-dd"), status: "completed" },
  { id: "t005", type: "income", category: "investment", description: "Stock Sale - AAPL", amount: 560, date: format(subDays(now, 20), "yyyy-MM-dd"), status: "completed" },
  { id: "t006", type: "income", category: "salary", description: "Bonus - Q4 Performance", amount: 2000, date: format(subDays(now, 25), "yyyy-MM-dd"), status: "completed" },

  // Expenses
  { id: "t007", type: "expense", category: "housing", description: "Apartment Rent - March", amount: 2200, date: format(subDays(now, 1), "yyyy-MM-dd"), status: "completed" },
  { id: "t008", type: "expense", category: "food", description: "Whole Foods Grocery", amount: 187.5, date: format(subDays(now, 2), "yyyy-MM-dd"), status: "completed" },
  { id: "t009", type: "expense", category: "transport", description: "Uber rides - Weekly", amount: 68, date: format(subDays(now, 3), "yyyy-MM-dd"), status: "completed" },
  { id: "t010", type: "expense", category: "entertainment", description: "Netflix + Spotify Bundle", amount: 28, date: format(subDays(now, 4), "yyyy-MM-dd"), status: "completed" },
  { id: "t011", type: "expense", category: "shopping", description: "Amazon - Electronics", amount: 324, date: format(subDays(now, 5), "yyyy-MM-dd"), status: "completed" },
  { id: "t012", type: "expense", category: "health", description: "Gym Membership - Monthly", amount: 55, date: format(subDays(now, 6), "yyyy-MM-dd"), status: "completed" },
  { id: "t013", type: "expense", category: "utilities", description: "Electricity & Water Bill", amount: 142, date: format(subDays(now, 7), "yyyy-MM-dd"), status: "completed" },
  { id: "t014", type: "expense", category: "food", description: "Restaurant - Date Night", amount: 89, date: format(subDays(now, 8), "yyyy-MM-dd"), status: "completed" },
  { id: "t015", type: "expense", category: "shopping", description: "Zara - Clothing", amount: 210, date: format(subDays(now, 9), "yyyy-MM-dd"), status: "completed" },
  { id: "t016", type: "expense", category: "education", description: "Udemy Course Bundle", amount: 49, date: format(subDays(now, 10), "yyyy-MM-dd"), status: "completed" },
  { id: "t017", type: "expense", category: "transport", description: "Gas Station", amount: 62, date: format(subDays(now, 11), "yyyy-MM-dd"), status: "completed" },
  { id: "t018", type: "expense", category: "food", description: "DoorDash - Lunch Delivery", amount: 34, date: format(subDays(now, 12), "yyyy-MM-dd"), status: "completed" },
  { id: "t019", type: "expense", category: "health", description: "Doctor Visit Copay", amount: 40, date: format(subDays(now, 13), "yyyy-MM-dd"), status: "completed" },
  { id: "t020", type: "expense", category: "entertainment", description: "Cinema - 2 Tickets", amount: 36, date: format(subDays(now, 14), "yyyy-MM-dd"), status: "completed" },
  { id: "t021", type: "expense", category: "utilities", description: "Internet - Fiber Plan", amount: 79, date: format(subDays(now, 15), "yyyy-MM-dd"), status: "completed" },
  { id: "t022", type: "expense", category: "food", description: "Starbucks - Weekly", amount: 47, date: format(subDays(now, 16), "yyyy-MM-dd"), status: "completed" },
  { id: "t023", type: "expense", category: "shopping", description: "Apple Store - AirPods", amount: 179, date: format(subDays(now, 18), "yyyy-MM-dd"), status: "completed" },
  { id: "t024", type: "expense", category: "transport", description: "Monthly Metro Pass", amount: 95, date: format(subDays(now, 20), "yyyy-MM-dd"), status: "completed" },
  { id: "t025", type: "expense", category: "other", description: "Charitable Donation", amount: 100, date: format(subDays(now, 22), "yyyy-MM-dd"), status: "completed" },
  { id: "t026", type: "expense", category: "housing", description: "Home Insurance - Monthly", amount: 180, date: format(subDays(now, 24), "yyyy-MM-dd"), status: "completed" },
  { id: "t027", type: "expense", category: "food", description: "Costco Membership + Groceries", amount: 225, date: format(subDays(now, 26), "yyyy-MM-dd"), status: "completed" },
  { id: "t028", type: "expense", category: "entertainment", description: "PlayStation Plus Annual", amount: 59, date: format(subDays(now, 27), "yyyy-MM-dd"), status: "pending" },
  { id: "t029", type: "expense", category: "health", description: "Pharmacy - Prescription", amount: 32, date: format(subDays(now, 28), "yyyy-MM-dd"), status: "completed" },
  { id: "t030", type: "expense", category: "education", description: "Online Bootcamp - Month 2", amount: 299, date: format(subDays(now, 29), "yyyy-MM-dd"), status: "completed" },
];

export const mockTransactions = txBase;

// Balance trend - last 12 months
export const generateBalanceTrend = () => {
  const data = [];
  let balance = 18000;
  for (let i = 11; i >= 0; i--) {
    const date = subMonths(now, i);
    const income = 9000 + Math.random() * 3000;
    const expense = 4000 + Math.random() * 2500;
    balance = balance + income - expense;
    data.push({
      month: format(date, "MMM"),
      balance: Math.round(balance),
      income: Math.round(income),
      expenses: Math.round(expense),
    });
  }
  return data;
};

export const balanceTrend = generateBalanceTrend();

// Category spending breakdown (expenses only)
export const getCategoryBreakdown = (transactions) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const map = {};
  expenses.forEach((t) => {
    if (!map[t.category]) map[t.category] = 0;
    map[t.category] += t.amount;
  });
  return Object.entries(map)
    .map(([id, value]) => ({
      id,
      name: getCategoryById(id).label,
      value: Math.round(value * 100) / 100,
      color: getCategoryById(id).color,
    }))
    .sort((a, b) => b.value - a.value);
};

// Monthly comparison - last 6 months
export const getMonthlyComparison = () => {
  return balanceTrend.slice(-6).map((m) => ({
    month: m.month,
    income: m.income,
    expenses: m.expenses,
    net: m.income - m.expenses,
  }));
};

export const MOCK_USER = {
  name: "Jeevan Kumar",
  email: "jeevs",
  avatar: "JK",
  role: "admin",
};
