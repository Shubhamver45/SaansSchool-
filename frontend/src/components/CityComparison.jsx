import React, { useState, useEffect } from 'react';
import { GitCompare, ArrowRight, ShieldCheck, AlertTriangle, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import { fetchCityAQI, searchCities } from '../services/api';
import './CityComparison.css';

export function CityComparison({ currentAQIData }) {
  const [targetCityName, setTargetCityName] = useState('London');
  const [targetData, setTargetData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    loadTargetCity(targetCityName);
  }, [targetCityName]);

  const loadTargetCity = async (name) => {
    setLoading(true);
    try {
      const data = await fetchCityAQI(name);
      setTargetData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSuggestions = async (val) => {
    setQuery(val);
    if (val.trim().length > 1) {
      try {
        const res = await searchCities(val);
        setSuggestions(res);
      } catch {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (item) => {
    setTargetCityName(item.city);
    setQuery('');
    setSuggestions([]);
  };

  if (!currentAQIData) return null;

  const aqiDiff = targetData ? targetData.aqi - currentAQIData.aqi : 0;
  const pmDiff = targetData ? (targetData.pollutants.pm2_5 - currentAQIData.pollutants.pm2_5).toFixed(1) : 0;

  return (
    <div className="comparison-card glass-card">
      <div className="comparison-header">
        <div className="comp-title-group">
          <div className="comp-title-row">
            <GitCompare className="comp-icon" size={20} />
            <h3 className="comp-title">Air Quality Delta Comparison</h3>
          </div>
          <p className="comp-subtitle">Compare your current location with another city worldwide</p>
        </div>

        {/* City selector search */}
        <div className="comp-search-box">
          <div className="comp-input-wrapper">
            <Search size={15} className="comp-search-icon" />
            <input
              type="text"
              className="comp-input"
              placeholder="Compare with e.g. London, Paris, Tokyo..."
              value={query}
              onChange={(e) => handleSearchSuggestions(e.target.value)}
            />
          </div>
          {suggestions.length > 0 && (
            <div className="comp-dropdown">
              {suggestions.map((s, idx) => (
                <div key={idx} className="comp-dropdown-item" onClick={() => selectSuggestion(s)}>
                  <span>{s.city}</span>
                  <small>{[s.state, s.country].filter(Boolean).join(', ')}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Compare Buttons */}
      <div className="comp-quick-chips">
        <span className="chips-label">Quick Compare:</span>
        {['London', 'New York', 'Tokyo', 'Paris', 'Dubai', 'Beijing'].map((c) => (
          <button
            key={c}
            className={`comp-chip ${targetCityName.toLowerCase() === c.toLowerCase() ? 'active' : ''}`}
            onClick={() => setTargetCityName(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Side-by-side comparison cards */}
      <div className="comparison-grid">
        {/* Current Location */}
        <div className="side-card current-loc">
          <div className="side-badge">Your Location</div>
          <h4 className="side-city">{currentAQIData.city}</h4>
          <span className="side-country">{currentAQIData.state || currentAQIData.country}</span>

          <div className="side-aqi-row">
            <div className="side-aqi-val" style={{ color: currentAQIData.category_color }}>
              {currentAQIData.aqi}
            </div>
            <div className="side-cat-pill" style={{ borderColor: currentAQIData.category_color }}>
              {currentAQIData.category}
            </div>
          </div>

          <div className="side-metrics">
            <div className="side-metric-item">
              <span>PM2.5:</span>
              <strong>{currentAQIData.pollutants.pm2_5} µg/m³</strong>
            </div>
            <div className="side-metric-item">
              <span>PM10:</span>
              <strong>{currentAQIData.pollutants.pm10} µg/m³</strong>
            </div>
            <div className="side-metric-item">
              <span>Dominant:</span>
              <strong>{currentAQIData.dominant_pollutant}</strong>
            </div>
          </div>
        </div>

        {/* Difference badge middle */}
        <div className="comp-vs-divider">
          <div className="vs-circle">VS</div>
          {targetData && (
            <div className={`diff-pill ${aqiDiff <= 0 ? 'diff-better' : 'diff-worse'}`}>
              {aqiDiff > 0 ? (
                <>
                  <ArrowUpRight size={14} />
                  <span>+{aqiDiff} AQI Higher</span>
                </>
              ) : (
                <>
                  <ArrowDownRight size={14} />
                  <span>{aqiDiff} AQI Lower</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Target City */}
        <div className="side-card target-loc">
          <div className="side-badge">Comparison City</div>
          {loading ? (
            <div className="comp-loading">Loading live data...</div>
          ) : targetData ? (
            <>
              <h4 className="side-city">{targetData.city}</h4>
              <span className="side-country">{targetData.state || targetData.country}</span>

              <div className="side-aqi-row">
                <div className="side-aqi-val" style={{ color: targetData.category_color }}>
                  {targetData.aqi}
                </div>
                <div className="side-cat-pill" style={{ borderColor: targetData.category_color }}>
                  {targetData.category}
                </div>
              </div>

              <div className="side-metrics">
                <div className="side-metric-item">
                  <span>PM2.5:</span>
                  <strong>{targetData.pollutants.pm2_5} µg/m³</strong>
                </div>
                <div className="side-metric-item">
                  <span>PM10:</span>
                  <strong>{targetData.pollutants.pm10} µg/m³</strong>
                </div>
                <div className="side-metric-item">
                  <span>Dominant:</span>
                  <strong>{targetData.dominant_pollutant}</strong>
                </div>
              </div>
            </>
          ) : (
            <div className="comp-loading">Select a city to compare</div>
          )}
        </div>
      </div>
    </div>
  );
}
