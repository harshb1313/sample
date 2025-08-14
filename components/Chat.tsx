'use client';
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const askLLM = trpc.askLLM.useMutation();

  // Optional: fetch existing messages on mount
  // const { data: history } = trpc.getMessages.useQuery();
  // useEffect(() => { if(history) setMessages(history); }, [history]);

  const handleSend = async () => {
    if (!input) return;

    // Add user message locally
    setMessages([...messages, { role: "user", content: input }]);

    // Call TRPC mutation
    const result = await askLLM.mutateAsync({ prompt: input });

    // Add AI response locally
    setMessages(prev => [...prev, { role: "assistant", content: result.reply }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-96 border rounded p-4 max-w-xs">
      <div className="flex-1 overflow-y-auto mb-2 space-y-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.role === "user" ? "text-right" : "text-left"}
          >
            <span
              className={`px-2 py-1 rounded ${
                msg.role === "user" ? "bg-blue-100" : "bg-gray-200"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
