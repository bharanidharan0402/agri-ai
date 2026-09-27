import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mic, Loader2, Volume2, Bot, X } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';

export default function VoiceAssistant({ onClose, sensors, cropName, location, weather, language, t, sensorContext }) {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState(null);
  const [voicesReady, setVoicesReady] = useState(false);

  // ── Voice loading fix: wait for voices to be available ──────────────────
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const onVoicesChanged = () => {
      setVoicesReady(true);
    };

    // Voices may already be loaded
    if (synth.getVoices().length > 0) {
      setVoicesReady(true);
    }
    synth.addEventListener('voiceschanged', onVoicesChanged);
    return () => synth.removeEventListener('voiceschanged', onVoicesChanged);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  // ── Tamil/Hindi/English audio with retry logic ───────────────────────────
  const speakText = useCallback((text) => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    stopSpeaking();
    setSpeaking(true);

    const cleaned = text.replace(/[*_#`\-]/g, '');
    const utt = new SpeechSynthesisUtterance(cleaned);

    const voices = synth.getVoices();

    if (language === 'Tamil') {
      utt.lang = 'ta-IN';
      const tamilVoice =
        voices.find(v => v.lang === 'ta-IN') ||
        voices.find(v => v.lang.startsWith('ta'));
      if (tamilVoice) {
        utt.voice = tamilVoice;
      } else {
        // Fallback: Chrome needs a short delay before voices appear for Tamil
        console.warn('Tamil voice not found — available:', voices.map(v => `${v.name}(${v.lang})`));
      }
      utt.rate = 0.9;
    } else if (language === 'Hindi') {
      utt.lang = 'hi-IN';
      const hindiVoice =
        voices.find(v => v.lang === 'hi-IN') ||
        voices.find(v => v.lang.startsWith('hi'));
      if (hindiVoice) utt.voice = hindiVoice;
      utt.rate = 0.95;
    } else {
      utt.lang = 'en-US';
      const englishVoice =
        voices.find(v => v.lang === 'en-US') ||
        voices.find(v => v.lang.startsWith('en'));
      if (englishVoice) utt.voice = englishVoice;
    }

    utt.onend = () => setSpeaking(false);
    utt.onerror = (e) => {
      console.error('SpeechSynthesis error:', e);
      setSpeaking(false);
    };

    // Chrome bug: cancel + re-speak needed on some browsers
    synth.cancel();
    setTimeout(() => synth.speak(utt), 80);
  }, [language, stopSpeaking]);

  const processQuery = async (query) => {
    if (!query.trim()) return;
    setProcessing(true);
    setVoiceResponse('');

    try {
      const msg = `User Voice Query: "${query}". [SYSTEM IoT LIVE CONTEXT: Crop under management is ${cropName}. Soil NPK = Nitrogen: ${sensors.nitrogen} mg/kg, Phosphorus: ${sensors.phosphorus} mg/kg, Potassium: ${sensors.potassium} mg/kg. Moisture is ${sensors.soilMoisture}%. Local weather: temperature ${weather?.temp || 28}°C, humidity ${weather?.humidity || 65}% in ${location || 'Coimbatore'}. Respond as a helpful Voice Assistant directly to their question in ${language}. Keep it concise, professional, and friendly, under 65 words.]`;

      const res = await sendChatMessage({ message: msg, history: [], language, sensorContext });
      const text = res.text || 'Voice module offline. Please check connectivity.';
      setVoiceResponse(text);
      speakText(text);
    } catch (err) {
      console.error(err);
      setVoiceResponse('Diagnostic error: Could not complete the telemetry-voice stream.');
    } finally {
      setProcessing(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Web Speech API is not supported in this browser. Please type your query.');
      return;
    }

    try {
      stopSpeaking();
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'Tamil' ? 'ta-IN' : language === 'Hindi' ? 'hi-IN' : 'en-US';

      setListening(true);
      setVoiceQuery('Listening...');
      setError(null);

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setVoiceQuery(transcript);
        processQuery(transcript);
      };

      recognition.onerror = () => {
        setListening(false);
        setVoiceQuery('');
        setError('Could not capture speech. Please check microphone permissions.');
      };

      recognition.onend = () => setListening(false);
      recognition.start();
    } catch (err) {
      console.error(err);
      setListening(false);
      setError('Microphone initialization failed. Please use typing fallback.');
    }
  };

  const barColors = ['bg-green-500', 'bg-amber-500', 'bg-green-400', 'bg-amber-400'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] overflow-y-auto min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900"
    >
      {/* Header */}
      <div className="bg-white border-b border-slate-200 w-full py-4 px-6 flex items-center justify-between sticky top-0 z-10 shadow-xs">
        <button
          onClick={() => { onClose(); stopSpeaking(); }}
          className="font-mono text-xs flex items-center gap-1.5 cursor-pointer rounded-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 transition font-bold border border-slate-300"
        >
          <X className="w-3.5 h-3.5" /> {t('Return to Control Center')}
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
          <span className="text-xs font-bold font-mono text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {t('Google Gemini Voice Workspace')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full space-y-8">
        {/* Sensor badges */}
        <div className="flex flex-wrap gap-2.5 justify-center max-w-xl text-center">
          {[
            { label: 'Crop', value: cropName, color: 'text-emerald-700' },
            { label: 'N', value: `${sensors.nitrogen} mg/kg`, color: 'text-blue-700' },
            { label: 'P', value: `${sensors.phosphorus} mg/kg`, color: 'text-purple-700' },
            { label: 'K', value: `${sensors.potassium} mg/kg`, color: 'text-amber-700' },
            { label: 'Moisture', value: `${sensors.soilMoisture}%`, color: 'text-teal-700' },
          ].map((b) => (
            <span key={b.label} className="bg-white border border-slate-200 shadow-2xs px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-700">
              {b.label}: <strong className={b.color}>{b.value}</strong>
            </span>
          ))}
        </div>

        {/* Voice ready indicator */}
        {!voicesReady && (
          <div className="text-xs text-amber-400/70 font-mono animate-pulse">
            ⏳ Loading voice engines…
          </div>
        )}

        {/* Waveform + Mic */}
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-end justify-center gap-1.5 h-16 w-64">
            {Array.from({ length: 9 }).map((_, i) => {
              if (listening) {
                return (
                  <motion.div
                    key={i}
                    animate={{ height: [12, 48, 12] }}
                    transition={{ repeat: Infinity, duration: 0.6 + i * 0.1, ease: 'easeInOut' }}
                    className={`w-2 rounded-full ${barColors[i % barColors.length]}`}
                  />
                );
              }
              if (speaking) {
                return (
                  <motion.div
                    key={i}
                    animate={{ height: [12, Math.random() * 40 + 15, 12] }}
                    transition={{ repeat: Infinity, duration: 0.4 + i * 0.05, ease: 'linear' }}
                    className="w-2 rounded-full bg-green-500"
                  />
                );
              }
              return <div key={i} className="w-2 h-3 rounded-full" style={{ background: 'rgba(39,174,96,0.20)' }} />;
            })}
          </div>

          <button
            onClick={startListening}
            disabled={!voicesReady && language !== 'English'}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl ${
              listening
                ? 'scale-110 shadow-red-500/30'
                : speaking
                ? 'animate-glow'
                : 'border border-green-800/50'
            }`}
            style={{
              background: listening
                ? 'linear-gradient(135deg, #c0392b, #e74c3c)'
                : speaking
                ? 'linear-gradient(135deg, #1e6b2f, #27ae60)'
                : 'linear-gradient(135deg, rgba(20,57,27,0.80), rgba(44,26,14,0.80))',
            }}
          >
            <Mic className={`w-10 h-10 ${listening ? 'text-white animate-pulse' : 'text-green-300'}`} />
          </button>

          <span className="text-xs text-green-300/60 font-mono tracking-wider block text-center">
            {t(listening ? 'Listening to your field query...' : speaking ? 'Speaking bot recommendations...' : 'Tap microphone to ask live crop advice')}
          </span>
        </div>

        {/* Response Panel */}
        <div className="w-full max-w-2xl bg-white rounded-3xl p-6 space-y-4 shadow-sm border border-slate-200 text-slate-900">
          <div>
            <span className="text-[10px] text-slate-500 font-mono uppercase font-bold block mb-1">
              {t('Your Voice Query')}
            </span>
            <div className="min-h-[48px] rounded-xl p-3 text-sm text-slate-900 bg-slate-50 border border-slate-200 font-medium">
              {voiceQuery || <span className="italic text-slate-400">"What is the best fertilizer mix given my current nitrogen level?"</span>}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-emerald-800 font-mono uppercase font-bold flex items-center gap-1">
                <Bot className="w-4 h-4 animate-pulse" /> {t('Voice Response')}
              </span>
              {voiceResponse && (
                <button
                  onClick={() => speakText(voiceResponse)}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1 cursor-pointer font-bold"
                >
                  <Volume2 className="w-3.5 h-3.5" /> {t('Replay Audio')}
                </button>
              )}
            </div>
            <div className="min-h-[100px] rounded-xl p-4 text-xs leading-relaxed text-slate-800 whitespace-pre-line font-mono bg-slate-50 border border-slate-200">
              {processing ? (
                <div className="flex items-center gap-2 text-emerald-700">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('AgriBot is thinking...')}</span>
                </div>
              ) : (
                voiceResponse || <span className="italic text-slate-400">Your spoken answer will appear and be read out loud here. Click "Ask Model" or speak to start.</span>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-700 rounded-xl p-3 text-xs font-mono bg-red-50 border border-red-200 font-semibold">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Text Input Fallback */}
        <div className="w-full max-w-2xl bg-white p-3 rounded-2xl flex gap-2 border border-slate-200 shadow-sm">
          <input
            type="text"
            placeholder={t('Type your query here instead of speaking...')}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && textInput.trim()) {
                setVoiceQuery(textInput.trim());
                processQuery(textInput.trim());
                setTextInput('');
              }
            }}
            className="flex-1 text-xs rounded-xl px-4 py-2 font-mono bg-slate-50 border border-slate-300 text-slate-900 outline-none focus:border-emerald-600"
          />
          <button
            onClick={() => {
              if (textInput.trim()) {
                setVoiceQuery(textInput.trim());
                processQuery(textInput.trim());
                setTextInput('');
              }
            }}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition shadow-sm"
          >
            {t('Ask Model')}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center py-4 text-xs font-mono border-t border-slate-200 text-slate-500 bg-white">
        Direct speech duplex loop calibrated over high-frequency audio matrices • Human 2 AI Edge
      </div>
    </motion.div>
  );
}
