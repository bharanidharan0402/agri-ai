// Vercel Serverless Function: POST /api/gemini
// Secure server-side handler for Google Gemini API requests.
// Reads GEMINI_API_KEY from environment variables and does not expose keys to client.

export default async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed. Use POST." });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return sendJson(res, 500, {
      error: "GEMINI_API_KEY environment variable is not configured on the server.",
      text: "⚠️ Gemini API key not configured on the server. Please set the GEMINI_API_KEY environment variable in your Vercel project settings.",
      audio: null,
    });
  }

  try {
    const body = await parseBody(req);
    const { message, history = [], language = "English", sensorContext = {} } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return sendJson(res, 400, { error: "A message string is required." });
    }

    const systemPrompt = buildSystemPrompt(language, sensorContext);

    const contents = [];
    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg && msg.content) {
          contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: String(msg.content) }],
          });
        }
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: message.trim() }],
    });

    const modelsToTry = [
      process.env.GEMINI_MODEL,
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-flash-latest",
      "gemini-3.8-flash",
    ].filter(Boolean);

    let lastError = null;

    for (const model of modelsToTry) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
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

        const data = await geminiRes.json();

        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          return sendJson(res, 200, {
            text: data.candidates[0].content.parts[0].text,
            audio: null,
          });
        }

        if (data?.error) {
          lastError = data.error.message || `Model error (${geminiRes.status})`;
          console.warn(`Gemini model ${model} notice:`, data.error);
          continue;
        }
      } catch (err) {
        lastError = err.message;
        console.warn(`Fetch error for ${model}:`, err);
      }
    }

    return sendJson(res, 502, {
      error: lastError || "Failed to generate response from Gemini API.",
      text: lastError
        ? `AgriBot notice: ${lastError}`
        : "I could not generate a response. Please try again.",
      audio: null,
    });
  } catch (err) {
    console.error("Server API error:", err);
    return sendJson(res, 500, {
      error: err.message || "Internal server error",
      text: "Internal server error occurred while processing your request.",
      audio: null,
    });
  }
}

function buildSystemPrompt(language, ctx = {}) {
  let langInstruction = "Respond in clear, professional English.";
  if (language === "Tamil") {
    langInstruction =
      "CRITICAL: Respond COMPLETELY in pure Tamil script (தமிழ் எழுத்துகளில் மட்டுமே பதிலளிக்கவும்). Do NOT use English sentences or words. Translate all agronomic concepts, nutrient guidance, fertilizer names, and crop advice into fluent, natural Tamil suitable for Tamil Nadu farmers.";
  } else if (language === "Hindi") {
    langInstruction =
      "CRITICAL: Respond COMPLETELY in pure Hindi Devanagari script (हिन्दी में ही उत्तर दें). Do NOT use English sentences or words. Translate all agronomic concepts, nutrient guidance, fertilizer names, and crop advice into fluent, natural Hindi suitable for Indian farmers.";
  }

  return `You are AgriBot, an advanced AI agronomy assistant for the "Human 2 AI" IoT agricultural dashboard.
You help farmers with live soil nutrient analysis, crop health monitoring, precision irrigation advice, organic and chemical fertilizer scheduling, pest deterrent controls, and practical farming solutions.

LANGUAGE DIRECTIVE:
${langInstruction}

LIVE SENSOR CONTEXT (TELEMETRY):
- Crop: ${ctx.crop || "Tomato"}
- Location: ${ctx.location || "Coimbatore"}
- Soil Moisture: ${ctx.soilMoisture ?? "N/A"}%
- Temperature: ${ctx.temperature ?? "N/A"}°C
- Humidity: ${ctx.humidity ?? "N/A"}%
- Nitrogen (N): ${ctx.nitrogen ?? "N/A"} mg/kg
- Phosphorus (P): ${ctx.phosphorus ?? "N/A"} mg/kg
- Potassium (K): ${ctx.potassium ?? "N/A"} mg/kg
- Pump Status: ${ctx.pumpStatus ?? "N/A"}

GUIDELINES:
- Be concise, practical, and farmer-friendly
- Ground your recommendations in the live sensor readings (NPK, moisture, weather)
- Provide actionable advice on fertilizer dosage, irrigation timing, and pest management
- Use clean formatting with bullet points
- Keep responses under 180 words for fast conversational flow`;
}

async function parseBody(req) {
  if (req.body) {
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }

  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on("error", () => resolve({}));
  });
}

function sendJson(res, statusCode, data) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}
