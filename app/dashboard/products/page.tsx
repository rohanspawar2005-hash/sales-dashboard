import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { Card } from "@/components/atoms/Card";
export default function ProductsPage() {
  return (
    <DashboardTemplate title="Products" subtitle="Coming soon">
      <Card className="flex items-center justify-center py-24">
        <div className="text-center">
          <p className="text-4xl mb-3">🛍️</p>
          <p className="text-slate-400 font-medium">Products Page</p>
          <p className="text-slate-600 text-sm mt-1">This section is under construction</p>
        </div>
      </Card>
    </DashboardTemplate>
  );
}
