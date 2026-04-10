import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';

const API = 'https://scentstory-backend.vercel.app';

const CATEGORY_COLORS = {
  'Aquatic': '#6c9cec',
  'Earthy': '#c0946c',
  'Ethereal': '#a8d86c',
  'Noir': '#c78cec',
  'Rare Blend': '#f0c040',
};

const InventoryChart = ({ token }) => {
  const [data, setData] = useState([]);
  const [totalFragrances, setTotalFragrances] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/api/reports/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cats = res.data.data.categoryCounts || [];
        const mapped = cats.map(item => ({
          name: item._id,
          value: item.count,
          color: CATEGORY_COLORS[item._id] || '#999',
        }));
        setData(mapped);
        setTotalFragrances(mapped.reduce((sum, d) => sum + d.value, 0));
      } catch (err) {
        console.error('Failed to load inventory data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return <div className="admin-loading">Loading chart...</div>;

  return (
    <div className="admin-chart-container">
      <div className="admin-chart-grid">
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">Category Distribution</h3>
          {data.length === 0 ? (
            <div className="admin-empty">No fragrances in inventory.</div>
          ) : (
            <ResponsiveContainer width="100%" height={340}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={{ strokeWidth: 1, stroke: '#ccc' }}
                >
                  {data.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    borderRadius: 8,
                    border: '1px solid #eee',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="admin-chart-card">
          <h3 className="admin-chart-title">Inventory Summary</h3>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="admin-stat-number">{totalFragrances}</div>
            <div className="admin-stat-label">Total Fragrances</div>
          </div>
          <div style={{ padding: '10px 0' }}>
            {data.map((cat) => (
              <div
                key={cat.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    background: cat.color,
                  }} />
                  <span style={{
                    fontFamily: "'Single Day', cursive",
                    fontSize: 16,
                    color: '#333',
                  }}>
                    {cat.name}
                  </span>
                </div>
                <span style={{
                  fontFamily: "'Single Day', cursive",
                  fontSize: 20,
                  color: '#000',
                  fontWeight: 400,
                }}>
                  {cat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryChart;
