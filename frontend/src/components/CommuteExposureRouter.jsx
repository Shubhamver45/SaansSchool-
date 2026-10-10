import React, { useState, useEffect } from 'react';
import { Navigation, ShieldCheck, AlertTriangle, ArrowRight, Clock, MapPin, Bus } from 'lucide-react';
import { fetchCommuteExposure } from '../services/api';
import './CommuteExposureRouter.css';

export function CommuteExposureRouter({ schoolId, schoolName }) {
  const [commuteData, setCommuteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState('clean'); // 'standard' or 'clean'

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchCommuteExposure(schoolId || 'sch_dps_rkp')
      .then(data => {
        if (isMounted) setCommuteData(data);
      })
      .catch(err => console.error('Failed to load commute exposure:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [schoolId]);

  if (loading) {
    return (
      <div className="commute-loading-card">
        <Navigation size={22} className="spin text-blue" />
        <span>Evaluating student commute corridors and diesel particulate density...</span>
      </div>
    );
  }

  if (!commuteData) return null;

  const std = commuteData.standard_highway_route;
  const clean = commuteData.clean_air_canopy_route;
  const mit = commuteData.mitigation_summary;

  return (
    <div className="commute-router-container">
      <div className="commute-header-row">
        <div>
          <div className="commute-title-group">
            <Bus size={20} className="commute-icon" />
            <h2 className="commute-title">CleanAir Commute Exposure Router</h2>
          </div>
          <p className="commute-sub">
            Children inhale 60%+ of their daily toxic lung dose during transit on congested arterial roads. 
            Comparing exposure between the fastest highway route and the clean-canopy corridor.
          </p>
        </div>

        <div className="commute-population-badge">
          <span>Student Commuters Affected:</span>
          <strong>{commuteData.student_transit_population.toLocaleString()} students</strong>
        </div>
      </div>

      {/* Exposure Reduction Headline Callout */}
      <div className="commute-headline-callout">
        <ShieldCheck size={24} className="text-emerald flex-shrink-0" />
        <div>
          <strong>{mit.particulate_dose_reduction_pct}% Inhaled Particulate Dose Avoided</strong>
          <p>{mit.recommendation}</p>
        </div>
      </div>

      {/* Two Routes Comparison Grid */}
      <div className="routes-comparison-grid">
        {/* Route A: Standard Highway Route */}
        <div 
          className={`route-card ${selectedRoute === 'standard' ? 'selected' : ''}`}
          onClick={() => setSelectedRoute('standard')}
        >
          <div className="route-card-header">
            <span className="route-badge badge-warning">Fastest Transit (Standard)</span>
            <span className="route-time"><Clock size={13} /> {std.travel_time_min} mins</span>
          </div>

          <h3 className="route-name">{std.route_name}</h3>

          <div className="route-metric-row">
            <div>
              <span className="m-label">Average In-Transit PM2.5</span>
              <strong className="m-val text-red">{std.average_pm25_ug_m3} µg/m³</strong>
            </div>
            <div>
              <span className="m-label">Inhaled Dose per Child</span>
              <strong className="m-val text-red">{std.inhaled_dose_ug} µg</strong>
            </div>
          </div>

          <div className="route-factor-box">
            <span className="factor-title">Diesel Soot Accumulation:</span>
            <p>{std.diesel_black_carbon_level}</p>
          </div>

          <div className="route-waypoints-list">
            <span className="waypoints-title">Transit Corridor Waypoints:</span>
            {std.waypoints.map((wp, idx) => (
              <div key={idx} className="wp-item">
                <MapPin size={12} className="wp-pin" />
                <span className="wp-name">{wp.name}</span>
                <span className="wp-pm25 text-red">{wp.pm25} µg</span>
              </div>
            ))}
          </div>
        </div>

        {/* Route B: CleanAir Canopy Route */}
        <div 
          className={`route-card clean-route-card ${selectedRoute === 'clean' ? 'selected' : ''}`}
          onClick={() => setSelectedRoute('clean')}
        >
          <div className="route-card-header">
            <span className="route-badge badge-optimal">CleanAir Exposure-Optimized</span>
            <span className="route-time"><Clock size={13} /> {clean.travel_time_min} mins (+{mit.tradeoff_time_extra_min}m)</span>
          </div>

          <h3 className="route-name">{clean.route_name}</h3>

          <div className="route-metric-row">
            <div>
              <span className="m-label">Average In-Transit PM2.5</span>
              <strong className="m-val text-emerald">{clean.average_pm25_ug_m3} µg/m³</strong>
            </div>
            <div>
              <span className="m-label">Inhaled Dose per Child</span>
              <strong className="m-val text-emerald">{clean.inhaled_dose_ug} µg</strong>
            </div>
          </div>

          <div className="route-factor-box clean-factor">
            <span className="factor-title">Vegetative Barrier Defense:</span>
            <p>{clean.diesel_black_carbon_level}</p>
          </div>

          <div className="route-waypoints-list">
            <span className="waypoints-title">Transit Corridor Waypoints:</span>
            {clean.waypoints.map((wp, idx) => (
              <div key={idx} className="wp-item">
                <MapPin size={12} className="wp-pin text-emerald" />
                <span className="wp-name">{wp.name}</span>
                <span className="wp-pm25 text-emerald">{wp.pm25} µg</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
