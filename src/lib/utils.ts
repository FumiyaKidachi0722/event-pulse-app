// shadcn
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// python
export async function fetchHello(): Promise<string> {
  const res = await fetch("/api/hello");
  return res.text();
}

export interface StockData {
  ticker: string;
  close: number;
  volume: number;
  timestamp: string;
}

export async function fetchStock(ticker: string): Promise<StockData> {
  const res = await fetch(`/api/get_stock?ticker=${ticker}`);
  if (!res.ok) throw new Error(`Failed to fetch stock: ${res.status}`);
  return res.json();
}
