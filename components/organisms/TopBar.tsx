// components/organisms/TopBar.tsx
"use client";

import { Bell, RefreshCw, BarChart3 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";

interface TopBarProps {
  onRefresh?: () => void;
  loading?: boolean;
  title: string;
  subtitle?: string;
}

export function TopBar({ onRefresh, loading, title, subtitle }: TopBarProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-DEFAULT/80 backdrop-blur-sm sticky top-0 z-10">
      {/* Mobile logo */}
      <div className="flex items-center gap-3">
        <div className="lg:hidden flex items-center gap-2 mr-2">
          <div className="h-6 w-6 rounded-md bg-sky-500 flex items-center justify-center">
            <BarChart3 className="h-3.5 w-3.5 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-sm font-bold text-white">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="success">Live</Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className={loading ? "animate-spin" : ""}
          title="Refresh data"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" title="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white ml-1">
          A
        </div>
      </div>
    </header>
  );
}
