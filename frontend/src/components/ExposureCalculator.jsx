import React, { useState, useEffect } from 'react';
import { 
  Activity, Shield, Cigarette, Wind, Heart, 
  Sparkles, CheckCircle2, AlertTriangle, AlertCircle 
} from 'lucide-react';
import { calculateExposure } from '../services/api';
import './ExposureCalculator.css';

export function ExposureCalculator({ aqi = 75, city = 'Your City' }) {
  const [minutes, setMinutes] = useState(60);
  const [activity, setActivity] = useState('walking'); // 'rest' | 'walking' | 'cycling' | 'running'
  const [hasN95, setHasN95] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateCalculation();
  }, [aqi, minutes, activity, hasN95]);

  const updateCalculation = async () => {
    setLoading(true);
    try {
      const data = await calculateExposure(aqi, minutes, activity, hasN95);
      setResult(data);
    } catch (err) {
      console.error('Exposure calc error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exposure-card glass-card">
      <div className="exposure-header">
        <div className="exposure-title-row">
          <div className="exposure-icon-bubble">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="exposure-title">Personal Pollution Inhalation & Lung Exposure</h3>
            <p className="exposure-subtitle">
              Calculate your personal toxic PM2.5 uptake and cigarette equivalence based on outdoor activity in <strong>{city}</strong> (AQI {aqi})
            </p>
          </div>
        </div>
      </div>

      <div className="exposure-controls-grid">
        {/* Minutes Slider */}
        <div className="control-block">
          <div className="control-label-row">
            <span className="control-label">Outdoor Exposure Time:</span>
            <span className="control-value-badge">{minutes} minutes ({Math.round(minutes / 60 * 10) / 10}h)</span>
          </div>
          <input
            type="range"
            min="10"
            max="360"
            step="10"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="exposure-slider"
          />
          <div className="slider-markers">
            <span>15 min</span>
            <span>1 hr</span>
            <span>2 hr</span>
            <span>4 hr</span>
            <span>6 hr</span>
          </div>
        </div>

        {/* Activity Level Selector */}
        <div className="control-block">
          <span className="control-label">Physical Activity Intensity:</span>
          <div className="activity-buttons">
            {[
              { id: 'rest', label: 'Rest / Sedentary', rate: '6 L/min' },
              { id: 'walking', label: 'Walking / Commute', rate: '15 L/min' },
              { id: 'cycling', label: 'Cycling', rate: '35 L/min' },
              { id: 'running', label: 'Running / Workout', rate: '45 L/min' },
            ].map((act) => (
              <button
                key={act.id}
                type="button"
                className={`activity-btn ${activity === act.id ? 'active' : ''}`}
                onClick={() => setActivity(act.id)}
              >
                <span className="act-name">{act.label}</span>
                <span className="act-rate">{act.rate}</span>
              </button>
            ))}
          </div>
        </div>

        {/* N95 Mask Toggle */}
        <div className="control-block n95-toggle-block">
          <div className="toggle-info">
            <Shield size={18} className={hasN95 ? 'text-good' : 'text-muted'} />
            <div>
              <span className="toggle-title">Wearing Certified N95 Mask?</span>
              <span className="toggle-desc">Filters 95% of microscopic particulate matter (PM2.5)</span>
            </div>
          </div>
          <button
            type="button"
            className={`btn-toggle ${hasN95 ? 'on' : 'off'}`}
            onClick={() => setHasN95(!hasN95)}
          >
            {hasN95 ? 'N95 Active (95% Protected)' : 'No Mask Worn'}
          </button>
        </div>
      </div>

      {/* Results Display Bento */}
      {result && (
        <div className="exposure-results-bento">
          {/* Cigarette Equivalent Metric Card */}
          <div className="result-metric-card cig-card">
            <div className="metric-header">
              <span className="metric-tag">Berkeley Earth Methodology</span>
              <Cigarette size={16} className="metric-cig-icon" />
            </div>
            <div className="cig-number-row">
              <span className="cig-number">{result.cigarette_equivalent}</span>
              <span className="cig-unit">Cigarettes</span>
            </div>
            <p className="metric-desc">
              Equivalent toxic particulate uptake into your lung tissue during this {minutes}-minute exposure.
            </p>
            {hasN95 ? (
              <div className="n95-benefit-tag good">
                <CheckCircle2 size={13} />
                <span>N95 filtered {result.n95_protection_benefit.cigarettes_avoided} cigarettes equivalent!</span>
              </div>
            ) : (
              <div className="n95-benefit-tag warning">
                <AlertTriangle size={13} />
                <span>Wearing an N95 mask would reduce this by 95%!</span>
              </div>
            )}
          </div>

          {/* Micrograms Inhaled Card */}
          <div className="result-metric-card">
            <span className="metric-tag">Total Mass Uptake</span>
            <div className="cig-number-row">
              <span className="cig-number text-brand">{result.pm2_5_inhaled_micrograms}</span>
              <span className="cig-unit">µg PM2.5</span>
            </div>
            <p className="metric-desc">
              Total volume of ambient air breathed: <strong>{result.air_volume_inhaled_m3} m³</strong>
            </p>
            <div className="stat-subrow">
              <span>Ambient Concentration:</span>
              <strong>{result.pm2_5_concentration_ug_m3} µg/m³</strong>
            </div>
          </div>

          {/* Action Recommendation Card */}
          <div className="result-metric-card verdict-card">
            <span className="metric-tag">Health Action Assessment</span>
            <h4 className="verdict-heading">{result.health_verdict}</h4>
            <p className="metric-desc">
              {result.cigarette_equivalent >= 1.0 
                ? 'High toxic burden. Deep particulate deposition can trigger inflammatory cytokines in pulmonary capillaries. Limit outdoor cardio and schedule indoor recovery.'
                : 'Manageable particulate intake. Maintain standard hydration and nasal clearance after outdoor activities.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
