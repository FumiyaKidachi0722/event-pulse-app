// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EventPulse Dashboard",
  description: "イベントベースマーケティング ダッシュボード",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${inter.className} flex h-screen bg-gray-100`}>
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto p-6">{children}</main>
          <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
            © 2025 EventPulse. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
