import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, LayersControl } from 'react-leaflet';
import { MapPin, Navigation, Info, ArrowRight, RefreshCw, Layers } from 'lucide-react';
import { fetchHotspots } from '../services/api';
import './MapPage.css';

// Component to dynamically recenter map when selected city coordinates change
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, 5, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
}

export function MapPage({ currentAQIData, onSelectCity }) {
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapStyle, setMapStyle] = useState('osm'); // 'osm' | 'esri' | 'topo'

  useEffect(() => {
    loadHotspots();
  }, []);

  const loadHotspots = async () => {
    setLoading(true);
    try {
      const data = await fetchHotspots();
      setHotspots(data.hotspots || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const center = currentAQIData && currentAQIData.lat && currentAQIData.lon
    ? [currentAQIData.lat, currentAQIData.lon]
    : [20.5937, 78.9629]; // Default India center

  const getTileUrl = () => {
    switch (mapStyle) {
      case 'esri':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, USGS, NOAA'
        };
      case 'streets':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; <a href="https://www.esri.com/">Esri</a> & contributors'
        };
      case 'osm':
      default:
        return {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        };
    }
  };

  const tileConfig = getTileUrl();

  return (
    <div className="map-page container">
      <div className="map-page-header">
        <div>
          <h2 className="map-page-title">Interactive Global Air Quality Radar</h2>
          <p className="map-page-subtitle">
            Real-time satellite atmospheric data & continuous ground monitoring stations (100% Free & Live)
          </p>
        </div>
        
        <div className="map-header-controls">
          {/* Map Layer Toggles */}
          <div className="map-style-toggles">
            <button
              className={`style-btn ${mapStyle === 'osm' ? 'active' : ''}`}
              onClick={() => setMapStyle('osm')}
            >
              OpenStreetMap
            </button>
            <button
              className={`style-btn ${mapStyle === 'esri' ? 'active' : ''}`}
              onClick={() => setMapStyle('esri')}
            >
              Light Canvas
            </button>
            <button
              className={`style-btn ${mapStyle === 'streets' ? 'active' : ''}`}
              onClick={() => setMapStyle('streets')}
            >
              Street Map
            </button>
          </div>

          <button className="btn-map-refresh" onClick={loadHotspots} disabled={loading}>
            <RefreshCw size={14} className={loading ? 'spin' : ''} />
            <span>Refresh Stations</span>
          </button>
        </div>
      </div>

      {/* Map card wrapper */}
      <div className="map-card glass-card">
        <div className="map-legend-bar">
          <span className="legend-title">EPA AQI Index:</span>
          <div className="legend-items">
            <span className="leg-item"><span className="leg-dot good"></span> 0-50 Good</span>
            <span className="leg-item"><span className="leg-dot mod"></span> 51-100 Moderate</span>
            <span className="leg-item"><span className="leg-dot sens"></span> 101-150 Sensitive</span>
            <span className="leg-item"><span className="leg-dot unh"></span> 151-200 Unhealthy</span>
            <span className="leg-item"><span className="leg-dot vunh"></span> 201-300 Very Unhealthy</span>
            <span className="leg-item"><span className="leg-dot haz"></span> 301+ Hazardous</span>
          </div>
        </div>

        <div className="leaflet-map-wrapper">
          <MapContainer 
            center={center} 
            zoom={4} 
            scrollWheelZoom={true} 
            style={{ height: '580px', width: '100%', background: '#f8fafc' }}
          >
            <TileLayer
              key={mapStyle}
              attribution={tileConfig.attribution}
              url={tileConfig.url}
              maxZoom={18}
            />
            <MapRecenter center={center} />

            {/* Current Location Marker with pulsating aura */}
            {currentAQIData && (
              <CircleMarker
                center={[currentAQIData.lat, currentAQIData.lon]}
                radius={16}
                pathOptions={{
                  fillColor: '#2563eb',
                  fillOpacity: 0.9,
                  color: '#ffffff',
                  weight: 3,
                }}
              >
                <Popup>
                  <div className="map-popup-card">
                    <div className="popup-badge">Present Location</div>
                    <h4 className="popup-city">{currentAQIData.city}</h4>
                    <p className="popup-state">{currentAQIData.state || currentAQIData.country}</p>
                    <div className="popup-aqi-box" style={{ color: currentAQIData.category_color }}>
                      <span className="popup-aqi-val">{currentAQIData.aqi}</span>
                      <span className="popup-cat">{currentAQIData.category}</span>
                    </div>
                    <div className="popup-pollutants-mini">
                      <span>PM2.5: <strong>{currentAQIData.pollutants.pm2_5} µg/m³</strong></span>
                      <span>PM10: <strong>{currentAQIData.pollutants.pm10} µg/m³</strong></span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            )}

            {/* Hotspot Markers */}
            {hotspots.map((h, i) => {
              const isCurrent = currentAQIData && Math.abs(h.lat - currentAQIData.lat) < 0.1 && Math.abs(h.lon - currentAQIData.lon) < 0.1;
              if (isCurrent) return null;

              return (
                <CircleMarker
                  key={`${h.city}-${i}`}
                  center={[h.lat, h.lon]}
                  radius={Math.min(Math.max(h.aqi / 15, 8), 22)}
                  pathOptions={{
                    fillColor: h.color || '#f59e0b',
                    fillOpacity: 0.8,
                    color: '#ffffff',
                    weight: 2,
                  }}
                >
                  <Popup>
                    <div className="map-popup-card">
                      <h4 className="popup-city">{h.city}</h4>
                      <p className="popup-state">{h.state ? `${h.state}, ${h.country}` : h.country}</p>
                      <div className="popup-aqi-box" style={{ color: h.color }}>
                        <span className="popup-aqi-val">{h.aqi}</span>
                        <span className="popup-cat">{h.category}</span>
                      </div>
                      <button
                        className="popup-btn"
                        onClick={() => onSelectCity({ city: h.city, lat: h.lat, lon: h.lon })}
                      >
                        <span>View Full Metrics</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}