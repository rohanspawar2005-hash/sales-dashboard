// components/organisms/StatsRow.tsx
"use client";

import { StatCard } from "@/components/molecules/StatCard";
import { formatCurrency, type YearlyData, ALL_YEARS } from "@/lib/salesData";
import { DollarSign, ShoppingCart, TrendingUp, Tag } from "lucide-react";

interface StatsRowProps {
  current: YearlyData;
}

function calcDelta(current: number, year: number): number | undefined {
  const prev = ALL_YEARS.find((y) => y.year === year - 1);
  if (!prev) return undefined;
  return ((current - prev.totalRevenue) / prev.totalRevenue) * 100;
}

function calcProfitDelta(current: number, year: number): number | undefined {
  const prev = ALL_YEARS.find((y) => y.year === year - 1);
  if (!prev) return undefined;
  return ((current - prev.totalProfit) / prev.totalProfit) * 100;
}

function calcOrderDelta(current: number, year: number): number | undefined {
  const prev = ALL_YEARS.find((y) => y.year === year - 1);
  if (!prev) return undefined;
  return ((current - prev.totalOrders) / prev.totalOrders) * 100;
}

export function StatsRow({ current }: StatsRowProps) {
  const margin = ((current.totalProfit / current.totalRevenue) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label="Total Revenue"
        value={formatCurrency(current.totalRevenue)}
        delta={calcDelta(current.totalRevenue, current.year)}
        icon={<DollarSign className="h-5 w-5" />}
        accent="text-sky-400"
      />
      <StatCard
        label="Total Profit"
        value={formatCurrency(current.totalProfit)}
        delta={calcProfitDelta(current.totalProfit, current.year)}
        icon={<TrendingUp className="h-5 w-5" />}
        accent="text-emerald-400"
      />
      <StatCard
        label="Total Orders"
        value={current.totalOrders.toLocaleString()}
        delta={calcOrderDelta(current.totalOrders, current.year)}
        icon={<ShoppingCart className="h-5 w-5" />}
        accent="text-violet-400"
      />
      <StatCard
        label="Profit Margin"
        value={`${margin}%`}
        icon={<Tag className="h-5 w-5" />}
        accent="text-amber-400"
      />
    </div>
  );
}
