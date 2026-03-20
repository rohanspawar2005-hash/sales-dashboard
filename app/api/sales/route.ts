// app/api/sales/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ALL_YEARS, getYearData } from "@/lib/salesData";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const yearParam = searchParams.get("year");

  // Simulate slight network delay (API feel)
  await new Promise((r) => setTimeout(r, 120));

  if (yearParam) {
    const year = parseInt(yearParam, 10);
    const data = getYearData(year);
    if (!data) {
      return NextResponse.json({ error: "Year not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  }

  return NextResponse.json(ALL_YEARS);
}
