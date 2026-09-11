// Gemini API service for chatbot and voice assistant
// Set your API key here or via the settings panel in the app
let GEMINI_API_KEY = "";

export function setGeminiApiKey(key) {
  GEMINI_API_KEY = key;
}

export function getGeminiApiKey() {
  return GEMINI_API_KEY;
}

export async function sendChatMessage({ message, history = [], language = "English", sensorContext = {} }) {
  if (!GEMINI_API_KEY) {
    return {
      text: "⚠️ Gemini API key not configured. Please set your API key in the Settings panel (gear icon in the header) to enable AI features.\n\nYou can get a free API key from https://aistudio.google.com/apikey",
      audio: null,
    };
  }

  const systemPrompt = buildSystemPrompt(language, sensorContext);

  const contents = [];
  // Add history
  for (const msg of history) {
    contents.push({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    });
  }
  // Add current message
  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I could not generate a response. Please try again.";

    return { text, audio: null };
  } catch (err) {
    console.error("Gemini API error:", err);
    return {
      text: "Connection error: Could not reach the Gemini API. Please check your internet connection and API key.",
      audio: null,
    };
  }
}

function buildSystemPrompt(language, ctx) {
  const langNote = language === "Tamil"
    ? "Respond in Tamil language."
    : language === "Hindi"
    ? "Respond in Hindi language."
    : "Respond in English.";

  return `You are AgriBot, an advanced AI agronomy assistant for the "Seed to Circuit" IoT agricultural dashboard.
You help farmers with soil analysis, crop management, irrigation advice, pest control, and general agricultural guidance.

${langNote}

LIVE SENSOR CONTEXT:
- Crop: ${ctx.crop || "Tomato"}
- Location: ${ctx.location || "Coimbatore"}
- Soil Moisture: ${ctx.soilMoisture ?? "N/A"}%
- Temperature: ${ctx.temperature ?? "N/A"}°C
- Humidity: ${ctx.humidity ?? "N/A"}%
- Nitrogen (N): ${ctx.nitrogen ?? "N/A"} mg/kg
- Phosphorus (P): ${ctx.phosphorus ?? "N/A"} mg/kg
- Potassium (K): ${ctx.potassium ?? "N/A"} mg/kg
- Soil pH: ${ctx.pH ?? "N/A"}
- Pump Status: ${ctx.pumpStatus ?? "N/A"}

GUIDELINES:
- Be concise, professional, and friendly
- Reference the live sensor data when relevant
- Provide actionable advice
- Use markdown formatting for readability
- Keep responses under 200 words unless asked for detail`;
}
