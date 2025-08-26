"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, Plus, User, Bot, Clipboard, ArrowDown, MessageCircle } from "lucide-react";


export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState<string[]>(["Welcome Chat"]);
  const [currentChat, setCurrentChat] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show scroll button if user scrolls up
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        100;
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

    // Typing effect simulation
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-center p-4 border-gray-700 bg-gray-300">
          {sidebarOpen && (
            <div className="relative w-full h-[60px]">
              <Image
                src="/assets/images/cognitian.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {}
            <Menu className="w-6 h-6 text-gray-300" />
          </button>
          {sidebarOpen && <h2 className="font-bold text-gray-200">History</h2>}
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentChat(idx);
                setMessages([]);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
                currentChat === idx ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              {sidebarOpen ? chat : <MessageCircle />}
            </button>
          ))}
        </div>

        {/* New Chat Button */}
        <div className="p-2 border-gray-700">
          <button
            onClick={newChat}
            className="flex items-center justify-center w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            {sidebarOpen && "New Chat"}
          </button>
        </div>
        <p className="p-2 text-[10px] text-center text-gray-400">
          Developed by: Christian Barbosa - Junior Software Developer
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 w-full h-screen relative">
        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 p-6 overflow-y-auto flex flex-col items-center"
        >
          <div className="w-full max-w-3xl space-y-6">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex items-end space-x-3 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Assistant (Left side with copy) */}
                {m.role === "assistant" && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-700 p-2 rounded-full">
                      <Bot className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="relative p-4 rounded-2xl max-w-xl bg-gray-800 text-gray-100">
                      <p className="whitespace-pre-wrap p-2">{m.content}</p>
                      {/* Copy button */}
                      <button
                        onClick={() => copyToClipboard(m.content)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        title="Copy response"
                      >
                        <Clipboard className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* User (Right side) */}
                {m.role === "user" && (
                  <>
                    <div className="p-4 rounded-2xl max-w-xl bg-green-600 text-white">
                      {m.content}
                    </div>
                    <div className="bg-green-700 p-2 rounded-full">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Floating Scroll-to-Bottom Button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-24 right-6 bg-green-600 p-3 rounded-full shadow-lg hover:bg-green-700 transition"
          >
            {}
            <ArrowDown className="w-5 h-5 text-white cursor-pointer" />
          </button>
        )}

        {/* Input  bg-gray-800 */}
        <div className="p-5 border-gray-700 flex justify-center">
          <div className="flex w-full max-w-3xl items-center bg-gray-700 rounded-2xl px-3 py-2">
            <input
              className="flex-1 bg-transparent text-white px-3 py-2 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Send a message..."
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
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
