export default function IrrigationPanel({ settings, onUpdate }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 max-w-md mx-auto">
      <div>
        <h3 className="font-display font-bold text-slate-800 text-lg">Micro-Irrigation Controller</h3>
        <p className="text-xs text-slate-500 font-medium">Solenoid valve & flow rate management</p>
      </div>

      {/* Auto/Manual Toggle */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div>
          <span className="text-sm font-semibold text-slate-800">Auto Mode</span>
          <p className="text-[10px] text-slate-500 font-mono">Moisture-triggered actuation</p>
        </div>
        <button
          onClick={() => onUpdate({ autoMode: !settings.autoMode })}
          className={`w-12 h-6 rounded-full transition-all duration-200 cursor-pointer relative ${
            settings.autoMode ? "bg-emerald-500" : "bg-slate-300"
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all duration-200 ${
            settings.autoMode ? "left-6" : "left-0.5"
          }`} />
        </button>
      </div>

      {/* Pump Status */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div>
          <span className="text-sm font-semibold text-slate-800">Pump Status</span>
          <p className="text-[10px] text-slate-500 font-mono">Manual override control</p>
        </div>
        <button
          onClick={() => onUpdate({ pumpStatus: settings.pumpStatus === "ON" ? "OFF" : "ON" })}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            settings.pumpStatus === "ON"
              ? "bg-emerald-500 text-white"
              : "bg-slate-200 text-slate-600"
          }`}
        >
          {settings.pumpStatus}
        </button>
      </div>

      {/* Moisture Threshold */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-semibold text-slate-700">Moisture Threshold</span>
          <span className="font-mono text-emerald-600 font-bold">{settings.moistureThreshold}%</span>
        </div>
        <input
          type="range"
          min="20"
          max="80"
          value={settings.moistureThreshold}
          onChange={(e) => onUpdate({ moistureThreshold: parseInt(e.target.value) })}
          className="w-full accent-emerald-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>20%</span><span>50%</span><span>80%</span>
        </div>
      </div>

      {/* Flow Rate */}
      <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
        <span className="text-[10px] text-blue-700 font-bold font-mono uppercase">Flow Rate</span>
        <div className="text-xl font-display font-extrabold text-slate-800 mt-1">
          {settings.flowRate} <span className="text-xs text-slate-500 font-normal">L/min</span>
        </div>
      </div>

      {/* Schedule */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-700">Next Irrigation Schedule</span>
        <input
          type="time"
          value={settings.scheduledTime}
          onChange={(e) => onUpdate({ scheduledTime: e.target.value, nextSchedule: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-emerald-500 font-mono"
        />
      </div>
    </div>
  );
}
