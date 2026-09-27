import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, MapPin, Store } from 'lucide-react';
import { cropMarketPrices } from '../data/cropMarketPrices';

export default function CropLibrary({ locationName = 'Salem', language = 'English', t }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const isTamil = language === 'Tamil';
  const isHindi = language === 'Hindi';

  const categories = ['All', 'Vegetable', 'Fruit', 'Spice', 'Pulse', 'Grain'];

  const filtered = cropMarketPrices.filter((c) => {
    const varietyName = isTamil ? c.taName : isHindi ? c.hiName : c.variety;
    const matchName =
      varietyName.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.variety.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    return matchName && matchCat;
  });

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 space-y-5 text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              {isTamil
                ? `இன்றைய பயிர் சந்தை விலைகள் (${locationName})`
                : isHindi
                ? `आज के फसल बाजार भाव (${locationName})`
                : `Today's Crop Prices (${locationName})`}
            </span>
          </h3>
          <p className="text-xs text-slate-600 font-mono mt-1">
            {isTamil
              ? 'முக்கிய விவசாய பொருட்களுக்கான நேரடி உழவர் சந்தை மற்றும் மண்டியின் முழு விவரங்கள்'
              : isHindi
              ? 'शीर्ष कृषि उत्पादों की दैनिक मंडी दरें एवं आवक'
              : 'Live mandi commodity benchmarks for regional agricultural products'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={isTamil ? 'பயிர்களைத் தேடுங்கள்...' : isHindi ? 'फसल खोजें...' : 'Search crop or variety...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs rounded-xl pl-9 pr-3 py-2.5 font-mono text-slate-900 bg-slate-50 border border-slate-300 placeholder-slate-400 outline-none focus:border-emerald-600 transition"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 flex-wrap items-center">
        {categories.map((cat) => {
          const isSelected = category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-bold font-mono transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {isTamil
                ? cat === 'All'
                  ? 'அனைத்தும்'
                  : cat === 'Vegetable'
                  ? 'காய்கறி'
                  : cat === 'Fruit'
                  ? 'பழம்'
                  : cat === 'Spice'
                  ? 'மசாலா'
                  : cat === 'Pulse'
                  ? 'பருப்பு'
                  : 'தானியம்'
                : isHindi
                ? cat === 'All'
                  ? 'सभी'
                  : cat === 'Vegetable'
                  ? 'सब्जी'
                  : cat === 'Fruit'
                  ? 'फल'
                  : cat === 'Spice'
                  ? 'मसाला'
                  : cat === 'Pulse'
                  ? 'दाल'
                  : 'अनाज'
                : cat}
            </button>
          );
        })}
        <span className="text-xs font-mono text-slate-500 ml-auto font-semibold">
          {filtered.length} {isTamil ? 'பயிர்கள் உள்ளன' : isHindi ? 'फसलें उपलब्ध' : 'Commodities'}
        </span>
      </div>

      {/* Commodity Market Cards Grid - Spacious layout where no text is clipped or hidden */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[560px] overflow-y-auto pr-1">
        {filtered.map((item) => {
          const displayName = isTamil ? item.taName : isHindi ? item.hiName : item.variety;
          const isUp = item.trendType === 'up';
          const isDown = item.trendType === 'down';

          return (
            <div
              key={item.id}
              className="rounded-2xl p-4 bg-slate-50 border border-slate-200 flex flex-col justify-between transition-all duration-200 hover:border-emerald-500 hover:shadow-md"
            >
              {/* Top Row: Category & Mandi Location */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full inline-block shrink-0 bg-slate-200 text-slate-800">
                  {item.category}
                </span>

                <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1 shrink-0">
                  <MapPin className="w-3 h-3 text-emerald-700" />
                  <span>{item.mandi.replace(' Central Uzhavar Sandhai', '').replace(' Uzhavar Sandhai', '')}</span>
                </span>
              </div>

              {/* Crop Variety Name - Fully visible, wraps cleanly without hiding any words */}
              <div className="text-base font-bold text-slate-900 leading-snug break-words my-1">
                {displayName}
              </div>

              {/* English Sub-Variety if in non-English mode for full clarity */}
              {(isTamil || isHindi) && (
                <div className="text-[11px] font-mono text-slate-500 leading-tight mb-2">
                  {item.variety}
                </div>
              )}

              {/* Price and Trend Row - Spacious layout */}
              <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold font-display text-slate-900">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono text-slate-600 font-semibold">
                      / {item.unit}
                    </span>
                  </div>

                  {/* Trend Badge */}
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 ${
                      isUp
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isDown
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-slate-200 text-slate-700 border border-slate-300'
                    }`}
                  >
                    {isUp && <TrendingUp className="w-3 h-3 text-emerald-700" />}
                    {isDown && <TrendingDown className="w-3 h-3 text-red-700" />}
                    {!isUp && !isDown && <Minus className="w-3 h-3 text-slate-600" />}
                    <span>{item.trend}</span>
                  </span>
                </div>

                {/* Footer Mandi & Daily Arrivals Info */}
                <div className="text-[10px] font-mono text-slate-600 pt-1 flex items-center justify-between border-t border-slate-200">
                  <span>{isTamil ? 'சந்தை வரத்து:' : isHindi ? 'दैनिक आवक:' : 'Arrivals:'} <strong className="text-emerald-700">{item.arrivals}</strong></span>
                  <span className="text-[9px] text-slate-500">{item.mandi}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
