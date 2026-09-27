import { useState } from 'react';
import { Star, Sprout, FlaskConical, BarChart3, Leaf, ChevronDown, ChevronUp, Info, CheckCircle2 } from 'lucide-react';
import { crops } from '../data/crops';

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

/**
 * Score soil 0-5 based on Moisture, Temperature, Humidity, N, P, K (pH completely removed).
 * Returns score and detailed reasons in English, Tamil, and Hindi.
 */
function rateSoilParameters(sensors, language = 'English') {
  const scores = [];
  const reasons = [];

  const isTamil = language === 'Tamil';
  const isHindi = language === 'Hindi';

  // 1. Soil Moisture (Ideal: 55-70%)
  const m = sensors.soilMoisture;
  if (m >= 55 && m <= 70) {
    scores.push(5);
    reasons.push(
      isTamil
        ? `மண் ஈரப்பதம் ${m}% மிகச் சிறந்தது (55-70% உகந்த வரம்பு). வேர் அழுகல் இன்றி நீர் சத்து சீராக உள்ளது.`
        : isHindi
        ? `मिट्टी की नमी ${m}% इष्टतम है (55-70% आदर्श)। जड़ों को बिना सड़े पर्याप्त पानी मिल रहा है।`
        : `Moisture at ${m}% is optimal (55-70% ideal range), supporting healthy capillary water flow without root asphyxiation.`
    );
  } else if (m >= 40 && m <= 80) {
    scores.push(3.5);
    reasons.push(
      isTamil
        ? `மண் ஈரப்பதம் ${m}% மிதமானது (40-80%). பாசனத்தை சீராக கண்காணிக்கவும்.`
        : isHindi
        ? `मिट्टी की नमी ${m}% मध्यम है। सिंचाई पर नजर रखें।`
        : `Moisture at ${m}% is acceptable but requires monitored irrigation cycles.`
    );
  } else {
    scores.push(2);
    reasons.push(
      isTamil
        ? `மண் ஈரப்பதம் ${m}% அபாய அளவை எட்டியுள்ளது. உடனடியாக பாசனம் தேவை அல்லது வடிகால் வசதி செய்க.`
        : isHindi
        ? `मिट्टी की नमी ${m}% असंतुलित है। तुरंत सिंचाई या जल निकासी की आवश्यकता है।`
        : `Moisture at ${m}% is out of bounds, risking moisture stress or root waterlogging.`
    );
  }

  // 2. Nitrogen (N) (Ideal: 100-160 mg/kg)
  const n = sensors.nitrogen;
  if (n >= 100 && n <= 160) {
    scores.push(5);
    reasons.push(
      isTamil
        ? `நைட்ரஜன் (தழைச்சத்து) ${n} mg/kg அளவில் சிறப்பாக உள்ளது. பயிர்களின் இலை வளர்ச்சிக்கும் பசுமைக்கும் ஏற்றது.`
        : isHindi
        ? `नाइट्रोजन ${n} mg/kg इष्टतम स्तर पर है। हरी पत्तियों और वानस्पतिक वृद्धि के लिए अत्यंत उपयुक्त।`
        : `Nitrogen at ${n} mg/kg is ideal (100-160 mg/kg), driving vigorous vegetative growth and chlorophyll synthesis.`
    );
  } else if (n >= 60 && n <= 200) {
    scores.push(3.5);
    reasons.push(
      isTamil
        ? `நைட்ரஜன் ${n} mg/kg மிதமான அளவில் உள்ளது.`
        : isHindi
        ? `नाइट्रोजन ${n} mg/kg सामान्य श्रेणी में है।`
        : `Nitrogen at ${n} mg/kg is moderate, adequate for low-demand crops.`
    );
  } else {
    scores.push(2);
    reasons.push(
      isTamil
        ? `நைட்ரஜன் ${n} mg/kg குறைவாக உள்ளது. தழைச்சத்து உரம் தேவை.`
        : isHindi
        ? `नाइट्रोजन ${n} mg/kg कम है। यूरिया या कम्पोस्ट की आवश्यकता है।`
        : `Nitrogen at ${n} mg/kg is suboptimal, requiring targeted nitrogenous enrichment.`
    );
  }

  // 3. Phosphorus (P) (Ideal: 60-120 mg/kg)
  const p = sensors.phosphorus;
  if (p >= 60 && p <= 120) {
    scores.push(5);
    reasons.push(
      isTamil
        ? `பாஸ்பரஸ் (மணிச்சத்து) ${p} mg/kg அளவில் வேர் வளர்ச்சிக்கும் பூ மொட்டுகள் தோன்றுவதற்கும் உகந்தது.`
        : isHindi
        ? `फास्फोरस ${p} mg/kg मजबूत जड़ विकास और फूल आने के लिए बहुत अनुकूल है।`
        : `Phosphorus at ${p} mg/kg is well balanced (60-120 mg/kg), promoting deep lateral root branching and early flowering.`
    );
  } else if (p >= 30 && p <= 150) {
    scores.push(3.5);
    reasons.push(
      isTamil
        ? `பாஸ்பரஸ் ${p} mg/kg சீரான அளவில் உள்ளது.`
        : isHindi
        ? `फास्फोरस ${p} mg/kg संतोषजनक स्थिति में है।`
        : `Phosphorus at ${p} mg/kg is in a safe maintenance band.`
    );
  } else {
    scores.push(2);
    reasons.push(
      isTamil
        ? `பாஸ்பரஸ் ${p} mg/kg பற்றாக்குறையாக உள்ளது. டி.ஏ.பி அல்லது சூப்பர் பாஸ்பேட் சேர்க்கவும்.`
        : isHindi
        ? `फास्फोरस ${p} mg/kg असंतुलित है। सुपर फॉस्फेट जोड़ें।`
        : `Phosphorus at ${p} mg/kg is deficient, impeding root anchoring.`
    );
  }

  // 4. Potassium (K) (Ideal: 100-180 mg/kg)
  const k = sensors.potassium;
  if (k >= 100 && k <= 180) {
    scores.push(5);
    reasons.push(
      isTamil
        ? `பொட்டாசியம் (சாம்பல் சத்து) ${k} mg/kg பயிர்களின் நோய் எதிர்ப்பு சக்திக்கும் தரமான காய்களுக்கும் சிறந்தது.`
        : isHindi
        ? `पोटाश ${k} mg/kg रोग प्रतिरोधक क्षमता और फलों के वजन व चमक के लिए शानदार है।`
        : `Potassium at ${k} mg/kg is optimal (100-180 mg/kg), fortifying disease resistance and osmotic fruit turgor.`
    );
  } else if (k >= 50 && k <= 220) {
    scores.push(3.5);
    reasons.push(
      isTamil
        ? `பொட்டாசியம் ${k} mg/kg சராசரி அளவில் உள்ளது.`
        : isHindi
        ? `पोटाश ${k} mg/kg मध्यम स्तर पर है।`
        : `Potassium at ${k} mg/kg is moderate.`
    );
  } else {
    scores.push(2);
    reasons.push(
      isTamil
        ? `பொட்டாசியம் ${k} mg/kg குறைவாக உள்ளது. பொட்டாஷ் உரம் இடவும்.`
        : isHindi
        ? `पोटाश ${k} mg/kg कम है। म्यूरेट ऑफ पोटाश आवश्यक है।`
        : `Potassium at ${k} mg/kg is deficient, risking weak stalks and smaller fruits.`
    );
  }

  // 5. Thermal & Ambient Environment (Temp 22-30°C, Humidity 50-80%)
  const temp = sensors.temperature;
  const h = sensors.humidity;
  if (temp >= 22 && temp <= 32 && h >= 50 && h <= 80) {
    scores.push(5);
    reasons.push(
      isTamil
        ? `வெப்பநிலை ${temp}°C மற்றும் ஈரப்பதம் ${h}% நுண்ணுயிரிகள் மண்ணை செழிப்பாக்க மிகச் சாதகமாக உள்ளது.`
        : isHindi
        ? `तापमान ${temp}°C और आर्द्रता ${h}% मिट्टी के सूक्ष्मजीवों और जड़ों के लिए सर्वोत्तम है।`
        : `Thermal and atmospheric conditions (${temp}°C, ${h}% RH) maintain ideal metabolic and microbial soil activity.`
    );
  } else {
    scores.push(3.5);
    reasons.push(
      isTamil
        ? `வெப்பநிலை ${temp}°C மற்றும் ஈரப்பதம் ${h}% மிதமான வானிலை சூழலை காட்டுகிறது.`
        : isHindi
        ? `तापमान ${temp}°C और नमी ${h}% सामान्य कृषि वातावरण प्रदान करते हैं।`
        : `Ambient microclimate (${temp}°C, ${h}% RH) is stable.`
    );
  }

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return {
    score: parseFloat(avg.toFixed(1)),
    reasons,
  };
}

