"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Cake, Heart, Baby, HandHelping, GraduationCap, Sparkles,
  Menu, X
} from "lucide-react";

export default function Sidebar({ isOpen, onClose, onSelectOccasion }) {
  const occasions = [
    { icon: Cake, label: "Birthday", desc: "Make it memorable" },
    { icon: Heart, label: "Anniversary", desc: "Celebrate love" },
    { icon: Baby, label: "New Baby", desc: "Welcome the little one" },
    { icon: HandHelping, label: "Sympathy", desc: "Thoughtful condolences" },
    { icon: GraduationCap, label: "Graduation", desc: "Achievement gifts" },
    { icon: Sparkles, label: "Avurudu", desc: "New Year traditions" },
  ];

  const languages = ["EN", "සිං", "Tanglish"];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          indigo-bg text-white
          fixed lg:relative
          top-0 left-0 h-full
          w-72 z-50
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Logo Section */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <Image src="/kapruka-logo.jpeg" alt="Kapru" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Kapru</h2>
                <p className="text-xs text-white/60">by Kapruka</p>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="px-5 pt-5">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-2">Language</p>
          <div className="flex gap-1 bg-white/5 rounded-xl p-1">
            {languages.map((lang, i) => (
              <button
                key={lang}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                  i === 0
                    ? "bg-pink-500 text-white shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Occasions */}
        <div className="px-5 pt-6 flex-1 overflow-y-auto">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-3">Occasions</p>
          <div className="space-y-1">
            {occasions.map((occ, i) => (
              <motion.button
                key={occ.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSelectOccasion(occ.label)}
                className="w-full text-left px-3 py-3 rounded-xl hover:bg-white/10 transition group flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 group-hover:bg-pink-500/30 flex items-center justify-center transition">
                  <occ.icon size={16} className="text-pink-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{occ.label}</p>
                  <p className="text-xs text-white/40">{occ.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10">
          <p className="text-xs text-white/30 text-center">Powered by Kapruka.com</p>
        </div>
      </aside>
    </>
  );
}