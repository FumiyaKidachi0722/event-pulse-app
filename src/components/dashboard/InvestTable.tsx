// src/components/dashboard/InvestTable.tsx
"use client";

import { FC } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SummaryItem } from "@/libs/usecases/fetchSummary";

interface InvestTableProps {
  data: SummaryItem[];
  onRowClick?: (item: SummaryItem) => void;
  loading?: boolean;
}

export const InvestTable: FC<InvestTableProps> = ({
  data,
  onRowClick,
  loading = false,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>投資情報一覧</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto">
        {loading ? (
          <div className="py-8 text-center text-gray-500">読み込み中...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  日付
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  企業名
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  投資額
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr
                  key={`${item.date}-${item.companyName}`}
                  className={
                    onRowClick ? "cursor-pointer hover:bg-gray-50" : ""
                  }
                  onClick={() => onRowClick?.(item)}
                >
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {item.date}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {item.companyName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {item.amount.toLocaleString()} 円
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
};
