"use client";
import React from "react";

interface ForecastControlsProps {
  location: string;
  days: number;
  setLocation: (v: string) => void;
  setDays: (v: number) => void;
  onSubmit: () => void;
  loading: boolean;
}

const ForecastControls: React.FC<ForecastControlsProps> = ({ location, days, setLocation, setDays, onSubmit, loading }) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-6 items-end">
    <div className="flex-1">
      <input
        className="border-0 border-b-2 border-blue-400 focus:border-blue-600 bg-transparent px-2 py-1 w-full outline-none transition-colors duration-200"
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Enter city name..."
        onKeyDown={e => { if (e.key === 'Enter') onSubmit(); }}
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Days</label>
      <select
        className="border-0 border-b-2 border-blue-400 focus:border-blue-600 bg-transparent px-2 py-1 outline-none"
        value={days}
        onChange={e => setDays(Number(e.target.value))}
      >
        {[1,2,3,4,5,6,7].map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
      onClick={onSubmit}
      disabled={loading || !location.trim()}
    >
      {loading ? "Loading..." : "Get Forecast"}
    </button>
  </div>
);

export default ForecastControls;
