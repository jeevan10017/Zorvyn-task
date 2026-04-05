import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid
} from "recharts";
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import {
  selectAllTransactions,
  selectTotalBalance,
  selectTotalIncome,
  selectTotalExpenses,
} from "../../store/slices/transactionsSlice";
import {
  balanceTrend,
  getCategoryBreakdown,
  getMonthlyComparison,
} from "../../data/mockData";
import Card from "../ui/Card";
import StatCard from "../ui/StatCard";
import Badge from "../ui/Badge";
import ChartTooltip from "../ui/ChartTooltip";
import { useTheme } from "../../hooks/useTheme";
import { formatCurrency, formatDate, formatCurrencyCompact } from "../../utils/helpers";

export default function Dashboard() {
  const { isDark } = useTheme();
  const transactions  = useSelector(selectAllTransactions);
  const totalBalance  = useSelector(selectTotalBalance);
  const totalIncome   = useSelector(selectTotalIncome);
  const totalExpenses = useSelector(selectTotalExpenses);

  const categoryBreakdown  = useMemo(() => getCategoryBreakdown(transactions), [transactions]);
  const monthlyComparison  = useMemo(() => getMonthlyComparison(), []);
  const recentTransactions = useMemo(() => [...transactions].slice(0, 5), [transactions]);
  const savingsRate        = useMemo(
    () => ((totalIncome - totalExpenses) / totalIncome) * 100,
    [totalIncome, totalExpenses]
  );

  const muted     = isDark ? "text-[#888]" : "text-[#737373]";
  const text      = isDark ? "text-white" : "text-black";
  const axisColor = isDark ? "#555" : "#aaa";
  const divider   = isDark ? "divide-[#1a1a1a]" : "divide-[#f0f0f0]";
  const cardBorder = isDark ? "border-[#1a1a1a]" : "border-[#f0f0f0]";

  return (
    <div className="space-y-4 animate-slide-up">

      {/* ── Summary Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Total Balance"  value={totalBalance}  change={8.2}  changeLabel="vs last month" icon={Wallet}      iconColor="#3b82f6" />
        <StatCard title="Total Income"   value={totalIncome}   change={12.5} changeLabel="vs last month" icon={TrendingUp}  iconColor="#22c55e" />
        <StatCard title="Total Expenses" value={totalExpenses} change={-3.1} changeLabel="vs last month" icon={TrendingDown} iconColor="#ef4444" />

        {/* Savings Rate */}
        <Card color="#a855f7">
          <div className="flex items-start justify-between mb-3">
            <span className={`text-[10px] font-medium uppercase tracking-widest ${muted}`}>Savings Rate</span>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#a855f718" }}>
              <ArrowUpRight size={13} style={{ color: "#a855f7" }} />
            </div>
          </div>
          <p className={`text-xl sm:text-2xl font-bold font-mono tracking-tight ${text}`}>
            {savingsRate.toFixed(1)}%
          </p>
          <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${isDark ? "bg-[#1a1a1a]" : "bg-[#eee]"}`}>
            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-700"
              style={{ width: `${Math.min(savingsRate, 100)}%` }}
            />
          </div>
          <p className={`text-[10px] sm:text-xs mt-1.5 ${muted}`}>
            {savingsRate > 20 ? "Excellent habit" : savingsRate > 10 ? "Good progress" : "Room to improve"}
          </p>
        </Card>
      </div>

      {/* ── Charts Row ────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

       {/* Balance Trend */}
<Card color="#3b82f6" className="xl:col-span-2" noPad>
  <div className={`flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-4 border-b ${cardBorder}`}>
    <div>
      <h3 className={`text-sm font-semibold ${text}`}>Balance Trend</h3>
      <p className={`text-xs ${muted} mt-0.5`}>12-month overview</p>
    </div>
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {[
        { label: "Balance", color: "#3b82f6" },
        { label: "Income",  color: "#22c55e" },
      ].map(({ label, color }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className={`text-[10px] sm:text-xs ${muted}`}>{label}</span>
        </div>
      ))}
    </div>
  </div>
  <div className="px-2 py-4 h-56 sm:h-72">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={balanceTrend} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={isDark ? "#1a1a1a" : "#f0f0f0"} strokeDasharray="4 4" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: axisColor, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: axisColor, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatCurrencyCompact}
          width={58}
          tickCount={5}
        />
        <Tooltip content={<ChartTooltip />} />
        <Area type="monotone" dataKey="balance" name="Balance" stroke="#3b82f6" strokeWidth={2}   fill="url(#balGrad)" dot={false} activeDot={{ r: 4 }} />
        <Area type="monotone" dataKey="income"  name="Income"  stroke="#22c55e" strokeWidth={1.5} fill="url(#incGrad)" dot={false} strokeDasharray="4 2" activeDot={{ r: 3 }} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</Card>

        {/* Spending Pie */}
        <Card color="#f59e0b" noPad>
          <div className={`px-4 sm:px-5 py-4 border-b ${cardBorder}`}>
            <h3 className={`text-sm font-semibold ${text}`}>Spending Breakdown</h3>
            <p className={`text-xs ${muted} mt-0.5`}>By category</p>
          </div>
          <div className="px-2 py-4 flex flex-col" style={{ minHeight: 260 }}>
            <div style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%" cy="50%"
                    innerRadius={40} outerRadius={68}
                    paddingAngle={2} dataKey="value"
                  >
                    {categoryBreakdown.map((entry) => (
                      <Cell key={entry.id} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-1.5 overflow-y-auto no-scrollbar px-1">
              {categoryBreakdown.slice(0, 5).map((cat) => (
                <div key={cat.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className={`text-xs truncate ${muted}`}>{cat.name}</span>
                  </div>
                  <span className={`text-xs font-mono font-semibold ml-2 flex-shrink-0 ${text}`}>
                    {formatCurrency(cat.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ── Monthly Bar + Recent Transactions ─────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Monthly Comparison */}
        <Card color="#22c55e" noPad>
  <div className={`px-4 sm:px-5 py-4 border-b ${cardBorder}`}>
    <h3 className={`text-sm font-semibold ${text}`}>Monthly Comparison</h3>
    <p className={`text-xs ${muted} mt-0.5`}>Income vs Expenses</p>
  </div>
  <div className="px-2 py-4 h-52 sm:h-60">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={monthlyComparison} margin={{ top: 5, right: 8, left: 8, bottom: 0 }} barGap={2}>
        <CartesianGrid stroke={isDark ? "#ffffff08" : "#00000008"} strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} width={36} tickCount={5} />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="income"   name="Income"   fill="#22c55e" radius={[3,3,0,0]} maxBarSize={16} />
        <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[3,3,0,0]} maxBarSize={16} />
      </BarChart>
    </ResponsiveContainer>
  </div>
</Card>

        {/* Recent Transactions */}
        <Card color="#6366f1" noPad className="xl:col-span-2">
          <div className={`px-4 sm:px-5 py-4 border-b ${cardBorder}`}>
            <h3 className={`text-sm font-semibold ${text}`}>Recent Transactions</h3>
            <p className={`text-xs ${muted} mt-0.5`}>Last 5 transactions</p>
          </div>
          <div className={`divide-y ${divider}`}>
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className={`flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 transition-colors ${
                  isDark ? "hover:bg-[#0a0a0a]" : "hover:bg-[#fafafa]"
                }`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  tx.type === "income"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-red-500/10 text-red-500"
                }`}>
                  {tx.type === "income" ? "+" : "−"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${text}`}>{tx.description}</p>
                  <p className={`text-[10px] ${muted} mt-0.5`}>{formatDate(tx.date)}</p>
                </div>
                {/* Hide badge on very small screens to save space */}
                <span className="hidden sm:block">
                  <Badge label={tx.status} variant={tx.status} dot />
                </span>
                <span className={`text-xs sm:text-sm font-bold font-mono flex-shrink-0 ${
                  tx.type === "income" ? "text-emerald-500" : "text-red-500"
                }`}>
                  {tx.type === "income" ? "+" : "−"}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
