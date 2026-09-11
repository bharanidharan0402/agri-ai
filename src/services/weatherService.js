export async function fetchWeather(city) {
  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    const data = await res.json();
    const current = data.current_condition?.[0];
    if (!current) return null;

    return {
      current: {
        temp: parseInt(current.temp_C),
        humidity: parseInt(current.humidity),
        windSpeed: parseInt(current.windspeedKmph),
        condition: current.weatherDesc?.[0]?.value || "Clear",
        rainfallDaily: parseFloat(current.precipMM) || 0,
      },
      history: generateHistoricalData(city),
    };
  } catch (err) {
    console.error("Weather fetch error:", err);
    return {
      current: {
        temp: 28,
        humidity: 65,
        windSpeed: 12,
        condition: "Partly Cloudy",
        rainfallDaily: 0,
      },
      history: generateHistoricalData(city),
    };
  }
}

function generateHistoricalData(city) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const now = new Date();
  const result = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = d.toLocaleString("default", { month: "short" });
    const monthIdx = d.getMonth();

    // Seasonal patterns for South India
    let baseTemp, baseRain;
    if (monthIdx >= 3 && monthIdx <= 5) { // Apr-Jun (Summer)
      baseTemp = 32 + Math.random() * 4;
      baseRain = 20 + Math.random() * 40;
    } else if (monthIdx >= 6 && monthIdx <= 9) { // Jul-Oct (Monsoon)
      baseTemp = 26 + Math.random() * 3;
      baseRain = 100 + Math.random() * 150;
    } else if (monthIdx >= 10 && monthIdx <= 11) { // Nov-Dec (NE Monsoon)
      baseTemp = 24 + Math.random() * 3;
      baseRain = 80 + Math.random() * 120;
    } else { // Jan-Mar (Winter)
      baseTemp = 22 + Math.random() * 4;
      baseRain = 10 + Math.random() * 30;
    }

    result.push({
      month: monthName,
      avgTemp: Math.round(baseTemp * 10) / 10,
      rainfall: Math.round(baseRain),
    });
  }

  return result;
}
