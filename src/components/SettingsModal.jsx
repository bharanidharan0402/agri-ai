import { useState } from 'react';
import { Settings, X } from 'lucide-react';

export default function SettingsModal({ onClose, apiKey, onSaveKey }) {
  const [key, setKey] = useState(apiKey || '');

  const handleSave = () => {
    onSaveKey(key.trim());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer transition p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-emerald-100 text-emerald-800 border border-emerald-300">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-900 text-base">Settings</h3>
            <p className="text-xs text-slate-500 font-mono">Configure API keys for AI features</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-700 mb-1.5 font-bold font-mono">
              Google Gemini API Key
            </label>
            <input
              type="password"
              placeholder="AIza..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full text-sm rounded-xl px-4 py-2.5 font-mono bg-slate-50 border border-slate-300 text-slate-900 outline-none focus:border-emerald-600 transition"
            />
            <p className="text-[11px] text-slate-500 mt-1 font-mono">
              Get your free key at{' '}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline font-semibold hover:text-emerald-900"
              >
                aistudio.google.com/apikey
              </a>
            </p>
          </div>

          <button
            onClick={handleSave}
            className="w-full text-sm font-bold py-2.5 rounded-xl transition cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
          >
            Save &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}
