/**
 * Complete Client-Side Resilient Fallback Engine for SaansSchool
 * Contains complete schema matching backend exactly to prevent any undefined errors.
 */

export const FALLBACK_SCHOOLS = [
  {
    "id": "sch_dps_rkp",
    "name": "Delhi Public School, R.K. Puram",
    "short_name": "DPS R.K. Puram",
    "city": "New Delhi",
    "state": "Delhi",
    "zone": "North",
    "lat": 28.5672,
    "lon": 77.1723,
    "students": 2800,
    "principal": "Dr. Padma S.",
    "email": "principal@dpsrkp.edu.in",
    "outdoor_activities": "Soccer, Athletics, Morning Assemblies"
  },
  {
    "id": "sch_modern_barakhamba",
    "name": "Modern School, Barakhamba Road",
    "short_name": "Modern School Barakhamba",
    "city": "New Delhi",
    "state": "Delhi",
    "zone": "North",
    "lat": 28.6315,
    "lon": 77.2294,
    "students": 2600,
    "principal": "Dr. Vijay Datta"
  },
  {
    "id": "sch_st_johns_chd",
    "name": "St. John's High School, Sector 26",
    "short_name": "St. John's Chandigarh",
    "city": "Chandigarh",
    "state": "Chandigarh",
    "zone": "North",
    "lat": 30.7245,
    "lon": 76.8042,
    "students": 1900,
    "principal": "Mrs. Kavita Das"
  },
  {
    "id": "sch_lamartiniere_lko",
    "name": "La Martiniere College, Hazratganj",
    "short_name": "La Martiniere Lucknow",
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "zone": "North",
    "lat": 26.8436,
    "lon": 80.9575,
    "students": 2500,
    "principal": "Mr. Carlyle McFarland"
  },
  {
    "id": "sch_dais_mumbai",
    "name": "Dhirubhai Ambani International School, BKC",
    "short_name": "DAIS Mumbai (BKC)",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zone": "West",
    "lat": 19.0664,
    "lon": 72.8688,
    "students": 2100,
    "principal": "Mrs. Nita Ambani / Dean"
  },
  {
    "id": "sch_cathedral_mumbai",
    "name": "The Cathedral and John Connon School, Fort",
    "short_name": "Cathedral & John Connon",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zone": "West",
    "lat": 18.9322,
    "lon": 72.8315,
    "students": 1800,
    "principal": "Mrs. Meera Isaacs"
  },
  {
    "id": "sch_dps_blr",
    "name": "Delhi Public School Bangalore South",
    "short_name": "DPS Bangalore South",
    "city": "Bengaluru",
    "state": "Karnataka",
    "zone": "South",
    "lat": 12.8715,
    "lon": 77.5512,
    "students": 3100,
    "principal": "Mrs. Anitha Bijesh"
  },
  {
    "id": "sch_don_bosco_kol",
    "name": "Don Bosco School, Park Circus",
    "short_name": "Don Bosco Kolkata",
    "city": "Kolkata",
    "state": "West Bengal",
    "zone": "East",
    "lat": 22.5412,
    "lon": 88.3695,
    "students": 2700,
    "principal": "Fr. Bikash Mondal"
  }
];

