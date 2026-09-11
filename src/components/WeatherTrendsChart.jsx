export default function WeatherTrendsChart({ history, t }) {
  if (!history || history.length === 0) return null;

  const data = history.slice(0, 6);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-display font-semibold text-slate-800">{t("Past 6 Months Weather Trends")}</h3>
          <p className="text-xs text-slate-500">{t("Microclimate historical seasonal chart")}</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 bg-blue-500/20 border border-blue-500 rounded" />
            <span className="text-slate-500">Rainfall (mm)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 bg-emerald-600 rounded-full" />
            <span className="text-slate-500">Temp (°C)</span>
          </div>
        </div>
      </div>

      <div className="relative h-60 w-full bg-slate-50 rounded-xl border border-slate-100 p-2 flex flex-col justify-between">
        <div className="flex-1 w-full relative">
          <svg className="w-full h-full" viewBox="0 0 600 180" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartTempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="chartRainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.03" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[30, 75, 120].map((y) => (
              <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4 4" />
            ))}
            <line x1="0" y1="165" x2="600" y2="165" stroke="#cbd5e1" strokeWidth="0.5" />

            {/* Rainfall bars */}
            {data.map((d, i) => {
              const x = 50 + i * 95;
              const barH = (d.rainfall / 300) * 140;
              const y = 165 - barH;
              return (
                <rect key={`bar-${i}`} x={x - 14} y={y} width="28" height={barH}
                  fill="url(#chartRainGrad)" stroke="#3b82f6" strokeWidth="1" rx="3" />
              );
            })}

            {/* Temperature area */}
            <path
              d={`M ${data.map((d, i) => `${50 + i * 95},${165 - (d.avgTemp / 40) * 140}`).join(" L ")} L ${50 + (data.length - 1) * 95},165 L 50,165 Z`}
              fill="url(#chartTempGrad)"
            />

            {/* Temperature line */}
            <path
              d={`M ${data.map((d, i) => `${50 + i * 95},${165 - (d.avgTemp / 40) * 140}`).join(" L ")}`}
              fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"
            />

            {/* Data points */}
            {data.map((d, i) => {
              const x = 50 + i * 95;
              const tempY = 165 - (d.avgTemp / 40) * 140;
              const rainY = 165 - (d.rainfall / 300) * 140;
              return (
                <g key={`point-${i}`}>
                  <circle cx={x} cy={tempY} r="5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                  <text x={x} y={tempY - 10} textAnchor="middle" fill="#334155" fontSize="9" fontWeight="bold" fontFamily="monospace">
                    {d.avgTemp}°C
                  </text>
                  <text x={x} y={rainY - 4} textAnchor="middle" fill="#2563eb" fontSize="8" fontFamily="monospace">
                    {d.rainfall}mm
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Month labels */}
        <div className="flex justify-between px-10 text-[10px] font-mono text-slate-500 border-t border-slate-200/60 pt-1.5">
          {data.map((d, i) => (
            <span key={i} className="w-16 text-center">{d.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
