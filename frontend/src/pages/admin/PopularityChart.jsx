import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const API = 'http://admin.localhost:5001';

const COLORS = ['#6c9cec', '#ec6c6c', '#a8d86c', '#c78cec', '#f0c040',
  '#5cb85c', '#e28e93', '#8884d8', '#82ca9d', '#ffc658'];

const PopularityChart = ({ token }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/api/reports/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const top = res.data.data.topFragrances || [];
        setData(top.map(item => ({
          name: item._id || 'Unknown',
          count: item.count,
        })));
      } catch (err) {
        console.error('Failed to load popularity data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return <div className="admin-loading">Loading chart...</div>;

  if (data.length === 0) {
    return (
      <div className="admin-chart-container">
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">Top Archetypes</h3>
          <div className="admin-empty">No quiz results yet. Take the quiz to generate data!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-chart-container">
      <div className="admin-chart-card full-width">
        <h3 className="admin-chart-title">Top Archetypes by Popularity</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="name"
              angle={-35}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12, fontFamily: "'Single Day', cursive", fill: '#555' }}
              height={80}
            />
            <YAxis
              tick={{ fontSize: 13, fontFamily: "'Inter', sans-serif", fill: '#999' }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                borderRadius: 8,
                border: '1px solid #eee',
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PopularityChart;
