// components/organisms/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  Settings,
  ShoppingBag,
} from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/trends", label: "Trends", icon: TrendingUp },
  { href: "/dashboard/products", label: "Products", icon: ShoppingBag },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-surface-border bg-surface-DEFAULT">
      <div className="px-5 py-6 border-b border-surface-border">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-sky-500 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">SalesPulse</span>
        </div>
        <p className="mt-1 text-[10px] text-slate-600 uppercase tracking-widest">Analytics Platform</p>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                active
                  ? "bg-sky-500/15 text-sky-400 font-semibold"
                  : "text-slate-500 hover:text-slate-200 hover:bg-surface-card"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-surface-border">
        <div className="rounded-lg bg-surface-card border border-surface-border p-3 text-xs">
          <p className="text-slate-400 font-medium">Data Source</p>
          <p className="text-slate-600 mt-0.5">Kaggle Superstore</p>
          <p className="text-slate-700 mt-1">2022 – 2024</p>
        </div>
      </div>
    </aside>
  );
}
