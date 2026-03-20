// components/templates/DashboardTemplate.tsx
import { Sidebar } from "@/components/organisms/Sidebar";
import { TopBar } from "@/components/organisms/TopBar";

interface DashboardTemplateProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
  loading?: boolean;
}

export function DashboardTemplate({
  children,
  title,
  subtitle,
  onRefresh,
  loading,
}: DashboardTemplateProps) {
  return (
    <div className="flex h-screen bg-surface-DEFAULT text-slate-200 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar
          title={title}
          subtitle={subtitle}
          onRefresh={onRefresh}
          loading={loading}
        />
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
