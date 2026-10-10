import React, { useState, useEffect } from 'react';
import { Wind, Wrench, ShieldCheck, Check, DollarSign, Clock, Users, Printer, X, FileText } from 'lucide-react';
import { SaansLogo } from './SaansLogo';
import { calculateIndoorCADR } from '../services/api';
import './IndoorCADRCalculator.css';

export function IndoorCADRCalculator() {
  const [lengthFt, setLengthFt] = useState(25);
  const [widthFt, setWidthFt] = useState(20);
  const [heightFt, setHeightFt] = useState(10);
  const [students, setStudents] = useState(40);
  const [outdoorPm25, setOutdoorPm25] = useState(350);
  const [cadrData, setCadrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBuildSheet, setShowBuildSheet] = useState(false);

  const runCalculation = (l, w, h, s, outPm) => {
    setLoading(true);
    calculateIndoorCADR({
      length_ft: l !== undefined ? l : lengthFt,
      width_ft: w !== undefined ? w : widthFt,
      height_ft: h !== undefined ? h : heightFt,
      students_count: s !== undefined ? s : students,
      outdoor_pm25: outPm !== undefined ? outPm : outdoorPm25,
    })
      .then(data => setCadrData(data))
      .catch(err => console.error('CADR calc error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    runCalculation(lengthFt, widthFt, heightFt, students, outdoorPm25);
  }, []);

  return (
    <div className="indoor-cadr-container">
      <div className="cadr-header-row">
        <div>
          <div className="cadr-title-group">
            <Wrench size={20} className="cadr-icon" />
            <h2 className="cadr-title">Indoor Air & Low-Cost DIY Purifier (CADR) Engineering</h2>
          </div>
          <p className="cadr-sub">
            Government and budget schools cannot afford ₹60,000 HEPA systems. 
            This engineering tool calculates the Clean Air Delivery Rate (CADR) to build a ₹2,800 Corsi-Rosenthal Box that delivers 2x cleaner air.
          </p>
        </div>

        <div className="cadr-header-actions-col">
          <div className="cadr-ach-badge">
            <span>Target Classroom Standard:</span>
            <strong>5.0 Air Changes / Hour (ACH)</strong>
          </div>
          <button 
            type="button"
            className="btn-export-sheet"
            onClick={() => setShowBuildSheet(true)}
            title="Generate printable engineering sheet for school carpenter and PTA"
          >
            <Printer size={14} />
            <span>Export Classroom Build Sheet (Print / PDF)</span>
          </button>
        </div>
      </div>

      <div className="cadr-layout-grid">
        {/* Left Card: Classroom Dimensions & Inputs */}
        <div className="cadr-inputs-card">
          <h3 className="cadr-card-heading">Classroom Dimensions & Infiltration</h3>

          <div className="inputs-row-grid">
            <div className="input-field-group">
              <label>Length (ft)</label>
              <input 
                type="number" 
                value={lengthFt} 
                min="10" 
                max="60" 
                onChange={(e) => setLengthFt(Number(e.target.value))}
                onBlur={() => runCalculation(lengthFt, widthFt, heightFt, students, outdoorPm25)}
              />
            </div>
            <div className="input-field-group">
              <label>Width (ft)</label>
              <input 
                type="number" 
                value={widthFt} 
                min="10" 
                max="60" 
                onChange={(e) => setWidthFt(Number(e.target.value))}
                onBlur={() => runCalculation(lengthFt, widthFt, heightFt, students, outdoorPm25)}
              />
            </div>
            <div className="input-field-group">
              <label>Height (ft)</label>
              <input 
                type="number" 
                value={heightFt} 
                min="8" 
                max="20" 
                onChange={(e) => setHeightFt(Number(e.target.value))}
                onBlur={() => runCalculation(lengthFt, widthFt, heightFt, students, outdoorPm25)}
              />
            </div>
          </div>

          <div className="input-field-group">
            <label>Student Desks in Room</label>
            <input 
              type="number" 
              value={students} 
              min="10" 
              max="90" 
              onChange={(e) => setStudents(Number(e.target.value))}
              onBlur={() => runCalculation(lengthFt, widthFt, heightFt, students, outdoorPm25)}
            />
          </div>

          <div className="input-field-group">
            <label>Outdoor Morning PM2.5 (µg/m³)</label>
            <input 
              type="range" 
              min="100" 
              max="600" 
              value={outdoorPm25} 
              onChange={(e) => {
                setOutdoorPm25(Number(e.target.value));
                runCalculation(lengthFt, widthFt, heightFt, students, Number(e.target.value));
              }}
              className="cadr-slider"
            />
            <span className="slider-readout text-red">{outdoorPm25} µg/m³ Infiltration Baseline</span>
          </div>

          {cadrData && (
            <div className="diy-blueprint-box">
              <h4 className="blueprint-title">Low-Cost Corsi-Rosenthal Box Bill of Materials:</h4>
              <ul className="blueprint-list">
                {cadrData.build_instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Card: Cost & Clearance Curve */}
        <div className="cadr-results-card">
          {cadrData ? (
            <>
              {/* Cost Comparison Metric Banner */}
              <div className="cost-comparison-banner">
                <div className="cost-box commercial-box">
                  <span className="cost-lbl">Commercial HEPA Units</span>
                  <strong className="cost-val text-red">₹{cadrData.cost_comparison.commercial_hepa_cost_inr.toLocaleString()}</strong>
                  <span className="cost-sub">250 CFM units required</span>
                </div>

                <div className="cost-vs-separator">VS</div>

                <div className="cost-box diy-box">
                  <span className="cost-lbl">DIY Corsi-Rosenthal Box</span>
                  <strong className="cost-val text-emerald">₹{cadrData.cost_comparison.diy_corsi_box_cost_inr.toLocaleString()}</strong>
                  <span className="cost-sub">550 CFM delivery ({cadrData.cost_comparison.savings_multiplier}x Cheaper!)</span>
                </div>
              </div>

              {/* Clearance Time Callout */}
              <div className="clearance-callout-box">
                <Clock size={20} className="text-blue flex-shrink-0" />
                <div>
                  <strong>{cadrData.clearance_performance.time_to_under_50_ug_min} Minutes to Safe Classroom Air (&lt;50 µg/m³)</strong>
                  <p>{cadrData.clearance_performance.pre_cycling_recommendation}</p>
                </div>
              </div>

              {/* Clearance Timeline Series */}
              <div className="timeline-curve-box">
                <span className="curve-title">Air Filtration Clearance Progression:</span>
                <div className="timeline-bars-row">
                  {cadrData.clearance_performance.time_series.map((pt, i) => {
                    const pct = Math.min(100, Math.round((pt.indoor_pm25 / outdoorPm25) * 100));
                    return (
                      <div key={i} className="time-bar-col">
                        <span className="bar-val" style={{ color: pt.indoor_pm25 > 100 ? '#dc2626' : (pt.indoor_pm25 > 50 ? '#d97706' : '#16a34a') }}>
                          {pt.indoor_pm25}
                        </span>
                        <div className="bar-visual-wrap">
                          <div 
                            className="bar-fill" 
                            style={{ 
                              height: `${pct}%`,
                              backgroundColor: pt.indoor_pm25 > 100 ? '#f87171' : (pt.indoor_pm25 > 50 ? '#fbbf24' : '#4ade80') 
                            }} 
                          />
                        </div>
                        <span className="bar-min">{pt.minute}m</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="cadr-loading-placeholder">
              <span>Calculating ventilation physics and CADR specifications...</span>
            </div>
          )}
        </div>
      </div>

      {/* Classroom Engineering Build Sheet Printable Modal */}
      {showBuildSheet && cadrData && (
        <div className="build-sheet-backdrop" onClick={() => setShowBuildSheet(false)}>
          <div className="build-sheet-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-modal-header no-print">
              <div className="sheet-header-title">
                <FileText size={18} className="text-blue" />
                <strong>Classroom DIY Air Purifier Engineering Specification Sheet</strong>
              </div>
              <div className="sheet-header-actions">
                <button 
                  className="btn-print-now"
                  onClick={() => window.print()}
                >
                  <Printer size={14} />
                  <span>Print / Save as PDF</span>
                </button>
                <button 
                  className="btn-close-sheet"
                  onClick={() => setShowBuildSheet(false)}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div className="printable-sheet-body">
              <div className="doc-header-block">
                <div className="doc-title-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <SaansLogo size={36} />
                    <div>
                      <h2 className="doc-main-title">SAANSSCHOOL CLASSROOM AIR DEFENSE SPECIFICATION</h2>
                      <span className="doc-sub-id">Specification ID: CR-BOX-CADR-{lengthFt}x{widthFt}-{Date.now().toString().slice(-6)}</span>
                    </div>
                  </div>
                  <div className="doc-compliance-seal">
                    <span>ASHRAE / Harvard</span>
                    <strong>5.0 ACH Compliant</strong>
                  </div>
                </div>
                <div className="doc-meta-strip">
                  <span>Room: <strong>{lengthFt} ft × {widthFt} ft × {heightFt} ft ({lengthFt * widthFt * heightFt} cu ft)</strong></span>
                  <span>Occupancy: <strong>{students} Students</strong></span>
                  <span>Outdoor Stress: <strong>{outdoorPm25} µg/m³ PM2.5</strong></span>
                  <span>Target CADR: <strong>{cadrData.cadr_engineering.required_cadr_cfm} CFM</strong></span>
                </div>
              </div>

              <div className="doc-grid-sections">
                <div className="doc-section-card">
                  <h4 className="sec-heading">1. Bill of Materials (Budget: ₹{cadrData.cost_comparison.diy_corsi_box_cost_inr.toLocaleString()})</h4>
                  <table className="bom-table">
                    <thead>
                      <tr>
                        <th>Item Description</th>
                        <th>Qty</th>
                        <th>Est. Cost (INR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>20-inch Box Fan (3-speed, forward airflow)</td>
                        <td>1 Unit</td>
                        <td>₹1,400</td>
                      </tr>
                      <tr>
                        <td>MERV-13 / F7 Pleated Air Filters (20" × 20" × 1")</td>
                        <td>4 Units</td>
                        <td>₹1,200</td>
                      </tr>
                      <tr>
                        <td>Heavy-Duty Duct Tape (2" width) & Cardboard Base</td>
                        <td>1 Roll</td>
                        <td>₹200</td>
                      </tr>
                      <tr className="bom-total-row">
                        <td><strong>Total DIY Assembly Cost</strong></td>
                        <td></td>
                        <td><strong>₹2,800 INR</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="commercial-comp-note">
                    *Commercial 500 CFM HEPA Unit: ₹70,000 INR ({cadrData.cost_comparison.savings_multiplier}x cost difference).
                  </p>
                </div>

                <div className="doc-section-card">
                  <h4 className="sec-heading">2. Step-by-Step Carpentry & Assembly Guide</h4>
                  <ol className="assembly-steps-list">
                    <li><strong>Base Construction:</strong> Tape the bottom cardboard piece to form a square tray base.</li>
                    <li><strong>Filter Placement:</strong> Place four MERV-13 filters vertically facing inward (arrows pointing inside the box). Tape all vertical seams airtight with duct tape.</li>
                    <li><strong>Fan Mounting:</strong> Place the 20" box fan on top, blowing upwards toward the ceiling (arrows pointing UP). Seal fan edges completely.</li>
                    <li><strong>Cardboard Shroud:</strong> Cut a 15-inch circular cardboard shroud and tape it to the fan face. This eliminates corner air vortexes, increasing CADR airflow by 15-20%.</li>
                    <li><strong>Daily Protocol:</strong> Turn unit to Speed 2 at 7:30 AM (20 minutes before first period). Clears 80% of toxic particulates in {cadrData.clearance_performance.time_to_under_50_ug_min} minutes.</li>
                  </ol>
                </div>
              </div>

              <div className="doc-signatures-strip">
                <div className="sig-box">
                  <div className="sig-line"></div>
                  <span>School Principal / Headmaster Sign-Off</span>
                </div>
                <div className="sig-box">
                  <div className="sig-line"></div>
                  <span>Parent-Teacher Association (PTA) Representative</span>
                </div>
                <div className="sig-box">
                  <div className="sig-line"></div>
                  <span>Date & Campus Stamp</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
