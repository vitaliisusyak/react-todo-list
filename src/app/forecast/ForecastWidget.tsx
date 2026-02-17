"use client";
import React from "react";

interface WeatherDay {
  date: string;
  temperature: number;
  weathercode: number;
}

const weatherCodeMap: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  56: "Freezing drizzle",
  57: "Freezing drizzle",
  61: "Slight rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Freezing rain",
  71: "Slight snow fall",
  73: "Snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with hail"
};

interface ForecastWidgetProps {
  location: string;
  weather: WeatherDay[];
}

const ForecastWidget: React.FC<ForecastWidgetProps> = ({ location, weather }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4">
    <h2 className="text-lg font-semibold mb-2">Forecast for {location}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {weather.map(day => (
        <div key={day.date} className="flex flex-col items-center p-2 border-b last:border-b-0">
          <div className="font-medium">{new Date(day.date).toLocaleDateString()}</div>
          <div className="text-2xl font-bold">{day.temperature}°C</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{weatherCodeMap[day.weathercode] || "Unknown"}</div>
        </div>
      ))}
    </div>
  </div>
);

export default ForecastWidget;
