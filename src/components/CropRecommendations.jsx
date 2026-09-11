import { crops } from '../data/crops';

export default function CropRecommendations({ npk, location, currentTemp, onSelectCrop, onAskGemini }) {
  // Calculate match scores based on NPK proximity
  const scored = crops.map((crop) => {
    const nDiff = Math.abs(npk.nitrogen - crop.nReq) / crop.nReq;
    const pDiff = Math.abs(npk.phosphorus - crop.pReq) / crop.pReq;
    const kDiff = Math.abs(npk.potassium - crop.kReq) / crop.kReq;
    const score = Math.max(0, 100 - (nDiff + pDiff + kDiff) * 33);
    return { ...crop, score: Math.round(score) };
  });

  const sorted = scored.sort((a, b) => b.score - a.score).slice(0, 8);

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div>
        <h3 className="font-display font-bold text-slate-800 text-lg">Crop Recommendations</h3>
        <p className="text-xs text-slate-500 font-medium">
          Based on NPK levels: N={npk.nitrogen} P={npk.phosphorus} K={npk.potassium} mg/kg
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sorted.map((crop) => (
          <div
            key={crop.name}
            className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-emerald-300 hover:shadow-md transition cursor-pointer"
            onClick={() => onSelectCrop(crop.name)}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{crop.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="text-sm font-bold text-slate-800">{crop.name}</div>
                  <div className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full ${
                    crop.score >= 80 ? "bg-emerald-100 text-emerald-700" :
                    crop.score >= 60 ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {crop.score}%
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">
                  {crop.category} • {crop.season}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Needs: N:{crop.nReq} P:{crop.pReq} K:{crop.kReq} • pH:{crop.soilpH}
                </div>
                <div className="flex gap-1.5 mt-2">
                  <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-mono">{crop.water} water</span>
                  <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-mono">{crop.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => onAskGemini(`Based on current NPK levels (N:${npk.nitrogen}, P:${npk.phosphorus}, K:${npk.potassium}), temperature ${currentTemp}°C in ${location}, what are the best crops to grow and why?`)}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer"
      >
        Ask Gemini AI for Detailed Analysis
      </button>
    </div>
  );
}
