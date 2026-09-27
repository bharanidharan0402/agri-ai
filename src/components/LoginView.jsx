import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Eye, EyeOff, Lock, User, ShieldCheck } from 'lucide-react';

// Secure credential check — in production, replace with real backend auth
const VALID_CREDENTIALS = [
  { username: 'admin', password: 'agri@2024' },
  { username: 'farmer', password: 'human2ai' },
  { username: 'bharani', password: 'human2ai' },
];

function validateCredentials(name, password) {
  // Allow known credentials
  if (VALID_CREDENTIALS.some(c => c.username === name.toLowerCase() && c.password === password)) {
    return { ok: true };
  }
  // Allow any name with minimum 6-char password for personalized farmer login
  if (name.trim().length >= 2 && password.length >= 6) {
    return { ok: true };
  }
  if (password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' };
  }
  return { ok: false, error: 'Invalid credentials. Please try again.' };
}

export default function LoginView({ onLogin, t }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (locked) return;

    const result = validateCredentials(name, password);
    if (result.ok) {
      setError('');
      onLogin(name.trim());
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLocked(true);
        setError('Too many failed attempts. Please wait 30 seconds.');
        setTimeout(() => { setLocked(false); setAttempts(0); setError(''); }, 30000);
      } else {
        setError(result.error || `Invalid credentials. ${5 - newAttempts} attempt(s) remaining.`);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex items-center justify-center p-4 z-10 min-h-screen bg-slate-50"
    >
      {/* Card */}
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative overflow-hidden border border-slate-200">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-600 rounded-t-3xl" />

        {/* Logo & Title */}
        <div className="text-center mb-8 relative">
          <div className="w-16 h-16 bg-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-md mb-4">
            <Leaf className="w-8 h-8 text-white stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-slate-900">
            {t('Human 2 AI')}
          </h1>
          <p className="text-xs text-slate-600 mt-2 font-mono">
            {t('Smart Agronomy & IoT Edge Micro-Controller Dashboard')}
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-2 mb-6 border border-slate-200 leading-relaxed">
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Smart Farmer Access Portal</span>
          </div>
          <p className="text-slate-600">
            Enter your farmer name and password. Farm area and sensor coordinates are pre-calibrated to your profile.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-700 mb-1.5 font-bold font-mono">
              {t('Farmer / Operator Name')}
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                minLength={2}
                placeholder="e.g. Bharanidharan, Ramesh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={locked}
                className="w-full text-sm rounded-xl pl-10 pr-4 py-2.5 font-medium border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-700 mb-1.5 font-bold font-mono">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="Password (e.g. human2ai)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={locked}
                className="w-full text-sm rounded-xl pl-10 pr-11 py-2.5 font-mono border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-mono">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={locked}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide text-white bg-emerald-700 hover:bg-emerald-800 transition cursor-pointer shadow-md disabled:opacity-50 mt-2"
          >
            {locked ? 'Temporarily Locked' : t('Activate Control Board')}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
