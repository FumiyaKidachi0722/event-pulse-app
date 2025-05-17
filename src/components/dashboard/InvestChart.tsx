// src/components/dashboard/InvestChart.tsx
"use client";

import { FC } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart";
import { type SummaryItem } from "@/libs/usecases/fetchSummary";

// Chart 設定は呼び出し側で渡しても良いですが、固定も可能
const chartConfig: ChartConfig = {
  amount: { label: "投資額", color: "hsl(var(--chart-amount))" },
};

interface InvestChartProps {
  data: SummaryItem[];
  loading?: boolean;
}

export const InvestChart: FC<InvestChartProps> = ({
  data,
  loading = false,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>投資額推移</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-80 text-gray-500">
            読み込み中...
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis
                  tickFormatter={(v) => v.toLocaleString()}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Bar
                  dataKey="amount"
                  fill="var(--chart-amount)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
