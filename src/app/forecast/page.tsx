"use client";
import { useState, useEffect } from "react";
import ForecastControls from "./ForecastControls";
import ForecastWidget from "./ForecastWidget";

interface WeatherDay {
  date: string;
  temperature: number;
  weathercode: number;
}

async function getGeo(location: string) {
  const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`);
  const geoData = await geoRes.json();
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("Location not found");
  }
  return geoData.results[0];
}

async function getWeather(latitude: number, longitude: number, days: number) {
  const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,weathercode&forecast_days=${days}&timezone=auto`);
  const weatherData = await weatherRes.json();
  if (!weatherData.daily) {
    throw new Error("Weather data not available");
  }
  return weatherData.daily.time.map((date: string, i: number) => ({
    date,
    temperature: weatherData.daily.temperature_2m_max[i],
    weathercode: weatherData.daily.weathercode[i],
  }));
}

export default function ForecastPage() {
  const [location, setLocation] = useState("");
  const [days, setDays] = useState(3);
  const [queryLocation, setQueryLocation] = useState("");
  const [queryDays, setQueryDays] = useState(3);
  const [weather, setWeather] = useState<WeatherDay[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedLocation = localStorage.getItem("forecast_location");
    const savedDays = localStorage.getItem("forecast_days");
    if (savedLocation) setLocation(savedLocation);
    if (savedDays) setDays(Number(savedDays));
  }, []);

  useEffect(() => {
    localStorage.setItem("forecast_location", location);
    localStorage.setItem("forecast_days", days.toString());
  }, [location, days]);

  useEffect(() => {
    if (!queryLocation) return;
    let ignore = false;
    async function fetchAll() {
      setLoading(true);
      setError("");
      setWeather(null);
      try {
        const geo = await getGeo(queryLocation);
        const weatherData = await getWeather(geo.latitude, geo.longitude, queryDays);
        if (!ignore) setWeather(weatherData);
      } catch (e) {
        const err = e as Error;
        if (!ignore) setError(err.message || "Failed to fetch weather");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchAll();
    return () => { ignore = true; };
  }, [queryLocation, queryDays]);

  function handleSubmit() {
    setQueryLocation(location);
    setQueryDays(days);
  }

  return (
    <div className="p-8 w-1/2 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Forecast</h1>
      <ForecastControls
        location={location}
        days={days}
        setLocation={setLocation}
        setDays={setDays}
        onSubmit={handleSubmit}
        loading={loading}
      />
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {weather && <ForecastWidget location={queryLocation} weather={weather} />}
    </div>
  );
}
