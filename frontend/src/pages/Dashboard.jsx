import React from 'react';
import { 
  MapPin, Thermometer, Droplets, Wind, Sun, 
  RefreshCw, Navigation, Clock, ShieldCheck, Activity 
} from 'lucide-react';
import { AQIGauge } from '../components/AQIGauge';
import { PollutantCard } from '../components/PollutantCard';
import { TrendChart } from '../components/TrendChart';
import { HealthAdviceGrid } from '../components/HealthAdviceGrid';
import { CityComparison } from '../components/CityComparison';
import { CityCard } from '../components/CityCard';
import { ExposureCalculator } from '../components/ExposureCalculator';
import { SchoolSafetySection } from '../components/SchoolSafetySection';
import { StubbleSmokeRadar } from '../components/StubbleSmokeRadar';
import './Dashboard.css';


export function Dashboard({
  aqiData,
  historyData,
  featuredCities,
  onSelectCity,
  onDetectLocation,
  isLocating,
  onRefresh
}) {
  if (!aqiData) {
    return (
      <div className="dashboard-loading container">
        <RefreshCw className="spin" size={32} />
        <h2>Connecting to Live Global Atmosphere Network...</h2>
        <p>Fetching real-time satellite & sensor air quality measurements.</p>
      </div>
    );
  }

  const { 
    city, state, country, lat, lon, aqi, category, 
    category_color, pollutants, weather, dominant_pollutant, 
    timestamp, source 
  } = aqiData;

  const formattedTime = timestamp 
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : 'Live';

  const locationSubtitle = [state, country].filter(Boolean).join(', ') || 'Regional Air Monitor';

  return (
    <div className="dashboard-page container">
      {/* Top Hero Location Banner */}
      <section className="hero-section">
        <div className="hero-location-card glass-card">
          <div className="hero-header-row">
            <div className="hero-status-pills">
              <span className="badge badge-live">Live Satellite & Sensor Network</span>
              <span className="loc-mode-badge">
                <MapPin size={13} />
                <span>{locationSubtitle}</span>
              </span>
            </div>

            <div className="hero-actions">
              <button 
                className="btn-hero-refresh" 
                onClick={onDetectLocation} 
                disabled={isLocating}
                title="Detect precise GPS location"
              >
                <Navigation size={14} className={isLocating ? 'spin' : ''} />
                <span>{isLocating ? 'Detecting GPS...' : 'Use My GPS'}</span>
              </button>
              <button 
                className="btn-hero-refresh" 
                onClick={onRefresh} 
                title="Refresh latest sensor readings"
              >
                <RefreshCw size={14} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <div className="hero-main-content">
            <div className="hero-text-block">
              <span className="hero-caption">Present Location Air Quality</span>
              <h1 className="hero-city-name">{city}</h1>
              <div className="hero-coords-row">
                <span className="coords-tag">
                  {lat >= 0 ? `${lat}° N` : `${Math.abs(lat)}° S`}, {lon >= 0 ? `${lon}° E` : `${Math.abs(lon)}° W`}
                </span>
                <span className="dot-divider">•</span>
                <span className="updated-tag">
                  <Clock size={13} />
                  <span>Updated at {formattedTime} (UTC)</span>
                </span>
              </div>

              {/* Weather and Atmosphere Micro-strip */}
              {weather && (
                <div className="weather-micro-strip">
                  <div className="weather-item">
                    <Thermometer size={16} className="weather-icon text-temp" />
                    <div>
                      <span className="weather-lbl">Temp</span>
                      <span className="weather-val">{weather.temperature ?? '--'}°C</span>
                    </div>
                  </div>

                  <div className="weather-item">
                    <Droplets size={16} className="weather-icon text-humidity" />
                    <div>
                      <span className="weather-lbl">Humidity</span>
                      <span className="weather-val">{weather.humidity ?? '--'}%</span>
                    </div>
                  </div>

                  <div className="weather-item">
                    <Wind size={16} className="weather-icon text-wind" />
                    <div>
                      <span className="weather-lbl">Wind</span>
                      <span className="weather-val">{weather.wind_speed ?? '--'} km/h</span>
                    </div>
                  </div>

                  {pollutants?.uv_index !== undefined && (
                    <div className="weather-item">
                      <Sun size={16} className="weather-icon text-uv" />
                      <div>
                        <span className="weather-lbl">UV Index</span>
                        <span className="weather-val">{pollutants.uv_index}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right side Gauge */}
            <div className="hero-gauge-wrapper">
              <AQIGauge
                aqi={aqi}
                category={category}
                categoryColor={category_color}
                europeanAqi={aqiData.european_aqi}
                dominantPollutant={dominant_pollutant}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Air Track High-Impact Problem Solvers */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <h2 className="section-title">Air Track Solutions & Personal Exposure Control</h2>
            <p className="section-subtitle">Real-world community interventions: cigarette equivalent inhalation & automated school safety</p>
          </div>
          <span className="badge badge-track">Track: Air</span>
        </div>

        <div className="air-track-solvers-grid">
          <SchoolSafetySection city={city} aqi={aqi} />
          <ExposureCalculator aqi={aqi} pm25={pollutants?.pm2_5 || 25} />
        </div>
      </section>

      {/* Satellite Crop Fire & Stubble Smoke Dispersion Radar */}
      <section className="section-block">
        <StubbleSmokeRadar />
      </section>

      {/* Actionable Health & Safety Guidance */}
      <section className="section-block">

        <div className="section-header">
          <div>
            <h2 className="section-title">Targeted Health & Community Action Guide</h2>
            <p className="section-subtitle">Real-time precautions tailored for sensitive individuals, schools, and outdoor workouts</p>
          </div>
        </div>
        <HealthAdviceGrid aqi={aqi} category={category} city={city} />
      </section>

      {/* Pollutant Breakdown Grid */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <h2 className="section-title">Atmospheric Pollutants Breakdown</h2>
            <p className="section-subtitle">Exact mass concentration levels compared against WHO 24-hour safe exposure limits</p>
          </div>
          <span className="data-source-tag">Source: {source}</span>
        </div>

        <div className="pollutants-grid">
          <PollutantCard symbol="PM2.5" value={pollutants.pm2_5} />
          <PollutantCard symbol="PM10" value={pollutants.pm10} />
          <PollutantCard symbol="NO2" value={pollutants.no2} />
          <PollutantCard symbol="O3" value={pollutants.o3} />
          <PollutantCard symbol="SO2" value={pollutants.so2} />
          <PollutantCard symbol="CO" value={pollutants.co} />
        </div>
      </section>

      {/* 48-Hour Real Timeline & Forecast */}
      <section className="section-block">
        <TrendChart historyData={historyData} city={city} />
      </section>

      {/* Delta Comparison Tool */}
      <section className="section-block">
        <CityComparison currentAQIData={aqiData} />
      </section>

      {/* Featured Cities Overview */}
      {featuredCities && featuredCities.length > 0 && (
        <section className="section-block">
          <div className="section-header">
            <div>
              <h2 className="section-title">Global & National Metros Air Quality</h2>
              <p className="section-subtitle">Real-time live comparison across major urban centers</p>
            </div>
          </div>
          <div className="featured-cities-grid">
            {featuredCities.map((c) => (
              <CityCard key={`${c.city}-${c.country}`} city={c} onSelect={onSelectCity} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}