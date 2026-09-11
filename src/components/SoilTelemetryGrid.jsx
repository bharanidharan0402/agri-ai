import { RefreshCw } from 'lucide-react';

export default function SoilTelemetryGrid({ sensors, pumpStatus, probing, onForceProbe, t }) {
  const cards = [
    {
      label: t("SOIL MOISTURE"), value: `${sensors.soilMoisture}%`,
      color: "emerald", target: t("Optimal: 60%"), status: t("Healthy"),
    },
    {
      label: t("TEMPERATURE"), value: `${sensors.temperature}°C`,
      color: "rose", target: t("Target: 25-30°C"), status: t("Optimal"),
    },
    {
      label: t("HUMIDITY"), value: `${sensors.humidity}%`,
      color: "sky", target: t("Normal: 50-80%"), status: t("Stable"),
    },
    {
      label: t("N - NITROGEN"), value: sensors.nitrogen, unit: "mg/kg",
      color: "orange", target: t("Target: 140"), status: t("Stable"),
    },
    {
      label: t("P - PHOSPHORUS"), value: sensors.phosphorus, unit: "mg/kg",
      color: "blue", target: t("Target: 100"), status: t("Stable"),
    },
    {
      label: t("K - POTASSIUM"), value: sensors.potassium, unit: "mg/kg",
      color: "amber", target: t("Target: 150"), status: t("Optimizing"),
    },
    {
      label: t("PUMP STATUS"), value: pumpStatus, isPump: true,
      color: "teal", target: t("Control: Solenoid"), status: pumpStatus === "ON" ? t("FLOWING") : t("IDLE"),
    },
    {
      label: t("pH LEVEL"), value: sensors.pH,
      color: "purple", target: "Target: 6.5", status: t("Stable"),
    },
  ];

  const colorMap = {
    emerald: { bg: "bg-emerald-50/50", border: "border-emerald-100", badge: "text-emerald-700 bg-emerald-100/60 border-emerald-200/40", status: "text-emerald-600", dot: "bg-emerald-500/5" },
    rose: { bg: "bg-rose-50/50", border: "border-rose-100", badge: "text-rose-700 bg-rose-100/60 border-rose-200/40", status: "text-rose-600", dot: "bg-rose-500/5" },
    sky: { bg: "bg-sky-50/50", border: "border-sky-100", badge: "text-sky-700 bg-sky-100/60 border-sky-200/40", status: "text-sky-600", dot: "bg-sky-500/5" },
    orange: { bg: "bg-orange-50/50", border: "border-orange-100", badge: "text-orange-700 bg-orange-100/60 border-orange-200/40", status: "text-orange-600", dot: "bg-orange-500/5" },
    blue: { bg: "bg-blue-50/50", border: "border-blue-100", badge: "text-blue-700 bg-blue-100/60 border-blue-200/40", status: "text-blue-600", dot: "bg-blue-500/5" },
    amber: { bg: "bg-amber-50/50", border: "border-amber-100", badge: "text-amber-700 bg-amber-100/60 border-amber-200/40", status: "text-amber-600", dot: "bg-amber-500/5" },
    teal: { bg: "bg-teal-50/50", border: "border-teal-100", badge: "text-teal-700 bg-teal-100/60 border-teal-200/40", status: "text-teal-600", dot: "bg-teal-500/5" },
    purple: { bg: "bg-purple-50/50", border: "border-purple-100", badge: "text-purple-700 bg-purple-100/60 border-purple-200/40", status: "text-purple-600", dot: "bg-purple-500/5" },
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-display font-semibold text-slate-800">{t("Soil Sensory Telemetry")}</h3>
          <p className="text-xs text-slate-500">{t("ESP32 edge chemical and physical sensor stack")}</p>
        </div>
        <button
          onClick={onForceProbe}
          disabled={probing}
          className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs px-3.5 py-1.5 rounded-xl text-slate-700 hover:text-emerald-700 transition cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${probing ? "animate-spin" : ""}`} />
          {t(probing ? "Polling..." : "Force Probe")}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cards.map((card) => {
          const c = colorMap[card.color];
          return (
            <div key={card.label} className={`${c.bg} border ${c.border} p-3.5 rounded-xl space-y-2 relative overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-8 h-8 ${c.dot} rounded-full`} />
              <span className={`text-[10px] font-bold font-mono ${c.badge} px-2 py-0.5 rounded border`}>
                {card.label}
              </span>
              <div className="text-xl font-display font-extrabold text-slate-800 pt-1">
                {card.isPump ? (
                  <span className="flex items-center gap-2">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${pumpStatus === "ON" ? "bg-emerald-500 animate-ping" : "bg-amber-500"}`} />
                    {card.value}
                  </span>
                ) : (
                  <>
                    {card.value}{" "}
                    {card.unit && <span className="text-xs text-slate-500 font-normal">{card.unit}</span>}
                  </>
                )}
              </div>
              <div className="text-[9px] text-slate-500 flex justify-between font-mono">
                <span>{card.target}</span>
                <span className={`${c.status} font-bold`}>{card.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
