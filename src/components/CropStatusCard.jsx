import { useState } from 'react';
import { Leaf } from 'lucide-react';

export default function CropStatusCard({ cropName, setCropName, editing, setEditing, t }) {
  const [editValue, setEditValue] = useState(cropName);

  const handleSave = (e) => {
    e.preventDefault();
    if (editValue.trim()) {
      setCropName(editValue.trim());
      setEditing(false);
    }
  };

  return (
    <div className="bg-emerald-900 border border-emerald-800 rounded-3xl p-5 shadow-sm flex flex-col justify-between text-white relative overflow-hidden">
      <div>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-display font-semibold text-white">{t("Current Crop Status")}</h3>
            <p className="text-xs text-emerald-200 mt-0.5">{t("Active botanical monitoring")}</p>
          </div>
          <div className="p-2 bg-emerald-800 rounded-lg text-emerald-300">
            <Leaf className="w-5 h-5" />
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="py-2 space-y-2">
            <input
              type="text"
              required
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full bg-emerald-950 border border-emerald-800 text-xs rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
            <div className="flex gap-1">
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-white text-[10px] font-bold px-2 py-1 rounded transition cursor-pointer">
                {t("Save")}
              </button>
              <button type="button" onClick={() => setEditing(false)} className="bg-emerald-800 hover:bg-emerald-700 text-slate-300 text-[10px] px-2 py-1 rounded transition cursor-pointer">
                {t("Cancel")}
              </button>
            </div>
          </form>
        ) : (
          <div className="py-2 flex items-center justify-between">
            <div>
              <div className="text-2xl font-display font-extrabold text-white">{cropName}</div>
              <span className="text-[10px] text-emerald-300 uppercase font-mono mt-0.5 block">
                GUIDELINE: BALANCED NPK MODE
              </span>
            </div>
            <button
              onClick={() => { setEditValue(cropName); setEditing(true); }}
              className="bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-700 text-xs px-3 py-1.5 rounded-lg transition font-semibold cursor-pointer"
            >
              {t("Edit")}
            </button>
          </div>
        )}
      </div>

      <div className="text-[10px] text-emerald-300 font-mono mt-1 pt-1 border-t border-emerald-800/60">
        {t("Target NPK Bounds: 120N - 90P - 150K")}
      </div>
    </div>
  );
}
