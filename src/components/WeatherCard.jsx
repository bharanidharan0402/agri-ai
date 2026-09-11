import { CloudRain } from 'lucide-react';

export default function WeatherCard({ weather, t }) {
  if (!weather) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl" />

      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-display font-semibold text-slate-800">{t("Localized Ambient Weather")}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{t("Atmospheric transceiver sensors")}</p>
        </div>
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
          <CloudRain className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 my-4">
        <span className="text-4xl font-display font-extrabold text-slate-800">{weather.temp}°C</span>
        <span className="text-xs text-slate-600 font-medium font-mono uppercase bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
          {weather.condition}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 font-mono text-center text-xs mt-2 pt-2 border-t border-slate-100">
        <div>
          <span className="text-slate-400 block text-[10px]">{t("Humidity")}</span>
          <span className="text-slate-700 font-bold">{weather.humidity}%</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">{t("Wind")}</span>
          <span className="text-slate-700 font-bold">{weather.windSpeed} km/h</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">{t("Rain Today")}</span>
          <span className="text-slate-700 font-bold">{weather.rainfallDaily} mm</span>
        </div>
      </div>
    </div>
  );
}
