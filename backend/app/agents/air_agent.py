"""
AirWatch AI Agent — powered by AWS Bedrock & AWS Strands Agents SDK.
Analyzes AQI conditions and generates intelligent health & policy recommendations.
Supports:
1. AWS Bedrock Runtime (Claude / Titan / Nova) using boto3
2. AWS Strands Agents SDK
3. High-precision rule-based environmental health advisor fallback
"""
from typing import List, Optional, Dict, Any
import os
import json
import re

from app.models.aqi import AIRecommendation

AWS_REGION = os.getenv("AWS_DEFAULT_REGION", os.getenv("AWS_REGION", "us-east-1"))
AWS_BEDROCK_MODEL_ID = os.getenv("AWS_BEDROCK_MODEL_ID", "anthropic.claude-3-haiku-20240307-v1:0")

# Check if AWS credentials exist
HAS_AWS_CREDENTIALS = bool(os.getenv("AWS_ACCESS_KEY_ID") and os.getenv("AWS_SECRET_ACCESS_KEY"))

# Try importing Boto3
try:
    import boto3
    BOTO3_AVAILABLE = True
except ImportError:
    BOTO3_AVAILABLE = False

# Try importing Strands SDK
try:
    from strands import Agent, tool
    STRANDS_AVAILABLE = True
except ImportError:
    STRANDS_AVAILABLE = False


def _rule_based_recommendations(city: str, aqi: int, category: str, pollutants: dict) -> AIRecommendation:
    """Fallback rule-based recommendations adhering to WHO and CPCB protocols."""
    dominant = max(pollutants, key=pollutants.get) if pollutants else "PM2.5"

    analysis_parts = [
        f"Air quality in {city} is measured at AQI {aqi} ({category}).",
        f"The primary driver is {dominant} at {pollutants.get(dominant, 0)} µg/m³.",
    ]

    if aqi <= 50:
        analysis_parts.append("Air quality poses minimal or zero health risk.")
        recommendations = [
            "Ideal conditions for all outdoor sports, running, and physical training.",
            "Open residential windows freely to refresh indoor air.",
            "No personal protective equipment (PPE) or air purifiers required.",
        ]
        policy_actions = ["Maintain standard vehicular and industrial emission surveillance."]
    elif aqi <= 100:
        analysis_parts.append("Air quality is acceptable for the general population.")
        recommendations = [
            "Unusually sensitive individuals with respiratory allergies should monitor outdoor exertion.",
            "Keep hydration levels optimal during midday outdoor activities.",
            "Safe for standard school recess and outdoor exercise.",
        ]
        policy_actions = [
            "Conduct routine spot checks on commercial vehicle emission compliance.",
            "Maintain dust control sweeping on major municipal transit routes.",
        ]
    elif aqi <= 150:
        analysis_parts.append("Sensitive groups face heightened risk of respiratory irritation.")
        recommendations = [
            "Children, seniors, and asthma patients should limit prolonged outdoor cardio.",
            "Wear an N95 mask when commuting along heavy traffic corridors.",
            "Operate indoor HEPA air purifiers in bedrooms at night.",
            "Asthma patients should ensure quick-relief bronchodilator inhalers are on hand.",
        ]
        policy_actions = [
            "Issue public health advisory for vulnerable cohorts (schools and elderly care centers).",
            "Enforce strict mechanized dust suppression on arterial roads.",
            "Increase public metro and bus transit frequencies to reduce private automobile trips.",
        ]
    elif aqi <= 200:
        analysis_parts.append("General public is at risk of breathing discomfort and throat irritation.")
        recommendations = [
            "Everyone should avoid prolonged strenuous outdoor exercise; switch to indoor gyms.",
            "Certified N95 or KN95 mask is strongly recommended outdoors.",
            "Keep home windows and doors sealed during morning and evening rush hours.",
            "Run indoor HEPA air filtration units on High/Auto settings.",
        ]
        policy_actions = [
            "Trigger GRAP Stage II protocols: ban diesel generator sets (except essential services).",
            "Halt outdoor school physical education classes and sports tournaments.",
            "Deploy anti-smog water misting cannons at identified pollution hotspots.",
        ]
    elif aqi <= 300:
        analysis_parts.append("Very poor air quality: severe respiratory health warning for the entire community.")
        recommendations = [
            "Strictly avoid all non-essential outdoor travel and physical exertion.",
            "Wear a certified N99, FFP3, or P100 respirator if outdoor transit cannot be avoided.",
            "Seal window and door draft leaks with foam tape.",
            "Seek medical evaluation promptly for shortness of breath or persistent coughing.",
        ]
        policy_actions = [
            "Activate GRAP Stage III emergency protocols: halt non-essential construction and demolition activities.",
            "Impose restrictions on non-BS VI commercial diesel medium and heavy goods vehicles.",
            "Shift primary and middle schools to hybrid or remote online learning sessions.",
        ]
    else:
        analysis_parts.append("EMERGENCY AIR TOXICITY (GRAP Stage IV): life-threatening risk for all residents.")
        recommendations = [
            "Do NOT venture outdoors under any circumstances.",
            "Remain inside sealed clean-air rooms with continuous multi-stage HEPA filtration.",
            "Wear high-grade respiratory filtration even indoors if drafts penetrate living spaces.",
            "Call emergency medical support immediately for respiratory or cardiovascular distress.",
        ]
        policy_actions = [
            "Declare Public Health Disaster (GRAP Stage IV).",
            "Mandate complete shutdown of construction, brick kilns, and non-essential industrial plants.",
            "Implement mandatory odd-even vehicle rationing and emergency remote work for 50% of workforce.",
            "Deploy emergency mobile oxygen and medical response clinics across affected zones.",
        ]

    return AIRecommendation(
        city=city,
        aqi=aqi,
        analysis=" ".join(analysis_parts),
        recommendations=recommendations,
        policy_actions=policy_actions,
    )