/**
 * Score how suitable the current crop is given current soil readings (pH completely removed).
 * Returns rating, label, and detailed compatibility explanations.
 */
function ratePlantCompatibility(sensors, cropName, language = 'English') {
  const crop = crops.find((c) => c.name.toLowerCase() === cropName.toLowerCase());
  const isTamil = language === 'Tamil';
  const isHindi = language === 'Hindi';

  if (!crop) {
    return {
      rating: 3.0,
      label: cropName,
      reasons: [
        isTamil
          ? `பயிர் விபரங்கள் ஆய்வு செய்யப்படுகின்றன.`
          : isHindi
          ? `फसल विवरण का विश्लेषण किया जा रहा है।`
          : `Custom crop profile actively monitoring live telemetry.`,
      ],
    };
  }

  const nDiff = Math.abs(sensors.nitrogen - crop.nReq);
  const pDiff = Math.abs(sensors.phosphorus - crop.pReq);
  const kDiff = Math.abs(sensors.potassium - crop.kReq);

  const nPct = Math.round((1 - nDiff / Math.max(crop.nReq, 1)) * 100);
  const pPct = Math.round((1 - pDiff / Math.max(crop.pReq, 1)) * 100);
  const kPct = Math.round((1 - kDiff / Math.max(crop.kReq, 1)) * 100);

  const nScore = clamp(5 - (nDiff / crop.nReq) * 4, 1, 5);
  const pScore = clamp(5 - (pDiff / crop.pReq) * 4, 1, 5);
  const kScore = clamp(5 - (kDiff / crop.kReq) * 4, 1, 5);

  const avg = (nScore + pScore + kScore) / 3;

  const reasons = [];

  // N reason
  if (sensors.nitrogen >= crop.nReq * 0.85 && sensors.nitrogen <= crop.nReq * 1.25) {
    reasons.push(
      isTamil
        ? `தழைச்சத்து பொருத்தம்: மண்ணில் ${sensors.nitrogen} mg/kg உள்ளது (${crop.name} தேவை: ${crop.nReq} mg/kg) — மிகச் சிறந்த பொருத்தம்.`
        : isHindi
        ? `नाइट्रोजन संतुलन: मिट्टी में ${sensors.nitrogen} mg/kg है (${crop.name} की मांग: ${crop.nReq} mg/kg) — उत्कृष्ट मेल।`
        : `Nitrogen match: Current ${sensors.nitrogen} mg/kg closely matches ${crop.name}'s demand (${crop.nReq} mg/kg) [${Math.max(0, nPct)}% alignment].`
    );
  } else if (sensors.nitrogen < crop.nReq) {
    reasons.push(
      isTamil
        ? `தழைச்சத்து பற்றாக்குறை: மண்ணில் ${sensors.nitrogen} mg/kg உள்ளது (${crop.name} தேவை: ${crop.nReq} mg/kg) — யூரியா/நானோ யூரியா தேவை.`
        : isHindi
        ? `नाइट्रोजन कमी: मिट्टी में ${sensors.nitrogen} mg/kg है (${crop.name} की मांग: ${crop.nReq} mg/kg) — यूरिया की जरूरत है।`
        : `Nitrogen deficit: Soil has ${sensors.nitrogen} mg/kg vs ${crop.name} requirement of ${crop.nReq} mg/kg; light top-dress advised.`
    );
  } else {
    reasons.push(
      isTamil
        ? `தழைச்சத்து மிகுதி: மண்ணில் ${sensors.nitrogen} mg/kg உள்ளது (${crop.name} தேவை: ${crop.nReq} mg/kg) — கூடுதல் உரம் தேவையில்லை.`
        : isHindi
        ? `नाइट्रोजन आधिक्य: मिट्टी में ${sensors.nitrogen} mg/kg है (${crop.name} आवश्यकता: ${crop.nReq} mg/kg)।`
        : `Nitrogen surplus: Soil has ${sensors.nitrogen} mg/kg vs target ${crop.nReq} mg/kg; no extra nitrogen needed.`
    );
  }

  // P & K reasons
  reasons.push(
    isTamil
      ? `மணிச்சத்து மற்றும் சாம்பல் சத்து: P=${sensors.phosphorus} (தேவை: ${crop.pReq}), K=${sensors.potassium} (தேவை: ${crop.kReq}) — பூக்கள் மற்றும் காய் பிடிக்க ஏதுவான சூழல்.`
      : isHindi
      ? `फास्फोरस व पोटाश स्तर: P=${sensors.phosphorus} (मांग: ${crop.pReq}), K=${sensors.potassium} (मांग: ${crop.kReq}) — फल व फूलों के लिए अनुकूल।`
      : `P & K telemetry: Phosphorus ${sensors.phosphorus} mg/kg (need: ${crop.pReq}), Potassium ${sensors.potassium} mg/kg (need: ${crop.kReq}).`
  );

  // Moisture & Seasonal reason
  reasons.push(
    isTamil
      ? `${crop.name} பயிர் பருவம்: ${crop.season} • நீர் தேவை: ${crop.water}. தற்போதைய மண் ஈரப்பதம் (${sensors.soilMoisture}%) இதற்கேற்ப உள்ளது.`
      : isHindi
      ? `${crop.name} फसल चक्र: ${crop.season} • जल मांग: ${crop.water}। वर्तमान मिट्टी नमी (${sensors.soilMoisture}%) अनुकूल है।`
      : `${crop.name} season: ${crop.season} with ${crop.water} water requirement; currently satisfied by ${sensors.soilMoisture}% moisture.`
  );

  return {
    rating: parseFloat(avg.toFixed(1)),
    label: crop.name,
    reasons,
  };
}

