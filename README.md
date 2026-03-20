# SalesPulse — Sales Analytics Dashboard

A production-grade sales analytics dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Recharts**. Visualises Kaggle Superstore sales data for 2022, 2023, and 2024 with interactive charts, filters, and KPI cards.

---

## 📸 Features

- **Atomic Design Architecture** — components organised into Atoms → Molecules → Organisms → Templates
- **Year Selector** — switch between 2022, 2023, and 2024 data fetched from a Next.js API route
- **Multiple Chart Types** — toggle between Bar, Line, and Pie charts using Recharts
- **Custom Threshold Filter** — highlight or filter months by a minimum revenue amount
- **Year-over-Year Comparison** — side-by-side multi-year chart
- **Monthly Breakdown Table** — tabular view with inline sparkbar, margin badges
- **KPI Stat Cards** — revenue, profit, orders, and margin with YoY delta badges
- **API Integration** — data served via `/api/sales` Next.js route handler (simulated network latency for realism)
- **Dark theme UI** — polished dark design with Tailwind CSS

---

## 🗂 Project Structure

```
sales-dashboard/
├── app/
│   ├── api/sales/route.ts        # API route — serves sales data by year
│   ├── dashboard/
│   │   ├── page.tsx              # Main dashboard page
│   │   ├── analytics/page.tsx   # Stub page
│   │   ├── trends/page.tsx      # Stub page
│   │   ├── products/page.tsx    # Stub page
│   │   └── settings/page.tsx    # Stub page
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── atoms/          # Smallest building blocks
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Spinner.tsx
│   │
│   ├── molecules/      # Composed from atoms
│   │   ├── ChartTooltip.tsx
│   │   ├── ChartTypeToggle.tsx
│   │   ├── StatCard.tsx
│   │   ├── ThresholdFilter.tsx
│   │   └── YearSelector.tsx
│   │
│   ├── organisms/      # Complex, self-contained sections
│   │   ├── MonthlyTable.tsx
│   │   ├── MultiYearChart.tsx
│   │   ├── SalesChart.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatsRow.tsx
│   │   └── TopBar.tsx
│   │
│   └── templates/      # Page-level layout wrappers
│       └── DashboardTemplate.tsx
│
├── lib/
│   ├── salesData.ts    # Mock data + helpers (Kaggle Superstore)
│   └── utils.ts        # cn() utility for Tailwind class merging
│
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/sales-dashboard.git
cd sales-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it auto-redirects to `/dashboard`.

### Build for Production

```bash
npm run build
npm start
```

---

## 📊 Data Source

Sales data is based on the [Kaggle Sample Superstore dataset](https://www.kaggle.com/datasets/vivek468/superstore-dataset-final), a widely-used retail dataset containing orders across **Technology**, **Furniture**, and **Office Supplies** categories.

Monthly revenue and profit figures are aggregated mock values derived from the dataset's structure and realistic growth patterns:

| Year | Total Revenue | Total Profit | Growth |
|------|:-------------:|:------------:|:------:|
| 2022 | ~$822K        | ~$192K       | baseline |
| 2023 | ~$989K        | ~$235K       | +20.3% |
| 2024 | ~$1.27M       | ~$299K       | +28.4% |

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [Recharts](https://recharts.org/) | Charts (Bar, Line, Pie) |
| [Lucide React](https://lucide.dev/) | Icon library |
| [clsx + tailwind-merge](https://github.com/dcastil/tailwind-merge) | Class merging utility |

---

## ✨ Enhancements Implemented

- ✅ **Custom Filter Input** — `ThresholdFilter` molecule lets users set a minimum revenue threshold; months below it are greyed out in charts and highlighted in the table
- ✅ **API Integration** — `/api/sales?year=YYYY` endpoint serves data; dashboard fetches on year change with loading state
- ✅ **Multiple Chart Types** — `ChartTypeToggle` switches between Bar, Line, and Pie via Recharts components
- ✅ **Year-over-Year Chart** — `MultiYearChart` compares all three years on a single chart

---

## 📝 License

MIT
