export default function NPKGauges({ sensors, t }) {
  const gauges = [
    { label: 'Nitrogen',   value: sensors.nitrogen,   max: 200, color: '#e67e22', track: '#4a2c17', unit: 'mg/kg' },
    { label: 'Phosphorus', value: sensors.phosphorus,  max: 150, color: '#8e44ad', track: '#2c1a4a', unit: 'mg/kg' },
    { label: 'Potassium',  value: sensors.potassium,   max: 200, color: '#f39c12', track: '#4a3a17', unit: 'mg/kg' },
  ];

  return (
    <div className="glass-card rounded-3xl p-5 shadow-lg">
      <h3 className="font-display font-semibold text-green-100 mb-4">{t('NPK Analysis Gauges')}</h3>
      <div className="grid grid-cols-3 gap-4">
        {gauges.map((g) => {
          const pct = Math.min((g.value / g.max) * 100, 100);
          const radius = 36;
          const circ = 2 * Math.PI * radius;
          const offset = circ - (pct / 100) * circ;

          return (
            <div key={g.label} className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                  {/* Track */}
                  <circle cx="48" cy="48" r={radius} fill="none" stroke={g.track} strokeWidth="8" />
                  {/* Progress */}
                  <circle
                    cx="48" cy="48" r={radius} fill="none"
                    stroke={g.color} strokeWidth="8"
                    strokeDasharray={circ} strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease', filter: `drop-shadow(0 0 4px ${g.color}60)` }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-display font-extrabold text-green-100">{g.value}</span>
                  <span className="text-[9px] text-green-400/50 font-mono">{g.unit}</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-green-200/70 mt-1">{t(g.label)}</span>
              <span className="text-[10px] font-mono text-green-400/40">{Math.round(pct)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
