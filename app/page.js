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
        <div className="px-2 sm:px-4 pb-3 sm:pb-4 pt-2 shrink-0 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto relative"
          >
            <div className="flex items-center gap-1 sm:gap-2 bg-white border border-gray-200 rounded-full px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg shadow-indigo-100/40">
              <button
                type="button"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition shrink-0"
                title="Voice (coming soon)"
              >
                <Mic size={16} className="sm:w-4.5 sm:h-4.5" />
              </button>
              <button
                type="button"
                className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition shrink-0"
                title="Attach (coming soon)"
              >
                <Paperclip size={18} />
              </button>
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask anything..."
                className="flex-1 min-w-0 bg-transparent outline-none text-sm px-1 sm:px-2 py-2 placeholder-gray-400"
                disabled={isLoading}
              />
              <motion.button
                type="submit"
                disabled={isLoading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full brand-bg text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-md shrink-0"
              >
                <Send size={14} className="sm:w-4 sm:h-4" />
              </motion.button>
            </div>
            <p className="text-center text-[10px] sm:text-[11px] text-gray-400 mt-2 px-2">
              Kapru may make mistakes · Verify on{" "}
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