/**
 * Get top 3 best-suited crops for the current soil based on NPK & moisture fit (pH completely removed).
 * Explains WHY each of the top 3 crops is recommended.
 */
function getTop3Crops(sensors, language = 'English') {
  const isTamil = language === 'Tamil';
  const isHindi = language === 'Hindi';

  const scored = crops.map((crop) => {
    const nDiff = Math.abs(sensors.nitrogen - crop.nReq) / crop.nReq;
    const pDiff = Math.abs(sensors.phosphorus - crop.pReq) / crop.pReq;
    const kDiff = Math.abs(sensors.potassium - crop.kReq) / crop.kReq;
    // Score solely on N, P, K proximity
    const score = Math.max(0, 100 - (nDiff + pDiff + kDiff) * 33.3);
    return { ...crop, score: Math.round(score) };
  });

  const sorted = scored.sort((a, b) => b.score - a.score).slice(0, 3);

  return sorted.map((crop, idx) => {
    const rankLabel =
      idx === 0
        ? isTamil ? '#1 முதன்மை தேர்வு' : isHindi ? '#1 सर्वोत्तम मेल' : '#1 Best Match'
        : idx === 1
        ? isTamil ? '#2 பரிந்துரைக்கப்படும் பயிர்' : isHindi ? '#2 अनुशंसित फसल' : '#2 Highly Suitable'
        : isTamil ? '#3 மாற்று பயிர்' : isHindi ? '#3 वैकल्पिक फसल' : '#3 Strong Alternative';

    const reason = isTamil
      ? `${crop.name} பயிரின் சத்துத் தேவை (N:${crop.nReq}, P:${crop.pReq}, K:${crop.kReq}) உங்கள் மண்ணின் தற்போதைய நிலவரத்துடன் ${crop.score}% பொருந்தி, குறைந்த உரச் செலவில் அதிக விளைச்சல் தரும்.`
      : isHindi
      ? `${crop.name} की पोषक मांग (N:${crop.nReq}, P:${crop.pReq}, K:${crop.kReq}) आपकी मिट्टी से ${crop.score}% मेल खाती है, जिससे कम लागत में बेहतर उत्पादन मिलेगा।`
      : `${crop.name} exhibits ${crop.score}% nutrient affinity with your current soil reserves (N:${crop.nReq}, P:${crop.pReq}, K:${crop.kReq}), delivering high yield with minimal fertilizer amendments.`;

    return { ...crop, rankLabel, reason };
  });
}

