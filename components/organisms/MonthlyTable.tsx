// components/organisms/MonthlyTable.tsx
"use client";

import { Card } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { formatCurrency, type SalesRecord } from "@/lib/salesData";
import { cn } from "@/lib/utils";

interface MonthlyTableProps {
  data: SalesRecord[];
  threshold: number;
}

export function MonthlyTable({ data, threshold }: MonthlyTableProps) {
  const maxRevenue = Math.max(...data.map((r) => r.revenue));

  return (
    <Card>
      <h2 className="text-base font-bold text-white mb-4 tracking-tight">Monthly Breakdown</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-border">
              {["Month", "Revenue", "Profit", "Orders", "Margin", "Category"].map((h) => (
                <th
                  key={h}
                  className="pb-3 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-500 pr-4"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border/50">
            {data.map((row) => {
              const margin = ((row.profit / row.revenue) * 100).toFixed(1);
              const barWidth = ((row.revenue / maxRevenue) * 100).toFixed(1);
              const highlighted = threshold > 0 && row.revenue >= threshold;
              return (
                <tr
                  key={row.month}
                  className={cn(
                    "transition-colors hover:bg-surface-card/50",
                    highlighted && "bg-sky-500/5"
                  )}
                >
                  <td className="py-3 pr-4 font-mono font-semibold text-slate-300 w-12">
                    {row.month}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-col gap-1">
                      <span className={cn("font-semibold", highlighted ? "text-sky-400" : "text-slate-200")}>
                        {formatCurrency(row.revenue)}
                      </span>
                      <div className="h-1 rounded-full bg-surface-border w-24">
                        <div
                          className={cn("h-full rounded-full", highlighted ? "bg-sky-400" : "bg-slate-600")}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-emerald-400 font-semibold">
                    {formatCurrency(row.profit)}
                  </td>
                  <td className="py-3 pr-4 text-slate-400 font-mono">{row.orders}</td>
                  <td className="py-3 pr-4">
                    <Badge variant={Number(margin) > 22 ? "success" : "default"}>
                      {margin}%
                    </Badge>
                  </td>
                  <td className="py-3">
                    <span className="text-xs text-slate-500">{row.category}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
