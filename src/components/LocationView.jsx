import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

export default function LocationView({ operatorName, locationInput, setLocationInput, onConfirm, onGPSDetect, detectingGPS, t }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (locationInput.trim()) onConfirm(locationInput.trim());
  };

  const quickCities = ["Coimbatore", "Salem", "Erode", "Ooty"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex items-center justify-center p-4 z-10"
    >
      <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-md w-full shadow-xl shadow-slate-200/60 relative">
        <div className="absolute top-2 right-4 text-xs font-mono text-emerald-600">
          {t("Connected")}: {operatorName}
        </div>

        <div className="text-center mb-6">
          <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-3 animate-bounce" />
          <h2 className="text-xl font-display font-semibold text-slate-800">
            {t("Geographic Calibration")}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {t("Enter your city or agricultural region to calibrate solar levels and weather trends")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1.5 font-bold font-mono">
              {t("Target City / Town")}
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Coimbatore"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 text-slate-800 transition placeholder-slate-400 font-medium font-mono text-center"
            />
            <div className="flex gap-1.5 justify-center mt-3 text-[11px] text-slate-500 font-mono">
              {quickCities.map((city, i) => (
                <span key={city}>
                  {i > 0 && <span className="mr-1.5">•</span>}
                  <span
                    className="cursor-pointer hover:text-emerald-600 underline"
                    onClick={() => setLocationInput(city)}
                  >
                    {city}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onGPSDetect}
            disabled={detectingGPS}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl transition border border-slate-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <MapPin className={`w-3.5 h-3.5 text-emerald-600 ${detectingGPS ? "animate-bounce text-amber-500" : ""}`} />
            <span>{t(detectingGPS ? "Tracing Field Coordinates..." : "Use Live GPS Location")}</span>
          </button>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {t("Calibrate & Boot Edge Board")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