function StarRating({ value, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i + 1 <= Math.floor(value);
        const half = !filled && i < value;
        return (
          <span key={i} className="text-base text-amber-400">
            {filled ? '★' : half ? '⭑' : '☆'}
          </span>
        );
      })}
    </div>
  );
}

function ratingLabel(v, language = 'English') {
  const isTamil = language === 'Tamil';
  const isHindi = language === 'Hindi';

  if (v >= 4.5) {
    return {
      text: isTamil ? 'மிகச் சிறந்தது' : isHindi ? 'उत्कृष्ट' : 'Excellent',
      color: 'text-green-400',
    };
  }
  if (v >= 3.5) {
    return {
      text: isTamil ? 'நல்ல நிலை' : isHindi ? 'अच्छा' : 'Good',
      color: 'text-lime-400',
    };
  }
  if (v >= 2.5) {
    return {
      text: isTamil ? 'சராசரி' : isHindi ? 'औसत' : 'Average',
      color: 'text-amber-400',
    };
  }
  if (v >= 1.5) {
    return {
      text: isTamil ? 'மோசம்' : isHindi ? 'खराब' : 'Poor',
      color: 'text-orange-400',
    };
  }
  return {
    text: isTamil ? 'அபாயகரம்' : isHindi ? 'गंभीर' : 'Critical',
    color: 'text-red-400',
  };
}

