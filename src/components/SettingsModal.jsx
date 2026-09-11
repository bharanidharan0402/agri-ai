import { useState } from 'react';
import { Settings, X } from 'lucide-react';

export default function SettingsModal({ onClose, apiKey, onSaveKey }) {
  const [key, setKey] = useState(apiKey || "");

  const handleSave = () => {
    onSaveKey(key.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-800">Settings</h3>
            <p className="text-xs text-slate-500">Configure API keys for AI features</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1.5 font-bold font-mono">
              Google Gemini API Key
            </label>
            <input
              type="password"
              placeholder="AIza..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 text-slate-800 transition placeholder-slate-400 font-mono"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Get your free key at{" "}
              <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">
                aistudio.google.com/apikey
              </a>
            </p>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-2.5 rounded-xl transition cursor-pointer"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
