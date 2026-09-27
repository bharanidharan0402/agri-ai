import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';

export default function ChatBot({ messages, setMessages, sensorContext, language = 'English', t }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const isTamil = language === 'Tamil';
  const isHindi = language === 'Hindi';

  const quickActions = isTamil
    ? [
        'என்ன உரம் பயன்படுத்த வேண்டும்?',
        'மண் ஊட்டச்சத்து எப்படி உள்ளது?',
        'எப்போது பாசனம் செய்ய வேண்டும்?',
        'பூச்சி கட்டுப்பாடு ஆலோசனை',
      ]
    : isHindi
    ? [
        'कौन सा उर्वरक उपयोग करें?',
        'मिट्टी के पोषक तत्व कैसे हैं?',
        'सिंचाई कब करनी चाहिए?',
        'कीट नियंत्रण सलाह',
      ]
    : [
        'What fertilizer should I use?',
        'How is my soil nutrient balance?',
        'When should I irrigate?',
        'Pest control advice',
      ];

  const placeholderText = isTamil
    ? 'பயிர், மண், உரம், பூச்சிகள் பற்றி அக்ரிபாட்டிடம் கேளுங்கள்...'
    : isHindi
    ? 'अपनी फसल, मिट्टी, उर्वरक या कीटों के बारे में एग्रीबॉट से पूछें...'
    : 'Ask AgriBot about your crop, soil nutrients, fertilizers, pests...';

  const headerTitle = isTamil
    ? 'அக்ரிபாட் விவசாய உதவியாளர்'
    : isHindi
    ? 'एग्रीबॉट कृषि सहायक'
    : 'AgriBot Assistant';

  const headerSubtitle = isTamil
    ? 'கூகிள் ஜெமினி AI ஆதரவுடன் இயங்குகிறது'
    : isHindi
    ? 'गूगल जेमिनी AI द्वारा संचालित'
    : 'Powered by Google Gemini';

  const handleSend = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg = {
      id: Math.random().toString(),
      role: 'user',
      content: msg,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.slice(-8).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await sendChatMessage({ message: msg, history, language, sensorContext });

      const botMsg = {
        id: Math.random().toString(),
        role: 'assistant',
        content: res.text || 'I apologize, I experienced a diagnostic circuit interruption. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errMsg = {
        id: Math.random().toString(),
        role: 'assistant',
        content: 'Transceiver fault: Could not establish a secure connection. Edge controller is in safety-mode.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (content) => {
    return content.split('\n').map((line, i) => {
      let rendered = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      rendered = rendered.replace(
        /`(.*?)`/g,
        '<code style="background:#e2e8f0;color:#0f172a;padding:1px 5px;border-radius:4px;font-size:10px;font-family:monospace">$1</code>'
      );
      if (rendered.startsWith('- ') || rendered.startsWith('* ')) {
        rendered = `<span style="margin-left:8px">• ${rendered.slice(2)}</span>`;
      }
      return <span key={i} className="block" dangerouslySetInnerHTML={{ __html: rendered }} />;
    });
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 flex flex-col space-y-4 text-slate-900" style={{ height: '520px' }}>
      {/* Header */}
      <div className="pb-3 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-emerald-700 shadow-sm">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-900 text-base">{headerTitle}</h3>
            <p className="text-xs text-slate-500 font-mono">{headerSubtitle}</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Active</span>
        </span>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {quickActions.map((qa) => (
          <button
            key={qa}
            onClick={() => handleSend(qa)}
            disabled={loading}
            className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full font-medium transition cursor-pointer disabled:opacity-50 shrink-0 bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
          >
            {qa}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50 rounded-2xl border border-slate-200">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-700 text-white rounded-br-sm'
                  : 'bg-white text-slate-900 border border-slate-200 rounded-bl-sm font-sans shadow-2xs'
              }`}
            >
              {renderContent(msg.content)}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-amber-100 text-amber-800 border border-amber-300">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2 justify-start items-center">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-emerald-100 text-emerald-800 border border-emerald-300">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl px-4 py-2.5 text-xs flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
              <span>Analyzing agronomy parameters...</span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2 pt-1"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholderText}
          disabled={loading}
          className="flex-1 text-xs px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-600 transition"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}
