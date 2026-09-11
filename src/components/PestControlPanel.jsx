export default function PestControlPanel({ repellent, vibMotor, onUpdateRepellent, onUpdateVibMotor }) {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Ultrasonic Repellent */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display font-bold text-slate-800 text-lg">Ultrasonic Repellent</h3>
            <p className="text-xs text-slate-500 font-medium">High-frequency pest deterrent module</p>
          </div>
          <button
            onClick={() => onUpdateRepellent({ powerState: !repellent.powerState })}
            className={`w-12 h-6 rounded-full transition-all duration-200 cursor-pointer relative ${
              repellent.powerState ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all duration-200 ${
              repellent.powerState ? "left-6" : "left-0.5"
            }`} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-purple-50/50 border border-purple-100 p-3 rounded-xl">
            <span className="text-[10px] text-purple-700 font-bold font-mono uppercase block mb-1">Frequency</span>
            <span className="text-lg font-display font-extrabold text-slate-800">{repellent.frequencyKhz} kHz</span>
          </div>
          <div className="bg-purple-50/50 border border-purple-100 p-3 rounded-xl">
            <span className="text-[10px] text-purple-700 font-bold font-mono uppercase block mb-1">Mode</span>
            <span className="text-xs font-bold text-slate-800">{repellent.mode}</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div>
            <span className="text-xs font-semibold text-slate-700">LED Strobe</span>
            <p className="text-[10px] text-slate-500 font-mono">Visual deterrent flash</p>
          </div>
          <button
            onClick={() => onUpdateRepellent({ ledStrobe: !repellent.ledStrobe })}
            className={`w-10 h-5 rounded-full transition-all duration-200 cursor-pointer relative ${
              repellent.ledStrobe ? "bg-amber-500" : "bg-slate-300"
            }`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow absolute top-0.5 transition-all duration-200 ${
              repellent.ledStrobe ? "left-5" : "left-0.5"
            }`} />
          </button>
        </div>
      </div>

      {/* Vibration Motor */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display font-bold text-slate-800 text-lg">Vibration Motor</h3>
            <p className="text-xs text-slate-500 font-medium">Ground-level pest disruption actuator</p>
          </div>
          <button
            onClick={() => onUpdateVibMotor({ powerState: !vibMotor.powerState })}
            className={`w-12 h-6 rounded-full transition-all duration-200 cursor-pointer relative ${
              vibMotor.powerState ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all duration-200 ${
              vibMotor.powerState ? "left-6" : "left-0.5"
            }`} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl">
            <span className="text-[10px] text-indigo-700 font-bold font-mono uppercase block mb-1">Freq</span>
            <span className="text-lg font-display font-extrabold text-slate-800">{vibMotor.frequencyHz} Hz</span>
          </div>
          <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl">
            <span className="text-[10px] text-indigo-700 font-bold font-mono uppercase block mb-1">Duty</span>
            <span className="text-lg font-display font-extrabold text-slate-800">{vibMotor.dutyCycle}%</span>
          </div>
          <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl">
            <span className="text-[10px] text-indigo-700 font-bold font-mono uppercase block mb-1">Mode</span>
            <span className="text-[10px] font-bold text-slate-800">{vibMotor.mode}</span>
          </div>
        </div>

        {/* Duty cycle slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-slate-700">Duty Cycle</span>
            <span className="font-mono text-indigo-600 font-bold">{vibMotor.dutyCycle}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={vibMotor.dutyCycle}
            onChange={(e) => onUpdateVibMotor({ dutyCycle: parseInt(e.target.value) })}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>
    </div>
  );
}
