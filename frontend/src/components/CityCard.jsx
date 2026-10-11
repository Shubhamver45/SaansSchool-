import React from 'react';
import { MapPin, ArrowRight, ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import './CityCard.css';

export function CityCard({ city, onSelect }) {
  const getCatStyle = (cat) => {
    switch (cat) {
      case 'Good':
        return { bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0' };
      case 'Moderate':
        return { bg: '#fffbeb', text: '#92400e', border: '#fde68a' };
      case 'Unhealthy for Sensitive Groups':
        return { bg: '#fff7ed', text: '#9a3412', border: '#fed7aa' };
      case 'Unhealthy':
        return { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' };
      case 'Very Unhealthy':
        return { bg: '#f5f3ff', text: '#5b21b6', border: '#ddd6fe' };
      case 'Hazardous':
      default:
        return { bg: '#fff1f2', text: '#881337', border: '#fecdd3' };
    }
  };

  const style = getCatStyle(city.category);

  return (
    <div className="city-card glass-card" onClick={() => onSelect(city)}>
      <div className="city-card-header">
        <div className="city-title-group">
          <div className="city-name-row">
            <MapPin size={15} className="city-pin" />
            <h4 className="city-name">{city.city}</h4>
          </div>
          <span className="city-country">
            {[city.state, city.country].filter(Boolean).join(', ')}
          </span>
        </div>

        <div className="city-aqi-badge" style={{ backgroundColor: style.bg, color: style.text, borderColor: style.border }}>
          <span className="badge-aqi-val">{city.aqi}</span>
          <span className="badge-aqi-lbl">AQI</span>
        </div>
      </div>

      <div className="city-card-footer">
        <span className="city-cat-tag" style={{ color: style.text }}>
          {city.category}
        </span>
        <button className="city-explore-btn">
          <span>Details</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}