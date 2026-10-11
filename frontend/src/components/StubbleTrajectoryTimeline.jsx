import React, { useState, useEffect } from 'react';
import { Flame, Wind, Clock, AlertTriangle, ArrowRight, ShieldAlert, Compass } from 'lucide-react';
import { fetchStubbleTrajectory } from '../services/api';
import './StubbleTrajectoryTimeline.css';

export function StubbleTrajectoryTimeline({ schoolId, schoolName }) {
  const [timelineData, setTimelineData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchStubbleTrajectory(schoolId || 'sch_dps_rkp')
      .then(data => {
        if (isMounted) setTimelineData(data);
      })
      .catch(err => console.error('Trajectory error:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [schoolId]);

  if (loading) {
    return (
      <div className="trajectory-loading-card">
        <Wind size={22} className="spin text-blue" />
        <span>Calculating 16-hour forward atmospheric plume trajectory...</span>
      </div>
    );
  }

  if (!timelineData) return null;

  return (
    <div className="stubble-timeline-container">
      <div className="timeline-header-row">
        <div>
          <div className="timeline-title-group">
            <Flame size={20} className="text-orange" />
            <h2 className="timeline-title">Stubble Smoke 16-Hour Forward Plume Trajectory</h2>
          </div>
          <p className="timeline-sub">
            Satellite thermal fire observations are transformed into a forward atmospheric dispersion timeline using real-time Open-Meteo wind vectors.
          </p>
        </div>

        <div className="wind-vector-badge">
          <Compass size={16} className="text-blue" />
          <span>Surface Wind:</span>
          <strong>{timelineData.wind_vector.cardinal} ({timelineData.wind_vector.direction_deg}°) at {timelineData.wind_vector.speed_kmh} km/h</strong>
        </div>
      </div>

      <div className="advance-lead-banner">
        <Clock size={20} className="text-blue flex-shrink-0" />
        <div>
          <strong>12–16 Hour Advance Planning Advantage</strong>
          <p>{timelineData.lead_time_benefit}</p>
        </div>
      </div>

      <div className="horizons-cards-grid">
        {timelineData.timeline_horizons.map((h, i) => (
          <div key={i} className="horizon-card">
            <div className="horizon-top-row">
              <span className="horizon-pill">Horizon 0{i + 1}</span>
              <span className="horizon-eta">ETA: ~{h.eta_hours} hrs</span>
            </div>

            <h3 className="horizon-name">{h.horizon}</h3>
            
            <div className="horizon-meta-row">
              <span className="h-dist">Avg Distance: {h.average_dist_km} km</span>
              <span className="h-smoke">{h.smoke_severity}</span>
            </div>

            <div className="horizon-impact-box">
              <span className="imp-label">Atmospheric Descent:</span>
              <p>{h.campus_impact}</p>
            </div>

            <div className="horizon-action-box">
              <span className="act-label">Mandated School Protocol:</span>
              <strong>{h.action}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
