import React from 'react';
import { 
  AlertTriangle, ShieldCheck, AlertCircle, ShieldAlert, 
  CheckCircle2, Bell, Users, School, Flame 
} from 'lucide-react';
import './AlertPanel.css';

export function AlertPanel({ alertData, city, aqi }) {
  if (!alertData) return null;

  const getAlertConfig = (level) => {
    switch (level) {
      case 'info':
        return {
          icon: ShieldCheck,
          color: '#10b981',
          bg: '#ecfdf5',
          border: '#a7f3d0',
          badgeText: 'Low Risk — Good Air'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: '#f59e0b',
          bg: '#fffbeb',
          border: '#fde68a',
          badgeText: 'Moderate Exposure Alert'
        };
      case 'danger':
        return {
          icon: AlertCircle,
          color: '#ef4444',
          bg: '#fef2f2',
          border: '#fecaca',
          badgeText: 'High Health Risk Alert'
        };
      case 'critical':
      default:
        return {
          icon: ShieldAlert,
          color: '#881337',
          bg: '#fff1f2',
          border: '#fecdd3',
          badgeText: 'Emergency Toxic Alert'
        };
    }
  };

  const config = getAlertConfig(alertData.level);
  const IconComp = config.icon;

  return (
    <div className="alert-panel-card glass-card">
      <div 
        className="alert-banner-header"
        style={{ backgroundColor: config.bg, borderColor: config.border }}
      >
        <div className="alert-banner-left">
          <div className="alert-icon-wrap" style={{ color: config.color }}>
            <IconComp size={24} />
          </div>
          <div>
            <div className="alert-tag-row">
              <span className="alert-level-tag" style={{ color: config.color, borderColor: config.border }}>
                {config.badgeText}
              </span>
              <span className="alert-city-tag">City: <strong>{city}</strong> (AQI {aqi})</span>
            </div>
            <h3 className="alert-banner-title" style={{ color: config.color }}>{alertData.title}</h3>
            <p className="alert-banner-msg">{alertData.message}</p>
          </div>
        </div>
      </div>

      <div className="alert-body-grid">
        {/* Affected Groups */}
        <div className="alert-subcard">
          <div className="subcard-header">
            <Users size={18} className="subcard-icon text-brand" />
            <h4 className="subcard-title">Vulnerable & Affected Groups</h4>
          </div>
          <div className="affected-list">
            {alertData.affected_groups && alertData.affected_groups.length > 0 ? (
              alertData.affected_groups.map((grp, i) => (
                <div key={i} className="affected-item">
                  <AlertCircle size={14} className="item-icon" />
                  <span>{grp}</span>
                </div>
              ))
            ) : (
              <div className="affected-item safe">
                <CheckCircle2 size={14} className="item-icon text-good" />
                <span>No groups currently at significant risk</span>
              </div>
            )}
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="alert-subcard">
          <div className="subcard-header">
            <Bell size={18} className="subcard-icon text-warning" />
            <h4 className="subcard-title">Precautionary Measures</h4>
          </div>
          <div className="recs-list">
            {alertData.recommendations && alertData.recommendations.map((rec, i) => (
              <div key={i} className="rec-bullet">
                <span className="bullet-num">{i + 1}</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}