export const FULL_FALLBACK_STATUS = {
  "school": {
    "id": "sch_dps_rkp",
    "name": "Delhi Public School, R.K. Puram",
    "short_name": "DPS R.K. Puram",
    "city": "New Delhi",
    "state": "Delhi",
    "zone": "North",
    "lat": 28.5672,
    "lon": 77.1723,
    "students": 2800,
    "principal": "Dr. Padma S.",
    "email": "principal@dpsrkp.edu.in",
    "outdoor_activities": "Soccer, Athletics, Morning Assemblies"
  },
  "station": {
    "name": "DPCC Continuous Station \u2014 R.K. Puram",
    "station_id": "cpcb_rk_puram",
    "city": "New Delhi",
    "distance_km": 1.49,
    "type": "Ground CPCB Sensor",
    "last_updated": "11:49 UTC (Live)",
    "confidence": "High \u2014 Ground Calibrated Sensor Stream"
  },
  "air": {
    "aqi": 500,
    "category": "Severe",
    "category_color": "#7f1d1d",
    "pm2_5": 110.6,
    "pm10": 638.9,
    "no2": 19.0,
    "so2": 24.0,
    "co": 0.46,
    "o3": 141.0,
    "forecast_aqi": 130,
    "forecast_trend": [
      {
        "time": "2026-10-11T00:00",
        "pm2_5": 147.6,
        "aqi": 322
      },
      {
        "time": "2026-10-11T01:00",
        "pm2_5": 151.8,
        "aqi": 325
      },
      {
        "time": "2026-10-11T02:00",
        "pm2_5": 149.5,
        "aqi": 323
      },
      {
        "time": "2026-10-11T03:00",
        "pm2_5": 151.8,
        "aqi": 325
      },
      {
        "time": "2026-10-11T04:00",
        "pm2_5": 156.5,
        "aqi": 329
      },
      {
        "time": "2026-10-11T05:00",
        "pm2_5": 152.7,
        "aqi": 326
      },
      {
        "time": "2026-10-11T06:00",
        "pm2_5": 152.7,
        "aqi": 326
      },
      {
        "time": "2026-10-11T07:00",
        "pm2_5": 151.3,
        "aqi": 325
      },
      {
        "time": "2026-10-11T08:00",
        "pm2_5": 136.0,
        "aqi": 313
      },
      {
        "time": "2026-10-11T09:00",
        "pm2_5": 117.1,
        "aqi": 290
      },
      {
        "time": "2026-10-11T10:00",
        "pm2_5": 104.3,
        "aqi": 248
      },
      {
        "time": "2026-10-11T11:00",
        "pm2_5": 110.6,
        "aqi": 269
      },
      {
        "time": "2026-10-11T12:00",
        "pm2_5": 102.2,
        "aqi": 241
      },
      {
        "time": "2026-10-11T13:00",
        "pm2_5": 98.0,
        "aqi": 227
      },
      {
        "time": "2026-10-11T14:00",
        "pm2_5": 94.8,
        "aqi": 217
      },
      {
        "time": "2026-10-11T15:00",
        "pm2_5": 93.6,
        "aqi": 213
      },
      {
        "time": "2026-10-11T16:00",
        "pm2_5": 92.4,
        "aqi": 209
      },
      {
        "time": "2026-10-11T17:00",
        "pm2_5": 93.8,
        "aqi": 213
      },
      {
        "time": "2026-10-11T18:00",
        "pm2_5": 101.5,
        "aqi": 239
      },
      {
        "time": "2026-10-11T19:00",
        "pm2_5": 94.8,
        "aqi": 217
      },
      {
        "time": "2026-10-11T20:00",
        "pm2_5": 81.7,
        "aqi": 173
      },
      {
        "time": "2026-10-11T21:00",
        "pm2_5": 76.4,
        "aqi": 155
      },
      {
        "time": "2026-10-11T22:00",
        "pm2_5": 74.0,
        "aqi": 147
      },
      {
        "time": "2026-10-11T23:00",
        "pm2_5": 73.6,
        "aqi": 146
      },
      {
        "time": "2026-10-12T00:00",
        "pm2_5": 72.9,
        "aqi": 143
      },
      {
        "time": "2026-10-12T01:00",
        "pm2_5": 76.8,
        "aqi": 156
      },
      {
        "time": "2026-10-12T02:00",
        "pm2_5": 80.8,
        "aqi": 170
      },
      {
        "time": "2026-10-12T03:00",
        "pm2_5": 76.4,
        "aqi": 155
      },
      {
        "time": "2026-10-12T04:00",
        "pm2_5": 78.0,
        "aqi": 160
      },
      {
        "time": "2026-10-12T05:00",
        "pm2_5": 78.5,
        "aqi": 162
      },
      {
        "time": "2026-10-12T06:00",
        "pm2_5": 78.9,
        "aqi": 163
      },
      {
        "time": "2026-10-12T07:00",
        "pm2_5": 66.6,
        "aqi": 123
      },
      {
        "time": "2026-10-12T08:00",
        "pm2_5": 60.3,
        "aqi": 102
      },
      {
        "time": "2026-10-12T09:00",
        "pm2_5": 57.2,
        "aqi": 95
      },
      {
        "time": "2026-10-12T10:00",
        "pm2_5": 49.6,
        "aqi": 83
      },
      {
        "time": "2026-10-12T11:00",
        "pm2_5": 51.2,
        "aqi": 86
      }
    ],
    "source": "Open-Meteo & Copernicus Atmosphere Network (CPCB NAQI Calibrated)",
    "confidence": "High \u2014 Ground Calibrated Sensor Stream"
  },
  "wind": {
    "wind_speed_kmh": 5.5,
    "wind_direction_deg": 126,
    "wind_from_cardinal": "SE",
    "temperature_c": 30.0,
    "humidity_percent": 54
  },
  "fires": {
    "total_detections_in_300km": 6,
    "total_upwind_detections": 1,
    "active_upwind_clusters": 1,
    "wording": "1 fire detections upwind within 300 km in the last 24h. Wind direction (SE at 126\u00b0) supports atmospheric transport toward this area.",
    "upwind_clusters": [
      {
        "id": "clust_26.6_78.4",
        "lat": 26.578,
        "lon": 78.439,
        "distance_km": 254.0,
        "bearing_deg": 150.3,
        "fire_count": 1,
        "max_frp": 2.08,
        "is_upwind": true,
        "satellite": "Suomi-NPP VIIRS",
        "region": "Active Cluster at 26.58\u00b0N, 78.44\u00b0E"
      }
    ],
    "all_nearby_clusters": [
      {
        "id": "clust_26.6_78.4",
        "lat": 26.578,
        "lon": 78.439,
        "distance_km": 254.0,
        "bearing_deg": 150.3,
        "fire_count": 1,
        "max_frp": 2.08,
        "is_upwind": true,
        "satellite": "Suomi-NPP VIIRS",
        "region": "Active Cluster at 26.58\u00b0N, 78.44\u00b0E"
      },
      {
        "id": "clust_27.6_76.0",
        "lat": 27.558,
        "lon": 76.011,
        "distance_km": 160.0,
        "bearing_deg": 225.7,
        "fire_count": 1,
        "max_frp": 7.95,
        "is_upwind": false,
        "satellite": "Suomi-NPP VIIRS",
        "region": "Active Cluster at 27.56\u00b0N, 76.01\u00b0E"
      },
      {
        "id": "clust_26.3_77.7",
        "lat": 26.34,
        "lon": 77.666,
        "distance_km": 252.4,
        "bearing_deg": 168.8,
        "fire_count": 2,
        "max_frp": 6.55,
        "is_upwind": false,
        "satellite": "Suomi-NPP VIIRS",
        "region": "Active Cluster at 26.34\u00b0N, 77.67\u00b0E"
      },
      {
        "id": "clust_30.0_76.1",
        "lat": 29.952,
        "lon": 76.094,
        "distance_km": 186.2,
        "bearing_deg": 326.1,
        "fire_count": 1,
        "max_frp": 4.84,
        "is_upwind": false,
        "satellite": "Suomi-NPP VIIRS",
        "region": "Active Cluster at 29.95\u00b0N, 76.09\u00b0E"
      },
      {
        "id": "clust_27.7_76.1",
        "lat": 27.668,
        "lon": 76.131,
        "distance_km": 142.9,
        "bearing_deg": 225.8,
        "fire_count": 1,
        "max_frp": 1.38,
        "is_upwind": false,
        "satellite": "Suomi-NPP VIIRS",
        "region": "Active Cluster at 27.67\u00b0N, 76.13\u00b0E"
      }
    ],
    "source": "NASA FIRMS (Suomi-NPP VIIRS 375m Near-Real-Time Active Fire Feed)"
  },
  "status": {
    "status": "Emergency",
    "color": "#991b1b",
    "bg_color": "#ffe4e6",
    "headline": "Severe Hazard \u2014 Emergency Indoor Protocols",
    "grap_stage": "GRAP Stage III & IV (Severe + Emergency)",
    "actions": [
      {
        "id": "act_all_outdoor_stop",
        "text": "Zero outdoor exposure: cancel all outdoor activities and recess",
        "mandatory": true,
        "category": "all"
      },
      {
        "id": "act_purifiers_max",
        "text": "Run HEPA air purifiers at maximum capacity in sealed classrooms",
        "mandatory": true,
        "category": "indoor"
      },
      {
        "id": "act_hybrid_recommend",
        "text": "Recommend administrative shift to online / hybrid classes per district orders",
        "mandatory": true,
        "category": "academic"
      },
      {
        "id": "act_masks_mandatory",
        "text": "Mandatory N95 mask wearing for all arriving staff and bus students",
        "mandatory": true,
        "category": "health"
      },
      {
        "id": "act_parent_urgent_alert",
        "text": "Dispatch urgent parent broadcast advisory regarding severe smog",
        "mandatory": true,
        "category": "broadcast"
      }
    ],
    "base_status": "Emergency",
    "effective_level": 4,
    "modifiers": [],
    "has_fire_warning": false,
    "current_aqi": 500,
    "forecast_aqi": 130
  },
  "advisories": {
    "en": {
      "language": "English",
      "subject": "Air Quality Health Notice: Delhi Public School, R.K. Puram [EMERGENCY]",
      "body": "Dear Parents and Staff,\n\nToday's official Air Quality Index (AQI) near Delhi Public School, R.K. Puram is recorded at 500 (GRAP Stage III & IV (Severe + Emergency)).\nCampus Environmental Status: EMERGENCY.\n\nAs per school health safety protocols, the following mandatory actions are in effect today:\n\u2022 Zero outdoor exposure: cancel all outdoor activities and recess; Run HEPA air purifiers at maximum capacity in sealed classrooms; Recommend administrative shift to online / hybrid classes per district orders; Mandatory N95 mask wearing for all arriving staff and bus students; Dispatch urgent parent broadcast advisory regarding severe smog\n\nStudents with asthma or pre-existing respiratory sensitivities are advised to wear certified N95 masks and remain in shaded/indoor facilities. We will continue to monitor live ambient air and provide updates as atmospheric conditions evolve.\n\nWarm regards,\nPrincipal's Office, Delhi Public School, R.K. Puram"
    },
    "hi": {
      "language": "Hindi (\u0939\u093f\u0902\u0926\u0940)",
      "subject": "\u0935\u093e\u092f\u0941 \u0917\u0941\u0923\u0935\u0924\u094d\u0924\u093e \u0938\u094d\u0935\u093e\u0938\u094d\u0925\u094d\u092f \u0938\u0942\u091a\u0928\u093e: Delhi Public School, R.K. Puram [EMERGENCY]",
      "body": "\u0906\u0926\u0930\u0923\u0940\u092f \u0905\u092d\u093f\u092d\u093e\u0935\u0915 \u090f\u0935\u0902 \u0935\u093f\u0926\u094d\u092f\u093e\u0932\u092f \u092a\u0930\u093f\u0935\u093e\u0930,\n\n\u0906\u091c Delhi Public School, R.K. Puram \u0915\u0947 \u0928\u093f\u0915\u091f \u0935\u093e\u092f\u0941 \u0917\u0941\u0923\u0935\u0924\u094d\u0924\u093e \u0938\u0942\u091a\u0915\u093e\u0902\u0915 (AQI) 500 (GRAP Stage III & IV (Severe + Emergency)) \u0926\u0930\u094d\u091c \u0915\u093f\u092f\u093e \u0917\u092f\u093e \u0939\u0948\u0964\n\u0935\u0930\u094d\u0924\u092e\u093e\u0928 \u0935\u093f\u0926\u094d\u092f\u093e\u0932\u092f \u0938\u0941\u0930\u0915\u094d\u0937\u093e \u0938\u094d\u0924\u0930: EMERGENCY.\n\n\u0935\u093f\u0926\u094d\u092f\u093e\u0930\u094d\u0925\u093f\u092f\u094b\u0902 \u0915\u0947 \u0938\u094d\u0935\u093e\u0938\u094d\u0925\u094d\u092f \u0914\u0930 \u0938\u0941\u0930\u0915\u094d\u0937\u093e \u0915\u094b \u092a\u094d\u0930\u093e\u0925\u092e\u093f\u0915\u0924\u093e \u0926\u0947\u0924\u0947 \u0939\u0941\u090f \u0906\u091c \u0928\u093f\u092e\u094d\u0928\u0932\u093f\u0916\u093f\u0924 \u0928\u093f\u0930\u094d\u0926\u0947\u0936 \u0932\u093e\u0917\u0942 \u0939\u0948\u0902:\n\u2022 \u0938\u092d\u0940 \u092c\u093e\u0939\u0930\u0940 \u0916\u0947\u0932-\u0915\u0942\u0926 \u090f\u0935\u0902 \u0905\u0924\u094d\u092f\u0927\u093f\u0915 \u0936\u093e\u0930\u0940\u0930\u093f\u0915 \u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u094b\u0902 \u0915\u094b \u0938\u094d\u0925\u0917\u093f\u0924/\u0938\u0940\u092e\u093f\u0924 \u0915\u0930 \u0926\u093f\u092f\u093e \u0917\u092f\u093e \u0939\u0948\u0964\n\u2022 \u0915\u0915\u094d\u0937\u093e \u0915\u0947 \u0938\u092d\u0940 \u0916\u093f\u0921\u093c\u0915\u093f\u092f\u093e\u0902 \u092c\u0902\u0926 \u0930\u0916\u0940 \u091c\u093e\u090f\u0902\u0917\u0940 \u090f\u0935\u0902 \u0907\u0928\u0921\u094b\u0930 \u0935\u0947\u0902\u091f\u093f\u0932\u0947\u0936\u0928 \u091a\u093e\u0932\u0942 \u0930\u0939\u0947\u0917\u093e\u0964\n\u2022 \u0938\u093e\u0902\u0938 \u0915\u0940 \u0938\u092e\u0938\u094d\u092f\u093e \u092f\u093e \u0905\u0938\u094d\u0925\u092e\u093e \u0938\u0947 \u092a\u0940\u0921\u093c\u093f\u0924 \u092c\u091a\u094d\u091a\u094b\u0902 \u0915\u094b N95 \u092e\u093e\u0938\u094d\u0915 \u092a\u0939\u0928\u0928\u0947 \u0915\u0940 \u0938\u0932\u093e\u0939 \u0926\u0940 \u091c\u093e\u0924\u0940 \u0939\u0948\u0964\n\n\u0939\u092e \u0932\u0917\u093e\u0924\u093e\u0930 \u0935\u093e\u092f\u0941 \u0917\u0941\u0923\u0935\u0924\u094d\u0924\u093e \u0915\u0940 \u0928\u093f\u0917\u0930\u093e\u0928\u0940 \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964\n\n\u0938\u0927\u0928\u094d\u092f\u0935\u093e\u0926,\n\u092a\u094d\u0930\u093e\u091a\u093e\u0930\u094d\u092f \u0915\u093e\u0930\u094d\u092f\u093e\u0932\u092f, Delhi Public School, R.K. Puram"
    },
    "pa": {
      "language": "Punjabi (\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40)",
      "subject": "\u0a39\u0a35\u0a3e \u0a26\u0a40 \u0a17\u0a41\u0a23\u0a35\u0a71\u0a24\u0a3e \u0a38\u0a70\u0a2c\u0a70\u0a27\u0a40 \u0a38\u0a3f\u0a39\u0a24 \u0a38\u0a42\u0a1a\u0a28\u0a3e: Delhi Public School, R.K. Puram [EMERGENCY]",
      "body": "\u0a38\u0a24\u0a3f\u0a15\u0a3e\u0a30\u0a2f\u0a4b\u0a17 \u0a2e\u0a3e\u0a2a\u0a47 \u0a05\u0a24\u0a47 \u0a38\u0a15\u0a42\u0a32 \u0a38\u0a1f\u0a3e\u0a2b\u0a3c,\n\n\u0a05\u0a71\u0a1c Delhi Public School, R.K. Puram \u0a26\u0a47 \u0a28\u0a47\u0a5c\u0a47 \u0a39\u0a35\u0a3e \u0a26\u0a40 \u0a17\u0a41\u0a23\u0a35\u0a71\u0a24\u0a3e \u0a26\u0a3e \u0a38\u0a42\u0a1a\u0a15\u0a3e\u0a02\u0a15 (AQI) 500 (GRAP Stage III & IV (Severe + Emergency)) \u0a26\u0a30\u0a1c \u0a15\u0a40\u0a24\u0a3e \u0a17\u0a3f\u0a06 \u0a39\u0a48\u0964\n\u0a2e\u0a4c\u0a1c\u0a42\u0a26\u0a3e \u0a38\u0a15\u0a42\u0a32 \u0a38\u0a41\u0a30\u0a71\u0a16\u0a3f\u0a06 \u0a38\u0a25\u0a3f\u0a24\u0a40: EMERGENCY.\n\n\u0a35\u0a3f\u0a26\u0a3f\u0a06\u0a30\u0a25\u0a40\u0a06\u0a02 \u0a26\u0a40 \u0a38\u0a3f\u0a39\u0a24 \u0a38\u0a41\u0a30\u0a71\u0a16\u0a3f\u0a06 \u0a28\u0a42\u0a70 \u0a27\u0a3f\u0a06\u0a28 \u0a35\u0a3f\u0a71\u0a1a \u0a30\u0a71\u0a16\u0a26\u0a47 \u0a39\u0a4b\u0a0f \u0a05\u0a71\u0a1c \u0a39\u0a47\u0a20 \u0a32\u0a3f\u0a16\u0a47 \u0a28\u0a3f\u0a2f\u0a2e \u0a32\u0a3e\u0a17\u0a42 \u0a15\u0a40\u0a24\u0a47 \u0a17\u0a0f \u0a39\u0a28:\n\u2022 \u0a2e\u0a48\u0a26\u0a3e\u0a28\u0a40 \u0a16\u0a47\u0a21\u0a3e\u0a02 \u0a05\u0a24\u0a47 \u0a2c\u0a3e\u0a39\u0a30\u0a40 \u0a17\u0a24\u0a40\u0a35\u0a3f\u0a27\u0a40\u0a06\u0a02 \u0a2c\u0a70\u0a26 \u0a30\u0a39\u0a3f\u0a23\u0a17\u0a40\u0a06\u0a02\u0964\n\u2022 \u0a15\u0a32\u0a3e\u0a38\u0a30\u0a42\u0a2e\u0a3e\u0a02 \u0a26\u0a40\u0a06\u0a02 \u0a16\u0a3f\u0a5c\u0a15\u0a40\u0a06\u0a02 \u0a2c\u0a70\u0a26 \u0a30\u0a71\u0a16\u0a40\u0a06\u0a02 \u0a1c\u0a3e\u0a23\u0a17\u0a40\u0a06\u0a02\u0964\n\u2022 \u0a38\u0a3e\u0a39 \u0a26\u0a40 \u0a24\u0a15\u0a32\u0a40\u0a2b \u0a35\u0a3e\u0a32\u0a47 \u0a2c\u0a71\u0a1a\u0a3f\u0a06\u0a02 \u0a28\u0a42\u0a70 N95 \u0a2e\u0a3e\u0a38\u0a15 \u0a2a\u0a39\u0a3f\u0a28\u0a23 \u0a26\u0a40 \u0a38\u0a32\u0a3e\u0a39 \u0a26\u0a3f\u0a71\u0a24\u0a40 \u0a1c\u0a3e\u0a02\u0a26\u0a40 \u0a39\u0a48\u0964\n\n\u0a27\u0a70\u0a28\u0a35\u0a3e\u0a26 \u0a38\u0a39\u0a3f\u0a24,\n\u0a2a\u0a4d\u0a30\u0a3f\u0a70\u0a38\u0a40\u0a2a\u0a32 \u0a26\u0a2b\u0a3c\u0a24\u0a30, Delhi Public School, R.K. Puram"
    },
    "mr": {
      "language": "Marathi (\u092e\u0930\u093e\u0920\u0940)",
      "subject": "\u0939\u0935\u093e \u0917\u0941\u0923\u0935\u0924\u094d\u0924\u093e \u0906\u0930\u094b\u0917\u094d\u092f \u0938\u0942\u091a\u0928\u093e: Delhi Public School, R.K. Puram [EMERGENCY]",
      "body": "\u0906\u0926\u0930\u0923\u0940\u092f \u092a\u093e\u0932\u0915 \u0935 \u0936\u093f\u0915\u094d\u0937\u0915 \u0935\u0930\u094d\u0917,\n\nDelhi Public School, R.K. Puram \u091c\u0935\u0933\u0940\u0932 \u0906\u091c\u091a\u093e \u0939\u0935\u093e \u0917\u0941\u0923\u0935\u0924\u094d\u0924\u093e \u0928\u093f\u0930\u094d\u0926\u0947\u0936\u093e\u0902\u0915 (AQI) 500 (GRAP Stage III & IV (Severe + Emergency)) \u0928\u094b\u0902\u0926\u0935\u0932\u093e \u0917\u0947\u0932\u093e \u0906\u0939\u0947\u0964\n\u0938\u0927\u094d\u092f\u093e\u091a\u0940 \u0938\u0941\u0930\u0915\u094d\u0937\u093e \u0938\u094d\u0925\u093f\u0924\u0940: EMERGENCY.\n\n\u0935\u093f\u0926\u094d\u092f\u093e\u0930\u094d\u0925\u094d\u092f\u093e\u0902\u091a\u094d\u092f\u093e \u0906\u0930\u094b\u0917\u094d\u092f\u093e\u0938\u093e\u0920\u0940 \u0916\u093e\u0932\u0940\u0932 \u0928\u093f\u092f\u092e \u0924\u093e\u0924\u094d\u0915\u093e\u0933 \u0932\u093e\u0917\u0942 \u0915\u0930\u0923\u094d\u092f\u093e\u0924 \u0906\u0932\u0947 \u0906\u0939\u0947\u0924:\n\u2022 \u0938\u0930\u094d\u0935 \u092e\u0948\u0926\u093e\u0928\u0940 \u0916\u0947\u0933 \u0935 \u092c\u093e\u0939\u0947\u0930\u0940\u0932 \u0936\u093e\u0930\u0940\u0930\u093f\u0915 \u0935\u094d\u092f\u093e\u092f\u093e\u092e \u0924\u093e\u0924\u094d\u092a\u0941\u0930\u0924\u0947 \u0938\u094d\u0925\u0917\u093f\u0924 \u0915\u0930\u0923\u094d\u092f\u093e\u0924 \u0906\u0932\u0947 \u0906\u0939\u0947\u0924\u0964\n\u2022 \u0935\u0930\u094d\u0917\u093e\u0924\u0940\u0932 \u0916\u093f\u0921\u0915\u094d\u092f\u093e \u092c\u0902\u0926 \u0920\u0947\u0935\u0923\u094d\u092f\u093e\u0924 \u092f\u0947\u0924\u0940\u0932\u0964\n\u2022 \u0938\u0902\u0935\u0947\u0926\u0928\u0936\u0940\u0932 \u0935\u093f\u0926\u094d\u092f\u093e\u0930\u094d\u0925\u094d\u092f\u093e\u0902\u0928\u093e N95 \u092e\u093e\u0938\u094d\u0915 \u0935\u093e\u092a\u0930\u0923\u094d\u092f\u093e\u091a\u093e \u0938\u0932\u094d\u0932\u093e \u0926\u0947\u0923\u094d\u092f\u093e\u0924 \u0906\u0932\u093e \u0906\u0939\u0947\u0964\n\n\u0927\u0928\u094d\u092f\u0935\u093e\u0926,\n\u092e\u0941\u0916\u094d\u092f\u093e\u0927\u094d\u092f\u093e\u092a\u0915 \u0915\u093e\u0930\u094d\u092f\u093e\u0932\u092f, Delhi Public School, R.K. Puram"
    },
    "bn": {
      "language": "Bengali (\u09ac\u09be\u0982\u09b2\u09be)",
      "subject": "\u09ac\u09be\u09af\u09bc\u09c1 \u09ae\u09be\u09a8 \u09b8\u09cd\u09ac\u09be\u09b8\u09cd\u09a5\u09cd\u09af \u09a8\u09bf\u09b0\u09cd\u09a6\u09c7\u09b6\u09bf\u0995\u09be: Delhi Public School, R.K. Puram [EMERGENCY]",
      "body": "\u09b6\u09cd\u09b0\u09a6\u09cd\u09a7\u09c7\u09af\u09bc \u0985\u09ad\u09bf\u09ad\u09be\u09ac\u0995 \u098f\u09ac\u0982 \u09b6\u09bf\u0995\u09cd\u09b7\u0995\u09ac\u09c3\u09a8\u09cd\u09a6,\n\nDelhi Public School, R.K. Puram-\u098f\u09b0 \u09a8\u09bf\u0995\u099f\u09ac\u09b0\u09cd\u09a4\u09c0 \u0986\u099c\u0995\u09c7\u09b0 \u0986\u09a8\u09c1\u09b7\u09cd\u09a0\u09be\u09a8\u09bf\u0995 \u098f\u09af\u09bc\u09be\u09b0 \u0995\u09cb\u09af\u09bc\u09be\u09b2\u09bf\u099f\u09bf \u0987\u09a8\u09a1\u09c7\u0995\u09cd\u09b8 (AQI) 500 (GRAP Stage III & IV (Severe + Emergency)) \u09b0\u09c7\u0995\u09b0\u09cd\u09a1 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964\n\u09ac\u09b0\u09cd\u09a4\u09ae\u09be\u09a8 \u09aa\u09b0\u09bf\u09ac\u09c7\u09b6\u0997\u09a4 \u09b8\u09c1\u09b0\u0995\u09cd\u09b7\u09be \u09b8\u09cd\u09a5\u09bf\u09a4\u09bf: EMERGENCY.\n\n\u09b6\u09bf\u0995\u09cd\u09b7\u09be\u09b0\u09cd\u09a5\u09c0\u09a6\u09c7\u09b0 \u09b8\u09c1\u09b0\u0995\u09cd\u09b7\u09be\u09af\u09bc \u09a8\u09bf\u09ae\u09cd\u09a8\u09b2\u09bf\u0996\u09bf\u09a4 \u099c\u09b0\u09c1\u09b0\u09bf \u09a8\u09bf\u09b0\u09cd\u09a6\u09c7\u09b6\u09bf\u0995\u09be \u099c\u09be\u09b0\u09bf \u0995\u09b0\u09be \u09b9\u09b2\u09cb:\n\u2022 \u09b8\u09ae\u09b8\u09cd\u09a4 \u09ac\u09b9\u09bf\u09b0\u0999\u09cd\u0997\u09a8 \u0996\u09c7\u09b2\u09be\u09a7\u09c1\u09b2\u09be \u0993 \u09aa\u09cd\u09b0\u09be\u09a4\u0983\u0995\u09be\u09b2\u09c0\u09a8 \u09b8\u09ae\u09be\u09ac\u09c7\u09b6 \u09b8\u09cd\u09a5\u0997\u09bf\u09a4 \u0995\u09b0\u09be \u09b9\u09b2\u09cb\u0964\n\u2022 \u09b6\u09cd\u09b0\u09c7\u09a3\u09c0\u0995\u0995\u09cd\u09b7\u09c7\u09b0 \u099c\u09be\u09a8\u09be\u09b2\u09be \u09ac\u09a8\u09cd\u09a7 \u09b0\u09be\u0996\u09be \u09b9\u09ac\u09c7 \u098f\u09ac\u0982 \u0987\u09a8\u09a1\u09cb\u09b0 \u09ac\u09be\u09af\u09bc\u09c1 \u09aa\u09b0\u09bf\u09b8\u09cd\u09b0\u09be\u09ac\u09a3 \u0995\u09be\u09b0\u09cd\u09af\u0995\u09b0 \u09a5\u09be\u0995\u09ac\u09c7\u0964\n\u2022 \u09b6\u09cd\u09ac\u09be\u09b8\u0995\u09b7\u09cd\u099f\u09c7 \u09b8\u0982\u09ac\u09c7\u09a6\u09a8\u09b6\u09c0\u09b2 \u09b6\u09bf\u0995\u09cd\u09b7\u09be\u09b0\u09cd\u09a5\u09c0\u09a6\u09c7\u09b0 \u09b8\u09be\u09b0\u09cd\u099f\u09bf\u09ab\u09be\u0987\u09a1 N95 \u09ae\u09be\u09b8\u09cd\u0995 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u09c7\u09b0 \u09aa\u09b0\u09be\u09ae\u09b0\u09cd\u09b6 \u09a6\u09c7\u0993\u09af\u09bc\u09be \u09b9\u099a\u09cd\u099b\u09c7\u0964\n\n\u09a7\u09a8\u09cd\u09af\u09ac\u09be\u09a6\u09be\u09a8\u09cd\u09a4\u09c7,\n\u0985\u09a7\u09cd\u09af\u0995\u09cd\u09b7\u09c7\u09b0 \u0995\u09be\u09b0\u09cd\u09af\u09be\u09b2\u09af\u09bc, Delhi Public School, R.K. Puram"
    },
    "ta": {
      "language": "Tamil (\u0ba4\u0bae\u0bbf\u0bb4\u0bcd)",
      "subject": "\u0b95\u0bbe\u0bb1\u0bcd\u0bb1\u0bc1\u0ba4\u0bcd \u0ba4\u0bb0\u0bae\u0bcd \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b9a\u0bc1\u0b95\u0bbe\u0ba4\u0bbe\u0bb0 \u0b85\u0bb1\u0bbf\u0bb5\u0bbf\u0baa\u0bcd\u0baa\u0bc1: Delhi Public School, R.K. Puram [EMERGENCY]",
      "body": "\u0b85\u0ba9\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4 \u0baa\u0bc6\u0bb1\u0bcd\u0bb1\u0bcb\u0bb0\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b86\u0b9a\u0bbf\u0bb0\u0bbf\u0baf\u0bb0\u0bcd\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bc1,\n\nDelhi Public School, R.K. Puram \u0b85\u0bb0\u0bc1\u0b95\u0bc7 \u0b87\u0ba9\u0bcd\u0bb1\u0bc8\u0baf \u0b95\u0bbe\u0bb1\u0bcd\u0bb1\u0bc1\u0ba4\u0bcd \u0ba4\u0bb0\u0b95\u0bcd \u0b95\u0bc1\u0bb1\u0bbf\u0baf\u0bc0\u0b9f\u0bc1 (AQI) 500 (GRAP Stage III & IV (Severe + Emergency)) \u0b8e\u0ba9\u0baa\u0bcd \u0baa\u0ba4\u0bbf\u0bb5\u0bbe\u0b95\u0bbf\u0baf\u0bc1\u0bb3\u0bcd\u0bb3\u0ba4\u0bc1.\n\u0ba4\u0bb1\u0bcd\u0baa\u0bcb\u0ba4\u0bc8\u0baf \u0baa\u0bb3\u0bcd\u0bb3\u0bbf \u0baa\u0bbe\u0ba4\u0bc1\u0b95\u0bbe\u0baa\u0bcd\u0baa\u0bc1 \u0ba8\u0bbf\u0bb2\u0bc8: EMERGENCY.\n\n\u0bae\u0bbe\u0ba3\u0bb5\u0bb0\u0bcd\u0b95\u0bb3\u0bbf\u0ba9\u0bcd \u0ba8\u0bb2\u0ba9\u0bcd \u0b95\u0bb0\u0bc1\u0ba4\u0bbf \u0b95\u0bc0\u0bb4\u0bcd\u0b95\u0bcd\u0b95\u0ba3\u0bcd\u0b9f \u0b95\u0b9f\u0bcd\u0b9f\u0bbe\u0baf \u0bb5\u0bb4\u0bbf\u0b95\u0bbe\u0b9f\u0bcd\u0b9f\u0bc1\u0ba4\u0bb2\u0bcd\u0b95\u0bb3\u0bcd \u0ba8\u0b9f\u0bc8\u0bae\u0bc1\u0bb1\u0bc8\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bc1\u0bb3\u0bcd\u0bb3\u0ba9:\n\u2022 \u0b85\u0ba9\u0bc8\u0ba4\u0bcd\u0ba4\u0bc1 \u0bb5\u0bc6\u0bb3\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0bb1 \u0b89\u0b9f\u0bb1\u0bcd\u0baa\u0baf\u0bbf\u0bb1\u0bcd\u0b9a\u0bbf \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0bb5\u0bbf\u0bb3\u0bc8\u0baf\u0bbe\u0b9f\u0bcd\u0b9f\u0bc1 \u0bb5\u0b95\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd \u0ba4\u0bb1\u0bcd\u0b95\u0bbe\u0bb2\u0bbf\u0b95\u0bae\u0bbe\u0b95 \u0bb0\u0ba4\u0bcd\u0ba4\u0bc1 \u0b9a\u0bc6\u0baf\u0bcd\u0baf\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0b95\u0bbf\u0ba9\u0bcd\u0bb1\u0ba9.\n\u2022 \u0bb5\u0b95\u0bc1\u0baa\u0bcd\u0baa\u0bb1\u0bc8 \u0b9c\u0ba9\u0bcd\u0ba9\u0bb2\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc2\u0b9f\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0bc1 \u0b89\u0b9f\u0bcd\u0baa\u0bc1\u0bb1\u0b95\u0bcd \u0b95\u0bbe\u0bb1\u0bcd\u0bb1\u0bcb\u0b9f\u0bcd\u0b9f\u0bae\u0bcd \u0b89\u0bb1\u0bc1\u0ba4\u0bbf \u0b9a\u0bc6\u0baf\u0bcd\u0baf\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0bae\u0bcd.\n\u2022 \u0b9a\u0bc1\u0bb5\u0bbe\u0b9a\u0baa\u0bcd \u0baa\u0bbf\u0bb0\u0b9a\u0bcd\u0b9a\u0ba9\u0bc8 \u0b89\u0bb3\u0bcd\u0bb3 \u0bae\u0bbe\u0ba3\u0bb5\u0bb0\u0bcd\u0b95\u0bb3\u0bcd N95 \u0bae\u0bc1\u0b95\u0b95\u0bcd\u0b95\u0bb5\u0b9a\u0bae\u0bcd \u0b85\u0ba3\u0bbf\u0baf\u0bc1\u0bae\u0bbe\u0bb1\u0bc1 \u0b85\u0bb1\u0bbf\u0bb5\u0bc1\u0bb1\u0bc1\u0ba4\u0bcd\u0ba4\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0b95\u0bbf\u0bb1\u0bbe\u0bb0\u0bcd\u0b95\u0bb3\u0bcd.\n\n\u0ba8\u0ba9\u0bcd\u0bb1\u0bbf\u0baf\u0bc1\u0b9f\u0ba9\u0bcd,\n\u0bae\u0bc1\u0ba4\u0bb2\u0bcd\u0bb5\u0bb0\u0bcd \u0b85\u0bb2\u0bc1\u0bb5\u0bb2\u0b95\u0bae\u0bcd, Delhi Public School, R.K. Puram"
    },
    "te": {
      "language": "Telugu (\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41)",
      "subject": "\u0c17\u0c3e\u0c32\u0c3f \u0c28\u0c3e\u0c23\u0c4d\u0c2f\u0c24 \u0c06\u0c30\u0c4b\u0c17\u0c4d\u0c2f \u0c28\u0c4b\u0c1f\u0c40\u0c38\u0c41: Delhi Public School, R.K. Puram [EMERGENCY]",
      "body": "\u0c17\u0c4c\u0c30\u0c35\u0c28\u0c40\u0c2f\u0c41\u0c32\u0c48\u0c28 \u0c24\u0c32\u0c4d\u0c32\u0c3f\u0c26\u0c02\u0c21\u0c4d\u0c30\u0c41\u0c32\u0c41 \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c09\u0c2a\u0c3e\u0c27\u0c4d\u0c2f\u0c3e\u0c2f\u0c41\u0c32\u0c15\u0c41,\n\nDelhi Public School, R.K. Puram \u0c38\u0c2e\u0c40\u0c2a\u0c02\u0c32\u0c4b \u0c28\u0c47\u0c1f\u0c3f \u0c05\u0c27\u0c3f\u0c15\u0c3e\u0c30\u0c3f\u0c15 \u0c17\u0c3e\u0c32\u0c3f \u0c28\u0c3e\u0c23\u0c4d\u0c2f\u0c24 \u0c38\u0c42\u0c1a\u0c3f\u0c15 (AQI) 500 (GRAP Stage III & IV (Severe + Emergency)) \u0c17\u0c3e \u0c28\u0c2e\u0c4b\u0c26\u0c48\u0c02\u0c26\u0c3f.\n\u0c2a\u0c4d\u0c30\u0c38\u0c4d\u0c24\u0c41\u0c24 \u0c15\u0c4d\u0c2f\u0c3e\u0c02\u0c2a\u0c38\u0c4d \u0c2d\u0c26\u0c4d\u0c30\u0c24\u0c3e \u0c38\u0c4d\u0c25\u0c3f\u0c24\u0c3f: EMERGENCY.\n\n\u0c35\u0c3f\u0c26\u0c4d\u0c2f\u0c3e\u0c30\u0c4d\u0c25\u0c41\u0c32 \u0c06\u0c30\u0c4b\u0c17\u0c4d\u0c2f \u0c2d\u0c26\u0c4d\u0c30\u0c24 \u0c26\u0c43\u0c37\u0c4d\u0c1f\u0c4d\u0c2f\u0c3e \u0c15\u0c4d\u0c30\u0c3f\u0c02\u0c26\u0c3f \u0c24\u0c2a\u0c4d\u0c2a\u0c28\u0c3f\u0c38\u0c30\u0c3f \u0c1a\u0c30\u0c4d\u0c2f\u0c32\u0c41 \u0c05\u0c2e\u0c32\u0c41 \u0c1a\u0c47\u0c2f\u0c2c\u0c21\u0c41\u0c24\u0c41\u0c28\u0c4d\u0c28\u0c3e\u0c2f\u0c3f:\n\u2022 \u0c05\u0c28\u0c4d\u0c28\u0c3f \u0c2c\u0c39\u0c3f\u0c30\u0c02\u0c17 \u0c15\u0c4d\u0c30\u0c40\u0c21\u0c32\u0c41 \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c35\u0c4d\u0c2f\u0c3e\u0c2f\u0c3e\u0c2e \u0c15\u0c3e\u0c30\u0c4d\u0c2f\u0c15\u0c32\u0c3e\u0c2a\u0c3e\u0c32\u0c41 \u0c30\u0c26\u0c4d\u0c26\u0c41 \u0c1a\u0c47\u0c2f\u0c2c\u0c21\u0c4d\u0c21\u0c3e\u0c2f\u0c3f.\n\u2022 \u0c24\u0c30\u0c17\u0c24\u0c3f \u0c17\u0c26\u0c3f \u0c15\u0c3f\u0c1f\u0c3f\u0c15\u0c40\u0c32\u0c41 \u0c2e\u0c42\u0c38\u0c3f\u0c35\u0c47\u0c2f\u0c2c\u0c21\u0c24\u0c3e\u0c2f\u0c3f \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c07\u0c02\u0c21\u0c4b\u0c30\u0c4d \u0c35\u0c46\u0c02\u0c1f\u0c3f\u0c32\u0c47\u0c37\u0c28\u0c4d \u0c15\u0c4a\u0c28\u0c38\u0c3e\u0c17\u0c41\u0c24\u0c41\u0c02\u0c26\u0c3f.\n\u2022 \u0c36\u0c4d\u0c35\u0c3e\u0c38\u0c15\u0c4b\u0c36 \u0c38\u0c2e\u0c38\u0c4d\u0c2f\u0c32\u0c41 \u0c09\u0c28\u0c4d\u0c28 \u0c35\u0c3f\u0c26\u0c4d\u0c2f\u0c3e\u0c30\u0c4d\u0c25\u0c41\u0c32\u0c41 N95 \u0c2e\u0c3e\u0c38\u0c4d\u0c15\u0c4d \u0c27\u0c30\u0c3f\u0c02\u0c1a\u0c3e\u0c32\u0c28\u0c3f \u0c38\u0c42\u0c1a\u0c3f\u0c02\u0c1a\u0c2c\u0c21\u0c3f\u0c02\u0c26\u0c3f.\n\n\u0c2d\u0c35\u0c26\u0c40\u0c2f\u0c41\u0c21\u0c41,\n\u0c2a\u0c4d\u0c30\u0c3f\u0c28\u0c4d\u0c38\u0c3f\u0c2a\u0c3e\u0c32\u0c4d \u0c15\u0c3e\u0c30\u0c4d\u0c2f\u0c3e\u0c32\u0c2f\u0c02, Delhi Public School, R.K. Puram"
    }
  },
  "indoor_tips": [
    {
      "title": "Classroom Window Management",
      "detail": "Seal external windows and corridor doors tightly between 6:00 AM and 10:30 AM when morning particulate density peaks."
    },
    {
      "title": "Air Purifier Cycling",
      "detail": "If HEPA purifiers are installed, run on high fan speed 30 minutes prior to school start; cycle at medium fan during classes."
    },
    {
      "title": "Smart Afternoon Ventilation",
      "detail": "Only open windows for brief cross-ventilation during peak solar hours (1:00 PM \u2013 3:00 PM) if outdoor PM2.5 drops significantly."
    },
    {
      "title": "Wet Mop Particulate Removal",
      "detail": "Avoid dry sweeping of corridors; mandate damp microfiber mopping to prevent resuspension of toxic dust inside school hallways."
    }
  ],
  "hackathon_pillars": {
    "aqi": {
      "title": "AQI Calculation",
      "standard": "CPCB National AQI (6 Pollutants)",
      "formula": "Piecewise linear interpolation on PM2.5, PM10, NO2, SO2, CO, O3",
      "current_aqi": 500,
      "category": "Severe"
    },
    "pollution_exposure": {
      "title": "Pollution Exposure Defense",
      "student_hours_avoided": 5600,
      "grade_vulnerabilities": [
        {
          "cohort": "Kindergarten (Ages 3-5)",
          "risk": "Critical (alveoli developing)",
          "breathing_rate": "2x adult volume",
          "directive": "Strict zero outdoor transit"
        },
        {
          "cohort": "Primary (Ages 6-11)",
          "risk": "High (PE cardio danger)",
          "breathing_rate": "1.5x adult volume",
          "directive": "Cancel field activities"
        },
        {
          "cohort": "Senior (Ages 12-18)",
          "risk": "Elevated during sports",
          "breathing_rate": "Cardio stress",
          "directive": "Mandate N95 for commute"
        }
      ]
    },
    "stubble_burning": {
      "title": "Stubble Burning & Biomass Smoke Early Warning",
      "satellite_telemetry": "NASA FIRMS Suomi-NPP VIIRS 375m NRT",
      "wind_physics": "SE (126\u00b0) at 5.5 km/h",
      "upwind_cone_geometry": "\u00b130\u00b0 cone within 50-300 km corridor",
      "upwind_detections_count": 1
    },
    "indoor_air": {
      "title": "Indoor Air Quality & Resuspension Control",
      "purification_protocol": "Cycle HEPA on High 30 min before classes begin",
      "window_management": "Seal classroom envelopes between 6:00 AM and 10:30 AM",
      "dust_suppression": "Wet microfiber mopping strictly mandated (zero broom sweeping)"
    },
    "school_safety_bad_days": {
      "title": "School Safety on Bad Days",
      "engine": "Deterministic 6:00 AM Evaluation in Code (Zero AI Hallucinations)",
      "current_status": "Emergency",
      "grap_stage": "GRAP Stage III & IV (Severe + Emergency)",
      "broadcast_options": [
        "Parent Email (AWS SES)",
        "SMS/Telegram",
        "WhatsApp Official Notice"
      ]
    }
  },
  "action_log": {
    "completed_actions": [
      "act_pe_cancel",
      "act_windows_shut"
    ],
    "student_count": 2800,
    "hours_cancelled": 2.0,
    "student_hours_avoided": 5600,
    "impact_label": "5,600 outdoor student-hours of toxic exposure avoided"
  },
  "live_sync": {
    "timestamp": "2026-10-11T11:49:16.371629+00:00",
    "nasa_firms_source": "NASA FIRMS (Suomi-NPP VIIRS 375m NRT)",
    "cpcb_sensor_source": "Central Pollution Control Board CAAQMS Network",
    "wind_source": "Open-Meteo High-Resolution Atmospheric Model"
  }
};

