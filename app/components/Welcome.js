"use client";

import { motion } from "framer-motion";
import { Truck, Lock, Star } from "lucide-react";
import Image from "next/image";

export default function Welcome({ onQuickReply }) {
  const categories = [
    { emoji: "🎂", label: "Birthday Gifts" },
    { emoji: "💍", label: "Anniversary" },
    { emoji: "🌹", label: "Fresh Flowers" },
    { emoji: "🎁", label: "Gift Hampers" },
    { emoji: "🍰", label: "Cakes & Desserts" },
    { emoji: "💝", label: "Valentine's Day" },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
        {/* Big Logo - smaller on mobile */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-2xl lg:rounded-3xl overflow-hidden mb-3 sm:mb-4 lg:mb-6 shadow-xl shadow-indigo-200 shrink-0"
        >
          <Image src="/kapruka-logo.jpeg" alt="Kapru" width={40} height={40} className="w-full h-full object-cover" />
        </motion.div>

        {/* Sinhala "Ayubowan" - responsive sizes */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold brand-gradient mb-2 sm:mb-4 text-center sinhala-text"
        >
          ආයුබෝවන්!
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3"
        >
          Welcome to Kapru
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-xs sm:text-sm lg:text-base text-gray-500 max-w-md mb-4 sm:mb-6 lg:mb-8 leading-relaxed px-2"
        >
          Your personal boutique concierge for Sri Lanka&apos;s finest gifts, flowers & experiences.
        </motion.p>

        {/* Category Chips - smaller padding on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap gap-2 sm:gap-3 justify-center max-w-2xl mb-4 sm:mb-6 lg:mb-8"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onQuickReply(`I'm looking for ${cat.label.toLowerCase()}`)}
              className="px-3 py-2 sm:px-5 sm:py-3 bg-white rounded-full chip-shadow border border-indigo-100 hover:border-pink-300 transition-all text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5 sm:gap-2"
            >
              <span className="text-sm sm:text-base">{cat.emoji}</span>
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 justify-center text-[10px] sm:text-xs text-gray-400 pb-2"
        >
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Truck size={12} className="sm:w-3.5 sm:h-3.5" />
            Island-wide delivery
          </div>
          <div className="text-gray-300">·</div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Lock size={12} className="sm:w-3.5 sm:h-3.5" />
            Secure checkout
          </div>
          <div className="text-gray-300">·</div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Star size={12} className="sm:w-3.5 sm:h-3.5" />
            20+ years trusted
          </div>
        </motion.div>
      </div>
    </div>
  );
}