async def _call_bedrock(city: str, aqi: int, category: str, pollutants: dict) -> Optional[AIRecommendation]:
    """Call AWS Bedrock Foundation Model via boto3."""
    if not BOTO3_AVAILABLE or not HAS_AWS_CREDENTIALS:
        return None

    try:
        client = boto3.client(
            service_name="bedrock-runtime",
            region_name=AWS_REGION,
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
        )

        prompt = (
            f"You are AirWatch AI, an environmental and respiratory health expert running on AWS.\n"
            f"Analyze the following real-time air quality readings:\n"
            f"- City: {city}\n"
            f"- AQI: {aqi} ({category})\n"
            f"- Pollutant Concentrations: {json.dumps(pollutants)}\n\n"
            f"Respond ONLY with a valid JSON object matching this schema:\n"
            f"{{\n"
            f'  "analysis": "2-3 concise sentences summarizing health impact",\n'
            f'  "recommendations": ["4 bullet points of actionable advice for residents"],\n'
            f'  "policy_actions": ["3 government / GRAP / school safety action steps"]\n'
            f"}}"
        )

        # Call Bedrock model
        if "claude" in AWS_BEDROCK_MODEL_ID.lower():
            body = json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 600,
                "temperature": 0.2,
                "messages": [{"role": "user", "content": prompt}]
            })
            resp = client.invoke_model(modelId=AWS_BEDROCK_MODEL_ID, body=body)
            response_body = json.loads(resp["body"].read().decode("utf-8"))
            content_text = response_body["content"][0]["text"]
        else:
            body = json.dumps({"inputText": prompt})
            resp = client.invoke_model(modelId=AWS_BEDROCK_MODEL_ID, body=body)
            response_body = json.loads(resp["body"].read().decode("utf-8"))
            content_text = response_body.get("results", [{}])[0].get("outputText", "")

        json_match = re.search(r'\{.*\}', content_text, re.DOTALL)
        if json_match:
            data = json.loads(json_match.group())
            return AIRecommendation(
                city=city,
                aqi=aqi,
                analysis=data.get("analysis", ""),
                recommendations=data.get("recommendations", []),
                policy_actions=data.get("policy_actions", []),
            )
    except Exception as e:
        print(f"AWS Bedrock invocation skipped/failed: {e}")

    return None


async def get_ai_recommendations(city: str, aqi: int, category: str, pollutants: dict) -> AIRecommendation:
    """
    Get AI-powered health recommendations using:
    1. AWS Bedrock Runtime
    2. AWS Strands Agents SDK
    3. CPCB / WHO verified rule engine
    """
    # 1. Try AWS Bedrock if credentials configured
    if HAS_AWS_CREDENTIALS:
        bedrock_res = await _call_bedrock(city, aqi, category, pollutants)
        if bedrock_res:
            return bedrock_res

    # 2. Try Strands SDK
    if STRANDS_AVAILABLE:
        try:
            agent = Agent(
                system_prompt="You are AirWatch AI. Analyze air quality data and output JSON with keys: analysis, recommendations, policy_actions."
            )
            prompt = f"City: {city}, AQI: {aqi} ({category}), Pollutants: {pollutants}"
            res = agent(prompt)
            json_match = re.search(r'\{.*\}', str(res), re.DOTALL)
            if json_match:
                data = json.loads(json_match.group())
                return AIRecommendation(
                    city=city, aqi=aqi,
                    analysis=data.get("analysis", ""),
                    recommendations=data.get("recommendations", []),
                    policy_actions=data.get("policy_actions", []),
                )
        except Exception:
            pass

    # 3. Fallback to expert rule engine
    return _rule_based_recommendations(city, aqi, category, pollutants)
