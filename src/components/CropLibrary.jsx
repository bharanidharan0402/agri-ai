import { useState } from 'react';
import { Search } from 'lucide-react';
import { crops, cropCategories } from '../data/crops';

export default function CropLibrary({ t }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = crops.filter((c) => {
    const matchName = c.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    return matchName && matchCat;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-display font-semibold text-slate-800">Crop Library</h3>
        <span className="text-[10px] font-mono text-slate-400">{filtered.length} crops</span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search crops..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-emerald-500 text-slate-700 font-mono"
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-1 flex-wrap">
        {cropCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-[10px] px-2.5 py-1 rounded-full font-bold transition cursor-pointer border ${
              category === cat
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50 hover:border-emerald-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Crop list */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filtered.map((crop) => (
          <div
            key={crop.name}
            className="flex items-center gap-3 bg-slate-50/50 border border-slate-100 rounded-xl p-3 hover:border-emerald-200 hover:bg-emerald-50/30 transition"
          >
            <span className="text-2xl">{crop.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-800">{crop.name}</div>
              <div className="text-[10px] text-slate-500 font-mono">
                {crop.category} • {crop.season} • {crop.duration}
              </div>
            </div>
            <div className="text-right text-[10px] font-mono text-slate-500 shrink-0">
              <div>N:{crop.nReq} P:{crop.pReq}</div>
              <div>K:{crop.kReq} pH:{crop.soilpH}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
