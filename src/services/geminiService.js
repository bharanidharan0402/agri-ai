// Gemini API service for chatbot and voice assistant
// Proxies all AI queries through the server-side Vercel endpoint (/api/gemini).
// API key is securely stored in GEMINI_API_KEY on the server and never exposed to the client.

export function setGeminiApiKey(key) {
  // Maintained for backward compatibility with settings UI.
  // The Gemini API key is now securely configured server-side via GEMINI_API_KEY.
}

export function getGeminiApiKey() {
  // Kept for backward compatibility
  return "";
}

export async function sendChatMessage({ message, history = [], language = "English", sensorContext = {} }) {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        history,
        language,
        sensorContext,
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        text:
          data?.text ||
          data?.error ||
          `⚠️ Gemini service error (${res.status}). Please check server configuration.`,
        audio: null,
      };
    }

    return {
      text: data?.text || "I could not generate a response. Please try again.",
      audio: null,
    };
  } catch (err) {
    console.error("Gemini service network error:", err);
    return {
      text: "Connection error: Could not reach the server API. Please check your internet connection.",
      audio: null,
    };
  }
}
