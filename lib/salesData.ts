// lib/salesData.ts
// Mock data inspired by the Kaggle "Sample Superstore" dataset
// Source reference: https://www.kaggle.com/datasets/vivek468/superstore-dataset-final

export type SalesRecord = {
  month: string;
  revenue: number;
  orders: number;
  profit: number;
  category: string;
};

export type YearlyData = {
  year: number;
  monthly: SalesRecord[];
  totalRevenue: number;
  totalOrders: number;
  totalProfit: number;
  topCategory: string;
};

export type CategoryBreakdown = {
  name: string;
  value: number;
  color: string;
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const CATEGORY_COLORS: Record<string, string> = {
  Technology: "#38bdf8",
  Furniture: "#818cf8",
  "Office Supplies": "#34d399",
};

// 2022 — Recovery year after COVID slowdowns
const data2022: SalesRecord[] = [
  { month: "Jan", revenue: 42300, orders: 180, profit: 9800, category: "Office Supplies" },
  { month: "Feb", revenue: 38900, orders: 162, profit: 8400, category: "Furniture" },
  { month: "Mar", revenue: 61200, orders: 241, profit: 14700, category: "Technology" },
  { month: "Apr", revenue: 54800, orders: 214, profit: 12300, category: "Office Supplies" },
  { month: "May", revenue: 58600, orders: 228, profit: 13100, category: "Technology" },
  { month: "Jun", revenue: 67400, orders: 263, profit: 15800, category: "Technology" },
  { month: "Jul", revenue: 53200, orders: 207, profit: 11600, category: "Furniture" },
  { month: "Aug", revenue: 71900, orders: 281, profit: 17200, category: "Technology" },
  { month: "Sep", revenue: 84300, orders: 329, profit: 20100, category: "Technology" },
  { month: "Oct", revenue: 78600, orders: 306, profit: 18700, category: "Office Supplies" },
  { month: "Nov", revenue: 112400, orders: 438, profit: 26900, category: "Technology" },
  { month: "Dec", revenue: 98700, orders: 385, profit: 23600, category: "Furniture" },
];

// 2023 — Growth year
const data2023: SalesRecord[] = [
  { month: "Jan", revenue: 51200, orders: 210, profit: 12100, category: "Technology" },
  { month: "Feb", revenue: 44700, orders: 183, profit: 10200, category: "Office Supplies" },
  { month: "Mar", revenue: 72800, orders: 285, profit: 17400, category: "Technology" },
  { month: "Apr", revenue: 68300, orders: 267, profit: 15900, category: "Furniture" },
  { month: "May", revenue: 75600, orders: 296, profit: 18100, category: "Technology" },
  { month: "Jun", revenue: 81200, orders: 317, profit: 19400, category: "Technology" },
  { month: "Jul", revenue: 63400, orders: 248, profit: 14700, category: "Office Supplies" },
  { month: "Aug", revenue: 89700, orders: 350, profit: 21400, category: "Technology" },
  { month: "Sep", revenue: 98400, orders: 385, profit: 23500, category: "Technology" },
  { month: "Oct", revenue: 91200, orders: 357, profit: 21800, category: "Furniture" },
  { month: "Nov", revenue: 134600, orders: 526, profit: 32200, category: "Technology" },
  { month: "Dec", revenue: 118900, orders: 465, profit: 28400, category: "Technology" },
];

// 2024 — Record year
const data2024: SalesRecord[] = [
  { month: "Jan", revenue: 63400, orders: 248, profit: 15200, category: "Technology" },
  { month: "Feb", revenue: 57800, orders: 226, profit: 13800, category: "Office Supplies" },
  { month: "Mar", revenue: 88600, orders: 347, profit: 21200, category: "Technology" },
  { month: "Apr", revenue: 81200, orders: 318, profit: 19400, category: "Furniture" },
  { month: "May", revenue: 94300, orders: 369, profit: 22600, category: "Technology" },
  { month: "Jun", revenue: 102800, orders: 402, profit: 24600, category: "Technology" },
  { month: "Jul", revenue: 78400, orders: 307, profit: 18700, category: "Office Supplies" },
  { month: "Aug", revenue: 115600, orders: 452, profit: 27600, category: "Technology" },
  { month: "Sep", revenue: 128400, orders: 502, profit: 30700, category: "Technology" },
  { month: "Oct", revenue: 118900, orders: 465, profit: 28400, category: "Furniture" },
  { month: "Nov", revenue: 168400, orders: 659, profit: 40300, category: "Technology" },
  { month: "Dec", revenue: 152600, orders: 597, profit: 36500, category: "Technology" },
];

function buildYearlyData(year: number, monthly: SalesRecord[]): YearlyData {
  const totalRevenue = monthly.reduce((s, r) => s + r.revenue, 0);
  const totalOrders = monthly.reduce((s, r) => s + r.orders, 0);
  const totalProfit = monthly.reduce((s, r) => s + r.profit, 0);
  const categoryCount: Record<string, number> = {};
  monthly.forEach((r) => {
    categoryCount[r.category] = (categoryCount[r.category] ?? 0) + r.revenue;
  });
  const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0];
  return { year, monthly, totalRevenue, totalOrders, totalProfit, topCategory };
}

export const ALL_YEARS: YearlyData[] = [
  buildYearlyData(2022, data2022),
  buildYearlyData(2023, data2023),
  buildYearlyData(2024, data2024),
];

export function getYearData(year: number): YearlyData | undefined {
  return ALL_YEARS.find((y) => y.year === year);
}

export function getCategoryBreakdown(yearly: YearlyData): CategoryBreakdown[] {
  const totals: Record<string, number> = {};
  yearly.monthly.forEach((r) => {
    totals[r.category] = (totals[r.category] ?? 0) + r.revenue;
  });
  return Object.entries(totals).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_COLORS[name] ?? "#94a3b8",
  }));
}

export function getMultiYearComparison() {
  return MONTHS.map((month) => {
    const row: Record<string, string | number> = { month };
    ALL_YEARS.forEach((y) => {
      const rec = y.monthly.find((m) => m.month === month);
      row[`${y.year}`] = rec?.revenue ?? 0;
    });
    return row;
  });
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value}`;
}

export const YEAR_COLORS: Record<number, string> = {
  2022: "#818cf8",
  2023: "#34d399",
  2024: "#38bdf8",
};
