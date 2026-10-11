import React from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';
import './AQIGauge.css';

export function AQIGauge({ aqi = 0, category = 'Good', categoryColor = '#10b981', europeanAqi = null, dominantPollutant = 'PM2.5' }) {
  // Max AQI scale is 500
  const normalizedAqi = Math.min(Math.max(0, aqi), 500);
  // Calculate angle for 180-degree semi circle (from -90deg to +90deg or 0 to 180)
  const angle = (normalizedAqi / 500) * 180;

  // Arc stroke geometry
  const radius = 90;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // 180-deg arc length
  const strokeDashoffset = circumference - (normalizedAqi / 500) * circumference;

  const getCategoryConfig = (cat) => {
    switch (cat) {
      case 'Good':
        return {
          icon: ShieldCheck,
          className: 'gauge-good',
          verdict: 'Clean Air — Safe for all outdoor activities',
          bgTint: '#ecfdf5',
          borderTint: '#a7f3d0',
          textColor: '#065f46',
          accent: '#10b981'
        };
      case 'Moderate':
        return {
          icon: AlertCircle,
          className: 'gauge-moderate',
          verdict: 'Acceptable Air — Sensitive individuals take caution',
          bgTint: '#fffbeb',
          borderTint: '#fde68a',
          textColor: '#92400e',
          accent: '#f59e0b'
        };
      case 'Unhealthy for Sensitive Groups':
        return {
          icon: AlertTriangle,
          className: 'gauge-sensitive',
          verdict: 'Sensitive Groups reduce outdoor exertion',
          bgTint: '#fff7ed',
          borderTint: '#fed7aa',
          textColor: '#9a3412',
          accent: '#f97316'
        };
      case 'Unhealthy':
        return {
          icon: AlertTriangle,
          className: 'gauge-unhealthy',
          verdict: 'Unhealthy — N95 mask recommended outdoors',
          bgTint: '#fef2f2',
          borderTint: '#fecaca',
          textColor: '#991b1b',
          accent: '#ef4444'
        };
      case 'Very Unhealthy':
        return {
          icon: ShieldAlert,
          className: 'gauge-very-unhealthy',
          verdict: 'Health Alert — Avoid outdoor activities',
          bgTint: '#f5f3ff',
          borderTint: '#ddd6fe',
          textColor: '#5b21b6',
          accent: '#8b5cf6'
        };
      case 'Hazardous':
      default:
        return {
          icon: ShieldAlert,
          className: 'gauge-hazardous',
          verdict: 'Emergency Toxicity — Remain strictly indoors',
          bgTint: '#fff1f2',
          borderTint: '#fecdd3',
          textColor: '#881337',
          accent: '#be123c'
        };
    }
  };

  const config = getCategoryConfig(category);
  const IconComponent = config.icon;

  return (
    <div className="aqi-gauge-card glass-card">
      <div className="gauge-header">
        <div className="gauge-title-row">
          <span className="gauge-label">Air Quality Index</span>
          <span className="gauge-standard-badge">US EPA Standard</span>
        </div>
        <span className="dominant-badge">
          Dominant: <strong>{dominantPollutant}</strong>
        </span>
      </div>

      <div className="gauge-visual-container">
        <svg viewBox="0 0 220 130" className="gauge-svg">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="20%" stopColor="#f59e0b" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="60%" stopColor="#ef4444" />
              <stop offset="80%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
            <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={categoryColor} floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Background Track */}
          <path
            d="M 20 115 A 90 90 0 0 1 200 115"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Colored Progress Arc */}
          <path
            d="M 20 115 A 90 90 0 0 1 200 115"
            fill="none"
            stroke={categoryColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            filter="url(#gaugeGlow)"
            className="gauge-progress-path"
          />

          {/* Scale Labels */}
          <text x="18" y="127" className="scale-text">0</text>
          <text x="105" y="32" className="scale-text">150</text>
          <text x="195" y="127" className="scale-text">500</text>
        </svg>

        {/* Center Display */}
        <div className="gauge-center-content">
          <div className="gauge-aqi-val" style={{ color: config.textColor }}>
            {aqi}
          </div>
          <div 
            className="gauge-cat-pill" 
            style={{ 
              backgroundColor: config.bgTint, 
              color: config.textColor, 
              borderColor: config.borderTint 
            }}
          >
            <IconComponent size={14} />
            <span>{category}</span>
          </div>
        </div>
      </div>

      {/* Health Verdict Box */}
      <div 
        className="gauge-verdict-banner"
        style={{ 
          backgroundColor: config.bgTint, 
          borderColor: config.borderTint,
          color: config.textColor
        }}
      >
        <Sparkles size={16} className="verdict-icon" />
        <span className="verdict-text">{config.verdict}</span>
      </div>

      {/* Dual scale comparison footer */}
      {europeanAqi !== null && (
        <div className="gauge-scales-footer">
          <div className="scale-item">
            <span className="scale-name">US EPA AQI</span>
            <span className="scale-val" style={{ color: config.textColor }}>{aqi}</span>
          </div>
          <div className="scale-divider"></div>
          <div className="scale-item">
            <span className="scale-name">European EAQI</span>
            <span className="scale-val">{europeanAqi}</span>
          </div>
        </div>
      )}
    </div>
  );
}