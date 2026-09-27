import { RefreshCw, Power, Clock } from 'lucide-react';

export default function SoilTelemetryGrid({
  sensors,
  pumpStatus = 'OFF',
  lastProbe,
  probing,
  onForceProbe,
  onTogglePump,
  t,
}) {
  const isPumpOn = pumpStatus === 'ON';

  // 1. Calibrate & interpret Soil Moisture correctly
  const rawMoisture = sensors.soilMoisture;
  const moistureVal =
    rawMoisture > 100
      ? Math.max(5, Math.min(100, Math.round(((1023 - rawMoisture) / 723) * 100)))
      : rawMoisture;

  let moistureStatus = t('Optimal');
  let moistureAccent = '#2563eb'; // Blue

  if (rawMoisture > 100) {
    moistureStatus = 'Calibrated from 667 ADC';
    moistureAccent = '#2563eb';
  } else if (moistureVal > 80) {
    moistureStatus = 'Waterlogged (Excess)';
    moistureAccent = '#dc2626';
  } else if (moistureVal >= 50 && moistureVal <= 80) {
    moistureStatus = 'Healthy (Optimal)';
    moistureAccent = '#2563eb';
  } else if (moistureVal >= 30 && moistureVal < 50) {
    moistureStatus = 'Moderate (Needs Water)';
    moistureAccent = '#b45309';
  } else {
    moistureStatus = 'Critically Dry';
    moistureAccent = '#dc2626';
  }

  const cards = [
    {
      label: t('SOIL MOISTURE'),
      value: `${moistureVal}%`,
      accent: moistureAccent,
      target: t('Optimal: 50-70%'),
      status: moistureStatus,
    },
    {
      label: t('TEMPERATURE'),
      value: `${sensors.temperature}°C`,
      accent: '#92400e',
      target: t('Target: 25-30°C'),
      status: t('Optimal'),
    },
    {
      label: t('HUMIDITY'),
      value: `${sensors.humidity}%`,
      accent: '#2563eb',
      target: t('Normal: 50-80%'),
      status: t('Stable'),
    },
    {
      label: t('N - NITROGEN'),
      value: sensors.nitrogen,
      unit: 'mg/kg',
      accent: '#166534',
      target: t('Target: 140'),
      status: t('Stable'),
    },
    {
      label: t('P - PHOSPHORUS'),
      value: sensors.phosphorus,
      unit: 'mg/kg',
      accent: '#78350f',
      target: t('Target: 100'),
      status: t('Stable'),
    },
    {
      label: t('K - POTASSIUM'),
      value: sensors.potassium,
      unit: 'mg/kg',
      accent: '#451a03',
      target: t('Target: 150'),
      status: t('Optimizing'),
    },
    {
      label: t('PUMP STATUS'),
      value: pumpStatus,
      isPump: true,
      accent: isPumpOn ? '#166534' : '#64748b',
      target: t('Control: Solenoid'),
      status: isPumpOn ? t('FLOWING') : t('IDLE'),
      colSpan: 'col-span-2 sm:col-span-1 lg:col-span-2',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5 text-slate-900">
      {/* Header and Telemetry Timing */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl">
            {t('Soil Sensory Telemetry')}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-500 font-mono">
              {t('ESP32 edge chemical and physical sensor stack')}
            </span>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1.5 font-bold">
              <Clock className="w-3 h-3 text-emerald-600" />
              <span>{lastProbe ? `Collected: ${lastProbe}` : 'Live Telemetry'}</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onForceProbe}
          disabled={probing}
          className="text-xs px-3.5 py-2 rounded-xl transition cursor-pointer disabled:opacity-50 font-bold font-mono flex items-center gap-1.5 self-start sm:self-auto text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${probing ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
          <span>{t(probing ? 'Polling...' : 'Force Probe')}</span>
        </button>
      </div>

      {/* Telemetry Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`p-4 rounded-2xl space-y-2 relative overflow-hidden flex flex-col justify-between bg-slate-50 border border-slate-200 hover:shadow-sm transition ${card.colSpan || ''}`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                  {card.label}
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: card.accent }}
                />
              </div>

              {/* Pump status card with user-controlled toggle */}
              {card.isPump ? (
                <div className="mt-2 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-2xl sm:text-3xl font-display font-extrabold"
                      style={{ color: isPumpOn ? '#15803d' : '#475569' }}
                    >
                      {card.value}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      ({card.status})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onTogglePump}
                    className={`w-full py-2 px-3 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                      isPumpOn
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{isPumpOn ? t('Turn OFF') : t('Turn ON')}</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                    {card.value}
                  </span>
                  {card.unit && (
                    <span className="text-xs font-mono text-slate-500">
                      {card.unit}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
              <span>{card.target}</span>
              <span
                className="font-bold"
                style={{
                  color: card.accent === '#2563eb' ? '#1d4ed8' : card.accent === '#dc2626' ? '#b91c1c' : '#15803d',
                }}
              >
                {card.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
