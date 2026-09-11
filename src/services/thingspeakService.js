const THINGSPEAK_CHANNEL = "3238014";
const THINGSPEAK_API_KEY = "B20Q5W4VU6FGOCLA";

export async function fetchThingSpeakData() {
  try {
    const res = await fetch(
      `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL}/feeds/last.json?api_key=${THINGSPEAK_API_KEY}`
    );
    const data = await res.json();
    if (!data) return null;

    return {
      soilMoisture: data.field1 != null ? Math.round(parseFloat(data.field1)) : null,
      temperature: data.field2 != null ? parseFloat(data.field2) : null,
      humidity: data.field3 != null ? Math.round(parseFloat(data.field3)) : null,
      nitrogen: data.field4 != null ? Math.round(parseFloat(data.field4)) : null,
      phosphorus: data.field5 != null ? Math.round(parseFloat(data.field5)) : null,
      potassium: data.field6 != null ? Math.round(parseFloat(data.field6)) : null,
      pumpStatus: data.field7 != null ? (String(data.field7).trim() === "1" ? "ON" : "OFF") : null,
      pH: data.field8 != null ? parseFloat(data.field8) : null,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };
  } catch (err) {
    console.error("ThingSpeak fetch error:", err);
    return null;
  }
}
