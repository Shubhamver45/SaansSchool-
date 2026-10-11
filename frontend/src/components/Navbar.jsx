import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, MapPin, Search, Navigation, AlertTriangle, 
  Map as MapIcon, BarChart2, Sparkles, Loader2, X, Award, School 
} from 'lucide-react';


import { searchCities } from '../services/api';
import './Navbar.css';

const QUICK_CITIES = ['Delhi', 'Mumbai', 'Bengaluru', 'London', 'New York', 'Tokyo'];

export function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentCity, 
  onSelectCity, 
  onDetectLocation, 
  isLocating 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Debounced search autocomplete
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchCities(searchQuery);
        setSuggestions(results);
        setShowDropdown(true);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (item) => {
    setShowDropdown(false);
    setSearchQuery('');
    onSelectCity({
      city: item.city,
      lat: item.lat,
      lon: item.lon,
      state: item.state,
      country: item.country
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (suggestions.length > 0) {
        handleSelectSuggestion(suggestions[0]);
      } else {
        onSelectCity({ city: searchQuery.trim() });
        setShowDropdown(false);
        setSearchQuery('');
      }
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-top container">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => setActiveTab('dashboard')}>
          <div className="brand-icon-wrapper">
            <Wind className="brand-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-title">AirWatch</span>
            <span className="brand-subtitle">Satellite & Sensor AQI</span>
          </div>
          <span className="badge badge-live">Live</span>
        </div>

        {/* Global Search Bar */}
        <div className="navbar-search-wrapper" ref={dropdownRef}>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search any city or location in the world..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            />
            {isSearching && <Loader2 className="search-spinner" size={16} />}
            {searchQuery && !isSearching && (
              <button 
                type="button" 
                className="search-clear" 
                onClick={() => { setSearchQuery(''); setSuggestions([]); }}
              >
                <X size={15} />
              </button>
            )}
          </form>

          {/* Autocomplete Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="search-dropdown">
              <div className="dropdown-header">Matching Locations</div>
              {suggestions.map((item, idx) => (
                <div
                  key={`${item.id || idx}-${item.city}`}
                  className="dropdown-item"
                  onClick={() => handleSelectSuggestion(item)}
                >
                  <MapPin size={15} className="item-pin" />
                  <div className="item-info">
                    <span className="item-city">{item.city}</span>
                    <span className="item-details">
                      {[item.state, item.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* GPS Location Button & Action */}
        <div className="navbar-actions">
          <button 
            className="btn-location"
            onClick={onDetectLocation}
            disabled={isLocating}
            title="Detect AQI for your current location"
          >
            {isLocating ? (
              <Loader2 className="spin" size={16} />
            ) : (
              <Navigation size={16} />
            )}
            <span>{isLocating ? 'Detecting GPS...' : 'My Location'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs & Quick Chips Bar */}
      <div className="navbar-subbar">
        <div className="container subbar-inner">
          <nav className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart2 size={16} />
              <span>Live Dashboard</span>
            </button>
            <button 
              className={`nav-tab nav-tab-saans ${activeTab === 'saans' ? 'active' : ''}`}
              onClick={() => setActiveTab('saans')}
            >
              <School size={16} />
              <span>SaansSchool</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => setActiveTab('map')}
            >
              <MapIcon size={16} />
              <span>Air Quality Map</span>
            </button>

            <button 
              className={`nav-tab ${activeTab === 'alerts' ? 'active' : ''}`}
              onClick={() => setActiveTab('alerts')}
            >
              <AlertTriangle size={16} />
              <span>Health & School Safety</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <Sparkles size={16} />
              <span>AWS AI Copilot</span>
            </button>
            <button 
              className={`nav-tab nav-tab-judges ${activeTab === 'judges' ? 'active' : ''}`}
              onClick={() => setActiveTab('judges')}
            >
              <Award size={16} />
              <span>Judges & AWS (01-05)</span>
            </button>
          </nav>


          {/* Quick City Chips */}
          <div className="quick-chips">
            <span className="chips-label">Popular:</span>
            {QUICK_CITIES.map((c) => (
              <button
                key={c}
                className={`chip-btn ${currentCity?.toLowerCase() === c.toLowerCase() ? 'active' : ''}`}
                onClick={() => onSelectCity({ city: c })}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}