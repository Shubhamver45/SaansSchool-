import React, { useState } from 'react';
import { Sparkles, Bot, Send, ShieldAlert, CheckCircle2, RefreshCw, MessageSquare } from 'lucide-react';
import './AIPanel.css';

const QUICK_PROMPTS = [
  'Is it safe for kids to play outdoors right now?',
  'Should I open windows or keep them sealed today?',
  'What level mask should I wear outside?',
  'What indoor purifier settings are recommended?',
  'What policy interventions are suggested for this AQI?'
];

export function AIPanel({ aiData, city, aqi, pollutants, onRefresh }) {
  const [customQuestion, setCustomQuestion] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  const handleAsk = (questionText) => {
    if (!questionText.trim()) return;
    const q = questionText.trim();
    setCustomQuestion('');
    
    // Add user message to local chat
    const userMsg = { sender: 'user', text: q, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatLog(prev => [...prev, userMsg]);
    setIsThinking(true);

    setTimeout(() => {
      let botResponse = '';
      const qLower = q.toLowerCase();
      
      if (qLower.includes('kid') || qLower.includes('children') || qLower.includes('play')) {
        if (aqi <= 50) {
          botResponse = `Safe for outdoor play in ${city}. The current AQI is ${aqi} (Good), and PM2.5 is ${pollutants?.pm2_5 || 15} µg/m³. Children can enjoy extended playtime and outdoor games without restriction.`;
        } else if (aqi <= 100) {
          botResponse = `Moderate air quality in ${city} (AQI ${aqi}). Children can play outside normally, but make sure they stay well-hydrated and take periodic rest breaks if playing vigorously.`;
        } else if (aqi <= 150) {
          botResponse = `Caution recommended for ${city} (AQI ${aqi}). Children have smaller lungs and breathe more air per pound of body weight. Limit strenuous outdoor play to under 45 minutes.`;
        } else {
          botResponse = `Avoid outdoor play. AQI in ${city} is ${aqi} (${aqi > 200 ? 'Very Unhealthy' : 'Unhealthy'}). Move all physical activities indoors to rooms equipped with HEPA air purifiers.`;
        }
      } else if (qLower.includes('window') || qLower.includes('ventilat')) {
        if (aqi <= 50) {
          botResponse = `Yes. Air quality in ${city} is ${aqi} (Good). Opening windows for 2-4 hours today is recommended to flush out indoor CO₂ and organic compounds.`;
        } else if (aqi <= 100) {
          botResponse = `Best time to open windows in ${city} is between 12:00 PM and 3:00 PM when atmospheric boundary layer mixing is highest and ground particulates disperse. Avoid early morning and late evening.`;
        } else {
          botResponse = `Keep all windows sealed shut. With AQI at ${aqi} in ${city}, opening windows will allow toxic fine particulate matter (PM2.5: ${pollutants?.pm2_5} µg/m³) into your living space.`;
        }
      } else if (qLower.includes('mask') || qLower.includes('respirator')) {
        if (aqi <= 100) {
          botResponse = `Standard cloth or no mask is sufficient for general public in ${city}. Sensitive individuals may opt for a lightweight mask during high-traffic commutes.`;
        } else if (aqi <= 200) {
          botResponse = `Certified N95 or KN95 mask is strongly recommended for anyone spending more than 20 minutes outside in ${city} (AQI ${aqi}). Cloth masks do not filter fine PM2.5.`;
        } else {
          botResponse = `Mandatory N99, FFP3, or P100 respirator required outdoors in ${city}. Ensure a tight facial seal without air leaks around the bridge of the nose.`;
        }
      } else {
        botResponse = `Based on real-time atmospheric analysis of ${city} (AQI ${aqi}, PM2.5: ${pollutants?.pm2_5} µg/m³, NO₂: ${pollutants?.no2} µg/m³): Maintain active indoor filtration, stay hydrated, and monitor the hourly forecast horizon for changing wind patterns.`;
      }

      const botMsg = { 
        sender: 'bot', 
        text: botResponse, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setChatLog(prev => [...prev, botMsg]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="ai-panel-card glass-card">
      <div className="ai-panel-header">
        <div className="ai-title-row">
          <div className="ai-icon-bubble">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="ai-title">AWS Strands Health Copilot</h3>
            <span className="ai-subtitle">Intelligent Agent for Environmental & Community Safety</span>
          </div>
        </div>
        <button className="btn-ai-refresh" onClick={onRefresh} title="Regenerate analysis">
          <RefreshCw size={14} />
          <span>Refresh Analysis</span>
        </button>
      </div>

      {/* Main Analysis Card */}
      {aiData && (
        <div className="ai-analysis-box">
          <div className="ai-analysis-header">
            <Bot size={16} className="text-brand" />
            <span className="analysis-tag">Live Agent Summary for {city} (AQI {aqi})</span>
          </div>
          <p className="ai-analysis-text">{aiData.analysis}</p>

          {/* Actionable recommendations */}
          {aiData.recommendations && aiData.recommendations.length > 0 && (
            <div className="ai-recs-section">
              <h5 className="recs-title">Recommended Safety Steps</h5>
              <div className="recs-list">
                {aiData.recommendations.map((rec, i) => (
                  <div key={i} className="rec-item">
                    <CheckCircle2 size={15} className="rec-icon" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Policy actions */}
          {aiData.policy_actions && aiData.policy_actions.length > 0 && (
            <div className="ai-policy-section">
              <h5 className="policy-title">Public Authority & GRAP Triggers</h5>
              <div className="policy-list">
                {aiData.policy_actions.map((act, i) => (
                  <div key={i} className="policy-item">
                    <ShieldAlert size={14} className="policy-icon" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interactive AI Query Box */}
      <div className="ai-chat-section">
        <div className="ai-quick-prompts">
          <span className="prompts-label">Suggested Questions:</span>
          <div className="prompts-chips">
            {QUICK_PROMPTS.map((p, idx) => (
              <button key={idx} className="prompt-chip" onClick={() => handleAsk(p)}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Chat log */}
        {chatLog.length > 0 && (
          <div className="chat-log-box">
            {chatLog.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                <div className="msg-bubble">
                  <p>{msg.text}</p>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="chat-message bot">
                <div className="msg-bubble thinking">
                  <Sparkles size={14} className="spin" />
                  <span>AirWatch AI is analyzing sensor conditions...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Query Input */}
        <form 
          className="ai-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(customQuestion);
          }}
        >
          <input
            type="text"
            className="ai-chat-input"
            placeholder={`Ask AirWatch AI anything about air quality in ${city}...`}
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
          />
          <button type="submit" className="btn-ai-send" disabled={!customQuestion.trim()}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}