import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mic,
  MapPin,
  LogOut,
  Settings,
  Menu,
  ChevronRight,
  Maximize2,
  Minimize2,
  ShieldAlert,
} from 'lucide-react';
import WeatherCard from './WeatherCard';
import CropStatusCard from './CropStatusCard';
import WeatherTrendsChart from './WeatherTrendsChart';
import SoilTelemetryGrid from './SoilTelemetryGrid';
import QuickActionButtons from './QuickActionButtons';
import ChatBot from './ChatBot';
import CropLibrary from './CropLibrary';
import SoilRatingPanel from './SoilRatingPanel';
import FertilizerPesticidePanel from './FertilizerPesticidePanel';
import AlertsSection from './AlertsSection';

export default function Dashboard({
  operatorName = 'Bharani',
  farmArea = 3.5,
  setFarmArea,
  locationName = 'Salem',
  language = 'English',
  setLanguage,
  weather,
  weatherHistory,
  weatherForecast,
  sensors,
  pumpStatus,
  onTogglePump,
  lastProbe,
  probing,
  onForceProbe,
  cropName = 'Tomato',
  setCropName,
  editingCrop,
  setEditingCrop,
  irrigation,
  luxRating,
  repellent,
  chatMessages,
  setChatMessages,
  onOpenVoice,
  onOpenWorkspace,
  onOpenSettings,
  onLogout,
  onSwitchLocation,
  sensorContext,
  t,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Synchronize fullscreen state
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable full-screen mode:', err);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const langs = ['English', 'Tamil', 'Hindi'];
  const langLabels = { English: 'EN', Tamil: 'தமிழ்', Hindi: 'हिंदी' };

  // Farmer's farm display name: Must be the name entered by the user (e.g. "Bharani Farm"), NOT "farmer Farm" or "farmers farm"
  const cleanFarmerName = operatorName
    ? operatorName.trim().charAt(0).toUpperCase() + operatorName.trim().slice(1)
    : 'Bharani';
  const farmerFarmDisplay = `${cleanFarmerName} ${t('Farm')}`;

  // Quick navigation menu matching the EXACT 1-to-1 sequence of details placed on the page
  const menuItems = [
    {
      id: 'alerts',
      targetId: 'section-alerts',
      label: t('Alert Section'),
      badge: 'Live',
    },
    {
      id: 'crop-status',
      targetId: 'section-crop-status',
      label: t('Current Crop Status'),
    },
    {
      id: 'telemetry',
      targetId: 'section-telemetry',
      label: t('Soil Sensory Telemetry'),
    },
    {
      id: 'weather',
      targetId: 'section-weather',
      label: t('Weather Data'),
    },
    {
      id: 'ratings',
      targetId: 'section-ratings',
      label: t('Ratings of Soil & Plant'),
    },
    {
      id: 'crop-library',
      targetId: 'section-crop-library',
      label:
        language === 'Tamil'
          ? 'இன்றைய பயிர் சந்தை விலைகள்'
          : language === 'Hindi'
          ? 'आज के फसल बाजार भाव'
          : "Today's Crop Prices",
    },
    {
      id: 'ai-assistant',
      targetId: 'section-ai-assistant',
      label: t('AI Assistant'),
    },
    {
      id: 'fertilizers-pesticides',
      targetId: 'section-fertilizers-pesticides',
      label: t('Fertilizers & Pesticides'),
    },
  ];

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('ring-2', 'ring-emerald-600', 'ring-offset-2', 'ring-offset-white');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-emerald-600', 'ring-offset-2', 'ring-offset-white');
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-3 sm:p-5 lg:p-6 w-full max-w-[1920px] mx-auto space-y-6 z-10 bg-white text-slate-900 min-h-screen"
    >
      {/* ── Top Header with White Background, Black Text, and Controls ── */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
        {/* Brand & Calibrated For Farmer's Specific Name */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm text-white bg-emerald-700 shadow-sm shrink-0">
            H2A
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight text-slate-900 uppercase leading-none">
              {t('Human 2 AI')}
            </h1>
            <p className="text-xs text-slate-600 mt-1 font-mono">
              {t('Calibrated for')}{' '}
              <span className="font-bold text-slate-900 underline decoration-emerald-600 decoration-2">
                {farmerFarmDisplay}
              </span>
            </p>
          </div>
        </div>

        {/* Center: Google AI Voice Agent */}
        <div className="flex-1 flex justify-center w-full lg:w-auto">
          <button
            type="button"
            onClick={onOpenVoice}
            className="px-5 py-2.5 rounded-full shadow-sm transition duration-150 flex items-center gap-2.5 font-bold text-xs sm:text-sm tracking-wide bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-300 cursor-pointer active:scale-95"
          >
            <Mic className="w-4 h-4 text-red-600" />
            <span>{t('Google AI Voice Agent')}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          </button>
        </div>

        {/* Right Corner Controls: Fullscreen, Alerts Quick Access, Language, Settings, Logout */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end flex-wrap">
          {/* Quick Top-Right Alert Pill */}
          <button
            type="button"
            onClick={() => scrollToSection('section-alerts')}
            title="View Urgent Alerts"
            className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            <span>Alerts</span>
          </button>

          {/* Full Screen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Full Screen' : 'View in Full Screen'}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-emerald-700" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <div className="flex p-0.5 rounded-xl bg-slate-100 border border-slate-200">
            {langs.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLanguage(l)}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition cursor-pointer font-mono ${
                  language === l
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {langLabels[l]}
              </button>
            ))}
          </div>

          {/* Switch Location */}
          <button
            type="button"
            onClick={onSwitchLocation}
            title="Switch Location"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-slate-700" />
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={onOpenSettings}
            title="Settings"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-700" />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            title="Logout"
            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Main Layout: Vertical Quick Navigation Menu on Left, Details One by One on Right ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ── Left Side: Always Visible Vertical Quick Navigation Menu (Sentences only, NO boxes) ── */}
        <aside className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-4 bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
          {/* Menu Title */}
          <div className="pb-3 border-b border-slate-200">
            <h3 className="font-display font-bold text-slate-900 text-base tracking-tight flex items-center gap-2">
              <Menu className="w-4 h-4 text-emerald-700" />
              <span>{t('Quick Navigation Menu')}</span>
            </h3>
            <p className="text-[11px] font-mono text-slate-500 mt-0.5">
              {language === 'Tamil'
                ? 'நேரடியாக பகுதிக்குச் செல்ல கிளிக் செய்க'
                : language === 'Hindi'
                ? 'सीधे अनुभाग पर जाने के लिए क्लिक करें'
                : 'Click any sentence to jump to section'}
            </p>
          </div>

          {/* Vertical Sentences List - Clean text without boxes, exactly matching the 1-to-1 order of details placed on page */}
          <nav className="space-y-1">
            {menuItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.targetId)}
                className="w-full text-left py-2 px-2.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 text-slate-800 hover:text-emerald-700 hover:bg-slate-50 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 group-hover:scale-125 transition-all shrink-0" />
                <span className="leading-snug flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-red-100 text-red-700 border border-red-200 shrink-0">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 ml-auto transition shrink-0" />
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Right Content Area: Details Shown One by One in EXACT Matching Sequence ── */}
        <main className="flex-1 w-full min-w-0 space-y-6">
          {/* 1. 🚨 Alert Section (Top Right Corner / Top of details for easy immediate view) */}
          <section id="section-alerts" className="scroll-mt-24 transition-all duration-300">
            <AlertsSection
              cropName={cropName}
              language={language}
              onOpenPathology={() => onOpenWorkspace('pathology')}
              t={t}
            />
          </section>

          {/* 2. 🌿 Current Crop Status (Acres Planted from saved profile, ESP32-CAM live feeds Cam 1, 2, 3) */}
          <section id="section-crop-status" className="scroll-mt-24 transition-all duration-300">
            <CropStatusCard
              cropName={cropName}
              setCropName={setCropName}
              editing={editingCrop}
              setEditing={setEditingCrop}
              farmArea={farmArea}
              setFarmArea={setFarmArea}
              language={language}
              t={t}
            />
          </section>

          {/* 3. 📊 Soil Sensory Telemetry (Timing, Moisture, NPK, Temperature, Pump Switch) */}
          <section id="section-telemetry" className="scroll-mt-24 transition-all duration-300">
            <SoilTelemetryGrid
              sensors={sensors}
              pumpStatus={pumpStatus}
              onTogglePump={onTogglePump}
              lastProbe={lastProbe}
              probing={probing}
              onForceProbe={onForceProbe}
              t={t}
            />
          </section>

          {/* 4. ⛅ Weather Data (Ambient Conditions, Day/Week/Month/Year Trends, Google Forecast) */}
          <section id="section-weather" className="space-y-6 scroll-mt-24 transition-all duration-300">
            <WeatherCard weather={weather} t={t} />

            <WeatherTrendsChart
              history={weatherHistory}
              weather={weather}
              dayByDay={weatherForecast?.dayByDay}
              hourlyForecast={weatherForecast?.hourlyForecast}
              weeklyTrends={weatherForecast?.weeklyTrends}
              yearlyData={weatherForecast?.yearlyData}
              language={language}
              t={t}
            />
          </section>

          {/* 5. ⭐ Ratings of Soil & Plant (Comprehensive Ratings with Rationale & Top 3 Recommended Crops) */}
          <section id="section-ratings" className="scroll-mt-24 transition-all duration-300">
            <SoilRatingPanel
              sensors={sensors}
              cropName={cropName}
              language={language}
              t={t}
            />
          </section>

          {/* 6. 🌾 Today's Crop Prices (Salem) (Spacious Layout, No Words Hidden, White Background) */}
          <section id="section-crop-library" className="scroll-mt-24 transition-all duration-300">
            <CropLibrary
              locationName={locationName}
              language={language}
              t={t}
            />
          </section>

          {/* 7. 🤖 AI Assistant (AgriBot Chat & Google Voice Integration) */}
          <section id="section-ai-assistant" className="scroll-mt-24 transition-all duration-300">
            <ChatBot
              messages={chatMessages}
              setMessages={setChatMessages}
              sensorContext={sensorContext}
              language={language}
              t={t}
            />
          </section>

          {/* 8. 🌿 Recommended Fertilizers & Pesticides Advisory with Direct Purchase Links */}
          <section id="section-fertilizers-pesticides" className="scroll-mt-24 transition-all duration-300">
            <FertilizerPesticidePanel
              cropName={cropName}
              language={language}
              t={t}
            />
          </section>

          {/* Quick Action Workspace Triggers */}
          <QuickActionButtons onOpenWorkspace={onOpenWorkspace} t={t} />

          {/* Footer */}
          <footer className="text-center py-4 text-xs font-mono text-slate-500 border-t border-slate-200">
            Human 2 AI • Smart Agronomy & IoT Edge Dashboard • Connected to Field Sensors & ESP32-CAM Nodes
          </footer>
        </main>
      </div>
    </motion.div>
  );
}
