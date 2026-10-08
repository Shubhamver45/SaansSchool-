"""
Official CPCB National Air Quality Index (NAQI) Breakpoints & Deterministic Status Engine.
Source: Central Pollution Control Board (CPCB), Ministry of Environment, Forest & Climate Change, Govt. of India.
URL: https://cpcb.nic.in/upload/NAQI_Factsheet.pdf
"""

from typing import Dict, Any, Tuple, Optional

# CPCB Sub-index Breakpoints for 24-hr average (ug/m3, except CO in mg/m3)
# Format: (B_lo, B_hi, I_lo, I_hi)
CPCB_BREAKPOINTS = {
    "pm2_5": [
        (0.0, 30.0, 0, 50),        # Good
        (30.1, 60.0, 51, 100),     # Satisfactory
        (60.1, 90.0, 101, 200),    # Moderate
        (90.1, 120.0, 201, 300),   # Poor
        (120.1, 250.0, 301, 400),  # Very Poor
        (250.1, 500.0, 401, 500),  # Severe
    ],
    "pm10": [
        (0.0, 50.0, 0, 50),
        (50.1, 100.0, 51, 100),
        (100.1, 250.0, 101, 200),
        (250.1, 350.0, 201, 300),
        (350.1, 430.0, 301, 400),
        (430.1, 600.0, 401, 500),
    ],
    "no2": [
        (0.0, 40.0, 0, 50),
        (40.1, 80.0, 51, 100),
        (80.1, 180.0, 101, 200),
        (180.1, 280.0, 201, 300),
        (280.1, 400.0, 301, 400),
        (400.1, 600.0, 401, 500),
    ],
    "so2": [
        (0.0, 40.0, 0, 50),
        (40.1, 80.0, 51, 100),
        (80.1, 380.0, 101, 200),
        (380.1, 800.0, 201, 300),
        (800.1, 1600.0, 301, 400),
        (1600.1, 2000.0, 401, 500),
    ],
    "co": [
        (0.0, 1.0, 0, 50),
        (1.1, 2.0, 51, 100),
        (2.1, 10.0, 101, 200),
        (10.1, 17.0, 201, 300),
        (17.1, 34.0, 301, 400),
        (34.1, 50.0, 401, 500),
    ],
    "o3": [
        (0.0, 50.0, 0, 50),
        (50.1, 100.0, 51, 100),
        (100.1, 168.0, 101, 200),
        (168.1, 208.0, 201, 300),
        (208.1, 748.0, 301, 400),
        (748.1, 1000.0, 401, 500),
    ],
}


def calculate_cpcb_sub_index(pollutant: str, concentration: float) -> Optional[int]:
    """Calculate CPCB sub-index using standard piecewise linear interpolation."""
    table = CPCB_BREAKPOINTS.get(pollutant.lower())
    if not table or concentration is None or concentration < 0:
        return None

    for b_lo, b_hi, i_lo, i_hi in table:
        if b_lo <= concentration <= b_hi:
            return round(((i_hi - i_lo) / (b_hi - b_lo)) * (concentration - b_lo) + i_lo)

    # Beyond upper limit cap
    return 500


def get_cpcb_category(aqi: int) -> Tuple[str, str]:
    """Returns official CPCB NAQI category and standard hex color."""
    if aqi <= 50:
        return "Good", "#10b981"
    elif aqi <= 100:
        return "Satisfactory", "#22c55e"
    elif aqi <= 200:
        return "Moderate", "#eab308"
    elif aqi <= 300:
        return "Poor", "#f97316"
    elif aqi <= 400:
        return "Very Poor", "#ef4444"
    else:
        return "Severe", "#7f1d1d"


