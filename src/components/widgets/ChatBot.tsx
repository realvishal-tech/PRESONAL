"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

const faqs = [
  {
    question: "Who is Vishal?",
    answer:
      "Vishal is a 1st-year BCA student at L.N.D College who loves building futuristic web experiences.",
  },
  {
    question: "What does Vishal build?",
    answer:
      "He builds modern web apps with React, Firebase, and smooth UI animations.",
  },
  {
    question: "How can I contact Vishal?",
    answer: "Use the contact form or reach out via GitHub and LinkedIn.",
  },
];

export const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! I’m Vishal’s assistant. Ask me anything about his journey!",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) {
      return;
    }
    const userMessage = { id: Date.now().toString(), sender: "user", text: input };
    const match = faqs.find((item) =>
      input.toLowerCase().includes(item.question.toLowerCase().split(" ")[0])
    );
    const botReply = {
      id: `${Date.now()}-bot`,
      sender: "bot",
      text: match?.answer ||
        "That’s a great question! Vishal is always learning and would love to connect.",
    };
    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
  };

  return (
    <div className="fixed bottom-8 left-8 z-[70]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-200 shadow-lg backdrop-blur"
        aria-label="Toggle AI assistant"
      >
        <MessageCircle size={18} />
      </button>
      {open && (
        <div className="mt-4 w-80 rounded-2xl border border-white/10 bg-black/80 p-4 shadow-2xl backdrop-blur">
          <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-200">
            Vishal AI Assistant
          </div>
          <div className="flex max-h-56 flex-col gap-2 overflow-y-auto pr-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-xl px-3 py-2 text-sm ${
                  message.sender === "bot"
                    ? "bg-white/10 text-cyan-100"
                    : "bg-cyan-500/20 text-white"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Vishal..."
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/30 text-cyan-100"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
