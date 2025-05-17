// src/components/layout/Header.tsx
"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm">
      {/* 左側：必要に応じてブレッドクラム等を追加 */}
      <div />

      {/* 右側：ユーザーメニュー */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer ring-2 ring-indigo-500">
              <AvatarImage src="/avatar.png" alt="ユーザー名" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-40">
            <DropdownMenuItem className="flex items-center gap-2">
              <LogOut className="h-4 w-4 text-gray-600" />
              ログアウト
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
