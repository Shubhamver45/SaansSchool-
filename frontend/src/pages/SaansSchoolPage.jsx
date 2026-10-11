import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  School, MapPin, Wind, Flame, ShieldAlert, CheckSquare, Square,
  Send, Copy, Check, AlertTriangle, Clock, RefreshCw, Award,
  Lock, CheckCircle2, ChevronDown, Compass, ShieldCheck,
  TrendingUp, Bell, FileText, Share2, Info, ChevronRight,
  Sparkles, Layers, Search, X, Loader2, Sliders, Bus, Wrench
} from 'lucide-react';
import {
  fetchSaansSchools,
  searchSaansSchools,
  fetchSaansSchoolStatus,
  toggleSaansSchoolAction,
  sendSaansSchoolBroadcast,
  fetchSaansArchitecture
} from '../services/api';
import { PrivacyPolicyModal, TermsModal } from '../components/LegalModals';
import { BadDaySimulator } from '../components/BadDaySimulator';
import { CommuteExposureRouter } from '../components/CommuteExposureRouter';
import { IndoorCADRCalculator } from '../components/IndoorCADRCalculator';
import { StubbleTrajectoryTimeline } from '../components/StubbleTrajectoryTimeline';
import { JudgeEvaluationModal } from '../components/JudgeEvaluationModal';
import { SaansLogo } from '../components/SaansLogo';
import './SaansSchoolPage.css';

