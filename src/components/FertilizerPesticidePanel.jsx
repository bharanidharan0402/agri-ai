import { useState } from 'react';
import { Sprout, ShieldAlert, ShoppingCart, ExternalLink, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { getFertilizerRecommendations, getPesticideRecommendations } from '../data/fertilizerPesticideData';

export default function FertilizerPesticidePanel({ cropName = 'Tomato', language = 'English', t }) {
  const [activeTab, setActiveTab] = useState('fertilizers');

  const fertilizers = getFertilizerRecommendations(cropName, language);
  const pesticides = getPesticideRecommendations(cropName, language);

  const isTamil = language === 'Tamil';
  const isHindi = language === 'Hindi';

  // Localized UI labels
  const ui = {
    title: isTamil
      ? 'பரிந்துரைக்கப்பட்ட உரங்கள் & பூச்சிக்கொல்லி மருந்துகள்'
      : isHindi
      ? 'अनुशंसित उर्वरक एवं कीटनाशक सुरक्षा'
      : 'Recommended Fertilizers & Crop Protection',
    subtitle: isTamil
      ? `${cropName} பயிருக்கான உகந்த ஊட்டச்சத்து மற்றும் பூச்சி மேலாண்மை`
      : isHindi
      ? `${cropName} फसल के लिए पोषक तत्व एवं कीट नियंत्रण समाधान`
      : `Tailored agronomic nutrition and pest defense for ${cropName}`,
    tabFert: isTamil ? 'உரங்கள் பரிந்துரை' : isHindi ? 'उर्वरक सुझाव' : 'Fertilizers',
    tabPest: isTamil ? 'பூச்சிக்கொல்லிகள் & நோய் தடுப்பு' : isHindi ? 'कीटनाशक व रोग नियंत्रण' : 'Pesticides & Protection',
    dosageLabel: isTamil ? 'பயன்படுத்தும் முறை / அளவு:' : isHindi ? 'प्रयोग विधि एवं मात्रा:' : 'Application & Dosage:',
    purposeLabel: isTamil ? 'நோக்கம்:' : isHindi ? 'உद्देश्य:' : 'Target Benefit:',
    targetPestLabel: isTamil ? 'கட்டுப்படுத்தும் பூச்சிகள் / நோய்:' : isHindi ? 'लक्षित कीट / रोग:' : 'Target Pests / Disease:',
    buyBtn: isTamil ? 'ஆன்லைனில் வாங்குக' : isHindi ? 'ऑनलाइन खरीदें' : 'Buy Online',
    bestPrice: isTamil ? 'மதிப்பிடப்பட்ட விலை' : isHindi ? 'अनुमानित मूल्य' : 'Estimated Price',
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 space-y-6 text-slate-900">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-emerald-800">
              {isTamil ? 'அறிவார்ந்த பரிந்துரை' : isHindi ? 'स्मार्ट कृषि अनुशंसा' : 'Precision Agronomy Advisory'}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-display font-extrabold text-slate-900">
            {ui.title}
          </h3>
          <p className="text-xs text-slate-600 font-mono mt-0.5">
            {ui.subtitle}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-2xl bg-slate-100 border border-slate-200 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('fertilizers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'fertilizers'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>{ui.tabFert}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-black/20 text-white">
              {fertilizers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pesticides')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'pesticides'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{ui.tabPest}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-black/20 text-white">
              {pesticides.length}
            </span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === 'fertilizers' &&
          fertilizers.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-4 sm:p-5 bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3 transition-all duration-200 hover:border-emerald-500 hover:shadow-md"
            >
              <div>
                {/* Brand & Type Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md text-emerald-800 bg-emerald-100 border border-emerald-300 font-bold">
                    {item.brand}
                  </span>
                  <span className="text-xs font-mono text-amber-700 font-bold">
                    ★ {item.rating}
                  </span>
                </div>

                {/* Product Name */}
                <h4 className="text-base font-display font-bold text-slate-900 leading-snug">
                  {item.name}
                </h4>
                <span className="inline-block text-[11px] text-emerald-700 font-mono mt-0.5 font-medium">
                  {item.type}
                </span>

                {/* Purpose / Target Benefit */}
                <div className="mt-2.5 p-2.5 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs">
                  <div className="text-[10px] font-bold text-slate-500 uppercase font-mono mb-0.5">
                    {ui.purposeLabel}
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed font-sans">
                    {item.purpose}
                  </p>
                </div>

                {/* Dosage & Application */}
                <div className="mt-2.5 flex items-start gap-1.5 text-xs text-slate-700 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">{ui.dosageLabel}</span>{' '}
                    <span>{item.dosage}</span>
                  </div>
                </div>

                {/* Agronomy Description */}
                <p className="text-[11px] text-slate-500 font-mono mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Price & Purchase Link */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono uppercase">{ui.bestPrice}</div>
                  <div className="text-sm font-bold font-mono text-slate-900">{item.priceRange}</div>
                </div>

                <a
                  href={item.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition shadow-sm cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{ui.buyBtn}</span>
                  <ExternalLink className="w-3 h-3 text-emerald-200" />
                </a>
              </div>
            </div>
          ))}

        {activeTab === 'pesticides' &&
          pesticides.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-4 sm:p-5 bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3 transition-all duration-200 hover:border-amber-600 hover:shadow-md"
            >
              <div>
                {/* Brand & Rating Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md text-amber-800 bg-amber-100 border border-amber-300 font-bold">
                    {item.brand}
                  </span>
                  <span className="text-xs font-mono text-amber-700 font-bold">
                    ★ {item.rating}
                  </span>
                </div>

                {/* Product Name */}
                <h4 className="text-base font-display font-bold text-slate-900 leading-snug">
                  {item.name}
                </h4>
                <span className="inline-block text-[11px] text-amber-800 font-mono mt-0.5 font-medium">
                  {item.type}
                </span>

                {/* Target Pests */}
                <div className="mt-2.5 p-2.5 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs">
                  <div className="text-[10px] font-bold text-slate-500 uppercase font-mono mb-0.5">
                    {ui.targetPestLabel}
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed font-sans">
                    {item.targetPest}
                  </p>
                </div>

                {/* Dosage & Application */}
                <div className="mt-2.5 flex items-start gap-1.5 text-xs text-slate-700 font-mono">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">{ui.dosageLabel}</span>{' '}
                    <span>{item.dosage}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] text-slate-500 font-mono mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Price & Purchase Link */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono uppercase">{ui.bestPrice}</div>
                  <div className="text-sm font-bold font-mono text-slate-900">{item.priceRange}</div>
                </div>

                <a
                  href={item.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white transition shadow-sm cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{ui.buyBtn}</span>
                  <ExternalLink className="w-3 h-3 text-amber-200" />
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
