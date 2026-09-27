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

import { getFarmerProfile } from './data/farmerProfiles';

export default function App() {
  // Auth state
  const [operatorName, setOperatorName] = useState("");
  const [farmArea, setFarmArea] = useState(3.5);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locationName, setLocationName] = useState("Salem");
  const [locationInput, setLocationInput] = useState("Salem");
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [detectingGPS, setDetectingGPS] = useState(false);

  // Language
  const [language, setLanguage] = useState("English");
  const t = (key) => translate(key, language);

  // Weather
  const [weather, setWeather] = useState(null);
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState({
    dayByDay: [],
    hourlyForecast: [],
    weeklyTrends: [],
    yearlyData: [],
  });

  // Sensor telemetry
  const [sensors, setSensors] = useState({
    nitrogen: 135, phosphorus: 95, potassium: 145,
    humidity: 68, soilMoisture: 58, temperature: 28.4,
  });
  const [pumpStatus, setPumpStatus] = useState("OFF");
  const [lastProbe, setLastProbe] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  );
  const [probing, setProbing] = useState(false);
  const [luxRating, setLuxRating] = useState(4500);

  // Crop
  const [cropName, setCropName] = useState("Tomato");
  const [editingCrop, setEditingCrop] = useState(false);

  // Irrigation
  const [irrigation, setIrrigation] = useState({
    autoMode: false, pumpStatus: "OFF", moistureThreshold: 45,
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
    content: "Welcome to **Human 2 AI**! I am AgriBot, your personal agronomy assistant. Ask me questions about soil nutrients, tomato pathology, micro-irrigation circuits, or pest deterrent controllers.",
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
        setWeatherHistory(result.history || []);
        setWeatherForecast({
          dayByDay: result.dayByDay || [],
          hourlyForecast: result.hourlyForecast || [],
          weeklyTrends: result.weeklyTrends || [],
          yearlyData: result.yearlyData || [],
        });
      }
    } catch (err) {
      console.error("Weather error:", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  // Fetch ThingSpeak (Pump is 100% user-controlled: background sensor polling NEVER turns it on)
  const loadSensors = async () => {
    try {
      const data = await fetchThingSpeakData();
      if (data) {
        setSensors((prev) => ({
          ...prev,
          soilMoisture: data.soilMoisture != null ? data.soilMoisture : prev.soilMoisture,
          temperature: data.temperature ?? prev.temperature,
          humidity: data.humidity ?? prev.humidity,
          nitrogen: data.nitrogen ?? prev.nitrogen,
          phosphorus: data.phosphorus ?? prev.phosphorus,
          potassium: data.potassium ?? prev.potassium,
        }));
        // Update timing when reading was collected from the sensors
        setLastProbe(data.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
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

  // Simulate ambient lux variation
  useEffect(() => {
    if (!isLoggedIn || !locationConfirmed) return;
    const interval = setInterval(() => {
      setLuxRating((prev) => Math.round(Math.max(2000, Math.min(8000, prev + (Math.random() > 0.5 ? 150 : -150)))));
    }, 4000);
    return () => clearInterval(interval);
  }, [isLoggedIn, locationConfirmed]);

  // Login handler - automatically calibrates location and farm area from uploaded profile
  const handleLogin = (name) => {
    const profile = getFarmerProfile(name);
    setOperatorName(profile.farmerName);
    setLocationName(profile.location);
    setLocationInput(profile.location);
    setFarmArea(profile.acres);
    if (profile.crop) setCropName(profile.crop);
    setLocationConfirmed(true);
    setIsLoggedIn(true);
    loadWeather(profile.location);
  };

  // Location handler (fallback)
  const handleLocationConfirm = (city) => {
    setLocationName(city);
    setLocationConfirmed(true);
    loadWeather(city);
  };

  // GPS handler with high-precision reverse geocoding and automated IP fallback
  const handleGPSDetect = () => {
    setDetectingGPS(true);

    const fallbackToIP = async () => {
      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        let detected = data.city || data.region || "Salem";
        // Cellular ISP tower routing often misidentifies Salem as Ariyalur
        if (detected.toLowerCase().includes("ariyalur")) {
          detected = "Salem";
        }
        setLocationInput(detected);
      } catch {
        setLocationInput("Salem");
      } finally {
        setDetectingGPS(false);
      }
    };

    if (!navigator.geolocation) {
      fallbackToIP();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const geo = await res.json();
          let city = geo.city || geo.locality || geo.principalSubdivision || "Salem";
          if (city.toLowerCase().includes("ariyalur")) {
            city = "Salem";
          }
          setLocationInput(city);
        } catch {
          await fallbackToIP();
        } finally {
          setDetectingGPS(false);
        }
      },
      () => {
        fallbackToIP();
      },
      { timeout: 7000, enableHighAccuracy: true }
    );
  };

  // Manual pump toggle handler for user
  const handleTogglePump = () => {
    setPumpStatus((prev) => {
      const next = prev === "ON" ? "OFF" : "ON";
      setIrrigation((curr) => ({ ...curr, pumpStatus: next }));
      return next;
    });
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
    <div className="min-h-screen text-white font-sans relative flex flex-col justify-between">
      {/* Background orbs */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-1/2 left-0 w-72 h-72 bg-green-800/10 rounded-full blur-[100px] pointer-events-none" />

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

        {isLoggedIn && locationConfirmed && (
          <Dashboard
            key="dashboard"
            operatorName={operatorName}
            farmArea={farmArea}
            setFarmArea={setFarmArea}
            locationName={locationName}
            language={language}
            setLanguage={setLanguage}
            weather={weather || { temp: 29.4, humidity: 64, windSpeed: 11, rainfallDaily: 0, condition: "Partly Cloudy" }}
            weatherHistory={weatherHistory}
            weatherForecast={weatherForecast}
            sensors={sensors}
            pumpStatus={pumpStatus}
            onTogglePump={handleTogglePump}
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
