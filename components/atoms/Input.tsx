// components/atoms/Input.tsx
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefix?: string;
  suffix?: string;
}

export function Input({ label, prefix, suffix, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-slate-500 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          className={cn(
            "w-full bg-surface-card border border-surface-border rounded-lg py-2 text-sm text-slate-200 placeholder:text-slate-600",
            "focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all",
            prefix && "pl-7",
            suffix && "pr-7",
            !prefix && "pl-3",
            className
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 text-slate-500 text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
