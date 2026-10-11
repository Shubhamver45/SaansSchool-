import React from 'react';
import { 
  Heart, Baby, Activity, School, 
  Wind, Shield, Sun, Home, AlertCircle, CheckCircle2 
} from 'lucide-react';
import './HealthAdviceGrid.css';

export function HealthAdviceGrid({ aqi = 50, category = 'Good', city = 'Location' }) {
  const getActionBadges = (val) => {
    if (val <= 50) {
      return {
        mask: { label: 'No Mask Needed', status: 'safe', icon: CheckCircle2 },
        purifier: { label: 'Eco / Optional', status: 'safe', icon: Home },
        windows: { label: 'Open Windows Freely', status: 'safe', icon: Wind },
        outdoor: { label: 'Safe for All Sports', status: 'safe', icon: Sun },
      };
    } else if (val <= 100) {
      return {
        mask: { label: 'Optional for Sensitive', status: 'warning', icon: Shield },
        purifier: { label: 'Auto Mode Indoors', status: 'warning', icon: Home },
        windows: { label: 'Ventilate Midday', status: 'safe', icon: Wind },
        outdoor: { label: 'Good for Exercise', status: 'safe', icon: Sun },
      };
    } else if (val <= 150) {
      return {
        mask: { label: 'N95 for Sensitive Groups', status: 'warning', icon: Shield },
        purifier: { label: 'HEPA Medium Setting', status: 'warning', icon: Home },
        windows: { label: 'Close During Peak Traffic', status: 'warning', icon: Wind },
        outdoor: { label: 'Reduce Intense Workouts', status: 'warning', icon: AlertCircle },
      };
    } else if (val <= 200) {
      return {
        mask: { label: 'N95 Mandatory Outdoors', status: 'danger', icon: Shield },
        purifier: { label: 'Run Continuous High', status: 'danger', icon: Home },
        windows: { label: 'Keep Windows Closed', status: 'danger', icon: Wind },
        outdoor: { label: 'Move Workouts Indoors', status: 'danger', icon: AlertCircle },
      };
    } else if (val <= 300) {
      return {
        mask: { label: 'N99 / FFP3 Respirator', status: 'danger', icon: Shield },
        purifier: { label: 'Maximum HEPA Turbo', status: 'danger', icon: Home },
        windows: { label: 'Seal Gaps & Drafts', status: 'danger', icon: Wind },
        outdoor: { label: 'Halt Outdoor Sports/PE', status: 'danger', icon: AlertCircle },
      };
    } else {
      return {
        mask: { label: 'High-Grade Respirator Only', status: 'critical', icon: Shield },
        purifier: { label: 'Emergency Room Filtration', status: 'critical', icon: Home },
        windows: { label: 'Complete Shelter-in-Place', status: 'critical', icon: Wind },
        outdoor: { label: 'Strict Outdoor Ban', status: 'critical', icon: AlertCircle },
      };
    }
  };

  const badges = getActionBadges(aqi);

  const getPersonaAdvice = () => {
    if (aqi <= 50) {
      return [
        {
          role: 'General Public',
          icon: Activity,
          color: '#10b981',
          bg: '#ecfdf5',
          advice: 'Ideal air quality. Great day for morning jogs, cycling, and outdoor recreation.'
        },
        {
          role: 'Children & Elderly',
          icon: Baby,
          color: '#10b981',
          bg: '#ecfdf5',
          advice: 'Safe for playground activities, school sports, and extended park visits.'
        },
        {
          role: 'Asthma & Respiratory',
          icon: Heart,
          color: '#10b981',
          bg: '#ecfdf5',
          advice: 'Minimal risk of symptom flare-ups. Normal daily routine recommended.'
        },
        {
          role: 'Schools & Workplaces',
          icon: School,
          color: '#10b981',
          bg: '#ecfdf5',
          advice: 'All outdoor physical education and assemblies can proceed unrestricted.'
        }
      ];
    } else if (aqi <= 100) {
      return [
        {
          role: 'General Public',
          icon: Activity,
          color: '#f59e0b',
          bg: '#fffbeb',
          advice: 'Air is acceptable. Outdoor workouts and commutes can continue normally.'
        },
        {
          role: 'Children & Elderly',
          icon: Baby,
          color: '#f59e0b',
          bg: '#fffbeb',
          advice: 'Safe for outdoor playtime. Keep hydration up during warmer afternoons.'
        },
        {
          role: 'Asthma & Respiratory',
          icon: Heart,
          color: '#f59e0b',
          bg: '#fffbeb',
          advice: 'Carry prescribed rescue inhalers if sensitive to fine particulates or ozone.'
        },
        {
          role: 'Schools & Workplaces',
          icon: School,
          color: '#f59e0b',
          bg: '#fffbeb',
          advice: 'Normal school day schedule with standard ventilation in classrooms.'
        }
      ];
    } else if (aqi <= 150) {
      return [
        {
          role: 'General Public',
          icon: Activity,
          color: '#f97316',
          bg: '#fff7ed',
          advice: 'Consider shifting high-intensity cardio indoors; take breaks during outdoor runs.'
        },
        {
          role: 'Children & Elderly',
          icon: Baby,
          color: '#f97316',
          bg: '#fff7ed',
          advice: 'Limit prolonged outdoor playground time, especially near busy roads.'
        },
        {
          role: 'Asthma & Respiratory',
          icon: Heart,
          color: '#f97316',
          bg: '#fff7ed',
          advice: 'Elevated risk of coughing and wheezing. Run HEPA air purifier in bedroom.'
        },
        {
          role: 'Schools & Workplaces',
          icon: School,
          color: '#f97316',
          bg: '#fff7ed',
          advice: 'Allow sensitive students to remain indoors during peak recess hours.'
        }
      ];
    } else if (aqi <= 200) {
      return [
        {
          role: 'General Public',
          icon: Activity,
          color: '#ef4444',
          bg: '#fef2f2',
          advice: 'Wear an N95 mask outdoors. Avoid morning runs during peak winter inversion.'
        },
        {
          role: 'Children & Elderly',
          icon: Baby,
          color: '#ef4444',
          bg: '#fef2f2',
          advice: 'Avoid outdoor exercise. Keep children indoors with filtered ventilation.'
        },
        {
          role: 'Asthma & Respiratory',
          icon: Heart,
          color: '#ef4444',
          bg: '#fef2f2',
          advice: 'High risk of acute attacks. Keep emergency medication ready; stay indoors.'
        },
        {
          role: 'Schools & Workplaces',
          icon: School,
          color: '#ef4444',
          bg: '#fef2f2',
          advice: 'Cancel outdoor sports and PE; enforce indoor breaks with closed doors.'
        }
      ];
    } else {
      return [
        {
          role: 'General Public',
          icon: Activity,
          color: '#be123c',
          bg: '#fff1f2',
          advice: 'Hazardous health emergency. Do not go outdoors. Seal windows and doors.'
        },
        {
          role: 'Children & Elderly',
          icon: Baby,
          color: '#be123c',
          bg: '#fff1f2',
          advice: 'Zero outdoor exposure. Use sealed clean-air rooms with multi-stage HEPA.'
        },
        {
          role: 'Asthma & Respiratory',
          icon: Heart,
          color: '#be123c',
          bg: '#fff1f2',
          advice: 'Consult physician immediately if experiencing chest tightness or distress.'
        },
        {
          role: 'Schools & Workplaces',
          icon: School,
          color: '#be123c',
          bg: '#fff1f2',
          advice: 'Mandatory school closures / shift to online classes under emergency protocols.'
        }
      ];
    }
  };

  const personas = getPersonaAdvice();

  return (
    <div className="health-advice-container">
      {/* Quick Action Badges Bar */}
      <div className="action-badges-bar">
        <div className={`action-badge-item badge-${badges.mask.status}`}>
          <Shield size={16} />
          <div>
            <span className="action-lbl">Mask Protection</span>
            <span className="action-val">{badges.mask.label}</span>
          </div>
        </div>

        <div className={`action-badge-item badge-${badges.purifier.status}`}>
          <Home size={16} />
          <div>
            <span className="action-lbl">Air Purifier</span>
            <span className="action-val">{badges.purifier.label}</span>
          </div>
        </div>

        <div className={`action-badge-item badge-${badges.windows.status}`}>
          <Wind size={16} />
          <div>
            <span className="action-lbl">Window Ventilation</span>
            <span className="action-val">{badges.windows.label}</span>
          </div>
        </div>

        <div className={`action-badge-item badge-${badges.outdoor.status}`}>
          <Sun size={16} />
          <div>
            <span className="action-lbl">Outdoor Exercise</span>
            <span className="action-val">{badges.outdoor.label}</span>
          </div>
        </div>
      </div>

      {/* 4 Persona Cards */}
      <div className="persona-grid">
        {personas.map((p, i) => {
          const IconComp = p.icon;
          return (
            <div key={i} className="persona-card glass-card">
              <div className="persona-card-header">
                <div 
                  className="persona-icon-box"
                  style={{ backgroundColor: p.bg, color: p.color }}
                >
                  <IconComp size={18} />
                </div>
                <h4 className="persona-role">{p.role}</h4>
              </div>
              <p className="persona-text">{p.advice}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
