import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Clock, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import './TrendChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function TrendChart({ historyData, city }) {
  const [metric, setMetric] = useState('aqi'); // 'aqi' | 'pm2_5' | 'pm10' | 'o3'

  if (!historyData || !historyData.data || historyData.data.length === 0) {
    return (
      <div className="trend-chart-card glass-card empty-chart">
        <Clock className="spin text-muted" size={24} />
        <p>Loading real 48-hour hourly air quality satellite & sensor timeline...</p>
      </div>
    );
  }

  const rawData = historyData.data;

  // Format labels: hour format (e.g. 02:00, 08:00, 14:00)
  const labels = rawData.map((d) => {
    try {
      const dt = new Date(d.timestamp);
      return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch {
      return d.timestamp.slice(11, 16);
    }
  });

  const getMetricConfig = () => {
    switch (metric) {
      case 'pm2_5':
        return {
          label: 'PM2.5 Concentration (µg/m³)',
          data: rawData.map(d => d.pm2_5),
          color: '#ef4444',
          bgColor: 'rgba(239, 68, 68, 0.12)',
          unit: 'µg/m³'
        };
      case 'pm10':
        return {
          label: 'PM10 Concentration (µg/m³)',
          data: rawData.map(d => d.pm10),
          color: '#f97316',
          bgColor: 'rgba(249, 115, 22, 0.12)',
          unit: 'µg/m³'
        };
      case 'o3':
        return {
          label: 'Ozone O₃ (µg/m³)',
          data: rawData.map(d => d.o3),
          color: '#8b5cf6',
          bgColor: 'rgba(139, 92, 246, 0.12)',
          unit: 'µg/m³'
        };
      case 'aqi':
      default:
        return {
          label: 'US EPA AQI Index',
          data: rawData.map(d => d.aqi),
          color: '#2563eb',
          bgColor: 'rgba(37, 99, 235, 0.12)',
          unit: 'AQI'
        };
    }
  };

  const config = getMetricConfig();

  const chartData = {
    labels,
    datasets: [
      {
        label: config.label,
        data: config.data,
        borderColor: config.color,
        backgroundColor: config.bgColor,
        borderWidth: 2.5,
        fill: true,
        tension: 0.35,
        pointRadius: 2,
        pointHoverRadius: 6,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: config.color,
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#f1f5f9',
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (items) => {
            const idx = items[0]?.dataIndex;
            const pt = rawData[idx];
            const isFc = pt?.is_forecast;
            return `${items[0]?.label} (${isFc ? 'Forecast' : 'Observed'})`;
          },
          label: (context) => `${context.parsed.y} ${config.unit}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(226, 232, 240, 0.6)',
        },
        ticks: {
          font: { family: 'Plus Jakarta Sans', size: 11 },
          color: '#64748b',
          maxTicksLimit: 12,
        },
      },
      y: {
        grid: {
          color: 'rgba(226, 232, 240, 0.8)',
        },
        ticks: {
          font: { family: 'Plus Jakarta Sans', size: 11 },
          color: '#64748b',
        },
        beginAtZero: true,
      },
    },
  };

  // Find peak AQI
  const maxVal = Math.max(...config.data, 0);
  const minVal = Math.min(...config.data, 0);

  return (
    <div className="trend-chart-card glass-card">
      <div className="chart-header">
        <div className="chart-title-area">
          <div className="chart-title-row">
            <TrendingUp size={18} className="chart-icon" />
            <h3 className="chart-title">48-Hour Air Quality Horizon</h3>
          </div>
          <p className="chart-subtitle">
            Past 24 Hours Satellite & Sensor Readings + Next 24 Hours Forecast for <strong>{city}</strong>
          </p>
        </div>

        {/* Metric Toggles */}
        <div className="chart-metric-toggles">
          <button 
            className={`metric-btn ${metric === 'aqi' ? 'active' : ''}`}
            onClick={() => setMetric('aqi')}
          >
            AQI Index
          </button>
          <button 
            className={`metric-btn ${metric === 'pm2_5' ? 'active' : ''}`}
            onClick={() => setMetric('pm2_5')}
          >
            PM2.5
          </button>
          <button 
            className={`metric-btn ${metric === 'pm10' ? 'active' : ''}`}
            onClick={() => setMetric('pm10')}
          >
            PM10
          </button>
          <button 
            className={`metric-btn ${metric === 'o3' ? 'active' : ''}`}
            onClick={() => setMetric('o3')}
          >
            Ozone (O₃)
          </button>
        </div>
      </div>

      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>

      {/* Horizon stats footer */}
      <div className="chart-footer-stats">
        <div className="stat-pill">
          <span className="stat-lbl">24h Peak Level:</span>
          <span className="stat-val" style={{ color: config.color }}>{maxVal} {config.unit}</span>
        </div>
        <div className="stat-pill">
          <span className="stat-lbl">24h Cleanest Air:</span>
          <span className="stat-val">{minVal} {config.unit}</span>
        </div>
        <div className="timeline-legend">
          <span className="legend-dot observed"></span>
          <span>Past Observed</span>
          <span className="legend-dot forecast"></span>
          <span>Forecast</span>
        </div>
      </div>
    </div>
  );
}