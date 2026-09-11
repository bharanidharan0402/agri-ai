import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';

export default function ChatBot({ messages, setMessages, sensorContext, language, t }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const quickActions = [
    "What fertilizer should I use?",
    "Is my soil pH optimal?",
    "When should I irrigate?",
    "Pest control advice",
  ];

  const handleSend = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg = {
      id: Math.random().toString(),
      role: "user",
      content: msg,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.slice(-8).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await sendChatMessage({
        message: msg,
        history,
        language,
        sensorContext,
      });

      const botMsg = {
        id: Math.random().toString(),
        role: "assistant",
        content: res.text || "I apologize, I experienced a diagnostic circuit interruption. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errMsg = {
        id: Math.random().toString(),
        role: "assistant",
        content: "Transceiver fault: Could not establish a secure connection. Edge controller is in safety-mode.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (content) => {
    // Simple markdown-like rendering
    return content.split('\n').map((line, i) => {
      // Bold
      let rendered = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Inline code
      rendered = rendered.replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1 rounded text-[10px] font-mono">$1</code>');
      // Bullet points
      if (rendered.startsWith('- ') || rendered.startsWith('* ')) {
        rendered = `<span class="ml-2">• ${rendered.slice(2)}</span>`;
      }
      return (
        <span key={i} className="block" dangerouslySetInnerHTML={{ __html: rendered }} />
      );
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col" style={{ height: "480px" }}>
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-2">
        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-slate-800 text-sm">AgriBot Assistant</h3>
          <p className="text-[10px] text-emerald-600 font-mono">Powered by Google Gemini</p>
        </div>
        <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 flex gap-1.5 overflow-x-auto border-b border-slate-50">
        {quickActions.map((qa) => (
          <button
            key={qa}
            onClick={() => handleSend(qa)}
            disabled={loading}
            className="whitespace-nowrap text-[10px] bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 px-2.5 py-1 rounded-full text-slate-600 hover:text-emerald-700 font-medium transition cursor-pointer disabled:opacity-50 shrink-0"
          >
            {qa}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-6 h-6 bg-emerald-100 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-emerald-700" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-emerald-600 text-white rounded-br-md"
                  : "bg-slate-50 text-slate-700 border border-slate-100 rounded-bl-md"
              }`}
            >
              {renderContent(msg.content)}
            </div>
            {msg.role === "user" && (
              <div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 bg-emerald-100 rounded-md flex items-center justify-center">
              <Bot className="w-3 h-3 text-emerald-700" />
            </div>
            <div className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-2xl rounded-bl-md">
              <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>{t("AgriBot is thinking...")}</span>
              </div>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-100">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask AgriBot about your crop, soil, or irrigation..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-mono disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl transition cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