# Deterministic School Status Rules (Green, Amber, Red, Emergency)
def evaluate_school_status(
    current_aqi: int,
    forecast_aqi: Optional[int] = None,
    upwind_fires_count: int = 0
) -> Dict[str, Any]:
    """
    Evaluates school operational status deterministically in Python code (not AI).
    
    Status definitions:
    - Green: AQI <= 100. Normal day.
    - Amber: 101-200. Shorten strenuous outdoor activity, watch sensitive students.
    - Red: 201-300. No outdoor PE or sports, assemblies indoors, windows closed.
    - Emergency: 301+. Minimise all outdoor exposure, consider remote/hybrid classes.
    
    Modifiers:
    1. Forecast worsening: bumps status one level for advance planning.
    2. Upwind fires >= 20: adds stubble smoke transport advisory.
    """
    base_level = 1  # 1: Green, 2: Amber, 3: Red, 4: Emergency
    if current_aqi <= 100:
        base_level = 1
    elif current_aqi <= 200:
        base_level = 2
    elif current_aqi <= 300:
        base_level = 3
    else:
        base_level = 4

    modifiers_applied = []
    effective_level = base_level

    # Modifier 1: Forecast worsening
    if forecast_aqi and forecast_aqi > current_aqi:
        delta = forecast_aqi - current_aqi
        if delta >= 25 or (current_aqi <= 200 and forecast_aqi > 200) or (current_aqi <= 300 and forecast_aqi > 300):
            if effective_level < 4:
                effective_level += 1
                modifiers_applied.append(
                    f"Forecast Worsening: Tomorrow's AQI predicted at {forecast_aqi} (+{delta}). Status bumped for advance planning."
                )

    # Modifier 2: Upwind fires warning
    has_fire_warning = False
    if upwind_fires_count >= 15:
        has_fire_warning = True
        modifiers_applied.append(
            f"Stubble Fire Advisory: {upwind_fires_count} active satellite fire detections upwind. Smoke transport likely."
        )

    level_map = {
        1: {
            "status": "Green",
            "color": "#16a34a",
            "bg_color": "#dcfce7",
            "headline": "Normal School Operations Safe",
            "grap_stage": "Below GRAP Thresholds",
            "actions": [
                {"id": "act_recess_norm", "text": "Outdoor recess permitted without restrictions", "mandatory": False, "category": "recess"},
                {"id": "act_pe_norm", "text": "Regular physical education (PE) & sports matches allowed", "mandatory": False, "category": "pe"},
                {"id": "act_vent_open", "text": "Classroom ventilation recommended during peak clean hours", "mandatory": False, "category": "indoor"},
            ]
        },
        2: {
            "status": "Amber",
            "color": "#d97706",
            "bg_color": "#fef3c7",
            "headline": "Moderate Caution — Protect Sensitive Students",
            "grap_stage": "GRAP Stage I (Poor Air Quality Action)",
            "actions": [
                {"id": "act_pe_shorten", "text": "Shorten intense prolonged outdoor cardio sessions to 25 mins", "mandatory": True, "category": "pe"},
                {"id": "act_recess_shade", "text": "Keep asthmatic and sensitive students in shaded/indoor areas during recess", "mandatory": True, "category": "recess"},
                {"id": "act_masks_sens", "text": "Recommend N95 masks for children with cough, asthma, or bronchitis", "mandatory": False, "category": "health"},
                {"id": "act_water_breaks", "text": "Mandate frequent hydration breaks throughout the school day", "mandatory": False, "category": "health"},
            ]
        },
        3: {
            "status": "Red",
            "color": "#dc2626",
            "bg_color": "#fee2e2",
            "headline": "Unhealthy Alert — Outdoor Sports Cancelled",
            "grap_stage": "GRAP Stage II (Very Poor Alert)",
            "actions": [
                {"id": "act_pe_cancel", "text": "Cancel all outdoor sports, athletic matches, and PE sessions", "mandatory": True, "category": "pe"},
                {"id": "act_assembly_in", "text": "Move morning school assembly into auditorium or classrooms", "mandatory": True, "category": "assembly"},
                {"id": "act_windows_shut", "text": "Keep all classroom windows and external corridor doors shut", "mandatory": True, "category": "indoor"},
                {"id": "act_bus_closed", "text": "Ensure school bus windows remain fully closed during transit", "mandatory": True, "category": "transit"},
                {"id": "act_masks_rec", "text": "Distribute N95/FFP2 masks for all outdoor commutes", "mandatory": True, "category": "health"},
            ]
        },
        4: {
            "status": "Emergency",
            "color": "#991b1b",
            "bg_color": "#ffe4e6",
            "headline": "Severe Hazard — Emergency Indoor Protocols",
            "grap_stage": "GRAP Stage III & IV (Severe + Emergency)",
            "actions": [
                {"id": "act_all_outdoor_stop", "text": "Zero outdoor exposure: cancel all outdoor activities and recess", "mandatory": True, "category": "all"},
                {"id": "act_purifiers_max", "text": "Run HEPA air purifiers at maximum capacity in sealed classrooms", "mandatory": True, "category": "indoor"},
                {"id": "act_hybrid_recommend", "text": "Recommend administrative shift to online / hybrid classes per district orders", "mandatory": True, "category": "academic"},
                {"id": "act_masks_mandatory", "text": "Mandatory N95 mask wearing for all arriving staff and bus students", "mandatory": True, "category": "health"},
                {"id": "act_parent_urgent_alert", "text": "Dispatch urgent parent broadcast advisory regarding severe smog", "mandatory": True, "category": "broadcast"},
            ]
        }
    }

    result = level_map[effective_level].copy()
    result["base_status"] = level_map[base_level]["status"]
    result["effective_level"] = effective_level
    result["modifiers"] = modifiers_applied
    result["has_fire_warning"] = has_fire_warning
    result["current_aqi"] = current_aqi
    result["forecast_aqi"] = forecast_aqi
    return result
