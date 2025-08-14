"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const askLLM = trpc.askLLM.useMutation();

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message locally
    const newUserMessage = { role: "user", content: input };
    setMessages(prev => [...prev, newUserMessage]);
    
    const currentInput = input;
    setInput("");

    try {
      // Call TRPC mutation
      const result = await askLLM.mutateAsync({ prompt: currentInput });
      
      // Add AI response locally
      setMessages(prev => [...prev, { role: "assistant", content: result.reply }]);
    } catch (error) {
      // Handle error gracefully
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="vh-100 d-flex flex-column">
      
      {/* Chat Messages Area */}
      <div className="flex-grow-1 d-flex flex-column justify-content-end p-3" style={{ overflowY: "auto" }}>
        {messages.length === 0 ? (
          <div className="text-center text-muted py-5">
            <h6>Start a conversation</h6>
            <small>Type a message below to get started</small>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`d-flex mb-2 ${msg.role === "user" ? "justify-content-end" : "justify-content-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-3 ${
                  msg.role === "user" 
                    ? "bg-primary text-white" 
                    : "bg-light text-dark"
                }`}
                style={{ 
                  maxWidth: "85%", 
                  wordWrap: "break-word",
                  fontSize: "14px",
                  lineHeight: "1.3"
                }}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="p-3 bg-white border-top">
        <div className="input-group">
          <input
            type="text"
            className="form-control border-0 bg-light"
            placeholder="Type your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ fontSize: "14px" }}
          />
          <button 
            className="btn btn-primary"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
      
    </div>
  );
}