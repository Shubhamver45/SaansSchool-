import React, { useState, useEffect } from 'react';
import { 
  Sliders, Play, Square as StopIcon, RefreshCw, AlertTriangle, 
  Wind, Flame, ShieldAlert, Volume2, CheckCircle2, Copy, Check, FileText 
} from 'lucide-react';
import { simulateBadDay } from '../services/api';
import './BadDaySimulator.css';

export function BadDaySimulator({ schoolId, schoolName }) {
  const [aqi, setAqi] = useState(420);
  const [fires, setFires] = useState(320);
  const [windDeg, setWindDeg] = useState(315);
  const [windSpeed, setWindSpeed] = useState(16);
  const [loading, setLoading] = useState(false);
  const [simResult, setSimResult] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioVoice, setAudioVoice] = useState('en-IN');
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  const runSimulation = async (customAqi, customFires, customDeg, customSpeed) => {
    setLoading(true);
    try {
      const data = await simulateBadDay({
        school_id: schoolId || 'sch_dps_rkp',
        sim_aqi: customAqi !== undefined ? customAqi : aqi,
        sim_fires: customFires !== undefined ? customFires : fires,
        sim_wind_deg: customDeg !== undefined ? customDeg : windDeg,
        sim_wind_speed: customSpeed !== undefined ? customSpeed : windSpeed,
      });
      setSimResult(data);
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSimulation(aqi, fires, windDeg, windSpeed);
  }, [schoolId]);

  const handleApplyPreset = (pAqi, pFires, pDeg, pSpeed) => {
    setAqi(pAqi);
    setFires(pFires);
    setWindDeg(pDeg);
    setWindSpeed(pSpeed);
    runSimulation(pAqi, pFires, pDeg, pSpeed);
  };

  const handlePlayVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const scriptText = audioVoice === 'hi-IN'
      ? `सावधान। आज वायु गुणवत्ता सूचकांक ${aqi} गंभीर स्तर पर है। विद्यालय परिसर में सभी बाहरी खेल, प्रार्थना सभा और खेलकूद तुरंत रद्द किए जाते हैं। सभी खिड़कियां बंद रखें और छात्र मास्क पहनें।`
      : `Attention. Today ambient air quality index is ${aqi}, severe hazardous level. All outdoor sports, morning assemblies, and physical education are cancelled immediately. Seal classroom windows and enforce N95 masks for commute.`;

    const utterance = new SpeechSynthesisUtterance(scriptText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.includes(audioVoice)) || voices[0];
    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bad-day-sim-container">
      <div className="sim-header-row">
        <div>
          <div className="sim-title-group">
            <Sliders size={20} className="sim-icon" />
            <h2 className="sim-title">Interactive Bad-Day Scenario Simulator</h2>
          </div>
          <p className="sim-sub">
            Evaluate how the deterministic 6:00 AM action engine responds when pollution surges or stubble smoke arrives.
          </p>
        </div>

        <div className="sim-presets-group">
          <span className="preset-label">Test Scenarios:</span>
          <button 
            className="btn-sim-preset"
            onClick={() => handleApplyPreset(465, 450, 315, 18)}
          >
            Post-Diwali Stubble Smog
          </button>
          <button 
            className="btn-sim-preset"
            onClick={() => handleApplyPreset(360, 210, 310, 12)}
          >
            Winter Inversion Peak
          </button>
          <button 
            className="btn-sim-preset"
            onClick={() => handleApplyPreset(140, 15, 120, 8)}
          >
            Moderate Standard Day
          </button>
        </div>
      </div>

      <div className="sim-layout-grid">
        {/* Left Column: Interactive Sliders */}
        <div className="sim-controls-card">
          <h3 className="sim-card-heading">Atmospheric Stress Controls</h3>

          <div className="sim-control-item">
            <div className="control-label-row">
              <span className="c-name">Simulated Ambient AQI</span>
              <strong className="c-val" style={{ color: aqi > 300 ? '#dc2626' : (aqi > 200 ? '#ea580c' : '#d97706') }}>
                {aqi} CPCB NAQI
              </strong>
            </div>
            <input 
              type="range" 
              min="50" 
              max="500" 
              step="5" 
              value={aqi} 
              onChange={(e) => setAqi(Number(e.target.value))}
              className="sim-slider aqi-slider"
            />
            <div className="slider-ticks">
              <span>Good (50)</span>
              <span>Mod (150)</span>
              <span>Poor (250)</span>
              <span>Severe (400+)</span>
            </div>
          </div>

          <div className="sim-control-item">
            <div className="control-label-row">
              <span className="c-name">Active Upwind Stubble Fires</span>
              <strong className="c-val text-orange">
                <Flame size={14} className="inline-icon" /> {fires} VIIRS Hotspots
              </strong>
            </div>
            <input 
              type="range" 
              min="0" 
              max="600" 
              step="10" 
              value={fires} 
              onChange={(e) => setFires(Number(e.target.value))}
              className="sim-slider fires-slider"
            />
          </div>

          <div className="sim-control-item">
            <div className="control-label-row">
              <span className="c-name">Wind Speed & Inversion Transport</span>
              <strong className="c-val text-blue">
                <Wind size={14} className="inline-icon" /> {windSpeed} km/h (Heading {windDeg}°)
              </strong>
            </div>
            <input 
              type="range" 
              min="2" 
              max="35" 
              step="1" 
              value={windSpeed} 
              onChange={(e) => setWindSpeed(Number(e.target.value))}
              className="sim-slider wind-slider"
            />
          </div>

          <button 
            className="btn-trigger-simulation"
            onClick={() => runSimulation()}
            disabled={loading}
          >
            <RefreshCw size={15} className={loading ? 'spin' : ''} />
            <span>Recalculate Deterministic Defense Status</span>
          </button>
        </div>

        {/* Right Column: Live Calculated Intervention Response */}
        <div className="sim-results-card">
          {simResult ? (
            <>
              <div className="sim-result-status-banner" style={{ borderLeftColor: simResult.status.color }}>
                <div className="status-top-meta">
                  <span className="sim-status-badge" style={{ backgroundColor: simResult.status.color }}>
                    {simResult.status.status.toUpperCase()}
                  </span>
                  <span className="sim-grap-pill">{simResult.status.grap_stage}</span>
                </div>
                <h4 className="sim-headline" style={{ color: simResult.status.color }}>
                  {simResult.status.headline}
                </h4>
                <p className="sim-summary">
                  {simResult.exposure_impact.cohort_action_summary}
                </p>
              </div>

              <div className="sim-metrics-grid">
                <div className="sim-stat-box">
                  <span className="stat-label">Student-Hours Avoided</span>
                  <strong className="stat-number text-emerald">
                    {simResult.exposure_impact.student_hours_avoided.toLocaleString()}
                  </strong>
                  <span className="stat-sub">Outdoor exposure eliminated</span>
                </div>

                <div className="sim-stat-box">
                  <span className="stat-label">Toxic PM2.5 Inhalation Spared</span>
                  <strong className="stat-number text-blue">
                    {simResult.exposure_impact.micrograms_pm25_avoided_per_child} µg
                  </strong>
                  <span className="stat-sub">Per child lung volume</span>
                </div>

                <div className="sim-stat-box">
                  <span className="stat-label">Stubble Plume Arrival ETA</span>
                  <strong className="stat-number text-orange">
                    {simResult.plume_physics.estimated_arrival_hours} hrs
                  </strong>
                  <span className="stat-sub">{simResult.plume_physics.dispersion_risk}</span>
                </div>
              </div>

              {/* Instant Audio Speech Broadcaster */}
              <div className="sim-audio-broadcast-box">
                <div className="audio-left-meta">
                  <Volume2 size={18} className="text-blue" />
                  <div>
                    <strong>Automated 6:00 AM Parent Audio Circular</strong>
                    <span className="audio-voice-tag">Synthesized Speech • AWS Polly Pipeline</span>
                  </div>
                </div>

                <div className="audio-controls-row">
                  <select 
                    className="select-voice"
                    value={audioVoice} 
                    onChange={(e) => setAudioVoice(e.target.value)}
                  >
                    <option value="en-IN">English (Indian Accent)</option>
                    <option value="hi-IN">Hindi (National Advisory)</option>
                  </select>

                  <button 
                    className={`btn-play-audio ${isPlayingAudio ? 'is-playing' : ''}`}
                    onClick={handlePlayVoice}
                  >
                    {isPlayingAudio ? <StopIcon size={14} /> : <Play size={14} />}
                    <span>{isPlayingAudio ? 'Stop Speech' : 'Play Voice Broadcast'}</span>
                  </button>
                </div>
              </div>

              {/* Synchronized Live Broadcast Transcript Box */}
              <div className="sim-transcript-card">
                <div className="transcript-header-row">
                  <div className="transcript-title-col">
                    <FileText size={15} className="text-blue" />
                    <strong>Synchronized On-Screen Broadcast Transcript</strong>
                    <span className="voice-channel-pill">{audioVoice === 'hi-IN' ? 'Channel: Hindi (Kajal)' : 'Channel: Indian English (Aditi)'}</span>
                  </div>
                  <button 
                    type="button"
                    className="btn-copy-transcript"
                    onClick={() => {
                      const textToCopy = audioVoice === 'hi-IN'
                        ? `आदरणीय अभिभावक एवं विद्यालय परिवार, आज सुबह 6:00 बजे विद्यालय परिसर के निकट वायु गुणवत्ता सूचकांक (AQI) ${aqi} दर्ज किया गया है। वर्तमान सुरक्षा स्तर ${simResult.status.status.toUpperCase()} घोषित किया गया है। छात्रों की सुरक्षा हेतु आज सभी बाहरी खेल-कूद एवं प्रार्थना सभाएं स्थगित रहेंगी। कृपया सभी बच्चे N95 मास्क अवश्य पहनें।`
                        : `Attention parents and staff of ${schoolName || 'the campus'}. As of 6:00 AM, local AQI is ${aqi} (${simResult.status.status.toUpperCase()}). All outdoor physical activities and assemblies are cancelled. Please ensure students arrive wearing certified N95 masks.`;
                      navigator.clipboard.writeText(textToCopy);
                      setCopiedTranscript(true);
                      setTimeout(() => setCopiedTranscript(false), 2000);
                    }}
                  >
                    {copiedTranscript ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedTranscript ? 'Copied' : 'Copy PA Text'}</span>
                  </button>
                </div>

                <div className="transcript-body-text">
                  {audioVoice === 'hi-IN' ? (
                    <p>
                      "आदरणीय अभिभावक एवं विद्यालय परिवार, आज सुबह 6:00 बजे <strong>{schoolName || 'विद्यालय परिसर'}</strong> के निकट वायु गुणवत्ता सूचकांक (AQI) <strong>{aqi}</strong> दर्ज किया गया है। वर्तमान सुरक्षा स्तर <strong>{simResult.status.status.toUpperCase()}</strong> घोषित किया गया है। छात्रों की सुरक्षा हेतु आज सभी बाहरी खेल-कूद एवं प्रार्थना सभाएं स्थगित रहेंगी। कक्षा के सभी खिड़कियां बंद रखी गई हैं और एयर प्यूरीफायर चालू हैं। कृपया विद्यालय आते समय सभी बच्चे N95 मास्क अवश्य पहनें।"
                    </p>
                  ) : (
                    <p>
                      "Attention parents and teaching staff of <strong>{schoolName || 'the campus'}</strong>. As of 6:00 AM, the local Air Quality Index is recorded at <strong>{aqi}</strong>, placing the school under <strong>{simResult.status.status.toUpperCase()}</strong> environmental defense protocols. In accordance with safety directives, all outdoor physical education, morning assemblies, and sports are immediately cancelled. Classrooms have sealed their building envelopes and HEPA air purifiers are operating at maximum capacity. Please ensure all arriving students wear certified N95 masks."
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="sim-loading-placeholder">
              <RefreshCw size={24} className="spin text-blue" />
              <span>Simulating atmospheric dispersion and defense directives...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
