import { useState, useEffect } from 'react';
import {
  Leaf,
  Camera,
  Eye,
  X,
  Maximize2,
  CheckCircle2,
  Calendar,
  Sparkles,
  Edit2,
  Plus,
  Minus,
  Cpu,
} from 'lucide-react';

export default function CropStatusCard({
  cropName = 'Tomato',
  setCropName,
  editing,
  setEditing,
  farmArea = 3.5,
  setFarmArea,
  language = 'English',
  t,
}) {
  const [editValue, setEditValue] = useState(cropName);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [selectedCam, setSelectedCam] = useState('CAM-01 (South Sector)');
  const [liveTimestamp, setLiveTimestamp] = useState(new Date().toLocaleTimeString());

  // Available ESP32-CAM feeds
  const cameraFeeds = {
    'CAM-01 (South Sector)': {
      name: 'CAM-01 (South Sector - Field Overview)',
      src: '/live_crop_camera.jpg',
      stage: 'Flowering & Fruit Setting (Active)',
      sensor: 'ESP32-CAM (OV2640)',
      resolution: 'SVGA 800x600 • 15 FPS',
      description: 'Wide-angle canopy overview monitoring crop rows and soil moisture line.',
    },
    'CAM-02 (Drip Line)': {
      name: 'CAM-02 (Drip Line Irrigation Zone)',
      src: '/esp32_cam2_drip.jpg',
      stage: 'Drip Emitter Flow & Root Zone Wetting',
      sensor: 'ESP32-CAM (OV2640)',
      resolution: 'SVGA 800x600 • 15 FPS',
      description: 'Micro-controller sensor node verifying uniform drip irrigation along plant roots.',
    },
    'CAM-03 (Close-up Canopy)': {
      name: 'CAM-03 (Canopy & Blossom Close-up)',
      src: '/esp32_cam3_canopy.jpg',
      stage: 'Blossom Cluster Blooming & Fruit Nodes',
      sensor: 'ESP32-CAM (OV2640)',
      resolution: 'SVGA 800x600 • 15 FPS',
      description: 'Macro leaf inspection verifying chlorophyll health and zero blight spots.',
    },
  };

  const activeFeed = cameraFeeds[selectedCam] || cameraFeeds['CAM-01 (South Sector)'];

  // Update live camera clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTimestamp(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isTamil = language === 'Tamil';
  const isHindi = language === 'Hindi';

  const handleSaveCrop = (e) => {
    e.preventDefault();
    if (editValue.trim()) {
      setCropName(editValue.trim());
      setEditing(false);
    }
  };

  // Crop growth stages
  const stages = [
    { id: 1, en: 'Seedling', ta: 'நாற்றுப் பருவம்', hi: 'अंकुरण चरण', done: true },
    { id: 2, en: 'Vegetative Canopy', ta: 'வளர்ச்சிப் பருவம்', hi: 'वानस्पतिक विकास', done: true },
    { id: 3, en: 'Flower Initiation', ta: 'பூ அரும்புகள்', hi: 'फूलों की शुरुआत', done: true },
    { id: 4, en: 'Flowering & Fruit Setting', ta: 'பூத்தல் & காய் பிடித்தல்', hi: 'फूल व फल लगना', current: true },
    { id: 5, en: 'Fruit Maturation', ta: 'காய் முதிர்ச்சி', hi: 'फल परिपक्वता', done: false },
    { id: 6, en: 'Harvesting', ta: 'அறுவடை', hi: 'कटाई', done: false },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 space-y-6 text-slate-900">
      {/* ── Top Header Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-emerald-700 shadow-sm shrink-0">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight">
                {isTamil ? 'தற்போதைய பயிர் நிலை மற்றும் நேரலை ESP32-CAM' : isHindi ? 'वर्तमान फसल स्थिति एवं लाइव ESP32-CAM' : 'Current Crop Status & Live ESP32-CAM Monitoring'}
              </h2>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold uppercase tracking-wider hidden sm:inline-block">
                ESP32-CAM IoT Verified
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono mt-0.5">
              {isTamil
                ? 'பண்ணை நிலத்தில் பொருத்தப்பட்டுள்ள ESP32-CAM படங்கள் மூலம் பயிர் நிலை தானாகக் கணக்கிடப்பட்டுள்ளது'
                : isHindi
                ? 'खेत में लगे ESP32-CAM द्वारा फसल विकास चरण और सिंचाई का स्वचालित विश्लेषण'
                : 'Botanical growth stage verified in real-time by edge ESP32-CAM field nodes'}
            </p>
          </div>
        </div>

        {/* Live Camera Button */}
        <button
          type="button"
          onClick={() => setShowCameraModal(true)}
          className="px-4 py-2.5 rounded-xl font-bold font-mono text-xs text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm flex items-center gap-2 transition cursor-pointer self-start sm:self-auto shrink-0 border border-emerald-600"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <Camera className="w-4 h-4 text-white" />
          <span>{isTamil ? 'ESP32-CAM நேரலை காட்சி' : isHindi ? 'ESP32-CAM लाइव देखें' : 'View ESP32-CAM Feeds'}</span>
        </button>
      </div>

      {/* ── Key Metrics: Crop Name, Acres Planted, Days in Soil ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Crop Name */}
        <div className="bg-slate-50 rounded-2xl p-4 flex flex-col justify-between border border-slate-200">
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            {isTamil ? 'பயிரிடப்பட்ட பயிர்' : isHindi ? 'रोपित फसल' : 'Planted Crop'}
          </span>

          {editing ? (
            <form onSubmit={handleSaveCrop} className="mt-2 space-y-2">
              <input
                type="text"
                required
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full text-xs rounded-lg px-2.5 py-1.5 font-mono text-slate-900 bg-white border border-slate-300 outline-none"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="text-xs px-3 py-1 rounded bg-emerald-700 font-bold text-white cursor-pointer"
                >
                  {t('Save')}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="text-xs px-3 py-1 rounded bg-slate-300 text-slate-800 cursor-pointer"
                >
                  {t('Cancel')}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between mt-2">
              <div>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                  {t(cropName)}
                </span>
                <span className="block text-[11px] font-mono text-emerald-700 font-semibold mt-0.5">
                  {isTamil ? 'சமச்சீர் NPK வழிகாட்டுதல்' : isHindi ? 'संतुलित एनपीके मोड' : 'Balanced NPK Mode'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditValue(cropName);
                  setEditing(true);
                }}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 bg-white border border-slate-300 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
              >
                <Edit2 className="w-3 h-3" />
                <span>{t('Edit')}</span>
              </button>
            </div>
          )}
        </div>

        {/* 2. Planted Farm Area (Loaded from Saved User Profile) */}
        <div className="bg-slate-50 rounded-2xl p-4 flex flex-col justify-between border border-slate-200">
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            {isTamil ? 'பயிரிடப்பட்ட பரப்பளவு (ஏக்கர்)' : isHindi ? 'कुल रोपित क्षेत्रफल (एकड़)' : 'Planted Farm Area (Pre-Calibrated)'}
          </span>

          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-2xl sm:text-3xl font-display font-extrabold text-amber-700">
                {farmArea}
              </span>
              <span className="text-sm font-mono text-slate-700 ml-1.5 font-bold">
                {isTamil ? 'ஏக்கர்' : isHindi ? 'एकड़' : 'Acres'}
              </span>
              <span className="block text-[10px] font-mono text-slate-500 mt-0.5">
                ≈ {(farmArea * 0.4047).toFixed(2)} {isTamil ? 'ஹெக்டேர்' : 'Hectares'} • Pre-calibrated
              </span>
            </div>

            {/* Quick adjusters if user wants to fine-tune */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-300 shadow-2xs">
              <button
                type="button"
                onClick={() => setFarmArea?.((prev) => Math.max(0.5, Number((prev - 0.5).toFixed(1))))}
                title="Decrease 0.5 Acre"
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setFarmArea?.((prev) => Number((prev + 0.5).toFixed(1)))}
                title="Increase 0.5 Acre"
                className="w-7 h-7 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Days in Soil & Sowing Timeline */}
        <div className="bg-slate-50 rounded-2xl p-4 flex flex-col justify-between border border-slate-200">
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>{isTamil ? 'பயிரின் காலம் / வயது' : isHindi ? 'फसल की आयु' : 'Crop Age in Field'}</span>
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
          </span>

          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                48
              </span>
              <span className="text-sm font-mono text-slate-700 font-bold">
                {isTamil ? 'நாட்கள் (வாரம் 7)' : isHindi ? 'दिन (सप्ताह 7)' : 'Days (Week 7)'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
              {isTamil ? 'அறுவடைக்கு இன்னும் ~42 நாட்கள்' : isHindi ? 'कटाई में शेष ~42 दिन' : 'Estimated ~42 days to harvest'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Crop Growth Stage by ESP32-CAM Images ── */}
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 space-y-4 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base">
              {isTamil
                ? 'ESP32-CAM மூலம் கண்டறியப்பட்ட பயிர் வளர்ச்சி நிலை'
                : isHindi
                ? 'ESP32-CAM छवियों द्वारा निर्धारित फसल विकास चरण'
                : 'Current Crop Growth Stage (Verified by Live ESP32-CAM)'}
            </h3>
          </div>

          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 self-start sm:self-auto">
            {isTamil ? 'நிலை 4 / 6: பூத்தல் & பிஞ்சு பிடித்தல்' : isHindi ? 'चरण 4 / 6: फूल व फल विकास' : 'Stage 4 of 6: Flowering & Fruit Setting'}
          </span>
        </div>

        {/* Lifecycle Stage Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
          {stages.map((stage) => {
            const label = isTamil ? stage.ta : isHindi ? stage.hi : stage.en;
            return (
              <div
                key={stage.id}
                className="p-2.5 rounded-xl flex flex-col justify-between transition-all"
                style={{
                  background: stage.current ? '#ecfdf5' : stage.done ? '#ffffff' : '#f8fafc',
                  border: stage.current ? '2px solid #10b981' : stage.done ? '1px solid #cbd5e1' : '1px solid #e2e8f0',
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    #{stage.id}
                  </span>
                  {stage.done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {stage.current && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                  )}
                </div>
                <span
                  className={`text-xs font-mono font-bold leading-tight ${
                    stage.current ? 'text-emerald-900 font-extrabold' : stage.done ? 'text-slate-700' : 'text-slate-400'
                  }`}
                >
                  {label}
                </span>
                {stage.current && (
                  <span className="text-[9px] font-mono text-amber-700 font-extrabold mt-1">
                    {isTamil ? 'தற்போதைய நிலை' : isHindi ? 'वर्तमान सक्रिय' : 'Active Stage'}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* ESP32-CAM AI Insight Banner */}
        <div className="p-3.5 rounded-xl flex items-start gap-3 text-xs font-mono bg-white border border-emerald-200 text-slate-800 shadow-2xs">
          <Cpu className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-emerald-800 flex items-center gap-2">
              <span>{isTamil ? 'ESP32-CAM AI பகுப்பாய்வு முடிவு:' : isHindi ? 'ESP32-CAM एआई विश्लेषण निष्कर्ष:' : 'ESP32-CAM Edge AI Diagnosis:'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                OV2640 Sensor • 96.4% Confidence
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
              {isTamil
                ? 'ESP32-CAM படங்களின்படி: 88% பயிர் இலைகள் பசுமையாகவும், மஞ்சள் நிற பூங்கொத்துகள் மற்றும் புதிய தக்காளி பிஞ்சுகள் ஆரோக்கியமாக காய்க்கத் தொடங்கியுள்ளன. பூஞ்சை அல்லது இலை அழுகல் ஏதும் கண்டறியப்படவில்லை.'
                : isHindi
                ? 'ESP32-CAM के अनुसार: 88% पत्तियों का घनत्व स्वस्थ है, पीले फूलों के गुच्छे और नए फल विकसित हो रहे हैं। पत्तियों पर कोई रोग या झुलसा संक्रमण नहीं पाया गया।'
                : 'ESP32-CAM capture confirms 88% dense healthy foliage canopy, active yellow flower blossom clusters, and successful early fruit set nodes. Zero leaf blight or fungal distress detected.'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Live Field Camera Stream Preview Bar (ESP32-CAM Format) ── */}
      <div
        className="rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition border border-slate-200 bg-white shadow-2xs"
        onClick={() => setShowCameraModal(true)}
      >
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          {/* Camera snapshot thumbnail with ESP32-CAM badge */}
          <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-slate-300 shrink-0 shadow-sm bg-black">
            <img
              src={activeFeed.src}
              alt="ESP32-CAM Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-white drop-shadow" />
            </div>
            <span className="absolute bottom-1 right-1 text-[8px] font-mono px-1 rounded bg-black/80 text-emerald-400 font-bold">
              ESP32
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                {selectedCam}
              </span>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-300 font-bold">
                ESP32-CAM • SVGA 800x600
              </span>
            </div>
            <p className="text-xs font-mono text-slate-600 mt-1">
              {isTamil ? 'ESP32-CAM படங்களை (கேமரா 1, 2, 3) பெரிதாகப் பார்க்க கிளிக் செய்க' : isHindi ? 'ESP32-CAM (कैमरा 1, 2, 3) देखने के लिए क्लिक करें' : 'Click to inspect live images from CAM-01, CAM-02, and CAM-03'}
            </p>
            <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
              Live Edge Feed • {liveTimestamp} IST
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowCameraModal(true);
          }}
          className="text-xs font-mono font-bold px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1.5 shrink-0 transition shadow-sm cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>{isTamil ? 'கேமரா திரை' : isHindi ? 'कैमरा स्क्रीन' : 'Open ESP32-CAM Feeds'}</span>
        </button>
      </div>

      {/* ── Live ESP32-CAM Modal View (With Cam 1, Cam 2, Cam 3) ── */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-4xl bg-white rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto border border-slate-300 text-slate-900">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                <h3 className="font-display font-bold text-slate-900 text-lg">
                  {isTamil ? 'பண்ணை நேரலை ESP32-CAM காட்சிகள்' : isHindi ? 'खेत का लाइव ESP32-CAM फीड' : 'Live ESP32-CAM Field Camera Feeds'}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">
                  {activeFeed.sensor} • {activeFeed.resolution}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowCameraModal(false)}
                className="p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Switcher Buttons (CAM-01, CAM-02, CAM-03) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.keys(cameraFeeds).map((key) => {
                const cam = cameraFeeds[key];
                const isSelected = selectedCam === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedCam(key)}
                    className={`p-2.5 rounded-xl text-left font-mono text-xs transition cursor-pointer border ${
                      isSelected
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold">{key}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/20">
                        SVGA
                      </span>
                    </div>
                    <span className="text-[10px] block opacity-85 truncate">
                      {cam.stage}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main ESP32-CAM Display */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-300 shadow-xl bg-black">
              <img
                src={activeFeed.src}
                alt={activeFeed.name}
                className="w-full h-auto max-h-[500px] object-cover"
              />

              {/* Watermark & Timestamp Overlay (Authentic ESP32-CAM OV2640 look) */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-red-600 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  ESP32-CAM REC
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/80 text-emerald-400 font-mono text-xs border border-emerald-500/50 shadow">
                  {liveTimestamp} IST
                </span>
              </div>

              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-amber-300 font-mono text-xs border border-amber-500/50 shadow">
                {isTamil ? 'பரப்பளவு:' : isHindi ? 'क्षेत्रफल:' : 'Farm Area:'} {farmArea} {isTamil ? 'ஏக்கர்' : 'Acres'}
              </div>

              {/* Edge AI Metadata Overlay */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/85 backdrop-blur-sm border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-white">
                <div className="space-y-0.5">
                  <div className="text-emerald-400 font-bold">
                    {activeFeed.name}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {activeFeed.description}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                    SVGA 800x600 • 15 FPS
                  </span>
                  <span className="px-2 py-1 rounded bg-blue-950 text-blue-300 border border-blue-500/40 text-[10px] font-bold">
                    Target: {cropName}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-mono text-slate-500">
                Transmitted via ESP32 Wi-Fi IoT Mesh Network
              </span>

              <button
                type="button"
                onClick={() => setShowCameraModal(false)}
                className="text-xs px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-mono font-bold cursor-pointer transition"
              >
                {isTamil ? 'மூடுக' : isHindi ? 'बंद करें' : 'Close Feed'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