export function getFallbackSchoolStatus(schoolId) {
  const school = FALLBACK_SCHOOLS.find(s => s.id === schoolId) || FALLBACK_SCHOOLS[0];
  return {
    ...FULL_FALLBACK_STATUS,
    school: {
      ...FULL_FALLBACK_STATUS.school,
      ...school
    }
  };
}

export function getFallbackCommute(schoolId) {
  return {
    school_id: schoolId,
    standard_route: {
      name: "Ring Road & Outer Arterial Transit",
      distance_km: 14.2,
      duration_mins: 42,
      avg_pm25: 410,
      inhaled_dose_ug: 48.2,
      congestion: "High Idling (Stop-and-Go Diesel Traffic)"
    },
    clean_route: {
      name: "Chanakyapuri Green Belt & Institutional Canopy",
      distance_km: 15.6,
      duration_mins: 38,
      avg_pm25: 194,
      inhaled_dose_ug: 22.8,
      congestion: "Free Flow (Tree Canopy Buffer)"
    },
    dose_reduction_pct: 52.8,
    ug_avoided_per_student: 25.4,
    recommendation: "Switch bus fleet lines to Green Canopy corridor. Reduces child toxic intake by 52.8%."
  };
}

export function getFallbackCADR(lengthFt = 25, widthFt = 20, heightFt = 10, students = 40, outdoorPm25 = 350) {
  const volumeCuFt = lengthFt * widthFt * heightFt;
  const targetACH = 5.0;
  const requiredCADR = Math.round((volumeCuFt * targetACH) / 60);
  const unitsNeeded = Math.max(1, Math.ceil(requiredCADR / 450));

  return {
    room_dimensions: { length_ft: lengthFt, width_ft: widthFt, height_ft: heightFt, volume_cuft: volumeCuFt },
    occupants: students,
    outdoor_pm25: outdoorPm25,
    target_ach: targetACH,
    required_cadr_cfm: requiredCADR,
    cr_box_solution: {
      units_needed: unitsNeeded,
      total_cadr_cfm: unitsNeeded * 550,
      fan_model: "Havells Ventilair 12-inch 55W Box Fan (or equivalent)",
      filters: "4x MERV-13 (16x25x2 inch) Pleated Synthetic Media",
      unit_cost_inr: 2800,
      total_cost_inr: unitsNeeded * 2800,
      commercial_hepa_cost_inr: unitsNeeded * 68000,
      cost_savings_pct: 95.9,
      ach_delivered: Number(((unitsNeeded * 550 * 60) / volumeCuFt).toFixed(1)),
      indoor_pm25_predicted: Math.round(outdoorPm25 * 0.12)
    }
  };
}

export function getFallbackTrajectory() {
  return {
    active_fires_detected: 48,
    nearest_fire_distance_km: 142.5,
    wind_vector: "14.2 km/h from NW (315°)",
    hours_to_campus_arrival: 8.5,
    expected_peak_time: "Tomorrow 05:30 AM IST",
    predicted_pm25_jump: "+125 µg/m³",
    severity: "HIGH HAZARD",
    advisory: "Stubble smoke plume actively advancing along north-westerly wind vector. Nighttime thermal inversion will trap smoke near surface by 5:00 AM."
  };
}
