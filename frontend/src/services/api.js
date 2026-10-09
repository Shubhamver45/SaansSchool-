import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
});

// Fetch current user location real-time AQI
export const fetchCurrentLocationAQI = () => 
  api.get('/aqi/current').then(r => r.data);

// Fetch AQI by exact GPS coordinates
export const fetchAQIByCoords = (lat, lon, name = null) => {
  const params = { lat, lon };
  if (name) params.name = name;
  return api.get('/aqi/geo', { params }).then(r => r.data);
};

// Autocomplete city search
export const searchCities = (query) => 
  api.get(`/aqi/search?q=${encodeURIComponent(query)}`).then(r => r.data);

// Fetch city AQI by name
export const fetchCityAQI = (city) => 
  api.get(`/aqi/${encodeURIComponent(city)}`).then(r => r.data);

// Fetch multi-cities overview
export const fetchCitiesOverview = (cities) => {
  const q = cities && cities.length ? `?cities=${cities.join(',')}` : '';
  return api.get(`/cities${q}`).then(r => r.data);
};

// Fetch 48-hour history + forecast by coordinates
export const fetchHistoryByCoords = (lat, lon, name = 'Current Location') => 
  api.get('/history/geo', { params: { lat, lon, name } }).then(r => r.data);

// Fetch history + forecast by city name
export const fetchHistory = (city, hours = 48) => 
  api.get(`/history/${encodeURIComponent(city)}?hours=${hours}`).then(r => r.data);

// Fetch health alert by coordinates or city
export const fetchAlertByCoords = (lat, lon, name = null) => 
  api.get('/alert/geo', { params: { lat, lon, name } }).then(r => r.data);

export const fetchAlert = (city) => 
  api.get(`/alert/${encodeURIComponent(city)}`).then(r => r.data);

// AI Health Recommendations
export const fetchAIRecommend = (city) => 
  api.get(`/ai/recommend/${encodeURIComponent(city)}`).then(r => r.data);

export const fetchAIRecommendGeo = (lat, lon, city = null) => 
  api.get(`/ai/recommend/${encodeURIComponent(city || 'Current Location')}`).then(r => r.data);


// Personal Pollution Exposure Calculator
export const calculateExposure = (aqi, minutes = 60, activity = 'walking', hasN95 = false) =>
  api.get('/exposure/calculate', {
    params: { aqi, minutes, activity, has_n95: hasN95 }
  }).then(r => r.data);

// School Decision Protocol
export const fetchSchoolDecision = (city, aqi) =>
  api.get('/school/decision', {
    params: { city, aqi }
  }).then(r => r.data);

// Stubble Burning Radar
export const fetchStubbleHotspots = () =>
  api.get('/stubble/hotspots').then(r => r.data);

// Map hotspots
export const fetchHotspots = () => 
  api.get('/map/hotspots').then(r => r.data);

// AWS Architecture & Hackathon Rubric Specification
export const fetchAwsArchitecture = () =>
  api.get('/aws/architecture').then(r => r.data);

// ==========================================
// SaansSchool Dedicated Client APIs
// ==========================================
export const fetchSaansSchools = () =>
  api.get('/saans/schools').then(r => r.data);

export const searchSaansSchools = (query) =>
  api.get(`/saans/schools/search?q=${encodeURIComponent(query)}`).then(r => r.data);

export const fetchSaansSchoolStatus = (schoolId) =>

  api.get(`/saans/school/${encodeURIComponent(schoolId)}`).then(r => r.data);

export const toggleSaansSchoolAction = (schoolId, actionId, completed) =>
  api.post(`/saans/school/${encodeURIComponent(schoolId)}/action`, {
    action_id: actionId,
    completed
  }).then(r => r.data);

export const sendSaansSchoolBroadcast = (schoolId, channel = 'email', language = 'en') =>
  api.post(`/saans/school/${encodeURIComponent(schoolId)}/broadcast`, {
    channel,
    language
  }).then(r => r.data);

export const fetchSaansArchitecture = () =>
  api.get('/saans/architecture').then(r => r.data);

export const simulateBadDay = (payload) =>
  api.post('/saans/simulate', payload).then(r => r.data);

export const fetchCommuteExposure = (schoolId) =>
  api.get(`/saans/school/${encodeURIComponent(schoolId)}/commute`).then(r => r.data);

export const calculateIndoorCADR = (payload) =>
  api.post('/saans/indoor/cadr', payload).then(r => r.data);

export const fetchStubbleTrajectory = (schoolId, windDeg = null, windSpeed = null) =>
  api.get(`/saans/school/${encodeURIComponent(schoolId)}/trajectory`, {
    params: { wind_deg: windDeg, wind_speed: windSpeed }
  }).then(r => r.data);

export const fetchAwsStatus = () =>
  api.get('/saans/aws/status').then(r => r.data);

export default api;


