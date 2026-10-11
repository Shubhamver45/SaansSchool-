from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from enum import Enum


class AQICategory(str, Enum):
    GOOD = "Good"
    MODERATE = "Moderate"
    UNHEALTHY_SENSITIVE = "Unhealthy for Sensitive Groups"
    UNHEALTHY = "Unhealthy"
    VERY_UNHEALTHY = "Very Unhealthy"
    HAZARDOUS = "Hazardous"


class Pollutants(BaseModel):
    pm2_5: float
    pm10: float
    o3: float
    no2: float
    so2: float
    co: float
    dust: Optional[float] = 0.0
    uv_index: Optional[float] = 0.0


class WeatherContext(BaseModel):
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    wind_speed: Optional[float] = None


class AQIData(BaseModel):
    city: str
    state: Optional[str] = ""
    country: str
    lat: float
    lon: float
    aqi: int
    european_aqi: Optional[int] = None
    category: AQICategory
    category_color: str
    pollutants: Pollutants
    dominant_pollutant: str
    timestamp: str
    health_message: str
    weather: Optional[WeatherContext] = None
    is_live: bool = True
    source: str = "Open-Meteo & Copernicus Satellite"


class CitySearchResult(BaseModel):
    id: Optional[int] = None
    city: str
    state: Optional[str] = ""
    country: str
    country_code: Optional[str] = ""
    lat: float
    lon: float
    aqi: Optional[int] = None
    category: Optional[AQICategory] = None
    category_color: Optional[str] = None


class HistoricalDataPoint(BaseModel):
    timestamp: str
    aqi: int
    european_aqi: Optional[int] = None
    pm2_5: float
    pm10: float
    o3: float
    no2: float
    so2: Optional[float] = 0.0
    co: Optional[float] = 0.0
    is_forecast: Optional[bool] = False


class HistoricalData(BaseModel):
    city: str
    lat: Optional[float] = None
    lon: Optional[float] = None
    data: List[HistoricalDataPoint]


class AlertLevel(str, Enum):
    INFO = "info"
    WARNING = "warning"
    DANGER = "danger"
    CRITICAL = "critical"


class HealthAlert(BaseModel):
    city: str
    aqi: int
    level: AlertLevel
    title: str
    message: str
    affected_groups: List[str]
    recommendations: List[str]
    activity_advice: Optional[Dict[str, str]] = None
    timestamp: str


class AIRecommendation(BaseModel):
    city: str
    aqi: int
    analysis: str
    recommendations: List[str]
    policy_actions: Optional[List[str]] = None
    vulnerable_groups: Optional[List[str]] = None

