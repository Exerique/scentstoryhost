import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const API = 'https://scentstory-backend.vercel.app';

const GrowthChart = ({ token }) => {
  const [newUsers, setNewUsers] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [totalFragrances, setTotalFragrances] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, fragRes] = await Promise.all([
          axios.get(`${API}/api/reports/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API}/api/fragrances`),
        ]);

        setNewUsers(dashRes.data.data.newUsersThisWeek || 0);
        const top = dashRes.data.data.topFragrances || [];
        setTotalResults(top.reduce((sum, t) => sum + t.count, 0));
        setTotalFragrances(fragRes.data.count || fragRes.data.data?.length || 0);
      } catch (err) {
        console.error('Failed to load growth data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return <div className="admin-loading">Loading stats...</div>;

  const stats = [
    { label: 'New Users (7 days)', value: newUsers, color: '#6c9cec' },
    { label: 'Total Quiz Results', value: totalResults, color: '#a8d86c' },
    { label: 'Fragrances in Library', value: totalFragrances, color: '#c78cec' },
  ];

  return (
    <div className="admin-chart-container">
      <div className="admin-chart-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        {stats.map((stat) => (
          <div className="admin-chart-card" key={stat.label} style={{ textAlign: 'center' }}>
            <div className="admin-stat-number" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="admin-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-chart-card full-width" style={{ marginTop: '24px' }}>
        <h3 className="admin-chart-title">Platform Activity Overview</h3>
        <div style={{ padding: '20px 0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            {[
              { label: 'Quiz Completion Rate', value: totalResults > 0 ? '100%' : '0%', desc: 'All submitted quizzes produce a result' },
              { label: 'Matching Algorithm', value: '4D Vector', desc: 'Euclidean distance on A/B/C/D space' },
              { label: 'Questions in Quiz', value: '4', desc: 'Story-driven question flow' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: '20px',
                  borderRadius: '10px',
                  background: '#f8f8ff',
                  border: '1px solid #eee',
                }}
              >
                <div style={{
                  fontFamily: "'Single Day', cursive",
                  fontSize: 28,
                  color: '#6c9cec',
                  marginBottom: 4,
                }}>
                  {item.value}
                </div>
                <div style={{
                  fontFamily: "'Single Day', cursive",
                  fontSize: 16,
                  color: '#000',
                  marginBottom: 4,
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: '#999',
                }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthChart;
