"use client";

import { motion } from "framer-motion";
import { ExternalLink, Plus, Heart } from "lucide-react";

export default function ProductCard({ product, onAddToCart, index = 0 }) {
  const { name, price, id, url, inStock, category } = product;

  // Determine emoji based on product name/category
  const getEmoji = (name) => {
    const n = name.toLowerCase();
    if (n.includes("chocolate")) return "🍫";
    if (n.includes("flower") || n.includes("rose") || n.includes("bouquet") || n.includes("arrangement")) return "💐";
    if (n.includes("cake")) return "🎂";
    if (n.includes("kitkat")) return "🍫";
    if (n.includes("gift") || n.includes("hamper")) return "🎁";
    if (n.includes("perfume")) return "🌸";
    if (n.includes("watch")) return "⌚";
    if (n.includes("teddy") || n.includes("bear")) return "🧸";
    if (n.includes("wine")) return "🍷";
    if (n.includes("fruit")) return "🍎";
    if (n.includes("jewelry") || n.includes("necklace")) return "💎";
    return "🎁";
  };

  const emoji = getEmoji(name);
  const formattedPrice = price ? `LKR ${price.toLocaleString()}` : "Price on request";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all w-full"
    >
      {/* Image area with gradient bg + emoji */}
      <div className="relative h-40 sm:h-44 bg-linear-to-br from-indigo-50 via-pink-50 to-amber-50 flex items-center justify-center overflow-hidden">
        <motion.span
          className="text-6xl sm:text-7xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {emoji}
        </motion.span>
        
        {/* Stock badge */}
        {inStock && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-green-500 text-white text-[10px] font-semibold">
            In Stock
          </div>
        )}

        {/* Heart icon */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-pink-500 hover:bg-white transition">
          <Heart size={14} />
        </button>
      </div>

      {/* Product info */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1 min-h-10">
          {name}
        </h3>
        
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-lg font-bold brand-gradient">
            {formattedPrice}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart && onAddToCart(product)}
            className="flex-1 brand-bg text-white text-xs font-semibold py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-1"
          >
            <Plus size={14} />
            Add to Cart
          </button>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
              title="View on Kapruka"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}