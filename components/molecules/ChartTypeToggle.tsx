// components/molecules/ChartTypeToggle.tsx
"use client";
import { Button } from "@/components/atoms/Button";
import { BarChart2, LineChart, PieChart } from "lucide-react";

export type ChartType = "bar" | "line" | "pie";

interface ChartTypeToggleProps {
  value: ChartType;
  onChange: (type: ChartType) => void;
}

const TYPES: { type: ChartType; label: string; icon: React.ReactNode }[] = [
  { type: "bar", label: "Bar", icon: <BarChart2 className="h-3.5 w-3.5" /> },
  { type: "line", label: "Line", icon: <LineChart className="h-3.5 w-3.5" /> },
  { type: "pie", label: "Pie", icon: <PieChart className="h-3.5 w-3.5" /> },
];

export function ChartTypeToggle({ value, onChange }: ChartTypeToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-surface-DEFAULT border border-surface-border rounded-xl p-1">
      {TYPES.map(({ type, label, icon }) => (
        <Button
          key={type}
          size="sm"
          variant={value === type ? "active" : "ghost"}
          onClick={() => onChange(type)}
          className="gap-1.5"
        >
          {icon}
          {label}
        </Button>
      ))}
    </div>
  );
}
