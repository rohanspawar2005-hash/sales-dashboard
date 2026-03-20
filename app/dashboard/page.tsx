// app/dashboard/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { StatsRow } from "@/components/organisms/StatsRow";
import { SalesChart } from "@/components/organisms/SalesChart";
import { MultiYearChart } from "@/components/organisms/MultiYearChart";
import { MonthlyTable } from "@/components/organisms/MonthlyTable";
import { YearSelector } from "@/components/molecules/YearSelector";
import { ChartTypeToggle, type ChartType } from "@/components/molecules/ChartTypeToggle";
import { ThresholdFilter } from "@/components/molecules/ThresholdFilter";
import { Spinner } from "@/components/atoms/Spinner";
import type { YearlyData } from "@/lib/salesData";

const YEARS = [2022, 2023, 2024];

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState(0);
  const [yearData, setYearData] = useState<YearlyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (year: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/sales?year=${year}`);
      if (!res.ok) throw new Error(`Failed to fetch data for ${year}`);
      const data: YearlyData = await res.json();
      setYearData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear, fetchData]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleRefresh = () => {
    fetchData(selectedYear);
  };

  return (
    <DashboardTemplate
      title="Sales Dashboard"
      subtitle={`Superstore · ${selectedYear} · Kaggle Dataset`}
      onRefresh={handleRefresh}
      loading={loading}
    >
      {/* Controls Row */}
      <div className="flex flex-wrap items-center gap-3">
        <YearSelector
          years={YEARS}
          selected={selectedYear}
          onChange={handleYearChange}
        />
        <ChartTypeToggle value={chartType} onChange={setChartType} />
        <ThresholdFilter value={threshold} onChange={setThreshold} />
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-3">
            <Spinner className="h-8 w-8 text-sky-400" />
            <p className="text-sm text-slate-500">Fetching {selectedYear} data…</p>
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      {!loading && yearData && (
        <>
          {/* KPI Stats */}
          <StatsRow current={yearData} />

          {/* Main Chart */}
          <SalesChart
            data={yearData.monthly}
            chartType={chartType}
            threshold={threshold}
            year={selectedYear}
          />

          {/* Multi-Year Comparison + Table Row */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <MultiYearChart chartType={chartType === "pie" ? "bar" : chartType} />
            <MonthlyTable data={yearData.monthly} threshold={threshold} />
          </div>
        </>
      )}
    </DashboardTemplate>
  );
}
