import { motion } from 'framer-motion';
import { Mic, MapPin, LogOut, Settings, Leaf } from 'lucide-react';
import WeatherCard from './WeatherCard';
import CropStatusCard from './CropStatusCard';
import WeatherTrendsChart from './WeatherTrendsChart';
import SoilTelemetryGrid from './SoilTelemetryGrid';
import QuickActionButtons from './QuickActionButtons';
import ChatBot from './ChatBot';
import NPKGauges from './NPKGauges';
import CropLibrary from './CropLibrary';

export default function Dashboard({
  operatorName, locationName, language, setLanguage,
  weather, weatherHistory, sensors, pumpStatus, lastProbe, probing,
  onForceProbe, cropName, setCropName, editingCrop, setEditingCrop,
  irrigation, luxRating, repellent,
  chatMessages, setChatMessages,
  onOpenVoice, onOpenWorkspace, onOpenSettings,
  onLogout, onSwitchLocation, sensorContext, t,
}) {
  const langs = ["English", "Tamil", "Hindi"];
  const langLabels = { English: "EN", Tamil: "தமிழ்", Hindi: "हिंदी" };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6 z-10 flex-1"
    >
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-emerald-600 p-5 rounded-2xl shadow-md text-white">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-emerald-600 font-bold text-xl shadow-inner">
            S2C
          </div>
          <div>
            <h1 className="text-xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
              {t("Seed to Circuit")}
            </h1>
            <p className="text-xs text-emerald-100 mt-1">
              {t("Calibrated for")}{" "}
              <span className="font-mono font-bold underline">{locationName}</span>
            </p>
          </div>
        </div>

        {/* Voice Agent Button */}
        <div className="flex-1 flex justify-center w-full lg:w-auto">
          <button
            onClick={onOpenVoice}
            className="bg-white hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800 px-6 py-3 rounded-full shadow-lg border border-emerald-100 transition duration-150 flex items-center gap-2.5 font-bold text-sm tracking-wide transform hover:scale-[1.03] active:scale-95 animate-pulse cursor-pointer"
          >
            <Mic className="w-5 h-5 text-rose-500" />
            <span>{t("Google AI Voice Agent")}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-end w-full lg:w-auto gap-3 text-xs">
          {/* Language Switcher */}
          <div className="flex bg-emerald-700/80 border border-emerald-500 p-1 rounded-full items-center">
            {langs.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-150 cursor-pointer ${
                  language === lang
                    ? "bg-white text-emerald-700 font-extrabold shadow-sm"
                    : "text-emerald-100 hover:text-white"
                }`}
              >
                {langLabels[lang]}
              </button>
            ))}
          </div>

          <div className="bg-emerald-500 border border-emerald-400 px-4 py-1.5 rounded-full text-white font-mono text-xs">
            ID: <span className="font-bold">{operatorName}</span>
          </div>

          <button onClick={onOpenSettings} className="bg-emerald-500 hover:bg-emerald-400 text-white border border-emerald-400 p-2 rounded-full transition cursor-pointer" title="Settings">
            <Settings className="w-4 h-4" />
          </button>

          <button onClick={onSwitchLocation} className="bg-emerald-500 hover:bg-emerald-400 text-white border border-emerald-400 p-2 rounded-full transition cursor-pointer" title="Switch Location">
            <MapPin className="w-4 h-4" />
          </button>

          <button onClick={onLogout} className="bg-emerald-700 hover:bg-emerald-800 text-white border border-emerald-500 px-4 py-1.5 rounded-full transition flex items-center gap-1.5 font-bold cursor-pointer">
            <LogOut className="w-4 h-4" />
            {t("Logout")}
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Weather + Crop Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeatherCard weather={weather} t={t} />
            <CropStatusCard
              cropName={cropName}
              setCropName={setCropName}
              editing={editingCrop}
              setEditing={setEditingCrop}
              t={t}
            />
          </div>

          {/* Weather Trends */}
          <WeatherTrendsChart history={weatherHistory} t={t} />

          {/* Soil Telemetry */}
          <SoilTelemetryGrid
            sensors={sensors}
            pumpStatus={pumpStatus}
            probing={probing}
            onForceProbe={onForceProbe}
            t={t}
          />

          {/* Quick Actions */}
          <QuickActionButtons onOpenWorkspace={onOpenWorkspace} t={t} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* NPK Gauges */}
          <NPKGauges sensors={sensors} t={t} />

          {/* Chatbot */}
          <ChatBot
            messages={chatMessages}
            setMessages={setChatMessages}
            sensorContext={sensorContext}
            language={language}
            t={t}
          />

          {/* Crop Library */}
          <CropLibrary t={t} />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-[10px] text-slate-400 font-mono border-t border-slate-200">
        Seed to Circuit v1.0 • Smart Agronomy & IoT Edge Dashboard • Kongu Engineering College
      </footer>
    </motion.div>
  );
}
