// src/app/api/summary/route.ts
import { NextResponse } from "next/server";

import { getSummaryData } from "@/libs/infra/summary-repo";
import type { SummaryItem } from "@/libs/usecases/fetchSummary";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const from = url.searchParams.get("from") ?? "";
  const to = url.searchParams.get("to") ?? "";
  if (!from || !to) {
    return NextResponse.json(
      { error: "from/to クエリパラメータは必須です" },
      { status: 400 }
    );
  }

  try {
    const data: SummaryItem[] = await getSummaryData({ from, to });
    return NextResponse.json(data);
  } catch (err) {
    console.error("API /api/summary error:", err);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
