// src/app/page.tsx
"use client";

import { useState } from "react";

import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { InvestChart } from "@/components/dashboard/InvestChart";
import { InvestTable } from "@/components/dashboard/InvestTable";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDashboardData } from "@/hooks/useDashboardData";
import { fetchHello } from "@/lib/utils";
import { fetchStock, type StockData } from "@/lib/utils";

/** 今日の日付 (YYYY-MM-DD) を返すユーティリティ */
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DashboardPage() {
  const {
    data,
    loading,
    summary,
    search,
    from,
    to,
    setSearch,
    setFrom,
    setTo,
    applyFilter,
  } = useDashboardData(today(), today());

  // Hello API 呼び出し用ローディングステート
  const [helloLoading, setHelloLoading] = useState<boolean>(false);

  // Stock API 呼び出し用ステート
  const [tickerInput, setTickerInput] = useState<string>("");
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [stockLoading, setStockLoading] = useState<boolean>(false);
  const [stockError, setStockError] = useState<string>("");

  /** Hello API を叩いて結果を console.log に出力 */
  const handleHello = async () => {
    setHelloLoading(true);
    try {
      const msg = await fetchHello();
      console.log("Hello API response:", msg);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "不明なエラー";
      console.error("Hello API error:", message);
    } finally {
      setHelloLoading(false);
    }
  };

  /** yfinance を使った株価APIを叩く */
  const handleFetchStock = async () => {
    if (!tickerInput) return;
    setStockLoading(true);
    setStockError("");
    setStockData(null);
    try {
      const result = await fetchStock(tickerInput);
      setStockData(result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "不明なエラー";
      setStockError(message);
    } finally {
      setStockLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* 1. 統計サマリー */}
      <SummaryCards summary={summary} />

      {/* 2. API テストセクション */}
      <Card>
        <CardHeader>
          <CardTitle>API テスト</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hello API */}
          <div>
            <Button onClick={handleHello} disabled={helloLoading}>
              {helloLoading
                ? "呼び出し中..."
                : "Hello API 呼び出し (console.log)"}
            </Button>
          </div>

          {/* Stock API */}
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1">
              <label
                htmlFor="ticker-input"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                ティッカーを入力
              </label>
              <Input
                id="ticker-input"
                placeholder="例: AAPL"
                value={tickerInput}
                onChange={(e) => setTickerInput(e.target.value.toUpperCase())}
              />
            </div>
            <Button
              onClick={handleFetchStock}
              disabled={stockLoading || !tickerInput}
            >
              {stockLoading ? "読み込み中..." : "株価取得"}
            </Button>
            {stockError && <p className="text-sm text-red-500">{stockError}</p>}
          </div>

          {stockData && (
            <div className="space-y-1 text-sm text-gray-800">
              <p>
                <strong>ティッカー：</strong>
                {stockData.ticker}
              </p>
              <p>
                <strong>終値：</strong>
                {stockData.close.toLocaleString()} 円
              </p>
              <p>
                <strong>出来高：</strong>
                {stockData.volume.toLocaleString()}
              </p>
              <p>
                <strong>タイムスタンプ：</strong>
                {new Date(stockData.timestamp).toLocaleString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 3. フィルターパネル */}
      <FilterPanel
        from={from}
        to={to}
        search={search}
        loading={loading}
        onChangeFrom={setFrom}
        onChangeTo={setTo}
        onChangeSearch={setSearch}
        onApply={applyFilter}
      />

      {/* 4. 投資額推移チャート */}
      <InvestChart data={data} loading={loading} />

      {/* 5. 投資情報テーブル */}
      <InvestTable data={data} loading={loading} />
    </div>
  );
}
