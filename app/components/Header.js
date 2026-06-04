"use client";

import { Sparkles, MoreVertical } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="px-6 py-5 flex items-center justify-between glass border-b border-orange-100/50 sticky top-0 z-30">
      {/* Left: Logo + Brand */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/kapruka-logo.jpeg"
            alt="Kapruka"
            width={56}
            height={56}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold brand-gradient">Kapru</h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
              <Sparkles size={11} className="inline mr-1" />
              Powered by Kapruka MCP
            </span>
          </div>
          <p className="text-sm text-gray-500">Your personal boutique concierge</p>
        </div>
      </div>
    </header>
  );
}