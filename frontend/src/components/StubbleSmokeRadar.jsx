import React, { useState, useEffect } from 'react';
import { Flame, Wind, Compass, AlertTriangle, ShieldCheck, ThermometerSnowflake } from 'lucide-react';
import { fetchStubbleHotspots } from '../services/api';
import './StubbleSmokeRadar.css';

export function StubbleSmokeRadar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchStubbleHotspots().then(setData).catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <div className="stubble-radar-card glass-card">
      <div className="stubble-header">
        <div className="stubble-title-row">
          <div className="stubble-icon-bubble">
            <Flame size={22} />
          </div>
          <div>
            <div className="stubble-badge-row">
              <span className="stubble-badge">Seasonal Bio-Mass Fire Tracker</span>
              <span className="fire-count-badge"><Flame size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{data.total_satellite_fires_detected} Thermal Anomalies</span>
            </div>
            <h3 className="stubble-title">Agricultural Stubble & Wildfire Smoke Trajectory</h3>
            <p className="stubble-subtitle">
              Satellite-detected crop residue burning plumes and seasonal monsoon wind dispersion vectors
            </p>
          </div>
        </div>
      </div>

      {/* Trajectory & Inversion Banners */}
      <div className="stubble-banners-grid">
        <div className="trajectory-banner">
          <div className="banner-icon-col">
            <Compass size={20} className="text-brand" />
          </div>
          <div>
            <span className="banner-tag">Dominant Smoke Vector</span>
            <h5 className="banner-main-text">{data.dominant_smoke_trajectory}</h5>
          </div>
        </div>

        <div className="inversion-banner">
          <div className="banner-icon-col">
            <ThermometerSnowflake size={20} className="text-warning" />
          </div>
          <div>
            <span className="banner-tag">Nocturnal Boundary Inversion</span>
            <h5 className="banner-main-text">{data.inversion_alert}</h5>
          </div>
        </div>
      </div>

      {/* Hotspots Grid */}
      <div className="stubble-hotspots-table-wrapper">
        <span className="table-caption">Monitored Agricultural Fire Clusters (Active Satellite Tracking):</span>
        <div className="hotspots-grid">
          {data.hotspots.map((spot, i) => (
            <div key={i} className="hotspot-tile">
              <div className="tile-top">
                <span className="spot-region">{spot.region}</span>
                <span className={`spot-intensity ${spot.intensity.toLowerCase()}`}>
                  {spot.intensity}
                </span>
              </div>
              <div className="tile-counts">
                <span className="spot-fires">{spot.fire_count} active fires</span>
                <span className="spot-drift">Drift: {spot.drift}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
