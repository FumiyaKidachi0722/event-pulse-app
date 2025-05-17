// src/hooks/useDashboardData.ts
import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchSummary, type SummaryItem } from "@/libs/usecases/fetchSummary";

export interface DashboardSummary {
  total: number;
  avg: number;
  max: number;
  count: number;
}

export function useDashboardData(initialFrom: string, initialTo: string) {
  // 生データ
  const [rawData, setRawData] = useState<SummaryItem[]>([]);
  // 表示データ（検索フィルター適用後）
  const [data, setData] = useState<SummaryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [from, setFrom] = useState<string>(initialFrom);
  const [to, setTo] = useState<string>(initialTo);

  // データ取得
  const loadData = useCallback(async (f: string, t: string) => {
    setLoading(true);
    try {
      const result = await fetchSummary({ from: f, to: t });
      setRawData(result);
      setData(result);
    } finally {
      setLoading(false);
    }
  }, []);

  // 初回・期間変更時にロード
  useEffect(() => {
    if (from && to) {
      loadData(from, to);
    }
  }, [from, to, loadData]);

  // 検索文字列が変わったらフィルタ適用
  useEffect(() => {
    if (search.trim() === "") {
      setData(rawData);
    } else {
      const s = search.toLowerCase();
      setData(
        rawData.filter((item) => item.companyName.toLowerCase().includes(s))
      );
    }
  }, [search, rawData]);

  // 統計値計算
  const summary = useMemo<DashboardSummary>(() => {
    const count = data.length;
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    const avg = count > 0 ? total / count : 0;
    const max = data.reduce((m, item) => Math.max(m, item.amount), 0);
    return { total, avg, max, count };
  }, [data]);

  // フィルター適用ハンドラ
  const applyFilter = useCallback(() => {
    loadData(from, to);
  }, [from, to, loadData]);

  return {
    // 状態
    data,
    loading,
    summary,
    search,
    from,
    to,
    // セッター
    setSearch,
    setFrom,
    setTo,
    // アクション
    applyFilter,
  };
}
