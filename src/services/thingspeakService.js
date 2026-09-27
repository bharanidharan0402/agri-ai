const THINGSPEAK_CHANNEL = "3238014";
const THINGSPEAK_API_KEY = "B20Q5W4VU6FGOCLA";

export async function fetchThingSpeakData() {
  try {
    const res = await fetch(
      `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL}/feeds/last.json?api_key=${THINGSPEAK_API_KEY}`
    );
    const data = await res.json();
    if (!data) return null;

    // Calibrate soil moisture: If raw ADC value > 100 (e.g. 667), calibrate to 0-100%
    let moisture = null;
    if (data.field1 != null) {
      const raw = parseFloat(data.field1);
      if (!isNaN(raw)) {
        moisture = raw > 100
          ? Math.max(5, Math.min(100, Math.round(((1023 - raw) / 723) * 100)))
          : Math.max(0, Math.min(100, Math.round(raw)));
      }
    }

    return {
      soilMoisture: moisture,
      rawSoilMoisture: data.field1 != null ? parseFloat(data.field1) : null,
      temperature: data.field2 != null ? parseFloat(data.field2) : null,
      humidity: data.field3 != null ? Math.round(parseFloat(data.field3)) : null,
      nitrogen: data.field4 != null ? Math.round(parseFloat(data.field4)) : null,
      phosphorus: data.field5 != null ? Math.round(parseFloat(data.field5)) : null,
      potassium: data.field6 != null ? Math.round(parseFloat(data.field6)) : null,
      pumpStatus: data.field7 != null ? (String(data.field7).trim() === "1" ? "ON" : "OFF") : null,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };
  } catch (err) {
    console.error("ThingSpeak fetch error:", err);
    return null;
  }
}