// Fix Leaflet default marker icon for React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom School Leaflet Icon
const schoolIcon = new L.DivIcon({
  className: 'custom-school-pin',
  html: `<div class="school-pin-marker"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M18 5v17"/><path d="m4 6 8-4 8 4"/><path d="M6 5v17"/></svg></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -32]
});

// Component to dynamically recenter map when campus coordinates change
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, 7, { duration: 1.0 });
    }
  }, [center, map]);
  return null;
}

export function SaansSchoolPage() {
  const [schools, setSchools] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState('sch_dps_rkp');
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLang, setActiveLang] = useState('en');
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [copiedLog, setCopiedLog] = useState(false);
  const [broadcastState, setBroadcastState] = useState(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [showArchModal, setShowArchModal] = useState(false);
  const [archData, setArchData] = useState(null);
  const [completedActions, setCompletedActions] = useState([]);
  const [studentHoursAvoided, setStudentHoursAvoided] = useState(0);
  const [activeZone, setActiveZone] = useState('All');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showJudgeModal, setShowJudgeModal] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState('live');

  // Dynamic School Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchDropdownRef = useRef(null);

  // Load schools list on mount
  useEffect(() => {
    loadSchools();
  }, []);

  // Load school status when selection changes
  useEffect(() => {
    if (selectedSchoolId) {
      loadSchoolStatus(selectedSchoolId);
    }
  }, [selectedSchoolId]);

  // Debounced Indian School Search
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await searchSaansSchools(searchQuery.trim());
        setSearchResults(data?.results || []);
        setShowSearchDropdown(true);
      } catch (err) {
        console.error('School search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 280);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadSchools = async () => {
    try {
      const data = await fetchSaansSchools();
      if (data && data.schools) {
        setSchools(data.schools);
        if (!selectedSchoolId && data.schools.length > 0) {
          setSelectedSchoolId(data.schools[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load schools:', err);
    }
  };

  const loadSchoolStatus = async (schoolId) => {
    setLoading(true);
    setBroadcastState(null);
    try {
      const data = await fetchSaansSchoolStatus(schoolId);
      setStatusData(data);
      if (data?.action_log) {
        setCompletedActions(data.action_log.completed_actions || []);
        setStudentHoursAvoided(data.action_log.student_hours_avoided || 0);
      }
    } catch (err) {
      console.error('Failed to load school status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSearchedSchool = (schoolItem) => {
    // Add to schools list if not already present
    setSchools(prev => {
      if (!prev.some(s => s.id === schoolItem.id)) {
        return [schoolItem, ...prev];
      }
      return prev;
    });
    setActiveZone('All');
    setSelectedSchoolId(schoolItem.id);
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  const handleToggleAction = async (actionId) => {
    const isCompleted = completedActions.includes(actionId);
    const newStatus = !isCompleted;
    
    // Optimistic UI update
    const updatedList = newStatus 
      ? [...completedActions, actionId] 
      : completedActions.filter(id => id !== actionId);
    setCompletedActions(updatedList);

    try {
      const res = await toggleSaansSchoolAction(selectedSchoolId, actionId, newStatus);
      if (res) {
        setStudentHoursAvoided(res.student_hours_avoided);
      }
    } catch (err) {
      console.error('Failed to toggle action:', err);
      setCompletedActions(completedActions);
    }
  };

  const handleSelectAllMandatory = async () => {
    if (!statusData?.status?.actions) return;
    const mandatoryIds = statusData.status.actions
      .filter(a => a.mandatory)
      .map(a => a.id);
    
    for (const actId of mandatoryIds) {
      if (!completedActions.includes(actId)) {
        await handleToggleAction(actId);
      }
    }
  };

  const handleCopyNotice = () => {
    if (!statusData?.advisories) return;
    const advisory = statusData.advisories[activeLang] || statusData.advisories.en;
    const textToCopy = `${advisory.subject}\n\n${advisory.body}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2000);
  };

  const handleCopyActionLog = () => {
    if (!statusData) return;
    const actionsTaken = statusData.status.actions
      .filter(a => completedActions.includes(a.id))
      .map(a => `• ${a.text}`)
      .join('\n');
    const logSummary = `SAANSSCHOOL GRAP AUDIT REPORT\nSchool: ${statusData.school.name}\nStatus: ${statusData.status.status.toUpperCase()} (${statusData.status.grap_stage})\nAQI: ${statusData.air.aqi} (Nearest Station: ${statusData.station.name}, ${statusData.station.distance_km} km)\nOutdoor Student-Hours Avoided: ${studentHoursAvoided.toLocaleString()}\nActions Implemented:\n${actionsTaken || 'None logged yet'}\nTimestamp: ${new Date().toLocaleString()}`;
    navigator.clipboard.writeText(logSummary);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  const handleBroadcast = async (channel) => {
    setIsBroadcasting(true);
    try {
      const res = await sendSaansSchoolBroadcast(selectedSchoolId, channel, activeLang);
      setBroadcastState({
        channel,
        recipients: res.recipients_notified,
        auditId: res.audit_id,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (err) {
      console.error('Broadcast failed:', err);
    } finally {
      setIsBroadcasting(false);
    }
  };

  const handleOpenArchitecture = async () => {
    setShowArchModal(true);
    if (!archData) {
      try {
        const data = await fetchSaansArchitecture();
        setArchData(data);
      } catch (err) {
        console.error('Failed to load AWS architecture:', err);
      }
    }
  };

  const currentSchool = schools.find(s => s.id === selectedSchoolId) || statusData?.school;
  const schoolCoords = currentSchool ? [currentSchool.lat, currentSchool.lon] : [28.5672, 77.1723];

  return (
    <div className="saans-dashboard-root">
      {/* 1. Header Bar with Brand, Live Search & Cloud Actions */}
      <header className="saans-header-bar">
        <div className="container saans-header-inner">
          <div className="header-brand-block">
            <div className="brand-header-lockup">
              <SaansLogo size={40} />
              <div className="brand-text-container">
                <div className="brand-title-row">
                  <span className="brand-title">SaansSchool</span>
                  <span className="gov-spec-pill">Gov.in Spec</span>
                </div>
                <span className="brand-sub">National Campus Air Quality & Exposure Mitigation Console</span>
              </div>
            </div>
            <span className="pilot-region-pill">Domain: saansschool.in • All 28 States & UTs • CPCB Continuous Network</span>
          </div>

          {/* Dynamic School Search Autocomplete Bar */}
          <div className="school-search-container" ref={searchDropdownRef}>
            <div className="search-input-wrapper">
              <Search size={15} className="search-icon-svg" />
              <input
                type="text"
                className="search-school-input"
                placeholder="Search ANY school, college, or university in India (e.g. IIT Bombay, KV, DU, Loyola, St. Xavier's, DPS...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowSearchDropdown(true)}
              />
              {isSearching && <Loader2 size={14} className="spin text-blue" />}
              {searchQuery && !isSearching && (
                <button
                  type="button"
                  className="btn-clear-search"
                  onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Dropdown with live results */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="search-dropdown-menu">
                <div className="dropdown-title">Matching Indian Institutions ({searchResults.length} Found • Real Telemetry)</div>
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className="search-item-row"
                    onClick={() => handleSelectSearchedSchool(item)}
                  >
                    <School size={16} className="text-blue" />
                    <div className="search-item-info">
                      <div className="search-item-name-row">
                        <strong className="search-item-name">{item.short_name || item.name}</strong>
                        {item.zone && <span className="search-zone-pill">{item.zone}</span>}
                      </div>
                      <span className="search-item-sub">{item.name} • {item.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right User & Cloud Actions */}
          <div className="header-meta-actions">
            <button 
              className="btn-refresh-live"
              onClick={() => loadSchoolStatus(selectedSchoolId)}
              disabled={loading}
              title="Re-query live CPCB ground stations and NASA FIRMS satellite feeds"
            >
              <RefreshCw size={13} className={loading ? "spin" : ""} />
              <span>{loading ? "Syncing..." : "Sync Live Data"}</span>
            </button>

            <div className="cognito-user-card" title="AWS Cognito Authenticated Principal Session">
              <Lock size={12} className="text-emerald" />
              <span>Principal: <strong>{currentSchool?.principal || 'Principal'}</strong></span>
            </div>

            <button className="btn-blueprint-trigger" onClick={handleOpenArchitecture}>
              <Award size={14} />
              <span>AWS Blueprint</span>
            </button>

            <button 
              className="btn-judge-deck-trigger" 
              onClick={() => setShowJudgeModal(true)}
              title="Open Official Hackathon Judging Verification Deck"
            >
              <Award size={14} className="text-amber" />
              <span>Judge Verification Deck</span>
            </button>
          </div>
        </div>

        {/* Pan-India Campus Switcher Strip with Zone Filter */}
        <div className="campus-switcher-subbar">
          <div className="container subbar-flex">
            <div className="subbar-left-controls">
              <div className="campus-select-wrapper">
                <span className="subbar-lbl">Campus:</span>
                <select
                  className="campus-dropdown-select"
                  value={selectedSchoolId}
                  onChange={(e) => setSelectedSchoolId(e.target.value)}
                >
                  {schools
                    .filter(sch => activeZone === 'All' || sch.zone === activeZone || sch.id === selectedSchoolId)
                    .map((sch) => (
                      <option key={sch.id} value={sch.id}>
                        {sch.short_name || sch.name} — {sch.city} ({sch.state || sch.zone})
                      </option>
                    ))}
                </select>
              </div>

              <div className="zone-filter-group">
                <div className="zone-pill-buttons">
                  {['All', 'North', 'West', 'South', 'East', 'Central'].map((z) => (
                    <button
                      key={z}
                      className={`btn-zone-filter ${activeZone === z ? 'active' : ''}`}
                      onClick={() => setActiveZone(z)}
                    >
                      {z === 'All' ? 'All India' : z}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {statusData && (
              <div className="subbar-right-telemetry">
                <div className="telemetry-pill">
                  <span className="dot-live-green">●</span>
                  <span>{statusData.station.name} ({statusData.station.distance_km} km)</span>
                </div>
                <div className="telemetry-pill">
                  <Wind size={12} className="text-blue" />
                  <span>{statusData.wind.wind_from_cardinal} {statusData.wind.wind_speed_kmh} km/h</span>
                </div>
                <div className="telemetry-pill">
                  <Clock size={12} className="text-muted" />
                  <span>Synced: {statusData.station.last_updated}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. Main Executive Dashboard Content */}
      <main className="container saans-main-content">
        {loading || !statusData ? (
          <div className="saans-loading-state">
            <RefreshCw className="spin text-blue" size={38} />
            <h3>Fetching Real-Time Atmosphere & Satellite Observations...</h3>
            <p>Querying nearest CPCB monitoring station, Open-Meteo wind vectors, and NASA FIRMS near-real-time satellite active fires.</p>
          </div>
        ) : (
          <div className="dashboard-grid-layout">

            {/* Executive 5-Workspace Mode Selector Bar */}
            <nav className="saans-view-mode-bar">
              <button 
                className={`btn-view-mode ${activeViewTab === 'live' ? 'active' : ''}`}
                onClick={() => setActiveViewTab('live')}
              >
                <ShieldCheck size={15} />
                <span>1. 6:00 AM Decision & Ground Air</span>
              </button>

              <button 
                className={`btn-view-mode ${activeViewTab === 'commute' ? 'active' : ''}`}
                onClick={() => setActiveViewTab('commute')}
              >
                <Bus size={15} />
                <span>2. CleanAir Commute Router</span>
              </button>

              <button 
                className={`btn-view-mode ${activeViewTab === 'indoor' ? 'active' : ''}`}
                onClick={() => setActiveViewTab('indoor')}
              >
                <Wrench size={15} />
                <span>3. Indoor DIY Purifier Lab</span>
              </button>

              <button 
                className={`btn-view-mode ${activeViewTab === 'stubble' ? 'active' : ''}`}
                onClick={() => setActiveViewTab('stubble')}
              >
                <Flame size={15} />
                <span>4. Stubble 16h Plume Radar</span>
              </button>

              <button 
                className={`btn-view-mode ${activeViewTab === 'simulator' ? 'active' : ''}`}
                onClick={() => setActiveViewTab('simulator')}
              >
                <Sliders size={15} />
                <span>5. Bad-Day Simulator</span>
              </button>
            </nav>

            {/* Active Workspace View Rendering */}
            {activeViewTab === 'live' && (
              <>
            {/* ROW 1: Hero Command Center (3 Metric Cards) */}
            <section className="hero-command-row">
              {/* Card 1: Deterministic Status Engine */}
              <div 
                className="command-card status-hero-card"
                style={{ 
                  borderColor: statusData.status.color,
                  borderLeft: `6px solid ${statusData.status.color}`,
                  background: '#ffffff'
                }}
              >
                <div className="status-top-bar">
                  <span 
                    className="status-giant-badge"
                    style={{ backgroundColor: statusData.status.color }}
                  >
                    {statusData.status.status.toUpperCase()} STATUS
                  </span>
                  <span className="grap-level-badge">{statusData.status.grap_stage}</span>
                </div>

                <h1 className="status-primary-headline" style={{ color: statusData.status.color }}>
                  {statusData.status.headline}
                </h1>

                <p className="status-summary-text">
                  Regulatory health directives calculated deterministically under CPCB National Air Quality Index (NAQI) guidelines. Operational exposure thresholds derived directly from continuous ambient air monitoring stations.
                </p>

                {/* Modifiers Pill if forecast worsening or fires upwind */}
                {statusData.status?.modifiers && statusData.status.modifiers.length > 0 && (
                  <div className="status-modifier-box">
                    <AlertTriangle size={16} className="text-amber" />
                    <div>
                      {(statusData.status?.modifiers || []).map((m, idx) => (
                        <p key={idx} className="mod-line">{m}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card 2: Impact Metric (Student-Hours Avoided) */}
              <div className="command-card impact-metric-card">
                <div className="impact-card-header">
                  <span className="command-card-lbl">Exposure Mitigation Record</span>
                  <ShieldCheck size={20} className="text-emerald" />
                </div>

                <div className="impact-large-counter">
                  <span className="counter-val">{studentHoursAvoided.toLocaleString()}</span>
                  <span className="counter-unit">Student-Hours</span>
                </div>

                <strong className="impact-card-title">Calculated Student Exposure Mitigation</strong>
                <p className="impact-card-desc">
                  Mathematical exposure reduction based on verified campus census (<strong>{currentSchool?.students.toLocaleString()}</strong> students) and logged physical education cancellations.
                </p>

                {/* Cohort Vulnerability Defense Breakdown */}
                <div className="cohort-vulnerability-strip">
                  <div className="cohort-tag cohort-kg" title="Developing lung alveoli - breathing rate is 2x that of adults">
                    <span className="c-name">KG (3-5y)</span>
                    <span className="c-rule">Zero Outdoor</span>
                  </div>
                  <div className="cohort-tag cohort-pri" title="High ventilation rate during cardio physical education">
                    <span className="c-name">Primary (6-11y)</span>
                    <span className="c-rule">Cancel PE</span>
                  </div>
                  <div className="cohort-tag cohort-sr" title="Cardio stress restricted; masks mandated for school commute">
                    <span className="c-name">Senior (12-18y)</span>
                    <span className="c-rule">N95 Commute</span>
                  </div>
                </div>

                <div className="impact-audit-bar">
                  <span>GRAP Compliance: Active</span>
                  <button className="btn-copy-log" onClick={handleCopyActionLog}>
                    {copiedLog ? <Check size={13} /> : <FileText size={13} />}
                    <span>{copiedLog ? 'Copied Log!' : 'Export Log'}</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Nearest Ground CPCB Sensor */}
              <div className="command-card station-reading-card">
                <div className="station-card-top">
                  <div>
                    <span className="command-card-lbl">Nearest Ground Ambient Station</span>
                    <h3 className="station-title">{statusData.station.name}</h3>
                  </div>
                  <div className="station-aqi-orb" style={{ borderColor: statusData.air.category_color }}>
                    <span className="station-aqi-number" style={{ color: statusData.air.category_color }}>
                      {statusData.air.aqi}
                    </span>
                    <span className="station-aqi-tag">CPCB AQI</span>
                  </div>
                </div>

                <div className="station-proximity-row">
                  <MapPin size={14} className="text-blue" />
                  <span><strong>{statusData.station.distance_km} km</strong> from school gate</span>
                  <span className="dot-divider">•</span>
                  <Clock size={14} className="text-muted" />
                  <span>{statusData.station.last_updated}</span>
                </div>

                <div className="station-pollutants-grid">
                  <div className="pollutant-mini-box">
                    <span className="p-name">PM2.5</span>
                    <span className="p-num">{statusData.air.pm2_5} <small>µg/m³</small></span>
                  </div>
                  <div className="pollutant-mini-box">
                    <span className="p-name">PM10</span>
                    <span className="p-num">{statusData.air.pm10} <small>µg/m³</small></span>
                  </div>
                  <div className="pollutant-mini-box">
                    <span className="p-name">Wind (From)</span>
                    <span className="p-num">{statusData.wind.wind_from_cardinal} <small>{statusData.wind.wind_speed_kmh} km/h</small></span>
                  </div>
                </div>

                <div className="station-source-bar">
                  <span className="verified-source-tag">✓ {statusData.station.confidence}</span>
                  <span className="cpcb-ref">Govt NAQI Factsheet</span>
                </div>
              </div>
            </section>

            {/* ROW 2: Action Center (What To Do & Who Has Been Told) */}
            <section className="dashboard-two-col-row">
              {/* Left Column: Campus Safety Action Checklist */}
              <div className="dash-panel action-checklist-panel">
                <div className="panel-header-row">
                  <div>
                    <h2 className="panel-title">Campus Safety Action Checklist</h2>
                    <p className="panel-sub">Tick actions to enforce safety and log avoided student-hours</p>
                  </div>
                  <button className="btn-select-all" onClick={handleSelectAllMandatory}>
                    Enforce All Mandatory
                  </button>
                </div>

                <div className="checklist-items-stack">
                  {(statusData.status?.actions || []).map((act) => {
                    const isChecked = completedActions.includes(act.id);
                    return (
                      <div
                        key={act.id}
                        className={`action-checkcard ${isChecked ? 'completed' : ''} ${act.mandatory ? 'is-mandatory' : ''}`}
                        onClick={() => handleToggleAction(act.id)}
                      >
                        <div className="checkcard-icon-box">
                          {isChecked ? (
                            <CheckSquare size={22} className="check-svg-checked" />
                          ) : (
                            <Square size={22} className="check-svg-empty" />
                          )}
                        </div>

                        <div className="checkcard-content">
                          <span className="checkcard-label">{act.text}</span>
                          <div className="checkcard-meta-row">
                            <span className="category-tag">{act.category.toUpperCase()}</span>
                            {act.mandatory && (
                              <span className="mandatory-pill">Mandatory under GRAP</span>
                            )}
                          </div>
                        </div>

                        <div className="checkcard-status-indicator">
                          {isChecked ? <span className="tag-done">Enforced</span> : <span className="tag-pending">Pending</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Multilingual Advisory Broadcaster */}
              <div className="dash-panel advisory-broadcast-panel">
                <div className="panel-header-row">
                  <div>
                    <h2 className="panel-title">Parent & Staff Circular Broadcaster</h2>
                    <p className="panel-sub">Pre-written verified directives ready for immediate dispatch</p>
                  </div>
                </div>

                {/* Language Selector Pills */}
                <div className="advisory-lang-tabs">
                  {Object.keys(statusData.advisories).map((langKey) => (
                    <button
                      key={langKey}
                      className={`advisory-lang-btn ${activeLang === langKey ? 'active' : ''}`}
                      onClick={() => setActiveLang(langKey)}
                    >
                      {statusData.advisories[langKey].language}
                    </button>
                  ))}
                </div>

                {/* Pre-formatted Circular Preview */}
                <div className="circular-paper-card">
                  <div className="circular-header">
                    <span className="circular-badge">Official Circular</span>
                    <span className="circular-subject">
                      {statusData.advisories[activeLang]?.subject}
                    </span>
                  </div>
                  <pre className="circular-body-text">
                    {statusData.advisories[activeLang]?.body}
                  </pre>
                </div>

                {/* Action Dispatch Toolbar */}
                <div className="advisory-toolbar">
                  <button className="btn-tool btn-copy-circular" onClick={handleCopyNotice}>
                    {copiedNotice ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copiedNotice ? 'Copied to Clipboard!' : 'Copy Circular'}</span>
                  </button>

                  <button 
                    className="btn-tool btn-email-dispatch"
                    onClick={() => handleBroadcast('email')}
                    disabled={isBroadcasting}
                  >
                    <Send size={15} />
                    <span>Send Parent Email (SES)</span>
                  </button>

                  <button 
                    className="btn-tool btn-telegram-dispatch"
                    onClick={() => handleBroadcast('telegram')}
                    disabled={isBroadcasting}
                  >
                    <Share2 size={15} />
                    <span>Broadcast Telegram</span>
                  </button>
                </div>

                {/* Dispatch Confirmation Toast */}
                {broadcastState && (
                  <div className="broadcast-confirmation-alert">
                    <CheckCircle2 size={18} className="text-emerald" />
                    <div>
                      <strong>Advisory Successfully Dispatched via {broadcastState.channel.toUpperCase()}!</strong>
                      <p>
                        Delivered to <strong>{broadcastState.recipients.toLocaleString()}</strong> parents & staff at {broadcastState.timestamp}.
                        Audit ID: <code>{broadcastState.auditId}</code>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* ROW 3: Real Environmental Intelligence (Map & Forecast) */}
            <section className="dashboard-two-col-row">
              {/* Left Column: Stubble Fire & Wind Radar with Live Leaflet Map */}
              <div className="dash-panel stubble-radar-panel">
                <div className="panel-header-row">
                  <div>
                    <h2 className="panel-title">Stubble Fire & Wind Transport Radar</h2>
                    <p className="panel-sub">NASA FIRMS Suomi-NPP VIIRS 375m Satellite Thermal Feeds</p>
                  </div>
                  <span className="satellite-tag">NASA FIRMS VIIRS</span>
                </div>

                {/* Honest Wording Box */}
                <div className="radar-honest-banner">
                  <Wind size={20} className="text-orange" />
                  <p className="radar-honest-text">
                    "{statusData.fires.wording}"
                  </p>
                </div>

                {/* Stubble Metrics Strip */}
                <div className="radar-stats-row">
                  <div className="r-stat-box">
                    <span className="r-lbl">Upwind Clusters</span>
                    <strong className="r-val text-red">{statusData.fires.active_upwind_clusters} Active</strong>
                  </div>
                  <div className="r-stat-box">
                    <span className="r-lbl">Upwind Fire Detections</span>
                    <strong className="r-val">{statusData.fires.total_upwind_detections} Detections</strong>
                  </div>
                  <div className="r-stat-box">
                    <span className="r-lbl">Wind Direction</span>
                    <strong className="r-val">{statusData.wind.wind_from_cardinal} ({statusData.wind.wind_direction_deg}°)</strong>
                  </div>
                  <div className="r-stat-box">
                    <span className="r-lbl">Wind Speed</span>
                    <strong className="r-val">{statusData.wind.wind_speed_kmh} km/h</strong>
                  </div>
                </div>

                {/* Real Interactive Leaflet Map with MapRecenter */}
                <div className="leaflet-map-wrapper">
                  <MapContainer
                    center={schoolCoords}
                    zoom={7}
                    scrollWheelZoom={false}
                    className="saans-leaflet-map"
                  >
                    <MapRecenter center={schoolCoords} />
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* School Pin */}
                    <Marker position={schoolCoords} icon={schoolIcon}>
                      <Popup>
                        <div className="map-popup-card">
                          <strong>{currentSchool?.name}</strong>
                          <p>{currentSchool?.students.toLocaleString()} Students Enrolled</p>
                          <span className="popup-status" style={{ color: statusData.status.color }}>
                            Status: {statusData.status.status.toUpperCase()}
                          </span>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Real Satellite Fire Clusters from NASA FIRMS */}
                    {statusData.fires.all_nearby_clusters && statusData.fires.all_nearby_clusters.map((cluster) => {
                      const isUp = cluster.is_upwind;
                      return (
                        <CircleMarker
                          key={cluster.id}
                          center={[cluster.lat, cluster.lon]}
                          radius={isUp ? 10 : 7}
                          pathOptions={{
                            color: isUp ? '#dc2626' : '#f97316',
                            fillColor: isUp ? '#ef4444' : '#fb923c',
                            fillOpacity: 0.85,
                            weight: isUp ? 2 : 1
                          }}
                        >
                          <Popup>
                            <div className="map-popup-card">
                              <strong>{cluster.region}</strong>
                              <p>{cluster.fire_count} Satellite Detections (Max FRP: {cluster.max_frp})</p>
                              <span>Distance: {cluster.distance_km} km</span>
                              <br />
                              <span>Bearing: {cluster.bearing_deg}°</span>
                              <br />
                              <strong style={{ color: isUp ? '#dc2626' : '#64748b' }}>
                                {isUp ? '⚠️ Upwind (Transport toward school)' : 'Downwind / Crosswind'}
                              </strong>
                            </div>
                          </Popup>
                        </CircleMarker>
                      );
                    })}
                  </MapContainer>
                </div>
              </div>

              {/* Right Column: 24h Forecast Curve & Indoor Tips */}
              <div className="dash-panel forecast-tips-panel">
                <div className="panel-header-row">
                  <div>
                    <h2 className="panel-title">Next-24h Planning Forecast</h2>
                    <p className="panel-sub">Advance atmospheric trend to plan school day tomorrow</p>
                  </div>
                  <span className="forecast-est-badge">
                    Tomorrow Est. AQI: {statusData.air.forecast_aqi}
                  </span>
                </div>

                <div className="forecast-planning-notice">
                  <TrendingUp size={18} className="text-blue" />
                  <p>
                    {statusData.air.forecast_aqi > statusData.air.aqi
                      ? `Tomorrow's AQI is forecasted to deteriorate to ${statusData.air.forecast_aqi}. Prepare hybrid/indoor alternative schedules now.`
                      : `Atmospheric dispersion conditions indicate stable air quality over the next 24 hours.`}
                  </p>
                </div>

                {/* Hourly Timeline */}
                {statusData.air?.forecast_trend && statusData.air.forecast_trend.length > 0 && (
                  <div className="hourly-timeline-grid">
                    {(statusData.air?.forecast_trend || []).slice(0, 14).map((pt, i) => {
                      const hourStr = pt.time.split('T')[1] || pt.time;
                      return (
                        <div key={i} className="timeline-hour-card">
                          <span className="h-time">{hourStr}</span>
                          <div 
                            className="h-bar"
                            style={{
                              height: `${Math.min(pt.aqi / 4.5, 65)}px`,
                              backgroundColor: pt.aqi > 200 ? '#ef4444' : pt.aqi > 100 ? '#f59e0b' : '#10b981'
                            }}
                          />
                          <span className="h-aqi">{pt.aqi}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Campus Indoor Air Protocols */}
                <div className="indoor-protocols-section">
                  <h3 className="indoor-section-title">Campus Indoor Air Operational Protocol</h3>
                  <div className="indoor-rules-grid">
                    {(statusData.indoor_tips || []).map((tip, idx) => (
                      <div key={idx} className="indoor-rule-card">
                        <span className="rule-num">0{idx + 1}</span>
                        <div>
                          <strong className="rule-title">{tip.title}</strong>
                          <p className="rule-text">{tip.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Tab 2: Interactive Bad-Day Simulator */}
        {activeViewTab === 'simulator' && (
          <BadDaySimulator schoolId={selectedSchoolId} schoolName={currentSchool?.name} />
        )}

        {/* Tab 3: CleanAir Commute Exposure Router */}
        {activeViewTab === 'commute' && (
          <CommuteExposureRouter schoolId={selectedSchoolId} schoolName={currentSchool?.name} />
        )}

        {/* Tab 4: Indoor Air & DIY Purifier Engineering Lab */}
        {activeViewTab === 'indoor' && (
          <IndoorCADRCalculator />
        )}

        {/* Tab 5: Stubble 16-Hour Plume Forward Trajectory */}
        {activeViewTab === 'stubble' && (
          <StubbleTrajectoryTimeline schoolId={selectedSchoolId} schoolName={currentSchool?.name} />
        )}
      </div>
    )}
  </main>

      {/* 3. AWS Architecture & DynamoDB Blueprint Modal */}
      {showArchModal && (
        <div className="arch-modal-backdrop" onClick={() => setShowArchModal(false)}>
          <div className="arch-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-title-col">
                <Award size={24} className="text-amber" />
                <div>
                  <h2 className="modal-title">SaansSchool — AWS Serverless Architecture</h2>
                  <p className="modal-sub">Built strictly for the AWS Air Track Hackathon criteria</p>
                </div>
              </div>
              <button className="btn-modal-x" onClick={() => setShowArchModal(false)}>✕</button>
            </div>

            <div className="modal-body-scroll">
              <div className="aws-pipeline-flow">
                {archData?.pipeline?.map((p, idx) => (
                  <div key={idx} className="pipeline-step-item">
                    <div className="step-circle">{idx + 1}</div>
                    <div className="step-body">
                      <strong className="step-name">{p.step}</strong>
                      {p.trigger && <div className="step-row"><span className="lbl">Trigger:</span> <code>{p.trigger}</code></div>}
                      <div className="step-row"><span className="lbl">Compute:</span> <code>{p.compute}</code></div>
                      {p.sources && <div className="step-row"><span className="lbl">Data Sources:</span> {p.sources.join(', ')}</div>}
                      {p.logic && <div className="step-row"><span className="lbl">Logic:</span> {p.logic}</div>}
                      {p.storage && <div className="step-row"><span className="lbl">Storage:</span> <code>{p.storage}</code></div>}
                      {p.ai_agent && <div className="step-row"><span className="lbl">Synthesizer:</span> {p.ai_agent}</div>}
                      {p.delivery && <div className="step-row"><span className="lbl">Dispatch:</span> {p.delivery}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {archData?.dynamodb_schema && (
                <div className="dynamo-schema-box">
                  <h3 className="schema-title">DynamoDB Table Definitions</h3>
                  <div className="schema-grid">
                    {archData.dynamodb_schema.map((tbl, i) => (
                      <div key={i} className="schema-table-card">
                        <strong className="t-name">Table: {tbl.table}</strong>
                        <div className="t-key">PK: <code>{tbl.partition_key}</code> {tbl.sort_key ? `| SK: ${tbl.sort_key}` : ''}</div>
                        <div className="t-attrs">Attributes: {tbl.attributes.join(', ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer-bar">
              <span className="free-tier-affirmation">Official AWS Serverless Implementation (&lt;$5.00/month burn rate)</span>
              <button className="btn-close-modal" onClick={() => setShowArchModal(false)}>Close Blueprint</button>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Governance & Legal Footer */}
      <footer className="saans-footer-bar">
        <div className="container footer-content-row">
          <div className="footer-brand-meta">
            <strong>SaansSchool</strong>
            <span>National Campus Air Quality & Exposure Mitigation Console</span>
            <span className="footer-domain-tag">Production Domain: saansschool.in</span>
          </div>
          <div className="footer-nav-links">
            <button className="footer-link-btn" onClick={() => setShowPrivacyModal(true)}>Privacy Policy</button>
            <span className="f-sep">•</span>
            <button className="footer-link-btn" onClick={() => setShowTermsModal(true)}>Terms & Conditions</button>
            <span className="f-sep">•</span>
            <a href="https://cpcb.nic.in" target="_blank" rel="noopener noreferrer" className="footer-link-btn">CPCB Station Network</a>
            <span className="f-sep">•</span>
            <a href="https://firms.modaps.eosdis.nasa.gov" target="_blank" rel="noopener noreferrer" className="footer-link-btn">NASA FIRMS Telemetry</a>
            <span className="f-sep">•</span>
            <button className="footer-link-btn" onClick={handleOpenArchitecture}>AWS SAM Architecture</button>
          </div>
        </div>
        <div className="container footer-legal-disclaimer">
          <p>© 2026 SaansSchool. Clean institutional implementation aligned with India DPDP Act 2023 & Ministry of Environment standards. Zero third-party ad tracking, cookies, or profiling.</p>
        </div>
      </footer>

      {/* Privacy Policy, Terms, and Judge Evaluation Modals */}
      <PrivacyPolicyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <JudgeEvaluationModal 
        isOpen={showJudgeModal} 
        onClose={() => setShowJudgeModal(false)} 
        onNavigateTab={(tab) => {
          setActiveViewTab(tab);
        }} 
      />
    </div>
  );
}
