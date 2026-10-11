import React from 'react';
import { 
  School, AlertTriangle, Flame, ShieldAlert, 
  Wind, CheckCircle2, HeartPulse, Sparkles 
} from 'lucide-react';
import { AlertPanel } from '../components/AlertPanel';
import { SchoolSafetySection } from '../components/SchoolSafetySection';
import { ExposureCalculator } from '../components/ExposureCalculator';
import './AlertsPage.css';


const SCHOOL_SAFETY_MATRIX = [
  { aqi: '0 - 50', status: 'Normal Schedule', color: '#10b981', sports: 'Unrestricted outdoor sports, matches, and PE sessions.', recess: 'Outdoor recess recommended.' },
  { aqi: '51 - 100', status: 'Standard Precautions', color: '#f59e0b', sports: 'Regular outdoor sports. Ensure plenty of water breaks.', recess: 'Outdoor recess safe for all students.' },
  { aqi: '101 - 150', status: 'Sensitive Caution', color: '#f97316', sports: 'Reduce intense prolonged cardio drills. Sensitive students stay in shaded/indoor areas.', recess: 'Allow indoor recess options for asthmatic students.' },
  { aqi: '151 - 200', status: 'Outdoor Sports Cancelled', color: '#ef4444', sports: 'All outdoor PE, soccer, and athletic training moved indoors or postponed.', recess: 'Indoor recess mandatory. Keep school windows closed.' },
  { aqi: '201 - 300', status: 'School Alert / Indoor PE', color: '#8b5cf6', sports: 'Complete suspension of outdoor athletics. Masks distributed at bus pickup.', recess: 'All students remain inside air-filtered classrooms.' },
  { aqi: '301+', status: 'Mandatory School Closure', color: '#be123c', sports: 'Schools shift to remote/online classes under emergency environmental protocols.', recess: 'Campus completely closed.' },
];

export function AlertsPage({ alertData, city, aqi, pollutants }) {
  return (
    <div className="alerts-page container">
      <div className="alerts-header">
        <div>
          <h2 className="alerts-page-title">Health Advisory & School Safety Protocols</h2>
          <p className="alerts-page-subtitle">
            Community protection thresholds, Graded Response Action Plans (GRAP), and outdoor activity safety
          </p>
        </div>
      </div>

      {/* Active City Alert Card */}
      <AlertPanel alertData={alertData} city={city} aqi={aqi} />

      {/* Interactive School Safety Directives & Cigarette Equivalence Inhalation */}
      <div className="air-track-solvers-grid" style={{ marginBottom: '1.75rem', marginTop: '1.5rem' }}>
        <SchoolSafetySection city={city} aqi={aqi} />
        <ExposureCalculator aqi={aqi} pm25={pollutants?.pm2_5 || 25} />
      </div>

      {/* School Safety & Recess Guidance Matrix */}

      <div className="safety-section glass-card">
        <div className="safety-section-header">
          <div className="safety-icon-bubble school">
            <School size={20} />
          </div>
          <div>
            <h3 className="safety-title">School Outdoor Safety & Recess Matrix</h3>
            <p className="safety-subtitle">Standard operating procedures for educational institutions during elevated AQI</p>
          </div>
        </div>

        <div className="matrix-table-wrapper">
          <table className="matrix-table">
            <thead>
              <tr>
                <th>AQI Range</th>
                <th>Safety Status</th>
                <th>Sports & Physical Ed (PE)</th>
                <th>Recess & Breaks</th>
              </tr>
            </thead>
            <tbody>
              {SCHOOL_SAFETY_MATRIX.map((row, idx) => (
                <tr key={idx} className={aqi >= parseInt(row.aqi) && aqi <= parseInt(row.aqi.split('-')[1] || '999') ? 'highlight-row' : ''}>
                  <td>
                    <span className="aqi-range-badge" style={{ borderColor: row.color, color: row.color }}>
                      {row.aqi}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: row.color }}>{row.status}</strong>
                  </td>
                  <td>{row.sports}</td>
                  <td>{row.recess}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stubble Burning & Wildfire Smoke Advisory */}
      <div className="safety-grid-row">
        <div className="advisory-card glass-card">
          <div className="safety-section-header">
            <div className="safety-icon-bubble fire">
              <Flame size={20} />
            </div>
            <div>
              <h3 className="safety-title">Agricultural Stubble & Biomass Fire Impact</h3>
              <p className="safety-subtitle">Seasonal smoke transport & thermal inversion</p>
            </div>
          </div>
          <p className="advisory-text">
            During harvest seasons (Oct–Nov & Apr–May), crop residue burning generates intense plumes of fine carbonaceous particles (PM2.5) and carbon monoxide. Combined with low wind speeds and nocturnal surface temperature inversions, pollutants remain trapped near the ground.
          </p>
          <div className="advisory-tips">
            <div className="tip-item">
              <CheckCircle2 size={16} className="tip-icon" />
              <span>Keep air purifiers running in sealed bedrooms during nighttime inversion (10 PM – 8 AM).</span>
            </div>
            <div className="tip-item">
              <CheckCircle2 size={16} className="tip-icon" />
              <span>Avoid early morning workouts when ground-level smoke density peaks.</span>
            </div>
          </div>
        </div>

        <div className="advisory-card glass-card">
          <div className="safety-section-header">
            <div className="safety-icon-bubble mask">
              <HeartPulse size={20} />
            </div>
            <div>
              <h3 className="safety-title">Mask & Respiratory Protection Standards</h3>
              <p className="safety-subtitle">Choosing the right filter grade</p>
            </div>
          </div>
          <div className="mask-grades-list">
            <div className="mask-grade-item">
              <span className="grade-tag n95">N95 / FFP2</span>
              <p>Filters at least 95% of airborne particles down to 0.3 microns. Essential when AQI &gt; 150.</p>
            </div>
            <div className="mask-grade-item">
              <span className="grade-tag n99">N99 / FFP3</span>
              <p>Filters at least 99% of particulate matter. Recommended during severe haze (AQI &gt; 250).</p>
            </div>
            <div className="mask-grade-item">
              <span className="grade-tag surgical">Surgical / Cloth</span>
              <p>Blocks large droplets only; ineffective against toxic microscopic PM2.5 and gaseous pollutants.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}