import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Camera, EyeOff } from 'lucide-react';

export default function CameraMonitor({ luxRating, repellent, t }) {
  const [feedOnline, setFeedOnline] = useState(true);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="font-display font-bold text-slate-800 text-lg">{t("Edge Camera Stream")}</h3>
          <p className="text-xs text-slate-500 font-medium">Spectral crop analyzer (Virtual ESP32-Cam)</p>
        </div>
        <div className="flex gap-2">
          <a
            href="https://6a5a4cdfb58c690c53560155--tubular-lamington-0f40ab.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-bold transition flex items-center gap-1"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Launch TM App</span>
          </a>
          <button
            onClick={() => setFeedOnline(!feedOnline)}
            className={`text-xs px-2.5 py-1 rounded-md font-mono font-bold border transition cursor-pointer ${
              feedOnline
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-slate-100 text-slate-400 border-slate-200"
            }`}
          >
            {feedOnline ? "LIVE_FEED_ONLINE" : "FEED_OFFLINE"}
          </button>
        </div>
      </div>

      <div className="h-64 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between p-4 relative overflow-hidden">
        {feedOnline ? (
          <>
            <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-mono bg-emerald-600/90 text-white px-2.5 py-0.5 rounded-md animate-pulse z-10 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>REC [V-CAM-01]</span>
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-500 bg-white/80 border border-slate-100 px-2 py-0.5 rounded-sm z-10">
              IR FILTER: ON
            </div>

            <div className="flex-1 flex items-center justify-center relative">
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="text-center"
              >
                <Leaf className="w-24 h-24 text-emerald-600 mx-auto" />
                <span className="text-sm text-slate-600 font-semibold block mt-3">Growing Vine Stage (Tomato V3)</span>
              </motion.div>

              {/* Crosshair overlay */}
              <div className="absolute inset-0 border border-slate-200/25 pointer-events-none" />
              <div className="absolute left-1/2 top-0 bottom-0 border-l border-slate-200/25 pointer-events-none" />
              <div className="absolute top-1/2 left-0 right-0 border-t border-slate-200/25 pointer-events-none" />
            </div>

            <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 z-10 font-bold">
              <span>Foliage Index: 0.74 (Optimized)</span>
              <span>Lux Rating: {luxRating} lx</span>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs">
            <EyeOff className="w-10 h-10 text-slate-300 mb-3" />
            <span>Camera transceiver signal dropped.</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs text-slate-700">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mb-0.5">Spectral Health</span>
          <span className="font-bold font-mono text-emerald-600 text-sm">92% Chlorophyll Index</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mb-0.5">Active Repellents</span>
          <span className="font-bold font-mono text-purple-600 text-sm">
            {repellent.powerState ? "28kHz Sonic Wave Active" : "Disabled"}
          </span>
        </div>
      </div>
    </div>
  );
}
