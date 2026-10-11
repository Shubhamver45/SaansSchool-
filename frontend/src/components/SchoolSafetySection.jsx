import React, { useState, useEffect } from 'react';
import { 
  School, AlertTriangle, ShieldCheck, Copy, 
  Check, Bus, Heart, Users, FileText, CheckCircle2 
} from 'lucide-react';
import { fetchSchoolDecision } from '../services/api';
import './SchoolSafetySection.css';

export function SchoolSafetySection({ city = 'Delhi', aqi = 150 }) {
  const [decision, setDecision] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadDecision();
  }, [city, aqi]);

  const loadDecision = async () => {
    try {
      const data = await fetchSchoolDecision(city, aqi);
      setDecision(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getParentNotice = () => {
    if (!decision) return '';
    return `[AirWatch School Health Advisory]
Date: ${new Date().toLocaleDateString()}
City: ${city} | Current AQI: ${aqi} (${decision.cpcb_grap_stage})

Action Decision: ${decision.decision}
- Recess: ${decision.recess_protocol}
- Sports/PE: ${decision.sports_pe_protocol}
- Mask Policy: ${decision.mask_requirement}
- School Bus Transit: ${decision.bus_commute_protocol}

Students with pre-existing asthma or respiratory allergies are requested to carry their prescribed inhalers.
Generated via AirWatch School Protection Shield.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getParentNotice());
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  if (!decision) return null;

  return (
    <div className="school-safety-card glass-card">
      <div className="school-safety-top">
        <div className="school-title-group">
          <div className="school-icon-bubble">
            <School size={22} />
          </div>
          <div>
            <div className="school-badge-row">
              <span className="school-badge">School & Child Protection Shield</span>
              <span className="grap-badge">{decision.cpcb_grap_stage}</span>
            </div>
            <h3 className="school-title">Automated School Protocol for {city}</h3>
            <p className="school-subtitle">
              Instant operational directives for school principals, sports coaches, and parents at AQI {aqi}
            </p>
          </div>
        </div>

        <button className="btn-copy-notice" onClick={handleCopy}>
          {copied ? <Check size={14} className="text-good" /> : <Copy size={14} />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Parent Notice'}</span>
        </button>
      </div>

      {/* Main Decision Verdict Banner */}
      <div className={`school-decision-banner ${aqi > 200 ? 'critical' : aqi > 100 ? 'warning' : 'safe'}`}>
        <div className="decision-left">
          <span className="decision-label">Official Administrative Action:</span>
          <h4 className="decision-title">{decision.decision}</h4>
        </div>
        <div className="decision-aqi-pill">
          <span>AQI {aqi}</span>
        </div>
      </div>

      {/* 4 Protocol Blocks */}
      <div className="school-protocols-grid">
        <div className="protocol-item">
          <div className="protocol-icon-row">
            <Users size={16} className="text-brand" />
            <span className="proto-label">Recess & Breaks</span>
          </div>
          <p className="proto-text">{decision.recess_protocol}</p>
        </div>

        <div className="protocol-item">
          <div className="protocol-icon-row">
            <Heart size={16} className="text-warning" />
            <span className="proto-label">Outdoor Sports & PE</span>
          </div>
          <p className="proto-text">{decision.sports_pe_protocol}</p>
        </div>

        <div className="protocol-item">
          <div className="protocol-icon-row">
            <ShieldCheck size={16} className="text-good" />
            <span className="proto-label">Mask Mandate</span>
          </div>
          <p className="proto-text">{decision.mask_requirement}</p>
        </div>

        <div className="protocol-item">
          <div className="protocol-icon-row">
            <Bus size={16} className="text-brand" />
            <span className="proto-label">Bus Commute</span>
          </div>
          <p className="proto-text">{decision.bus_commute_protocol}</p>
        </div>
      </div>
    </div>
  );
}
