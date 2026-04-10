import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from 'recharts';

const API = 'http://admin.localhost:5001';

const VIBE_META = {
  A: { name: 'Aquatic', color: '#6c9cec' },
  B: { name: 'Earthy', color: '#ec6c6c' },
  C: { name: 'Ethereal', color: '#a8d86c' },
  D: { name: 'Noir', color: '#c78cec' },
};

const VibeChart = ({ token }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/api/reports/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const vibe = res.data.data.overallVibeBalance || {};
        setData([
          { vibe: 'Aquatic (A)', value: parseFloat((vibe.avgA || 0).toFixed(2)), fullMark: 10 },
          { vibe: 'Earthy (B)', value: parseFloat((vibe.avgB || 0).toFixed(2)), fullMark: 10 },
          { vibe: 'Ethereal (C)', value: parseFloat((vibe.avgC || 0).toFixed(2)), fullMark: 10 },
          { vibe: 'Noir (D)', value: parseFloat((vibe.avgD || 0).toFixed(2)), fullMark: 10 },
        ]);
      } catch (err) {
        console.error('Failed to load vibe data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return <div className="admin-loading">Loading chart...</div>;

  const hasData = data.some(d => d.value > 0);

  return (
    <div className="admin-chart-container">
      <div className="admin-chart-grid">
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">Overall Vibe Balance</h3>
          {!hasData ? (
            <div className="admin-empty">No quiz results yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height={340}>
              <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis
                  dataKey="vibe"
                  tick={{ fontSize: 13, fontFamily: "'Single Day', cursive", fill: '#555' }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 10]}
                  tick={{ fontSize: 11, fill: '#bbb' }}
                />
                <Radar
                  dataKey="value"
                  stroke="#6c9cec"
                  fill="#6c9cec"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    borderRadius: 8,
                    border: '1px solid #eee',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="admin-chart-card">
          <h3 className="admin-chart-title">Vibe Breakdown</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px 0' }}>
            {Object.entries(VIBE_META).map(([key, meta]) => {
              const val = data.find(d => d.vibe.includes(key))?.value || 0;
              return (
                <div key={key} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    border: `4px solid ${meta.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px',
                    fontFamily: "'Single Day', cursive",
                    fontSize: 28,
                    color: meta.color,
                  }}>
                    {val.toFixed(1)}
                  </div>
                  <div style={{
                    fontFamily: "'Single Day', cursive",
                    fontSize: 16,
                    color: '#555',
                  }}>
                    {meta.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibeChart;
