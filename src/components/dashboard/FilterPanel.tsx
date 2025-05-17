// src/components/dashboard/FilterPanel.tsx
"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FilterPanelProps {
  from: string;
  to: string;
  search?: string;
  loading: boolean;
  onChangeFrom: (v: string) => void;
  onChangeTo: (v: string) => void;
  onChangeSearch?: (v: string) => void;
  onApply: () => void;
}

export const FilterPanel: FC<FilterPanelProps> = ({
  from,
  to,
  search,
  loading,
  onChangeFrom,
  onChangeTo,
  onChangeSearch,
  onApply,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>フィルター</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-wrap items-end gap-4">
      {/* 日付フィルター */}
      <div className="flex flex-col">
        <label htmlFor="from-date" className="mb-1">
          開始日
        </label>
        <Input
          id="from-date"
          type="date"
          value={from}
          onChange={(e) => onChangeFrom(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="to-date" className="mb-1">
          終了日
        </label>
        <Input
          id="to-date"
          type="date"
          value={to}
          onChange={(e) => onChangeTo(e.target.value)}
        />
      </div>

      {/* オプション：企業名検索 */}
      {typeof onChangeSearch === "function" && (
        <div className="flex flex-col">
          <label htmlFor="search" className="mb-1">
            企業名
          </label>
          <Input
            id="search"
            placeholder="キーワードを入力"
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
          />
        </div>
      )}

      <Button onClick={onApply} disabled={loading}>
        {loading ? "読み込み中..." : "適用"}
      </Button>
    </CardContent>
  </Card>
);
