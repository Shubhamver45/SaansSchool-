import React from 'react';

/**
 * SaansSchool Institutional Brandmark
 * 
 * Design Semiotics:
 * 1. Protective Campus Pediment (School apex & shelter)
 * 2. Twin Respiratory Airflow Loops ("Saans" clean breath inhalation paths)
 * 3. Central CAAQMS Sensor Node (Real-time telemetry pulse in Emerald #10b981)
 * 4. Engineered Shield Contour (Statutory GRAP environmental defense)
 */
export function SaansLogo({ size = 32, className = '', showText = false, variant = 'light' }) {
  return (
    <div className={`saans-brand-emblem ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="saans-logo-svg"
        style={{ flexShrink: 0 }}
      >
        {/* Background shield tile with micro border */}
        <rect width="64" height="64" rx="12" fill="#090d16" />
        <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="11.25" stroke="#1e293b" strokeWidth="1.5" />

        {/* Ambient Clean Air Glow */}
        <circle cx="32" cy="32" r="18" fill="#10b981" fillOpacity="0.08" />

        {/* Outer Protective Defense Arc (School & Community Shield) */}
        <path
          d="M32 9L49 16.5V31C49 41.5 41.8 50.8 32 54C22.2 50.8 15 41.5 15 31V16.5L32 9Z"
          stroke="#334155"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />

        {/* School Gable / Architectural Pediment */}
        <path
          d="M23 20L32 15L41 20"
          stroke="#f8fafc"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left Respiratory Airway / "Saans" Inhalation Curve (Cyan Clean Air Vector) */}
        <path
          d="M26 23C23.2 24.8 21.5 28.2 21.5 32C21.5 36.8 25 40.5 29 40.5C31.2 40.5 32 39 32 36.5V27"
          stroke="#06b6d4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Right Respiratory Airway / "Saans" Exhalation Filter Curve (Emerald Active Shield) */}
        <path
          d="M38 23C40.8 24.8 42.5 28.2 42.5 32C42.5 36.8 39 40.5 35 40.5C32.8 40.5 32 39 32 36.5"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Central Telemetry Core / Ground Sensor Node */}
        <circle cx="32" cy="27" r="3" fill="#10b981" />
        <circle cx="32" cy="27" r="1.2" fill="#ffffff" />

        {/* Active Inhalation Sensor Ripple Waves */}
        <path
          d="M28.5 24C29.5 23.2 30.7 22.8 32 22.8C33.3 22.8 34.5 23.2 35.5 24"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
        <path
          d="M27 21.5C28.5 20.3 30.2 19.8 32 19.8C33.8 19.8 35.5 20.3 37 21.5"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />

        {/* Base Foundation Bar (Equitable School Protection) */}
        <line x1="26" y1="45" x2="38" y2="45" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {showText && (
        <div className="saans-logo-text-group" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
              SAANS<span style={{ color: '#10b981' }}>SCHOOL</span>
            </span>
            <span style={{ 
              fontSize: '0.62rem', 
              fontWeight: 700, 
              padding: '1px 5px', 
              background: '#047857', 
              color: '#ecfdf5', 
              borderRadius: '3px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              Gov.in Spec
            </span>
          </div>
          <span style={{ fontSize: '0.68rem', color: '#94a3b8', letterSpacing: '0.02em', textTransform: 'uppercase', fontWeight: 500 }}>
            National Campus Air Exposure Console
          </span>
        </div>
      )}
    </div>
  );
}
