"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Truck, Lock, Star } from "lucide-react";

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
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 min-h-0 overflow-y-auto">
      {/* Big Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="w-28 h-28 rounded-3xl overflow-hidden mb-6 shadow-xl shadow-indigo-200"
      >
        <Image src="/kapruka-logo.jpeg" alt="Kapruka" width={112} height={112} className="w-full h-full object-cover" />
      </motion.div>

      {/* Sinhala "Ayubowan" */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-5xl sm:text-6xl md:text-7xl font-extrabold brand-gradient mb-4 text-center sinhala-text"
      >
        ආයුබෝවන්!
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl font-semibold text-gray-800 mb-3"
      >
        Welcome to Kapru
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center text-gray-500 max-w-md mb-8 leading-relaxed"
      >
        Your personal boutique concierge for Sri Lanka&apos;s finest gifts, flowers & experiences.
        What shall we find for you today?
      </motion.p>

      {/* Category Chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-wrap gap-3 justify-center max-w-2xl mb-8"
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
            className="px-5 py-3 bg-white rounded-full chip-shadow border border-indigo-100 hover:border-pink-300 transition-all text-sm font-medium text-gray-700 flex items-center gap-2"
          >
            <span className="text-base">{cat.emoji}</span>
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex flex-wrap gap-4 sm:gap-6 justify-center text-xs text-gray-400"
      >
        <div className="flex items-center gap-1.5">
          <Truck size={14} />
          Island-wide delivery
        </div>
        <div className="text-gray-300">·</div>
        <div className="flex items-center gap-1.5">
          <Lock size={14} />
          Secure checkout
        </div>
        <div className="text-gray-300">·</div>
        <div className="flex items-center gap-1.5">
          <Star size={14} />
          20+ years trusted
        </div>
      </motion.div>
    </div>
  );
}