import { CloudRain, Wind, Droplets, Umbrella } from 'lucide-react';

export default function WeatherCard({ weather, t }) {
  if (!weather) return null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 relative overflow-hidden text-slate-900">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-display font-bold text-slate-900 text-lg">{t('Localized Ambient Weather')}</h3>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">{t('Atmospheric transceiver sensors')}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 shadow-2xs">
          <CloudRain className="w-5 h-5 text-blue-600" />
        </div>
      </div>

      <div className="flex items-baseline gap-3 my-4">
        <span className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900">{weather.temp}°C</span>
        <span className="text-xs font-bold font-mono uppercase px-3 py-1 rounded-full bg-blue-50 border border-blue-300 text-blue-700">
          {weather.condition}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 font-mono text-center text-xs mt-3 pt-3 border-t border-slate-200">
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="text-slate-500 block text-[10px] uppercase font-bold flex items-center justify-center gap-1">
            <Droplets className="w-3 h-3 text-blue-500" />
            {t('Humidity')}
          </span>
          <span className="text-slate-900 font-extrabold text-sm mt-0.5 block">{weather.humidity}%</span>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="text-slate-500 block text-[10px] uppercase font-bold flex items-center justify-center gap-1">
            <Wind className="w-3 h-3 text-slate-600" />
            {t('Wind')}
          </span>
          <span className="text-slate-900 font-extrabold text-sm mt-0.5 block">{weather.windSpeed} km/h</span>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="text-slate-500 block text-[10px] uppercase font-bold flex items-center justify-center gap-1">
            <Umbrella className="w-3 h-3 text-blue-600" />
            {t('Rain Today')}
          </span>
          <span className="text-slate-900 font-extrabold text-sm mt-0.5 block">{weather.rainfallDaily} mm</span>
        </div>
      </div>
    </div>
  );
}
