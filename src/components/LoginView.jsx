import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap } from 'lucide-react';

export default function LoginView({ onLogin, t }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onLogin(name.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex items-center justify-center p-4 z-10"
    >
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-8 shadow-xl shadow-slate-200/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />

        <div className="text-center mb-8 relative">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/30">
            <Leaf className="w-9 h-9 text-white stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {t("Seed to Circuit")}
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            {t("Smart Agronomy & IoT Edge Micro-Controller Dashboard")}
          </p>
        </div>

        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-xs text-slate-600 space-y-2 mb-6 leading-relaxed">
          <div className="flex items-center gap-2 text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
            <Zap className="w-3.5 h-3.5" />
            {t("Kongu Hackathon Demonstration")}
          </div>
          <p>{t("This platform coordinates live soil diagnostics, automated solenoid irrigation schedules, and pest sonic deterrent waves.")}</p>
          <p className="text-[11px] text-slate-500 italic">
            {t("Note: Security checks are in bypass mode. Simply enter your farmer name to activate the circuit board.")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1.5 font-bold font-mono">
              {t("Farmer / Operator Name")}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Sivasankar K"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-4 pr-4 py-2.5 focus:outline-none focus:border-emerald-500 text-slate-800 transition placeholder-slate-400 font-medium"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-3 px-4 rounded-xl transition duration-150 transform hover:scale-[1.01] shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            {t("Activate Control Board")}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
