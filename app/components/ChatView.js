"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

// ⚠️ CHANGE THIS to match your actual file (.png, .jpg, or .jpeg)
const LOGO_SRC = "/kapruka-logo.jpeg";

export default function ChatView({ messages, isLoading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const friendlyToolLabel = (toolName) => {
    const labels = {
      kapruka_search_products: "🔍 Searching Kapruka ...",
      kapruka_list_categories: "📁 Browsing categories...",
      kapruka_get_product: "📦 Getting product details...",
      kapruka_list_delivery_cities: "📍 Finding delivery cities...",
      kapruka_check_delivery: "🚚 Checking delivery...",
      kapruka_create_order: "🛒 Creating your order...",
      kapruka_track_order: "📦 Tracking your order...",
    };
    return labels[toolName] || `⚙️ ${toolName}...`;
  };

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-2"
            >
              {m.content && (
                <div
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="w-9 h-9 rounded-xl overflow-hidden mr-2 shrink-0 shadow-sm">
                      <Image
                        src="/kapruka-logo.jpeg"
                        alt="Kapruka"
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                        priority
                      />
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
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden mr-2 shrink-0 shadow-sm">
              <Image
                          src="/kapruka-logo.jpeg"
                          alt="Kapruka"
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                          priority
                        />
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