import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import './PollutantCard.css';

// Standard WHO 24h Air Quality Guidelines (µg/m³)
const WHO_GUIDELINES = {
  'PM2.5': { safe: 15, unit: 'µg/m³', name: 'Fine Particulate Matter (<2.5µm)', desc: 'Penetrates deep into lungs and bloodstream. Main driver of haze and cardiovascular disease.' },
  'PM10':  { safe: 45, unit: 'µg/m³', name: 'Coarse Particulate Matter (<10µm)', desc: 'Dust, pollen, and mold spores that irritate airways and respiratory tract.' },
  'NO2':   { safe: 25, unit: 'µg/m³', name: 'Nitrogen Dioxide', desc: 'Emitted from vehicle exhausts and power plants. Aggravates asthma and bronchitis.' },
  'O3':    { safe: 100, unit: 'µg/m³', name: 'Ground-Level Ozone', desc: 'Formed by chemical reactions under sunlight. Triggers chest pain, coughing, and throat irritation.' },
  'SO2':   { safe: 40, unit: 'µg/m³', name: 'Sulphur Dioxide', desc: 'Produced from burning fossil fuels in power stations and industrial facilities.' },
  'CO':    { safe: 4000, unit: 'µg/m³', name: 'Carbon Monoxide', desc: 'Colorless toxic gas from incomplete combustion in vehicles and heaters.' },
  'DUST':  { safe: 50, unit: 'µg/m³', name: 'Atmospheric Dust', desc: 'Desert and soil dust particles suspended in the atmosphere.' },
  'UV':    { safe: 3, unit: 'Index', name: 'Solar UV Index', desc: 'Measurement of sun ultraviolet radiation reaching the ground.' }
};

export function PollutantCard({ symbol, value }) {
  const meta = WHO_GUIDELINES[symbol.toUpperCase()] || {
    safe: 50,
    unit: 'µg/m³',
    name: symbol,
    desc: 'Atmospheric pollutant compound.'
  };

  const safeLimit = meta.safe;
  const ratio = value / safeLimit;
  const percentage = Math.min(Math.round(ratio * 100), 400);

  let statusText = 'Within Safe Limits';
  let statusClass = 'status-safe';
  let barColor = '#10b981';
  let StatusIcon = CheckCircle2;

  if (ratio > 3.0) {
    statusText = 'Hazardous Exposure';
    statusClass = 'status-hazardous';
    barColor = '#be123c';
    StatusIcon = AlertCircle;
  } else if (ratio > 1.8) {
    statusText = 'Significantly Elevated';
    statusClass = 'status-elevated';
    barColor = '#ef4444';
    StatusIcon = AlertTriangle;
  } else if (ratio > 1.0) {
    statusText = 'Above WHO Guideline';
    statusClass = 'status-warning';
    barColor = '#f59e0b';
    StatusIcon = AlertTriangle;
  }

  return (
    <div className="pollutant-card glass-card">
      <div className="pollutant-card-top">
        <div className="pollutant-badge-title">
          <span className="pollutant-symbol">{symbol}</span>
          <span className="pollutant-fullname">{meta.name}</span>
        </div>
        <div className={`pollutant-status-pill ${statusClass}`}>
          <StatusIcon size={13} />
          <span>{statusText}</span>
        </div>
      </div>

      <div className="pollutant-value-row">
        <div className="pollutant-reading">
          <span className="reading-number">{value}</span>
          <span className="reading-unit">{meta.unit}</span>
        </div>
        <div className="pollutant-who-ref">
          <span className="who-label">WHO Safe:</span>
          <span className="who-val">{safeLimit} {meta.unit}</span>
        </div>
      </div>

      {/* Progress meter vs safe limit */}
      <div className="pollutant-bar-container">
        <div className="pollutant-bar-track">
          <div 
            className="pollutant-bar-fill" 
            style={{ 
              width: `${Math.min(percentage / 3, 100)}%`,
              backgroundColor: barColor 
            }}
          />
          {/* Safe limit mark at 33% */}
          <div className="safe-limit-marker" title="WHO 24h safe baseline" />
        </div>
        <div className="bar-labels">
          <span>0</span>
          <span className="marker-label">WHO Limit ({percentage}%)</span>
          <span>3x+</span>
        </div>
      </div>

      <p className="pollutant-desc">{meta.desc}</p>
    </div>
  );
}