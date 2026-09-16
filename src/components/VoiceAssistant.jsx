import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Loader2, Volume2, Bot } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';

export default function VoiceAssistant({ onClose, sensors, cropName, location, weather, language, t, sensorContext }) {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState("");
  const [voiceResponse, setVoiceResponse] = useState("");
  const [textInput, setTextInput] = useState("");
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const stopSpeaking = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

window.speechSynthesis.onvoiceschanged = () => {
  window.speechSynthesis.getVoices();
};

const speakText = (text) => {
  if (!window.speechSynthesis) return;

  stopSpeaking();
  setSpeaking(true);

  const cleaned = text.replace(/[*_#`\-]/g, "");
  const utt = new SpeechSynthesisUtterance(cleaned);

  const voices = window.speechSynthesis.getVoices();
  console.log(voices.map(v => `${v.name} — ${v.lang}`));

  if (language === "Tamil") {
    utt.lang = "ta-IN";

    const tamilVoice = voices.find(
      (voice) =>
        voice.lang.toLowerCase() === "ta-in" ||
        voice.lang.toLowerCase().startsWith("ta")
    );

    if (tamilVoice) {
      utt.voice = tamilVoice;
    }
  } else if (language === "Hindi") {
    utt.lang = "hi-IN";

    const hindiVoice = voices.find(
      (voice) =>
        voice.lang.toLowerCase() === "hi-in" ||
        voice.lang.toLowerCase().startsWith("hi")
    );

    if (hindiVoice) {
      utt.voice = hindiVoice;
    }
  } else {
    utt.lang = "en-US";

    const englishVoice = voices.find(
      (voice) =>
        voice.lang.toLowerCase() === "en-us" ||
        voice.lang.toLowerCase().startsWith("en")
    );

    if (englishVoice) {
      utt.voice = englishVoice;
    }
  }

  utt.onend = () => setSpeaking(false);
  utt.onerror = () => setSpeaking(false);

  window.speechSynthesis.speak(utt);
};

  const processQuery = async (query) => {
    if (!query.trim()) return;
    setProcessing(true);
    setVoiceResponse("");

    try {
      const msg = `User Voice Query: "${query}". [SYSTEM IoT LIVE CONTEXT: Crop under management is ${cropName}. Soil NPK = Nitrogen: ${sensors.nitrogen} mg/kg, Phosphorus: ${sensors.phosphorus} mg/kg, Potassium: ${sensors.potassium} mg/kg. Moisture is ${sensors.soilMoisture}%, pH is ${sensors.pH}. Local weather: temperature ${weather?.temp || 28}°C, humidity ${weather?.humidity || 65}% in ${location || "Coimbatore"}. Respond as a helpful Voice Assistant directly to their question. Keep it concise, professional, and friendly, under 65 words.]`;

      const res = await sendChatMessage({ message: msg, history: [], language, sensorContext });
      const text = res.text || "Voice module offline. Please check connectivity.";
      setVoiceResponse(text);
      speakText(text);
    } catch (err) {
      console.error(err);
      setVoiceResponse("Diagnostic error: Could not complete the telemetry-voice stream.");
    } finally {
      setProcessing(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Web Speech API is not supported in this browser. Please type your query.");
      return;
    }

    try {
      stopSpeaking();
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === "Tamil" ? "ta-IN" : language === "Hindi" ? "hi-IN" : "en-US";

      setListening(true);
      setVoiceQuery("Listening...");
      setError(null);

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setVoiceQuery(transcript);
        processQuery(transcript);
      };

      recognition.onerror = () => {
        setListening(false);
        setVoiceQuery("");
        setError("Could not capture speech. Please check microphone permissions.");
      };

      recognition.onend = () => setListening(false);
      recognition.start();
    } catch (err) {
      console.error(err);
      setListening(false);
      setError("Microphone initialization failed. Please use typing fallback.");
    }
  };

  const barColors = ["bg-blue-500", "bg-red-500", "bg-yellow-500", "bg-green-500"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-[10000] overflow-y-auto min-h-screen flex flex-col justify-between text-white"
    >
      {/* Header */}
      <div className="w-full border-b border-slate-800 py-4 px-6 flex items-center justify-between sticky top-0 bg-slate-950/80 backdrop-blur-md z-10">
        <button
          onClick={() => { onClose(); stopSpeaking(); }}
          className="text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5 cursor-pointer bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 transition-all duration-150 font-bold"
        >
          ← {t("Return to Control Center")}
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] font-bold font-mono text-emerald-400 uppercase tracking-widest">
            {t("Google Gemini Voice Workspace")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full space-y-8">
        {/* Sensor badges */}
        <div className="flex flex-wrap gap-2.5 justify-center max-w-xl text-center">
          {[
            { label: "Crop", value: cropName, color: "text-emerald-400" },
            { label: "N", value: `${sensors.nitrogen} mg/kg`, color: "text-blue-400" },
            { label: "P", value: `${sensors.phosphorus} mg/kg`, color: "text-purple-400" },
            { label: "K", value: `${sensors.potassium} mg/kg`, color: "text-orange-400" },
            { label: "Moisture", value: `${sensors.soilMoisture}%`, color: "text-teal-400" },
            { label: "pH", value: sensors.pH, color: "text-pink-400" },
          ].map((b) => (
            <span key={b.label} className="bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-full text-xs font-mono text-slate-300">
              {b.label}: <strong className={b.color}>{b.value}</strong>
            </span>
          ))}
        </div>

        {/* Waveform + Mic */}
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-end justify-center gap-1.5 h-16 w-64">
            {Array.from({ length: 9 }).map((_, i) => {
              if (listening) {
                return (
                  <motion.div
                    key={i}
                    animate={{ height: [12, 48, 12] }}
                    transition={{ repeat: Infinity, duration: 0.6 + i * 0.1, ease: "easeInOut" }}
                    className={`w-2 rounded-full ${barColors[i % barColors.length]}`}
                  />
                );
              }
              if (speaking) {
                return (
                  <motion.div
                    key={i}
                    animate={{ height: [12, Math.random() * 40 + 15, 12] }}
                    transition={{ repeat: Infinity, duration: 0.4 + i * 0.05, ease: "linear" }}
                    className="w-2 rounded-full bg-emerald-500"
                  />
                );
              }
              return <div key={i} className="w-2 h-3 rounded-full bg-slate-700" />;
            })}
          </div>

          <button
            onClick={startListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl ${
              listening
                ? "bg-gradient-to-tr from-red-600 to-rose-500 scale-110 shadow-red-500/20"
                : speaking
                ? "bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-emerald-500/20 animate-pulse"
                : "bg-slate-800 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            <Mic className={`w-10 h-10 ${listening ? "text-white animate-pulse" : "text-slate-300"}`} />
          </button>

          <span className="text-xs text-slate-400 font-mono tracking-wider block text-center">
            {t(listening ? "Listening to your field query..." : speaking ? "Speaking bot recommendations..." : "Tap microphone to ask live crop advice")}
          </span>
        </div>

        {/* Response Panel */}
        <div className="w-full max-w-2xl bg-slate-950/70 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div>
            <span className="text-[10px] text-slate-500 font-mono uppercase font-bold block mb-1">
              {t("Your Voice Query")}
            </span>
            <div className="min-h-[48px] bg-slate-900/60 rounded-xl p-3 text-sm text-slate-200 border border-slate-800 font-medium">
              {voiceQuery || <span className="text-slate-600 italic">"What is the best fertilizer mix given my current nitrogen level?"</span>}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-emerald-500 font-mono uppercase font-bold flex items-center gap-1">
                <Bot className="w-3 h-3 animate-pulse" /> {t("Voice Response")}
              </span>
              {voiceResponse && (
                <button
                  onClick={() => speakText(voiceResponse)}
                  className="text-[10px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-900 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer hover:bg-emerald-900 transition"
                >
                  <Volume2 className="w-3 h-3" /> {t("Replay Audio")}
                </button>
              )}
            </div>
            <div className="min-h-[100px] bg-slate-900/40 rounded-xl p-4 text-xs leading-relaxed text-slate-300 border border-slate-800 whitespace-pre-line font-mono">
              {processing ? (
                <div className="flex items-center gap-2 text-emerald-400">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                  <span>{t("AgriBot is thinking...")}</span>
                </div>
              ) : (
                voiceResponse || <span className="text-slate-600 italic font-medium">Your spoken answer will appear and read out loud here. Click "Ask Model" or speak to start.</span>
              )}
            </div>
          </div>

          {error && (
            <div className="text-rose-400 bg-rose-950/20 border border-rose-900/50 rounded-xl p-3 text-xs font-mono">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Text Input Fallback */}
        <div className="w-full max-w-2xl bg-slate-950/50 border border-slate-800 p-3 rounded-2xl flex gap-2">
          <input
            type="text"
            placeholder={t("Type your query here instead of speaking...")}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textInput.trim()) {
                setVoiceQuery(textInput.trim());
                processQuery(textInput.trim());
                setTextInput("");
              }
            }}
            className="flex-1 bg-slate-900 border border-slate-800 text-xs rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
          />
          <button
            onClick={() => {
              if (textInput.trim()) {
                setVoiceQuery(textInput.trim());
                processQuery(textInput.trim());
                setTextInput("");
              }
            }}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            {t("Ask Model")}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center py-4 text-[10px] text-slate-600 font-mono border-t border-slate-800 bg-slate-950/40">
        Direct speech duplex loop calibrated over high-frequency audio matrices • Kongu S2C Edge
      </div>
    </motion.div>
  );
}
