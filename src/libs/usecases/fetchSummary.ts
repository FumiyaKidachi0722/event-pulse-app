// src/libs/usecases/fetchSummary.ts

export type SummaryItem = {
  date: string;
  companyName: string;
  amount: number;
};

/**
 * /api/summary エンドポイントを呼び出し
 */
export async function fetchSummary(params: {
  from: string;
  to: string;
}): Promise<SummaryItem[]> {
  if (!params.from || !params.to) {
    throw new Error("fetchSummary failed: from/to が空です");
  }
  const query = new URLSearchParams({
    from: params.from,
    to: params.to,
  });
  const res = await fetch(`/api/summary?${query.toString()}`, {
    method: "GET",
    cache: "no-cache",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(
      `fetchSummary failed: ${res.status} ${
        typeof err === "object" ? JSON.stringify(err) : ""
      }`
    );
  }
  return (await res.json()) as SummaryItem[];
}
