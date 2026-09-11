import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { translate } from './data/translations';
import { fetchWeather } from './services/weatherService';
import { fetchThingSpeakData } from './services/thingspeakService';
import { setGeminiApiKey, getGeminiApiKey } from './services/geminiService';
import LoginView from './components/LoginView';
import LocationView from './components/LocationView';
import Dashboard from './components/Dashboard';
import VoiceAssistant from './components/VoiceAssistant';
import WorkspaceOverlay from './components/WorkspaceOverlay';
import SettingsModal from './components/SettingsModal';

export default function App() {
  // Auth state
  const [operatorName, setOperatorName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [detectingGPS, setDetectingGPS] = useState(false);

  // Language
  const [language, setLanguage] = useState("English");
  const t = (key) => translate(key, language);

  // Weather
  const [weather, setWeather] = useState(null);
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // Sensor telemetry
  const [sensors, setSensors] = useState({
    nitrogen: 135, phosphorus: 95, potassium: 145,
    humidity: 68, soilMoisture: 62, temperature: 28.4, pH: 6.5,
  });
  const [pumpStatus, setPumpStatus] = useState("OFF");
  const [lastProbe, setLastProbe] = useState(null);
  const [probing, setProbing] = useState(false);
  const [luxRating, setLuxRating] = useState(4500);

  // Crop
  const [cropName, setCropName] = useState("Tomato");
  const [editingCrop, setEditingCrop] = useState(false);

  // Irrigation
  const [irrigation, setIrrigation] = useState({
    autoMode: true, pumpStatus: "OFF", moistureThreshold: 45,
    flowRate: 3.2, nextSchedule: "06:00 AM", scheduledTime: "06:00",
  });

  // Pest control
  const [repellent, setRepellent] = useState({
    powerState: true, frequencyKhz: 28, mode: "Ultrasonic Sweep", ledStrobe: true,
  });
  const [vibMotor, setVibMotor] = useState({
    powerState: false, frequencyHz: 50, dutyCycle: 60, mode: "Pest Disruption",
  });

  // Chatbot
  const [chatMessages, setChatMessages] = useState([{
    id: "welcome", role: "assistant",
    content: "Welcome to **Seed to Circuit**! I am AgriBot, your personal agronomy assistant. Ask me questions about soil nutrients, tomato pathology, micro-irrigation circuits, or pest deterrent controllers.",
    timestamp: new Date(),
  }]);

  // UI state
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Fetch weather
  const loadWeather = async (city) => {
    setWeatherLoading(true);
    try {
      const result = await fetchWeather(city);
      if (result?.current) {
        setWeather(result.current);
        setWeatherHistory(result.history);
      }
    } catch (err) {
      console.error("Weather error:", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  // Fetch ThingSpeak
  const loadSensors = async () => {
    try {
      const data = await fetchThingSpeakData();
      if (data) {
        setSensors((prev) => ({
          ...prev,
          soilMoisture: data.soilMoisture ?? prev.soilMoisture,
          temperature: data.temperature ?? prev.temperature,
          humidity: data.humidity ?? prev.humidity,
          nitrogen: data.nitrogen ?? prev.nitrogen,
          phosphorus: data.phosphorus ?? prev.phosphorus,
          potassium: data.potassium ?? prev.potassium,
        }));
        if (data.pumpStatus) setPumpStatus(data.pumpStatus);
        if (data.pH) setSensors((p) => ({ ...p, pH: data.pH }));
        setLastProbe(data.timestamp);
      }
    } catch (err) {
      console.error("Sensor fetch error:", err);
    }
  };

  // Poll sensors every 15s when dashboard is active
  useEffect(() => {
    if (isLoggedIn && locationConfirmed) {
      loadSensors();
      const interval = setInterval(loadSensors, 15000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, locationConfirmed]);

  // Simulate pH and lux jitter
  useEffect(() => {
    if (!isLoggedIn || !locationConfirmed) return;
    const interval = setInterval(() => {
      setSensors((prev) => ({
        ...prev,
        pH: Math.round(Math.max(5.5, Math.min(8, prev.pH + (Math.random() > 0.5 ? 0.1 : -0.1))) * 10) / 10,
      }));
      setLuxRating((prev) => Math.round(Math.max(2000, Math.min(8000, prev + (Math.random() > 0.5 ? 150 : -150)))));
    }, 4000);
    return () => clearInterval(interval);
  }, [isLoggedIn, locationConfirmed]);

  // Login handler
  const handleLogin = (name) => {
    setOperatorName(name);
    setIsLoggedIn(true);
  };

  // Location handler
  const handleLocationConfirm = (city) => {
    setLocationName(city);
    setLocationConfirmed(true);
    loadWeather(city);
  };

  // GPS handler
  const handleGPSDetect = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setDetectingGPS(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const geo = await res.json();
          const addr = geo.address || {};
          const city = addr.city || addr.town || addr.village || addr.suburb || addr.state_district || "Coimbatore";
          setLocationInput(city);
        } catch {
          setLocationInput("Coimbatore");
        } finally {
          setDetectingGPS(false);
        }
      },
      () => {
        setDetectingGPS(false);
        alert("Could not access your location. Please enter it manually.");
      }
    );
  };

  // Force probe
  const handleForceProbe = async () => {
    setProbing(true);
    await loadSensors();
    setProbing(false);
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLocationConfirmed(false);
    setLocationName("");
    setWeather(null);
  };

  // Switch location
  const handleSwitchLocation = () => {
    setLocationConfirmed(false);
    setLocationName("");
    setLocationInput("");
    setWeather(null);
  };

  // Build sensor context for Gemini
  const sensorContext = {
    crop: cropName, location: locationName,
    ...sensors, pumpStatus,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative flex flex-col justify-between">
      {/* Background blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Workspace Overlay */}
      {activeWorkspace && (
        <WorkspaceOverlay
          workspace={activeWorkspace}
          onClose={() => setActiveWorkspace(null)}
          sensors={sensors}
          pumpStatus={pumpStatus}
          irrigation={irrigation}
          setIrrigation={setIrrigation}
          repellent={repellent}
          setRepellent={setRepellent}
          vibMotor={vibMotor}
          setVibMotor={setVibMotor}
          cropName={cropName}
          location={locationName}
          weather={weather}
          luxRating={luxRating}
          t={t}
          sensorContext={sensorContext}
          onAskGemini={(q) => {}}
          onSelectCrop={(c) => setCropName(c)}
        />
      )}

      {/* Voice Assistant */}
      <AnimatePresence>
        {voiceOpen && (
          <VoiceAssistant
            onClose={() => setVoiceOpen(false)}
            sensors={sensors}
            cropName={cropName}
            location={locationName}
            weather={weather}
            language={language}
            t={t}
            sensorContext={sensorContext}
          />
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      {settingsOpen && (
        <SettingsModal
          onClose={() => setSettingsOpen(false)}
          apiKey={getGeminiApiKey()}
          onSaveKey={(key) => setGeminiApiKey(key)}
        />
      )}

      {/* Main views */}
      <AnimatePresence mode="wait">
        {!isLoggedIn && (
          <LoginView key="login" onLogin={handleLogin} t={t} />
        )}

        {isLoggedIn && !locationConfirmed && (
          <LocationView
            key="location"
            operatorName={operatorName}
            locationInput={locationInput}
            setLocationInput={setLocationInput}
            onConfirm={handleLocationConfirm}
            onGPSDetect={handleGPSDetect}
            detectingGPS={detectingGPS}
            t={t}
          />
        )}

        {isLoggedIn && locationConfirmed && weather && (
          <Dashboard
            key="dashboard"
            operatorName={operatorName}
            locationName={locationName}
            language={language}
            setLanguage={setLanguage}
            weather={weather}
            weatherHistory={weatherHistory}
            sensors={sensors}
            pumpStatus={pumpStatus}
            lastProbe={lastProbe}
            probing={probing}
            onForceProbe={handleForceProbe}
            cropName={cropName}
            setCropName={setCropName}
            editingCrop={editingCrop}
            setEditingCrop={setEditingCrop}
            irrigation={irrigation}
            luxRating={luxRating}
            repellent={repellent}
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            onOpenVoice={() => setVoiceOpen(true)}
            onOpenWorkspace={setActiveWorkspace}
            onOpenSettings={() => setSettingsOpen(true)}
            onLogout={handleLogout}
            onSwitchLocation={handleSwitchLocation}
            sensorContext={sensorContext}
            t={t}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
