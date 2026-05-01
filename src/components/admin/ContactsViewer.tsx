"use client";

import { useEffect, useState } from "react";
import { fetchCollection } from "@/lib/firestore";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
}

export const ContactsViewer = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchCollection<ContactMessage>("contacts");
      setMessages(data);
    };
    loadMessages();
  }, []);

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold">Contact Submissions</h2>
      {messages.length === 0 ? (
        <p className="text-sm text-white/60">No submissions yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
            >
              <p className="font-semibold text-white">{message.name}</p>
              <p className="text-xs text-cyan-200">{message.email}</p>
              <p className="mt-2 text-white/70">{message.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