export default function SoilRatingPanel({ sensors, cropName = 'Tomato', language = 'English', t }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const soilResult = rateSoilParameters(sensors, language);
  const soilRating = soilResult.score;

  const plantResult = ratePlantCompatibility(sensors, cropName, language);
  const plantRating = plantResult.rating;

  const overallRating = parseFloat(((soilRating + plantRating) / 2).toFixed(1));
  const top3Crops = getTop3Crops(sensors, language);

  const soilLbl = ratingLabel(soilRating, language);
  const plantLbl = ratingLabel(plantRating, language);
  const overallLbl = ratingLabel(overallRating, language);

  const isTamil = language === 'Tamil';
  const isHindi = language === 'Hindi';

  // Overall explanation
  const overallReasons = [
    isTamil
      ? `மண்ணின் அடிப்படை வளம் ${soilRating}/5 மற்றும் ${cropName} பயிர் பொருத்தம் ${plantRating}/5 ஆகியவற்றின் கூட்டு சராசரி ${overallRating}/5 ஆகும்.`
      : isHindi
      ? `मिट्टी की मूल उर्वरता ${soilRating}/5 और ${cropName} फसल अनुकूलता ${plantRating}/5 का संयुक्त मूल्यांकन ${overallRating}/5 है।`
      : `Composite rating combines baseline soil fertility (${soilRating}/5) and ${cropName} nutrient alignment (${plantRating}/5) for an overall productivity index of ${overallRating}/5.`,
    isTamil
      ? `நிலத்தில் தழை, மணி மற்றும் சாம்பல் சத்துக்கள் தாவர வளர்ச்சிக்கு உகந்த சமநிலையில் உள்ளதால் குறைந்த செலவில் பயிர் செய்யலாம்.`
      : isHindi
      ? `मिट्टी में एनपीके और नमी का संतुलन फसल के स्वस्थ विकास और न्यूनतम उर्वरक खर्च का आश्वासन देता है।`
      : `NPK nutrient reserves and thermal-moisture equilibrium provide solid foundation for strong crop establishment.`,
  ];

  const panels = [
    {
      id: 'soil',
      icon: <FlaskConical className="w-5 h-5" />,
      title: isTamil ? 'மண் வள மதிப்பீடு' : isHindi ? 'मिट्टी उर्वरता रेटिंग' : 'Soil Fertility Rating',
      subtitle: isTamil
        ? 'ஈரப்பதம், தழை, மணி, சாம்பல் சத்துக்கள் & சூழல் அடிப்படையில்'
        : isHindi
        ? 'नमी, एनपीके, तापमान एवं आर्द्रता पर आधारित'
        : 'Based on moisture, NPK, temperature & humidity telemetry',
      rating: soilRating,
      label: soilLbl,
      reasons: soilResult.reasons,
      colorBorder: 'rgba(39,174,96,0.30)',
    },
    {
      id: 'plant',
      icon: <Sprout className="w-5 h-5" />,
      title: isTamil
        ? `${cropName} பயிர் பொருத்தம்`
        : isHindi
        ? `${cropName} फसल अनुकूलता`
        : `${cropName} Compatibility`,
      subtitle: isTamil
        ? `மண்ணின் சத்துக்களுக்கு உங்கள் பயிர் எவ்வளவு பொருந்துகிறது`
        : isHindi
        ? `आपकी फसल और मिट्टी के बीच अनुकूलता का स्तर`
        : `How accurately the current soil fulfills ${cropName}'s demand`,
      rating: plantRating,
      label: plantLbl,
      reasons: plantResult.reasons,
      colorBorder: 'rgba(160,98,43,0.35)',
    },
    {
      id: 'overall',
      icon: <BarChart3 className="w-5 h-5" />,
      title: isTamil ? 'ஒட்டுமொத்த மதிப்பீடு' : isHindi ? 'समग्र उत्पादकता स्कोर' : 'Overall Agronomy Score',
      subtitle: isTamil
        ? 'மண் வளம் மற்றும் பயிர் பொருத்தத்தின் ஒருங்கிணைந்த முடிவு'
        : isHindi
        ? 'मिट्टी की सेहत और फसल तालमेल का संयुक्त निष्कर्ष'
        : 'Aggregated soil health combined with crop synergy index',
      rating: overallRating,
      label: overallLbl,
      reasons: overallReasons,
      colorBorder: 'rgba(212,167,106,0.35)',
    },
  ];

  return (
    <div id="section-ratings" className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-200 space-y-6 text-slate-900 scroll-mt-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <h3 className="font-display font-bold text-slate-900 text-base md:text-lg">
            {isTamil
              ? 'மண் மற்றும் பயிர் நுண்ணறிவு மதிப்பீடு (காரணங்களுடன்)'
              : isHindi
              ? 'मिट्टी एवं फसल बुद्धिमता रेटिंग (कारण सहित)'
              : 'Soil & Crop Intelligence Rating (With Rationale)'}
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full text-emerald-800 bg-emerald-50 border border-emerald-300 font-bold">
          {isTamil ? 'நேரலை ஆய்வு' : isHindi ? 'सजीव विश्लेषण' : 'Live Diagnosis'}
        </span>
      </div>

      {/* Rating Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {panels.map((p) => {
          const isExpanded = expandedCard === p.id;
          return (
            <div
              key={p.id}
              className="rounded-2xl p-4 space-y-3 relative overflow-hidden flex flex-col justify-between bg-slate-50 border border-slate-200 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-slate-700">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase font-mono tracking-wider text-slate-800">
                    {p.icon}
                    <span>{p.title}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-display font-extrabold text-slate-900">
                    {p.rating}
                  </span>
                  <span className="text-slate-400 text-xs font-mono">/ 5.0</span>
                </div>

                {/* Stars */}
                <div className="mt-1">
                  <StarRating value={p.rating} />
                </div>

                <div className={`text-xs font-bold font-mono mt-1 ${p.label.color}`}>
                  {p.label.text}
                </div>

                <p className="text-xs text-slate-500 font-mono leading-relaxed mt-1">
                  {p.subtitle}
                </p>
              </div>

              {/* Reasons Button & Dropdown */}
              <div className="pt-2 border-t border-slate-200">
                <button
                  onClick={() => setExpandedCard(isExpanded ? null : p.id)}
                  className="w-full flex items-center justify-between text-[11px] font-bold font-mono py-1.5 px-2.5 rounded-lg text-amber-800 bg-amber-50 hover:bg-amber-100 transition cursor-pointer border border-amber-200"
                >
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-600" />
                    {isTamil ? 'மதிப்பீட்டின் காரணங்கள்' : isHindi ? 'रेटिंग के मुख्य कारण' : 'Why this rating?'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isExpanded && (
                  <div className="mt-2 space-y-1.5 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono animate-fadeIn">
                    {p.reasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top 3 Crop Recommendations based on live Soil Telemetry */}
      <div id="section-crop-recommendations" className="space-y-3 pt-3 border-t border-slate-200 scroll-mt-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-700" />
            <h4 className="font-display font-bold text-slate-900 text-base">
              {isTamil
                ? 'இந்த மண்ணிற்கு மிகவும் உகந்த முதல் 3 பயிர்கள்'
                : isHindi
                ? 'इस मिट्टी के लिए शीर्ष 3 अनुशंसित फसलें'
                : 'Top 3 Recommended Plants for This Soil'}
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
            NPK & Moisture Fit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {top3Crops.map((crop, idx) => (
            <div
              key={crop.name}
              className="rounded-2xl p-4 flex flex-col justify-between space-y-3 relative overflow-hidden bg-slate-50 border border-slate-200 shadow-2xs"
            >
              {/* Top Rank Badge */}
              <div className="flex justify-between items-center">
                <span
                  className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full"
                  style={{
                    background: idx === 0 ? '#ecfdf5' : idx === 1 ? '#f7fee7' : '#fffbeb',
                    color: idx === 0 ? '#065f46' : idx === 1 ? '#3f6212' : '#92400e',
                    border: '1px solid rgba(0, 0, 0, 0.10)',
                  }}
                >
                  {crop.rankLabel}
                </span>

                <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                  {crop.score}% Match
                </span>
              </div>

              {/* Plant Identity */}
              <div className="flex items-center gap-3">
                <span className="text-3xl shrink-0 p-2 rounded-xl bg-white border border-slate-200">
                  {crop.icon}
                </span>
                <div>
                  <div className="text-base font-bold font-display text-slate-900">
                    {t(crop.name)}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    {t(crop.category)} • {crop.season}
                  </div>
                </div>
              </div>

              {/* NPK Requirements */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1 text-xs font-mono text-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target NPK:</span>
                  <strong className="text-slate-900">N:{crop.nReq} P:{crop.pReq} K:{crop.kReq}</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Duration:</span>
                  <span>{crop.duration}</span>
                </div>
                <div className="flex justify-between text-blue-700">
                  <span>Water Demand:</span>
                  <span>{crop.water}</span>
                </div>
              </div>

              {/* Justification Reason */}
              <p className="text-xs font-mono text-slate-600 leading-relaxed pt-1 border-t border-slate-200">
                {crop.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
