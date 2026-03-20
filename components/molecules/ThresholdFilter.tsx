// components/molecules/ThresholdFilter.tsx
"use client";
import { Input } from "@/components/atoms/Input";
import { SlidersHorizontal } from "lucide-react";

interface ThresholdFilterProps {
  value: number;
  onChange: (value: number) => void;
}

export function ThresholdFilter({ value, onChange }: ThresholdFilterProps) {
  return (
    <div className="flex items-center gap-3 bg-surface-DEFAULT border border-surface-border rounded-xl px-4 py-2">
      <SlidersHorizontal className="h-4 w-4 text-slate-500 shrink-0" />
      <Input
        id="threshold"
        label=""
        prefix="$"
        type="number"
        min={0}
        step={1000}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-32 border-0 bg-transparent focus:ring-0 py-0 pl-5 text-sky-400 font-mono font-bold"
        placeholder="Min revenue"
      />
      <span className="text-xs text-slate-500 whitespace-nowrap">min revenue filter</span>
    </div>
  );
}
