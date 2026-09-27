import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Compass, CheckCircle2, Search, Navigation } from 'lucide-react';

export default function LocationView({
  operatorName,
  locationInput,
  setLocationInput,
  onConfirm,
  onGPSDetect,
  detectingGPS,
  t,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = locationInput.trim() || 'Salem';
    onConfirm(target);
  };

  const quickDistricts = [
    { name: 'Salem', region: 'Tamil Nadu' },
    { name: 'Erode', region: 'Tamil Nadu' },
    { name: 'Coimbatore', region: 'Tamil Nadu' },
    { name: 'Tiruppur', region: 'Tamil Nadu' },
    { name: 'Namakkal', region: 'Tamil Nadu' },
    { name: 'Dindigul', region: 'Tamil Nadu' },
    { name: 'Madurai', region: 'Tamil Nadu' },
    { name: 'Thanjavur', region: 'Delta Region' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex items-center justify-center p-4 z-10 min-h-screen"
    >
      <div className="glass-card p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative overflow-hidden">
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ background: 'linear-gradient(90deg, #27ae60, #a0622b, #d4a76a)' }}
        />
        {/* Ambient Glow */}
        <div
          className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(39,174,96,0.12)' }}
        />

        {/* Connected badge */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1.5 text-xs font-mono text-green-300">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('Geographic Calibration')}</span>
          </div>
          <div className="text-xs font-mono text-green-400">
            {t('Connected')}: <strong className="text-amber-400">{operatorName}</strong>
          </div>
        </div>

        <div className="text-center mb-6">
          <div
            className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(30,107,47,0.5), rgba(74,44,23,0.5))',
              border: '1px solid rgba(39,174,96,0.3)',
            }}
          >
            <MapPin className="w-7 h-7 text-green-400 animate-bounce" />
          </div>
          <h2 className="text-2xl font-display font-bold text-green-100">
            {t('Calibrate Farm Location')}
          </h2>
          <p className="text-xs text-green-300/60 mt-1.5 font-mono leading-relaxed max-w-sm mx-auto">
            {t('Enter your city or agricultural region to calibrate solar levels and weather trends')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-green-400/80 mb-1.5 font-bold font-mono">
              {t('Target City / Town')}
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400/50" />
              <input
                type="text"
                required
                placeholder="e.g. Salem, Erode, Coimbatore"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="input-field w-full text-sm rounded-xl pl-10 pr-4 py-2.5 font-medium font-mono text-center"
              />
            </div>

            {/* Quick District selection badges */}
            <div className="mt-3">
              <div className="text-[10px] uppercase font-mono text-green-400/50 font-bold mb-1.5 text-center">
                Quick Select Farming Hubs (Tamil Nadu)
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {quickDistricts.map((d) => (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => setLocationInput(d.name)}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition cursor-pointer ${
                      locationInput.toLowerCase() === d.name.toLowerCase()
                        ? 'bg-green-600 text-white font-bold shadow'
                        : 'bg-green-950/60 text-green-300/80 hover:text-green-100 hover:bg-green-900/60 border border-green-800/30'
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* GPS Auto-detect Button */}
          <button
            type="button"
            onClick={onGPSDetect}
            disabled={detectingGPS}
            className="btn-secondary w-full text-xs font-bold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Navigation
              className={`w-3.5 h-3.5 text-green-400 ${detectingGPS ? 'animate-spin text-amber-400' : ''}`}
            />
            <span>
              {t(detectingGPS ? 'Tracing Field Coordinates...' : 'Use Live GPS Location')}
            </span>
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary w-full text-sm font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>{t('Calibrate & Boot Edge Board')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
