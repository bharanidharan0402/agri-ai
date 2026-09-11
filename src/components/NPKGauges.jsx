export default function NPKGauges({ sensors, t }) {
  const gauges = [
    { label: "Nitrogen", value: sensors.nitrogen, max: 200, color: "#f97316", unit: "mg/kg" },
    { label: "Phosphorus", value: sensors.phosphorus, max: 150, color: "#3b82f6", unit: "mg/kg" },
    { label: "Potassium", value: sensors.potassium, max: 200, color: "#f59e0b", unit: "mg/kg" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
      <h3 className="font-display font-semibold text-slate-800 mb-4">NPK Analysis Gauges</h3>
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
                  <circle cx="48" cy="48" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  <circle
                    cx="48" cy="48" r={radius} fill="none"
                    stroke={g.color} strokeWidth="8"
                    strokeDasharray={circ} strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-display font-extrabold text-slate-800">{g.value}</span>
                  <span className="text-[9px] text-slate-500 font-mono">{g.unit}</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-600 mt-1">{g.label}</span>
              <span className="text-[10px] font-mono text-slate-400">{Math.round(pct)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
