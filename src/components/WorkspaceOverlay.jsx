import CameraMonitor from './CameraMonitor';
import CropRecommendations from './CropRecommendations';
import IrrigationPanel from './IrrigationPanel';
import PestControlPanel from './PestControlPanel';
import PathologyWorkspace from './PathologyWorkspace';

export default function WorkspaceOverlay({
  workspace, onClose,
  sensors, pumpStatus,
  irrigation, setIrrigation,
  repellent, setRepellent,
  vibMotor, setVibMotor,
  cropName, location, weather,
  luxRating, t, sensorContext,
  onAskGemini, onSelectCrop,
}) {
  const titles = {
    monitor: "Camera Monitor",
    recom: "Crop Matches",
    irrigation: "Irrigation Control",
    circuits: "Repellers & Vibration",
    pathology: "Pathology Lab",
  };

  return (
    <div className="fixed inset-0 bg-white z-[9999] overflow-y-auto min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between sticky top-0 z-50">
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-800 font-mono text-xs flex items-center gap-1.5 cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 transition-all duration-150 font-bold"
        >
          ← Back to Control Center
        </button>
        <span className="text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest">
          {titles[workspace] || workspace} Workspace
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center p-6 bg-white">
        <div className="w-full max-w-4xl bg-white rounded-3xl p-2">
          {workspace === "monitor" && (
            <CameraMonitor luxRating={luxRating} repellent={repellent} t={t} />
          )}

          {workspace === "recom" && (
            <CropRecommendations
              npk={sensors}
              location={location}
              currentTemp={weather ? weather.temp : 28}
              onSelectCrop={(c) => { onSelectCrop(c); onClose(); }}
              onAskGemini={onAskGemini}
            />
          )}

          {workspace === "irrigation" && (
            <div className="max-w-md mx-auto">
              <IrrigationPanel
                settings={irrigation}
                onUpdate={(updates) => setIrrigation((prev) => ({ ...prev, ...updates }))}
              />
            </div>
          )}

          {workspace === "circuits" && (
            <div className="max-w-md mx-auto">
              <PestControlPanel
                repellent={repellent}
                vibMotor={vibMotor}
                onUpdateRepellent={(updates) => setRepellent((prev) => ({ ...prev, ...updates }))}
                onUpdateVibMotor={(updates) => setVibMotor((prev) => ({ ...prev, ...updates }))}
              />
            </div>
          )}

          {workspace === "pathology" && (
            <PathologyWorkspace />
          )}
        </div>
      </div>
    </div>
  );
}
