// components/molecules/StatCard.tsx
"use client";
import { Card } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  delta?: number; // % change from prior year
  icon: React.ReactNode;
  accent?: string;
  className?: string;
}

export function StatCard({ label, value, delta, icon, accent = "text-sky-400", className }: StatCardProps) {
  const positive = delta !== undefined && delta >= 0;

  return (
    <Card glow className={cn("flex flex-col gap-3 animate-slide-up", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          {label}
        </span>
        <span className={cn("text-xl", accent)}>{icon}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
        {delta !== undefined && (
          <Badge variant={positive ? "success" : "warning"}>
            {positive ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
          </Badge>
        )}
      </div>
    </Card>
  );
}
