// src/components/layout/Sidebar.tsx
"use client";

import { Home, BarChart, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const navItems = [
  { title: "ダッシュボード", href: "/", icon: Home },
  { title: "レポート", href: "/reports", icon: BarChart },
  { title: "設定", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-indigo-700 text-white flex flex-col">
      <div className="px-6 py-8">
        <h2 className="text-3xl font-extrabold tracking-tight">EventPulse</h2>
      </div>
      <nav className="flex-1 px-2 space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-lg
                transition-colors duration-200
                ${
                  active
                    ? "bg-indigo-500 text-white"
                    : "text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-30"
                }
              `}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-6">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-indigo-200 hover:text-white"
          asChild
        >
          <a href="/logout" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            ログアウト
          </a>
        </Button>
      </div>
    </aside>
  );
}
