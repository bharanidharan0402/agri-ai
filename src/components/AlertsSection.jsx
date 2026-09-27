import { useState } from 'react';
import {
  CloudRain,
  Flame,
  Camera,
  ChevronDown,
  ChevronUp,
  X,
  Eye,
  ShieldAlert,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';

export default function AlertsSection({
  cropName = 'Tomato',
  language = 'English',
  onOpenPathology,
  t,
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'disasters', 'disease'
  const [dismissed, setDismissed] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  const isTamil = language === 'Tamil';
  const isHindi = language === 'Hindi';

  // Disaster alerts list
  const disasterAlerts = [
    {
      id: 'alert-flood',
      type: 'flood',
      severity: 'CRITICAL',
      icon: CloudRain,
      en: {
        title: 'Heavy Rainfall & Flash Flood Advisory',
        summary: '75-90 mm precipitation expected in next 24h across regional catchment basin.',
        action: 'Action Required: Dig drainage furrows around low-lying beds and disconnect surface pumps.',
        time: 'Updated 20 mins ago • Regional Met Dept',
      },
      ta: {
        title: 'கனமழை மற்றும் வெள்ள அபாய எச்சரிக்கை',
        summary: 'அடுத்த 24 மணி நேரத்தில் 75-90 மி.மீ வரை கனமழை பெய்ய வாய்ப்புள்ளது.',
        action: 'உடனடி நடவடிக்கை: வயல் வரப்புகளில் வடிகால் வாய்க்கால்களை திறந்துவிட்டு பம்புகளை பாதுகாக்கவும்.',
        time: '20 நிமிடங்களுக்கு முன் புதுப்பிக்கப்பட்டது • வானிலை ஆய்வு மையம்',
      },
      hi: {
        title: 'भारी वर्षा एवं संभावित बाढ़ चेतावनी',
        summary: 'अगले 24 घंटों में 75-90 मिमी मूसलाधार बारिश की संभावना है।',
        action: 'तत्काल कार्रवाई: खेतों में जल निकासी की नालियां खोलें और मोटरों को सुरक्षित रखें।',
        time: '20 मिनट पहले अपडेट किया गया • मौसम विभाग',
      },
    },
    {
      id: 'alert-drought',
      type: 'drought',
      severity: 'WARNING',
      icon: Flame,
      en: {
        title: 'Thermal Heat Stress & Soil Evaporation Alert',
        summary: 'Peak afternoon temperature reaching 35.2°C with high evapotranspiration.',
        action: 'Action Required: Provide light evening drip cycle to protect root rhizosphere.',
        time: 'Updated 1 hour ago • Soil Sensor Array',
      },
      ta: {
        title: 'வெப்ப அலை மற்றும் மண் நீர் ஆவியாதல் எச்சரிக்கை',
        summary: 'பிற்பகல் வெப்பநிலை 35.2°C ஐ எட்டும் என்பதால் மண்ணின் ஈரப்பதம் வேகமாக குறைய வாய்ப்புள்ளது.',
        action: 'உடனடி நடவடிக்கை: பயிர் வாடுவதைத் தடுக்க மாலையில் சொட்டு நீர் பாசனம் செய்யவும்.',
        time: '1 மணி நேரத்திற்கு முன் புதுப்பிக்கப்பட்டது',
      },
      hi: {
        title: 'गर्मी का तनाव एवं तीव्र वाष्पीकरण चेतावनी',
        summary: 'दोपहर का तापमान 35.2°C तक पहुंचेगा, जिससे मिट्टी की नमी तेजी से घटेगी।',
        action: 'तत्काल कार्रवाई: पौधों को सूखने से बचाने के लिए शाम को हल्की ड्रिप सिंचाई करें।',
        time: '1 घंटा पहले अपडेट किया गया',
      },
    },
  ];

  // AI Camera Disease Detection Alert
  const diseaseAlert = {
    id: 'alert-camera-disease',
    severity: 'URGENT',
    cameraNode: 'ESP32-CAM #01 (South Sector - Bed #4)',
    captureTime: 'Live capture 14 mins ago',
    confidence: '95.4% AI Match',
    damageArea: '38% Foliar Lesion Spread',
    imageUrl: '/crop_disease_camera.jpg',
    en: {
      title: 'AI Field Camera: Crop Disease Detected!',
      diseaseName: 'Tomato Early Blight (Alternaria solani)',
      symptom: 'Concentric dark brown target-board lesions with chlorotic yellow halo on leaf surface.',
      treatment: 'Recommended Treatment: Spray Mancozeb 75% WP (Dithane M-45) @ 2.5g/L or Copper Oxychloride 50% WP within 48h to prevent canopy collapse.',
    },
    ta: {
      title: 'வயல் கேமரா எச்சரிக்கை: பயிர் நோய் கண்டறியப்பட்டது!',
      diseaseName: 'தக்காளி முன் பருவ கருகல் நோய் (Alternaria solani)',
      symptom: 'இலையில் வளைய வடிவிலான கரும்பழுப்பு நிற புள்ளிகள் மற்றும் மஞ்சள் நிற வளையம் தோன்றியுள்ளது.',
      treatment: 'பரிந்துரைக்கப்படும் சிகிச்சை: 48 மணி நேரத்திற்குள் மேன்கோசெப் 75% WP (லிட்டருக்கு 2.5 கிராம்) அல்லது காப்பர் ஆக்ஸிகுளோரைடு தெளிக்கவும்.',
    },
    hi: {
      title: 'खेत कैमरा अलर्ट: फसल में रोग पाया गया!',
      diseaseName: 'टमाटर अगेती झुलसा रोग (Alternaria solani)',
      symptom: 'पत्तियों पर संकेंद्रित छल्लों वाले गहरे भूरे धब्बे और चारों ओर पीलापन देखा गया है।',
      treatment: 'अनुशंसित उपचार: फसल को बचाने के लिए 48 घंटे में मैंकोजेब 75% WP (2.5 ग्राम/लीटर) या कॉपर ऑक्सीक्लोराइड का छिड़काव करें।',
    },
  };

  const langKey = isTamil ? 'ta' : isHindi ? 'hi' : 'en';
  const visibleDisasters = disasterAlerts.filter((a) => !dismissed.includes(a.id));
  const hasDiseaseAlert = !dismissed.includes(diseaseAlert.id);
  const totalCount = visibleDisasters.length + (hasDiseaseAlert ? 1 : 0);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border-2 border-red-200 space-y-5 text-slate-900">
      {/* ── Header: Title & Urgent Status ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-red-600 shadow-sm shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight">
                {isTamil
                  ? 'விவசாய அவசர எச்சரிக்கை மையம்'
                  : isHindi
                  ? 'किसान आपदा एवं रोग चेतावनी केंद्र'
                  : 'Farmer Emergency & Disease Alert Center'}
              </h2>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-300 font-bold uppercase tracking-wider">
                {totalCount} {isTamil ? 'செயலில் உள்ளவை' : isHindi ? 'सक्रिय' : 'Active Alerts'}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono mt-0.5">
              {isTamil
                ? 'கனமழை, வெள்ளம் மற்றும் ESP32-CAM கேமரா மூலம் கண்டறியப்பட்ட பயிர் நோய் எச்சரிக்கைகள்'
                : isHindi
                ? 'भारी बारिश, बाढ़ एवं ESP32-CAM द्वारा पहचानी गई फसल बीमारियों का तुरंत समाधान'
                : 'Real-time disaster advisories & ESP32-CAM pathological disease detections'}
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
              activeTab === 'all'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isTamil ? 'அனைத்தும்' : isHindi ? 'सभी' : 'All'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('disasters')}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
              activeTab === 'disasters'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isTamil ? 'இயற்கை சீற்றம்' : isHindi ? 'आपदा' : 'Disasters'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('disease')}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
              activeTab === 'disease'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isTamil ? 'கேமரா நோய்' : isHindi ? 'कैमरा रोग' : 'Camera Disease'}
          </button>
        </div>
      </div>

      {/* ── Alerts Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. ESP32-CAM Disease Alert */}
        {hasDiseaseAlert && (activeTab === 'all' || activeTab === 'disease') && (
          <div className="rounded-2xl p-4 sm:p-5 bg-red-50/70 border border-red-300 space-y-3.5 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                </span>
                <span className="text-xs font-mono font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-red-600" />
                  <span>{diseaseAlert[langKey].title}</span>
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-600 text-white font-bold">
                {diseaseAlert.confidence}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 items-start">
              {/* Photo with Click-to-Zoom */}
              <div
                className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden border-2 border-red-300 shrink-0 cursor-pointer group bg-black shadow-sm"
                onClick={() => setShowImageModal(true)}
              >
                <img
                  src={diseaseAlert.imageUrl}
                  alt="Crop disease captured by ESP32-CAM"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                />
                <div className="absolute top-1.5 left-1.5 bg-black/80 text-white text-[8px] font-mono px-1.5 py-0.5 rounded">
                  ESP32-CAM #01
                </div>
                <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <Eye className="w-3 h-3 text-red-400" />
                  <span>Zoom</span>
                </div>
              </div>

              <div className="flex-1 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {diseaseAlert[langKey].diseaseName}
                </h3>
                <div className="text-[11px] font-mono text-red-700 font-semibold">
                  {diseaseAlert.cameraNode} • {diseaseAlert.damageArea}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  {diseaseAlert[langKey].symptom}
                </p>
              </div>
            </div>

            {/* Treatment & Action Required */}
            <div className="p-3 rounded-xl bg-white border border-red-200 text-xs font-mono text-slate-900 shadow-xs">
              <strong className="text-red-700 block mb-1">
                {isTamil ? 'உடனடி சிகிச்சை / பரிந்துரை:' : isHindi ? 'तुरंत उपचार सुझाव:' : 'Action Required:'}
              </strong>
              {diseaseAlert[langKey].treatment}
            </div>

            {onOpenPathology && (
              <button
                type="button"
                onClick={onOpenPathology}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold font-mono transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{isTamil ? 'முழு நோயியல் ஆய்வகத்தைத் திறக்க' : isHindi ? 'रोग निदान लैब खोलें' : 'Open Pathology Lab'}</span>
              </button>
            )}
          </div>
        )}

        {/* 2. Natural Disasters (Rainfall & Drought) */}
        {(activeTab === 'all' || activeTab === 'disasters') &&
          visibleDisasters.map((a) => {
            const IconComponent = a.icon;
            const isFlood = a.type === 'flood';
            return (
              <div
                key={a.id}
                className={`rounded-2xl p-4 sm:p-5 border space-y-3 flex flex-col justify-between ${
                  isFlood
                    ? 'bg-blue-50/60 border-blue-200'
                    : 'bg-amber-50/60 border-amber-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent
                        className={`w-5 h-5 ${isFlood ? 'text-blue-700' : 'text-amber-700'}`}
                      />
                      <h3 className="font-bold text-slate-900 text-base">
                        {a[langKey].title}
                      </h3>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold text-white ${
                        isFlood ? 'bg-blue-700' : 'bg-amber-700'
                      }`}
                    >
                      {a.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed mt-1 font-sans">
                    {a[langKey].summary}
                  </p>
                </div>

                {/* Action Required Box */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-900 shadow-xs">
                  <strong
                    className={`block mb-1 ${isFlood ? 'text-blue-700' : 'text-amber-700'}`}
                  >
                    {isTamil ? 'உடனடி பாதுகாப்பு நடவடிக்கை:' : isHindi ? 'आवश्यक सुरक्षा कदम:' : 'Emergency Protocol:'}
                  </strong>
                  {a[langKey].action}
                </div>

                <div className="text-[10px] font-mono text-slate-500 pt-1 flex items-center justify-between border-t border-slate-200">
                  <span>{a[langKey].time}</span>
                  <span className="font-bold text-slate-600">SMS & Voice Broadcast Sent</span>
                </div>
              </div>
            );
          })}
      </div>

      {/* ── Zoom Modal for ESP32-CAM Image ── */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="max-w-2xl w-full rounded-3xl p-5 sm:p-6 bg-white border border-slate-300 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-display">
                <Camera className="w-5 h-5 text-red-600" />
                <span>ESP32-CAM (OV2640) Leaf Pathology Capture</span>
              </div>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-black">
              <img
                src={diseaseAlert.imageUrl}
                alt="Enlarged crop disease leaf capture"
                className="w-full max-h-[60vh] object-cover"
              />
            </div>

            <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-slate-900">
              <strong className="text-red-700">Edge AI Diagnosis: </strong>
              Early Blight (Alternaria solani) • 38% foliar lesion spread • Mancozeb treatment recommended within 48h.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
