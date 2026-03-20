// components/organisms/MultiYearChart.tsx
"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/atoms/Card";
import { ChartTooltip } from "@/components/molecules/ChartTooltip";
import { getMultiYearComparison, formatCurrency, YEAR_COLORS } from "@/lib/salesData";
import type { ChartType } from "@/components/molecules/ChartTypeToggle";

interface MultiYearChartProps {
  chartType: ChartType;
}

const MUTED = "#475569";
const years = [2022, 2023, 2024];

export function MultiYearChart({ chartType }: MultiYearChartProps) {
  const data = getMultiYearComparison();

  return (
    <Card className="animate-fade-in">
      <div className="mb-5">
        <h2 className="text-base font-bold text-white tracking-tight">
          Year-over-Year Comparison
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Revenue across 2022 · 2023 · 2024</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        {chartType === "line" ? (
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: MUTED, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} width={65} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12, paddingTop: 12 }} />
            {years.map((year) => (
              <Line
                key={year}
                type="monotone"
                dataKey={String(year)}
                stroke={YEAR_COLORS[year]}
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0, fill: YEAR_COLORS[year] }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        ) : (
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: MUTED, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} width={65} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12, paddingTop: 12 }} />
            {years.map((year) => (
              <Bar key={year} dataKey={String(year)} fill={YEAR_COLORS[year]} radius={[4, 4, 0, 0]} maxBarSize={20} />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}
