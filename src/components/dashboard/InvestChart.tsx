// src/components/dashboard/InvestChart.tsx
"use client";

import { FC } from "react";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart";
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
import { type SummaryItem } from "@/libs/usecases/fetchSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Chart 設定は呼び出し側で渡しても良いですが、固定も可能
const chartConfig: ChartConfig = {
  amount: { label: "投資額", color: "hsl(var(--chart-amount))" },
};

interface InvestChartProps {
  data: SummaryItem[];
  loading?: boolean;
}

export const InvestChart: FC<InvestChartProps> = ({ data, _loading }) => (
  <Card>
    <CardHeader>
      <CardTitle>投資額推移</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig} className="h-80 w-full">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
            <YAxis tickFormatter={(v) => v.toLocaleString()} />
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
    </CardContent>
  </Card>
);
