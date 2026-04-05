import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar,
} from "recharts";
import {
  Trophy, AlertTriangle, TrendingUp, Sparkles,
  PiggyBank, Target, Activity,
} from "lucide-react";
import { selectAllTransactions } from "../../store/slices/transactionsSlice";
import { balanceTrend, getCategoryBreakdown } from "../../data/mockData";
import Card from "../ui/Card";
import ChartTooltip from "../ui/ChartTooltip";
import { useTheme } from "../../hooks/useTheme";
import { formatCurrency, formatCurrencyCompact } from "../../utils/helpers";

export default function Insights() {
  const { isDark }   = useTheme();
  const transactions = useSelector(selectAllTransactions);

  const muted      = isDark ? "text-[#888]" : "text-[#737373]";
  const text       = isDark ? "text-white"  : "text-black";
  const axisColor  = isDark ? "#555"        : "#aaa";
  const cardBorder = isDark ? "border-[#ffffff0f]" : "border-[#00000010]";

  const categoryBreakdown = useMemo(() => getCategoryBreakdown(transactions), [transactions]);

  const insights = useMemo(() => {
    const expenses    = transactions.filter((t) => t.type === "expense");
    const income      = transactions.filter((t) => t.type === "income");
    const totalExp    = expenses.reduce((a, t) => a + t.amount, 0);
    const totalInc    = income.reduce((a, t)   => a + t.amount, 0);
    const topCat      = categoryBreakdown[0];
    const savingsRate = ((totalInc - totalExp) / totalInc) * 100;
    const last3       = balanceTrend.slice(-3);
    const avgNet      = last3.reduce((a, m) => a + (m.income - m.expenses), 0) / 3;
    const prevAvgNet  = balanceTrend.slice(-6, -3).reduce((a, m) => a + (m.income - m.expenses), 0) / 3;
    const netChange   = ((avgNet - prevAvgNet) / Math.abs(prevAvgNet)) * 100;
    return { topCat, savingsRate, totalExp, totalInc, avgNet, netChange };
  }, [transactions, categoryBreakdown]);

  const radarData = useMemo(() => {
    const top6 = categoryBreakdown.slice(0, 6);
    const max  = top6[0]?.value || 1;
    return top6.map((c) => ({ category: c.name.split(" ")[0], value: Math.round((c.value / max) * 100) }));
  }, [categoryBreakdown]);

  const netTrend = useMemo(() =>
    balanceTrend.map((m) => ({ month: m.month, net: m.income - m.expenses, balance: m.balance })),
    []
  );

  const insightCards = [
    { icon: Trophy,    color: "#f59e0b", label: "Top Spending",    value: insights.topCat?.name || "—",           sub: insights.topCat ? `${formatCurrency(insights.topCat.value)} this period` : "No data" },
    { icon: PiggyBank, color: "#22c55e", label: "Savings Rate",    value: `${insights.savingsRate.toFixed(1)}%`,  sub: insights.savingsRate > 20 ? "Excellent" : insights.savingsRate > 10 ? "Good" : "Needs improvement" },
    { icon: Activity,  color: "#3b82f6", label: "Avg Monthly Net", value: formatCurrencyCompact(insights.avgNet), sub: `${insights.netChange >= 0 ? "+" : ""}${insights.netChange.toFixed(1)}% vs prev` },
    { icon: Target,    color: "#a855f7", label: "Total Tracked",   value: `${transactions.length}`,               sub: `${transactions.filter(t => t.type === "income").length} in · ${transactions.filter(t => t.type === "expense").length} out` },
  ];

  return (
    <div className="space-y-4 animate-slide-up">

      {/* ── Insight cards ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {insightCards.map(({ icon: Icon, color, label, value, sub }) => (
          <Card key={label} color={color}>
            <div className="flex items-center gap-2 mb-3">
              {/* <Icon size={13} style={{ color }} /> */}
              <span className={`text-[10px] sm:text-xs font-medium ${muted} truncate`}>{label}</span>
            </div>
            <p className={`text-lg sm:text-xl font-bold font-mono ${text}`}>{value}</p>
            <p className={`text-[10px] sm:text-xs mt-1 ${muted}`}>{sub}</p>
          </Card>
        ))}
      </div>

      {/* ── Observation alerts ────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            icon: AlertTriangle, color: "#f59e0b",
            title: "High Housing Cost",
            body: `Housing takes ${((categoryBreakdown.find(c => c.id === "housing")?.value || 0) / insights.totalExp * 100).toFixed(0)}% of your expenses. Recommended: under 30%.`,
          },
          {
            icon: TrendingUp, color: "#22c55e",
            title: "Savings Momentum",
            body: insights.savingsRate > 20
              ? "You're saving more than 20% — consider investing the surplus."
              : "Aim to save 20%+ of income by cutting discretionary spending.",
          },
          {
            icon: Sparkles, color: "#a855f7",
            title: "Smart Tip",
            body: `Your ${insights.topCat?.name} spending is highest. A budget cap could save ${formatCurrency((insights.topCat?.value || 0) * 0.1)}/mo.`,
          },
        ].map(({ icon: Icon, color, title, body }) => (
          <Card key={title} color={color}>
            <div className="flex items-center gap-2 mb-2">
              {/* <Icon size={13} style={{ color }} /> */}
              <h4 className={`text-xs font-semibold ${text}`}>{title}</h4>
            </div>
            <p className={`text-xs leading-relaxed ${muted}`}>{body}</p>
          </Card>
        ))}
      </div>

      {/* ── Charts row ────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Net Income Trend — fixed Y-axis */}
        <Card color="#22c55e" noPad className="xl:col-span-2">
          <div className={`px-4 sm:px-5 py-4 border-b ${cardBorder}`}>
            <h3 className={`text-sm font-semibold ${text}`}>Net Income Trend</h3>
            <p className={`text-xs ${muted} mt-0.5`}>Monthly net (income − expenses)</p>
          </div>
          <div className="px-2 py-4 h-56 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={netTrend} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
                <CartesianGrid stroke={isDark ? "#ffffff08" : "#00000008"} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={formatCurrencyCompact} width={58} tickCount={5} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="net"     name="Net Income" stroke="#22c55e" strokeWidth={2}   dot={{ fill: "#22c55e", r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="balance" name="Balance"    stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="4 2" dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Radar chart */}
        <Card color="#a855f7" noPad>
          <div className={`px-4 sm:px-5 py-4 border-b ${cardBorder}`}>
            <h3 className={`text-sm font-semibold ${text}`}>Spending Profile</h3>
            <p className={`text-xs ${muted} mt-0.5`}>Top categories radar</p>
          </div>
          <div className="px-2 py-4 h-56 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                <PolarGrid stroke={isDark ? "#ffffff08" : "#00000008"} />
                <PolarAngleAxis dataKey="category" tick={{ fill: axisColor, fontSize: 9 }} />
                <Radar name="Spending" dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip content={<ChartTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* ── Category breakdown bars ───────────────────────── */}
      <Card color="#3b82f6" noPad>
        <div className={`px-4 sm:px-5 py-4 border-b ${cardBorder}`}>
          <h3 className={`text-sm font-semibold ${text}`}>Category Breakdown</h3>
          <p className={`text-xs ${muted} mt-0.5`}>All expense categories ranked</p>
        </div>
        <div className="p-4 sm:p-5 space-y-3">
          {categoryBreakdown.map((cat) => {
            const pct = (cat.value / insights.totalExp) * 100;
            return (
              <div key={cat.id} className="flex items-center gap-2 sm:gap-4">
                <span className={`text-xs w-16 sm:w-28 truncate flex-shrink-0 ${muted}`}>{cat.name}</span>
                <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isDark ? "bg-[#ffffff08]" : "bg-[#00000008]"}`}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: cat.color }} />
                </div>
                <span className={`hidden sm:inline text-xs font-mono font-semibold w-20 text-right flex-shrink-0 ${text}`}>
                  {formatCurrency(cat.value)}
                </span>
                <span className={`text-[10px] w-8 text-right flex-shrink-0 ${muted}`}>{pct.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}