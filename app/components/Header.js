"use client";

import { Menu, History, Settings } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="px-4 sm:px-6 py-3 flex items-center justify-between glass border-b border-gray-200 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Active · Kapruka Certified
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
          <History size={16} />
          History
        </button>
        <button className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
          <Settings size={16} />
          Clear
        </button>
      </div>
    </header>
  );
}