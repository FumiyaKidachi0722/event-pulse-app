// src/components/dashboard/SummaryCards.tsx
"use client";

import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Summary {
  total: number;
  avg: number;
  max: number;
  count: number;
}

interface SummaryCardsProps {
  summary: Summary;
}

export const SummaryCards: FC<SummaryCardsProps> = ({ summary }) => (
  <div className="grid grid-cols-4 gap-4">
    <Card>
      <CardHeader>
        <CardTitle>合計投資額</CardTitle>
      </CardHeader>
      <CardContent>{summary.total.toLocaleString()} 円</CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>平均投資額</CardTitle>
      </CardHeader>
      <CardContent>{Math.round(summary.avg).toLocaleString()} 円</CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>最大投資額</CardTitle>
      </CardHeader>
      <CardContent>{summary.max.toLocaleString()} 円</CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>件数</CardTitle>
      </CardHeader>
      <CardContent>{summary.count}</CardContent>
    </Card>
  </div>
);
