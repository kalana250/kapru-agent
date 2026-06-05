"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ProductCard from "./ProductCard";
import { parseProductsFromMCP } from "../lib/parseProducts";
import Image from "next/image";

const LOGO_SRC = "/kapruka-logo.jpeg";
const VISIBLE_CARDS = 3; // How many cards to show at once

export default function ChatView({ messages, isLoading }) {
  const endRef = useRef(null);
  const [pageByMessage, setPageByMessage] = useState({});

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const getPage = (msgId) => pageByMessage[msgId] || 0;
  
  const setPage = (msgId, page) => {
    setPageByMessage((prev) => ({ ...prev, [msgId]: page }));
  };

  const friendlyToolLabel = (toolName) => {
    const labels = {
      kapruka_search_products: "🔍 Searching Kapruka...",
      kapruka_list_categories: "📁 Browsing categories...",
      kapruka_get_product: "📦 Getting details...",
      kapruka_list_delivery_cities: "📍 Finding cities...",
      kapruka_check_delivery: "🚚 Checking delivery...",
      kapruka_create_order: "🛒 Creating order...",
      kapruka_track_order: "📦 Tracking order...",
    };
    return labels[toolName] || `⚙️ ${toolName}...`;
  };

  const getProductsFromMessage = (msg) => {
    if (!msg.toolInvocations) return [];
    const allProducts = [];
    msg.toolInvocations.forEach((tool) => {
      if (tool.toolName === "kapruka_search_products" && tool.state === "result") {
        const result = tool.result;
        let text = "";
        if (typeof result === "string") {
          text = result;
        } else if (result?.content?.[0]?.text) {
          text = result.content[0].text;
        } else if (result?.structuredContent?.result) {
          text = result.structuredContent.result;
        }
        const products = parseProductsFromMCP(text);
        allProducts.push(...products);
      }
    });
    return allProducts;
  };

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    alert(`Added ${product.name} to basket! (Cart coming in Day 3)`);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((m) => {
            const products = m.role === "assistant" ? getProductsFromMessage(m) : [];
            const currentPage = getPage(m.id);
            const totalPages = Math.ceil(products.length / VISIBLE_CARDS);
            const startIdx = currentPage * VISIBLE_CARDS;
            const visibleProducts = products.slice(startIdx, startIdx + VISIBLE_CARDS);
            const canGoBack = currentPage > 0;
            const canGoForward = currentPage < totalPages - 1;

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                {/* Text message */}
                {m.content && (
                  <div
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {m.role === "assistant" && (
                      <div className="w-9 h-9 rounded-xl overflow-hidden mr-2 shrink-0 shadow-sm">
                        <Image src={LOGO_SRC} alt="Kapru" width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        m.role === "user"
                          ? "brand-bg text-white rounded-br-sm shadow-md"
                          : "bg-white border border-orange-100 text-gray-800 rounded-bl-sm shadow-sm"
                      }`}
                    >
                      <div className="prose-chat text-sm leading-relaxed">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tool activity pills */}
                {m.toolInvocations?.map((tool) => (
                  <motion.div
                    key={tool.toolCallId}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-start pl-11"
                  >
                    <div className="text-xs font-medium text-pink-700 bg-pink-50 border border-pink-200 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                      {tool.state === "result" ? "✅ " : ""}
                      {friendlyToolLabel(tool.toolName)}
                    </div>
                  </motion.div>
                ))}

                {/* Product cards with pagination */}
                {products.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pl-11"
                  >
                    {/* Cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <AnimatePresence mode="wait">
                        {visibleProducts.map((product, i) => (
                          <motion.div
                            key={`${m.id}-${currentPage}-${product.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <ProductCard
                              product={product}
                              onAddToCart={handleAddToCart}
                              index={i}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Pagination controls */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between mt-3 px-1">
                        <button
                          onClick={() => canGoBack && setPage(m.id, currentPage - 1)}
                          disabled={!canGoBack}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:border-pink-300 hover:text-pink-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft size={14} />
                          Previous
                        </button>

                        {/* Dots indicator */}
                        <div className="flex gap-1.5">
                          {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setPage(m.id, idx)}
                              className={`h-2 rounded-full transition-all ${
                                idx === currentPage
                                  ? "w-6 brand-bg"
                                  : "w-2 bg-gray-300 hover:bg-gray-400"
                              }`}
                              aria-label={`Page ${idx + 1}`}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => canGoForward && setPage(m.id, currentPage + 1)}
                          disabled={!canGoForward}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:border-pink-300 hover:text-pink-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Next
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    )}

                    {/* Item counter */}
                    {products.length > 0 && (
                      <p className="text-[10px] text-gray-400 mt-2 text-center">
                        Showing {startIdx + 1}-{Math.min(startIdx + VISIBLE_CARDS, products.length)} of {products.length} items
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden mr-2 shrink-0 shadow-sm">
              <Image src="/kapruka-logo.jpeg" alt="Kapru" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div className="bg-white border border-orange-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1.5">
                <span className="typing-dot w-2 h-2 rounded-full bg-pink-400"></span>
                <span className="typing-dot w-2 h-2 rounded-full bg-pink-400"></span>
                <span className="typing-dot w-2 h-2 rounded-full bg-pink-400"></span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  );
}