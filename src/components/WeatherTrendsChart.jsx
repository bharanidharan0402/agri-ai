import { useState } from 'react';
import {
  Calendar,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  TrendingUp,
  Sparkles,
  Info,
} from 'lucide-react';

export default function WeatherTrendsChart({
  history,
  weather,
  dayByDay = [],
  hourlyForecast = [],
  weeklyTrends = [],
  yearlyData = [],
  language = 'English',
  t,
}) {
  const [activePeriod, setActivePeriod] = useState('day'); // 'day', 'week', 'month', 'year'
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  const isTamil = language === 'Tamil';
  const isHindi = language === 'Hindi';

  // Fallbacks if props are pending
  const defaultDays = dayByDay.length > 0 ? dayByDay : [
    { date: '2026-09-27', dayName: 'Today', maxTemp: 32, minTemp: 24, rainProb: 15, rainMm: 0.2, windSpeed: 14, condition: 'Partly Cloudy', icon: '⛅' },
    { date: '2026-09-28', dayName: 'Mon', maxTemp: 33, minTemp: 23, rainProb: 10, rainMm: 0.0, windSpeed: 12, condition: 'Sunny / Clear', icon: '☀️' },
    { date: '2026-09-29', dayName: 'Tue', maxTemp: 31, minTemp: 24, rainProb: 70, rainMm: 14.5, windSpeed: 18, condition: 'Rain Showers', icon: '🌧️' },
    { date: '2026-09-30', dayName: 'Wed', maxTemp: 28, minTemp: 22, rainProb: 85, rainMm: 32.0, windSpeed: 24, condition: 'Heavy Rain', icon: '⛈️' },
    { date: '2026-10-01', dayName: 'Thu', maxTemp: 29, minTemp: 23, rainProb: 50, rainMm: 8.5, windSpeed: 16, condition: 'Scattered Rain', icon: '🌦️' },
    { date: '2026-10-02', dayName: 'Fri', maxTemp: 31, minTemp: 24, rainProb: 20, rainMm: 1.0, windSpeed: 11, condition: 'Partly Cloudy', icon: '⛅' },
    { date: '2026-10-03', dayName: 'Sat', maxTemp: 33, minTemp: 24, rainProb: 10, rainMm: 0.0, windSpeed: 10, condition: 'Clear Sky', icon: '☀️' },
  ];

  const defaultWeekly = weeklyTrends.length > 0 ? weeklyTrends : [
    { week: 'Week 1', avgTemp: 29, rainfall: 38, sunHours: 7.2, status: 'Normal Growth' },
    { week: 'Week 2', avgTemp: 31, rainfall: 15, sunHours: 8.5, status: 'Clear / Dry' },
    { week: 'Week 3', avgTemp: 30, rainfall: 62, sunHours: 6.0, status: 'Heavy Showers' },
    { week: 'Week 4 (Current)', avgTemp: 30, rainfall: 45, sunHours: 7.5, status: 'Active Tillering' },
  ];

  const defaultMonthly = history && history.length > 0 ? history : [
    { month: 'Apr', rainfall: 35, avgTemp: 33 },
    { month: 'May', rainfall: 78, avgTemp: 34 },
    { month: 'Jun', rainfall: 115, avgTemp: 31 },
    { month: 'Jul', rainfall: 142, avgTemp: 30 },
    { month: 'Aug', rainfall: 168, avgTemp: 29 },
    { month: 'Sep', rainfall: 185, avgTemp: 29 },
  ];

  const defaultYearly = yearlyData.length > 0 ? yearlyData : [
    { month: 'Jan', temp: 24, rainfall: 12, season: 'Winter' },
    { month: 'Feb', temp: 27, rainfall: 8, season: 'Winter' },
    { month: 'Mar', temp: 31, rainfall: 15, season: 'Summer' },
    { month: 'Apr', temp: 34, rainfall: 35, season: 'Summer' },
    { month: 'May', temp: 36, rainfall: 78, season: 'Pre-Monsoon' },
    { month: 'Jun', temp: 33, rainfall: 115, season: 'Southwest' },
    { month: 'Jul', temp: 31, rainfall: 142, season: 'Southwest' },
    { month: 'Aug', temp: 30, rainfall: 168, season: 'Southwest' },
    { month: 'Sep', temp: 30, rainfall: 185, season: 'Transition' },
    { month: 'Oct', temp: 29, rainfall: 160, season: 'Northeast' },
    { month: 'Nov', temp: 27, rainfall: 95, season: 'Northeast' },
    { month: 'Dec', temp: 25, rainfall: 25, season: 'Winter' },
  ];

  const tabs = [
    { id: 'day', label: isTamil ? 'நாள் வாரியாக (7 நாட்கள்)' : isHindi ? 'दैनिक (7 दिन)' : 'Day by Day (7 Days)' },
    { id: 'week', label: isTamil ? 'வாரம் வாரியாக' : isHindi ? 'साप्ताहिक' : 'Weekly Trends' },
    { id: 'month', label: isTamil ? 'மாதம் வாரியாக (6 மாதங்கள்)' : isHindi ? 'मासिक (6 माह)' : 'Monthly Trends' },
    { id: 'year', label: isTamil ? 'ஆண்டு வானிலை சுழற்சி' : isHindi ? 'वार्षिक मौसम' : 'Yearly Climate' },
  ];

  const selectedDay = defaultDays[selectedDayIdx] || defaultDays[0];

  return (
    <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-200 space-y-5 relative overflow-hidden text-slate-900">
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-bold font-mono uppercase text-blue-700 tracking-wider">
              {isTamil ? 'கூகிள் வானிலை நேரலை முன்னறிவிப்பு' : isHindi ? 'गूगल मौसम भविष्य पूर्वानुमान' : 'Google Weather Live Forecast Engine'}
            </span>
          </div>
          <h3 className="font-display font-bold text-slate-900 text-lg">
            {isTamil
              ? 'வானிலை அறிக்கை & எதிர்கால முன்னறிவிப்பு'
              : isHindi
              ? 'मौसम रिपोर्ट एवं भविष्य पूर्वानुमान'
              : 'Weather Intelligence & Future Prediction'}
          </h3>
        </div>

        {/* Top Period Switcher Buttons (Day by Day / Week / Month / Year) */}
        <div className="flex p-1 rounded-2xl shrink-0 self-start sm:self-auto overflow-x-auto bg-slate-100 border border-slate-200">
          {tabs.map((tab) => {
            const isSelected = activePeriod === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActivePeriod(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap font-mono ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 1. DAY BY DAY (Google Weather 7-Day Forecast View) ── */}
      {activePeriod === 'day' && (
        <div className="space-y-4">
          {/* 7-Day Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {defaultDays.map((d, idx) => {
              const isSelected = selectedDayIdx === idx;
              return (
                <div
                  key={d.date}
                  onClick={() => setSelectedDayIdx(idx)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'border-2 border-blue-600 bg-blue-50/70 shadow-sm scale-[1.02]'
                      : 'border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[11px] font-bold font-mono text-slate-700">
                    {d.dayName}
                  </span>
                  <div className="text-2xl my-1">{d.icon}</div>
                  <div className="text-xs font-bold font-display text-slate-900">
                    {d.maxTemp}° <span className="text-slate-400 text-[10px] font-normal">{d.minTemp}°</span>
                  </div>

                  {/* Rain probability pill */}
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200">
                    <Droplets className="w-2.5 h-2.5 text-blue-600" />
                    <span>{d.rainProb}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Day Expanded Detail Card (Google Weather Style) */}
          <div className="rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="text-4xl p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                {selectedDay.icon}
              </div>
              <div>
                <div className="text-xs font-mono text-blue-700 font-bold uppercase">
                  {selectedDay.dayName} • {selectedDay.date}
                </div>
                <div className="text-2xl font-display font-extrabold text-slate-900">
                  {selectedDay.condition}
                </div>
                <div className="text-xs font-mono text-slate-600 mt-0.5">
                  High: <strong className="text-amber-700">{selectedDay.maxTemp}°C</strong> • Low: <strong className="text-blue-700">{selectedDay.minTemp}°C</strong>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center font-mono w-full md:w-auto">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Rainfall Prob.</span>
                <span className="text-sm font-extrabold text-blue-700">{selectedDay.rainProb}%</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">{selectedDay.rainMm} mm</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Wind Speed</span>
                <span className="text-sm font-extrabold text-slate-900">{selectedDay.windSpeed} km/h</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Gentle Breeze</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Solar / UV</span>
                <span className="text-sm font-extrabold text-amber-700">6.4 High</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Photosynthesis</span>
              </div>
            </div>
          </div>

          {/* Advisory Banner */}
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono flex items-start gap-2.5 text-slate-800">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-900">
                {isTamil ? 'விவசாய வானிலை வழிகாட்டுதல்:' : isHindi ? 'कृषि मौसम सलाह:' : 'Agronomy Weather Insight:'}{' '}
              </strong>
              {selectedDay.rainProb > 50
                ? isTamil
                  ? `இந்த நாளில் ${selectedDay.rainProb}% மழை பெய்ய வாய்ப்புள்ளதால் பூச்சிக்கொல்லி தெளிப்பு மற்றும் உரம் இடுவதை தள்ளி வைக்கவும்.`
                  : isHindi
                  ? `इस दिन ${selectedDay.rainProb}% बारिश की संभावना है, अतः कीटनाशक छिड़काव स्थगित रखें।`
                  : `High precipitation expected (${selectedDay.rainProb}%). Delay chemical foliar spraying and top-dress fertilizers.`
                : isTamil
                  ? `வானிலை சீராக உள்ளதால் இலைவழி உரம் தெளிக்கவும் மற்றும் பாசனம் செய்யவும் மிகச் சிறந்த நாள்.`
                  : isHindi
                  ? `मौसम साफ रहने की संभावना है। पोषण एवं सामान्य ड्रिप सिंचाई के लिए सर्वोत्तम समय है।`
                  : `Favorable atmospheric conditions. Ideal window for fertilizer foliar sprays and scheduled drip irrigation.`}
            </div>
          </div>
        </div>
      )}

      {/* ── 2. WEEK VIEW ── */}
      {activePeriod === 'week' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {defaultWeekly.map((w) => (
              <div
                key={w.week}
                className="p-4 rounded-2xl space-y-2 relative overflow-hidden bg-slate-50 border border-slate-200"
              >
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-slate-800">{w.week}</span>
                  <span className="text-[10px] text-emerald-700 font-bold">{w.status}</span>
                </div>
                <div className="text-2xl font-extrabold font-display text-slate-900">
                  {w.avgTemp}°C
                </div>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 pt-1 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span>Cumulative Rain:</span>
                    <strong className="text-blue-700">{w.rainfall} mm</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Sunshine:</span>
                    <strong className="text-amber-700">{w.sunHours} hrs/day</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. MONTH VIEW ── */}
      {activePeriod === 'month' && (
        <div className="space-y-4">
          <div className="flex justify-end gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded bg-blue-500" />
              <span className="text-slate-600 font-bold">Rainfall (mm)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full bg-emerald-600" />
              <span className="text-slate-600 font-bold">Temp (°C)</span>
            </div>
          </div>

          <div className="relative h-60 w-full rounded-2xl p-3 flex flex-col justify-between bg-slate-50 border border-slate-200">
            <div className="flex-1 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 600 180" preserveAspectRatio="none">
                {[30, 75, 120].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="600"
                    y2={y}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}
                <line x1="0" y1="165" x2="600" y2="165" stroke="#cbd5e1" strokeWidth="1" />

                {/* Rain Bars */}
                {defaultMonthly.map((d, i) => {
                  const x = 50 + i * 95;
                  const barH = (d.rainfall / 300) * 140;
                  const y = 165 - barH;
                  return (
                    <rect
                      key={`bar-${i}`}
                      x={x - 14}
                      y={y}
                      width="28"
                      height={barH}
                      fill="#93c5fd"
                      stroke="#3b82f6"
                      strokeWidth="1"
                      rx="3"
                    />
                  );
                })}

                {/* Temp Line */}
                <path
                  d={`M ${defaultMonthly.map((d, i) => `${50 + i * 95},${165 - (d.avgTemp / 40) * 140}`).join(' L ')}`}
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Temp Points */}
                {defaultMonthly.map((d, i) => {
                  const x = 50 + i * 95;
                  const y = 165 - (d.avgTemp / 40) * 140;
                  return (
                    <g key={`pt-${i}`}>
                      <circle cx={x} cy={y} r="4" fill="#16a34a" stroke="#ffffff" strokeWidth="2" />
                      <text x={x} y={y - 8} textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold" fontFamily="monospace">
                        {Math.round(d.avgTemp)}°
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Labels */}
            <div className="flex justify-between px-6 pt-2 font-mono text-xs text-slate-600 border-t border-slate-200">
              {defaultMonthly.map((d) => (
                <div key={d.month} className="text-center">
                  <div className="font-bold text-slate-800">{d.month}</div>
                  <div className="text-[10px] text-blue-600 font-bold">{d.rainfall}mm</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 4. YEAR VIEW ── */}
      {activePeriod === 'year' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {defaultYearly.map((y) => (
              <div
                key={y.month}
                className="p-3 rounded-xl space-y-1.5 bg-slate-50 border border-slate-200"
              >
                <div className="flex justify-between items-baseline font-mono">
                  <span className="font-bold text-slate-900">{y.month}</span>
                  <span className="text-[10px] text-amber-700 font-bold">{y.temp}°C</span>
                </div>
                <div className="text-[10px] font-mono text-blue-600 flex items-center gap-1 font-bold">
                  <Droplets className="w-2.5 h-2.5" />
                  <span>{y.rainfall} mm rain</span>
                </div>
                <div className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white text-slate-700 text-center border border-slate-200">
                  {y.season}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
