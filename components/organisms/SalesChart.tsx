// components/organisms/SalesChart.tsx
"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/atoms/Card";
import { ChartTooltip } from "@/components/molecules/ChartTooltip";
import type { ChartType } from "@/components/molecules/ChartTypeToggle";
import type { SalesRecord } from "@/lib/salesData";
import { formatCurrency } from "@/lib/salesData";

interface SalesChartProps {
  data: SalesRecord[];
  chartType: ChartType;
  threshold: number;
  year: number;
}

const ACCENT = "#38bdf8";
const PROFIT_COLOR = "#34d399";
const MUTED = "#475569";

function renderBarChart(data: SalesRecord[], threshold: number) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: MUTED, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} width={65} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(56,189,248,0.06)" }} />
        <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12, paddingTop: 16 }} />
        {threshold > 0 && (
          <Bar dataKey="revenue" name="Revenue" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.revenue >= threshold ? ACCENT : "#334155"}
              />
            ))}
          </Bar>
        )}
        {threshold <= 0 && (
          <Bar dataKey="revenue" name="Revenue" fill={ACCENT} radius={[6, 6, 0, 0]} maxBarSize={40} />
        )}
        <Bar dataKey="profit" name="Profit" fill={PROFIT_COLOR} radius={[6, 6, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function renderLineChart(data: SalesRecord[], threshold: number) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: MUTED, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} width={65} />
        <Tooltip content={<ChartTooltip />} />
        <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12, paddingTop: 16 }} />
        <Line
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke={ACCENT}
          strokeWidth={2.5}
          dot={(props) => {
            const { cx, cy, payload } = props;
            const highlight = threshold <= 0 || payload.revenue >= threshold;
            return (
              <circle
                key={`dot-${payload.month}`}
                cx={cx}
                cy={cy}
                r={4}
                fill={highlight ? ACCENT : "#334155"}
                strokeWidth={0}
              />
            );
          }}
          activeDot={{ r: 6, fill: ACCENT, stroke: "#0f172a", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="profit"
          name="Profit"
          stroke={PROFIT_COLOR}
          strokeWidth={2.5}
          dot={{ r: 3, fill: PROFIT_COLOR, strokeWidth: 0 }}
          activeDot={{ r: 6, fill: PROFIT_COLOR, stroke: "#0f172a", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function renderPieChart(data: SalesRecord[]) {
  const categoryTotals: Record<string, number> = {};
  data.forEach((r) => {
    categoryTotals[r.category] = (categoryTotals[r.category] ?? 0) + r.revenue;
  });
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  const PIE_COLORS = ["#38bdf8", "#818cf8", "#34d399"];

  return (
    <ResponsiveContainer width="100%" height={340}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="45%"
          innerRadius={80}
          outerRadius={130}
          paddingAngle={3}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={{ stroke: "#475569", strokeWidth: 1 }}
        >
          {pieData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PIE_COLORS[index % PIE_COLORS.length]}
              stroke="transparent"
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => formatCurrency(value)}
          contentStyle={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: 12,
            color: "#e2e8f0",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function SalesChart({ data, chartType, threshold, year }: SalesChartProps) {
  const filteredForDisplay = data.filter((r) =>
    threshold <= 0 ? true : r.revenue >= threshold
  );
  const chartData = chartType === "pie" ? data : (threshold > 0 ? data : data);

  return (
    <Card className="animate-fade-in">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Monthly Revenue & Profit
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {year} · Superstore dataset ·{" "}
            {threshold > 0 && (
              <span className="text-sky-400">
                Highlighting months ≥ {formatCurrency(threshold)}
              </span>
            )}
            {threshold <= 0 && "All months shown"}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-400" /> Revenue
          </span>
          {chartType !== "pie" && (
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Profit
            </span>
          )}
        </div>
      </div>

      {chartType === "bar" && renderBarChart(chartData, threshold)}
      {chartType === "line" && renderLineChart(chartData, threshold)}
      {chartType === "pie" && renderPieChart(chartData)}
    </Card>
  );
}
