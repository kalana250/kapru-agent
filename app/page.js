"use client";

import { useChat } from "ai/react";
import { motion } from "framer-motion";
import { Mic, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Welcome from "./components/Welcome";
import ChatView from "./components/ChatView";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } =
    useChat({ api: "/api/chat" });

  const hasMessages = messages.length > 0;

  const handleQuickReply = (text) => {
    if (isLoading) return;
    append({ role: "user", content: text });
    setSidebarOpen(false);
  };

  return (
    <div className="flex bg-boutique" style={{ height: "100dvh" }}>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectOccasion={(occ) => handleQuickReply(`I need a gift for ${occ.toLowerCase()}`)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {!hasMessages ? (
          <Welcome onQuickReply={handleQuickReply} />
        ) : (
          <ChatView messages={messages} isLoading={isLoading} />
        )}

        {/* Input */}
        <div className="px-4 pb-6 pt-2">
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto relative"
          >
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 shadow-lg shadow-indigo-100/40">
              <button
                type="button"
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition"
                title="Voice (coming soon)"
              >
                <Mic size={18} />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition"
                title="Attach (coming soon)"
              >
                <Paperclip size={18} />
              </button>
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything about gifts, flowers, cakes..."
                className="flex-1 bg-transparent outline-none text-sm px-2 py-2 placeholder-gray-400"
                disabled={isLoading}
              />
              <motion.button
                type="submit"
                disabled={isLoading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full brand-bg text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              >
                <Send size={16} />
              </motion.button>
            </div>
            <p className="text-center text-[11px] text-gray-400 mt-3">
              Kapru may occasionally make mistakes · Always verify prices on{" "}
              <a
                href="https://kapruka.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline"
              >
                kapruka.com
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}