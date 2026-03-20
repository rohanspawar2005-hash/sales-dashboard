// components/molecules/YearSelector.tsx
"use client";
import { Button } from "@/components/atoms/Button";

interface YearSelectorProps {
  years: number[];
  selected: number;
  onChange: (year: number) => void;
}

export function YearSelector({ years, selected, onChange }: YearSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-surface-DEFAULT border border-surface-border rounded-xl p-1">
      {years.map((year) => (
        <Button
          key={year}
          size="sm"
          variant={selected === year ? "active" : "ghost"}
          onClick={() => onChange(year)}
          className="font-mono font-bold"
        >
          {year}
        </Button>
      ))}
    </div>
  );
}
