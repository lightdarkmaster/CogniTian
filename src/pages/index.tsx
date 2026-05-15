"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, Plus, User, Bot, Clipboard, ArrowDown, MessageCircle, Check } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState<string[]>(["Welcome Chat"]);
  const [currentChat, setCurrentChat] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();

    const reply = data.reply;
    let typed = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    reply.split("").forEach((char: string, i: number) => {
      setTimeout(() => {
        typed += char;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: typed };
          return updated;
        });
      }, 5 * i);
    });
  };

  const newChat = () => {
    setChats([...chats, `Chat ${chats.length + 1}`]);
    setMessages([]);
    setCurrentChat(chats.length);
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700/50 transition-all duration-300 flex flex-col backdrop-blur-sm`}
      >
        <div className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-slate-700/50">
          {sidebarOpen && (
            <div className="relative w-full h-[50px]">
              <Image
                src="/assets/images/cognitian.png"
                alt="Cognitian Logo"
                fill
                className="object-contain"
              />
            </div>
          )}
          {!sidebarOpen && <Bot className="w-6 h-6 text-purple-400" />}
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-slate-700/50 p-2 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-300" />
          </button>
          {sidebarOpen && <h2 className="font-semibold text-slate-200 text-sm">Chat History</h2>}
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          {chats.map((chat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentChat(idx);
                setMessages([]);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 truncate text-sm mb-1 ${
                currentChat === idx 
                  ? "bg-gradient-to-r from-purple-600/40 to-blue-600/40 text-white font-medium border border-purple-500/30" 
                  : "text-slate-300 hover:bg-slate-700/40"
              }`}
            >
              {sidebarOpen ? <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4 flex-shrink-0" /> {chat}</span> : <MessageCircle className="w-4 h-4" />}
            </button>
          ))}
        </div>

        {/* New Chat Button */}
        <div className="p-3 border-t border-slate-700/50">
          <button
            onClick={newChat}
            className="flex items-center justify-center w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-200 font-medium text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            {sidebarOpen && "New Chat"}
          </button>
        </div>

        <div className="px-3 py-2 text-[11px] text-center text-slate-400 border-t border-slate-700/50">
          <p>Powered by</p>
          <p className="font-semibold text-slate-300 mt-1">Cognitian AI</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 h-screen relative">
        {/* Header */}
        <div className="h-16 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-6 flex items-center">
          <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Cognitian AI
          </h1>
        </div>

        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto flex flex-col items-center py-6 px-4"
        >
          <div className="w-full max-w-2xl space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full p-8 mb-4">
                  <Bot className="w-12 h-12 text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-200 mb-2">Hello! I'm Cognitian</h2>
                <p className="text-slate-400 max-w-md">Your AI-powered assistant. Start a conversation by typing a message below.</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`}
              >
                {m.role === "assistant" && (
                  <div className="flex gap-3 max-w-2xl">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/50 rounded-lg px-4 py-3 text-slate-100 hover:bg-slate-700/60 transition-colors">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(m.content, i)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy response"
                      >
                        {copiedId === i ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Clipboard className="w-4 h-4 text-slate-400 hover:text-slate-200" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {m.role === "user" && (
                  <div className="flex gap-3 max-w-2xl">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg px-4 py-3 text-white text-sm leading-relaxed">
                      {m.content}
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-300" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Scroll Button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-24 right-6 bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full shadow-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-200"
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Input Area */}
        <div className="p-6 border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-sm flex justify-center">
          <div className="flex w-full max-w-2xl gap-3 items-end">
            <div className="flex-1 flex items-center bg-slate-700/40 backdrop-blur-sm border border-slate-600/50 rounded-lg px-4 py-3 hover:border-slate-500/50 focus-within:border-purple-500/50 transition-colors">
              <input
                className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                placeholder="Type your message... (Shift+Enter for new line)"
              />
            </div>
            <button
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-3 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-200 font-medium text-sm flex-shrink-0 active:scale-95"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}