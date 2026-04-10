import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLogin from './AdminLogin';
import ManageFragrances from './ManageFragrances';
import ManageQuestions from './ManageQuestions';
import PopularityChart from './PopularityChart';
import VibeChart from './VibeChart';
import InventoryChart from './InventoryChart';
import GrowthChart from './GrowthChart';
import './admin.css';

const TABS = [
  { key: 'table', label: 'Table' },
  { key: 'popularity', label: 'Popularity' },
  { key: 'vibe', label: 'Vibe' },
  { key: 'growth', label: 'Growth' },
  { key: 'inventory', label: 'Inventory' },
];

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('table');
  const [activeSubTab, setActiveSubTab] = useState('fragrances');

  if (!admin) {
    return <AdminLogin />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'table':
        return (
          <>
            {/* Page Header */}
            <div className="admin-page-header">
              <h2 className="admin-page-title">Admin View</h2>
              <p className="admin-page-subtitle">
                {activeSubTab === 'fragrances' ? 'Fragrances table' : 'Questions table'}
              </p>
            </div>

            {/* Sub-tabs + Action Buttons */}
            <div className="admin-subtabs">
              <div className="admin-subtab-row">
                <button
                  id="subtab-fragrances"
                  className={`admin-subtab ${activeSubTab === 'fragrances' ? 'active' : ''}`}
                  onClick={() => setActiveSubTab('fragrances')}
                >
                  Fragrances
                </button>
                <button
                  id="subtab-questions"
                  className={`admin-subtab ${activeSubTab === 'questions' ? 'active' : ''}`}
                  onClick={() => setActiveSubTab('questions')}
                >
                  Questions
                </button>
              </div>
            </div>

            {/* Table content */}
            {activeSubTab === 'fragrances' ? (
              <ManageFragrances token={admin.token} />
            ) : (
              <ManageQuestions token={admin.token} />
            )}
          </>
        );

      case 'popularity':
        return (
          <>
            <div className="admin-page-header">
              <h2 className="admin-page-title">Admin View</h2>
              <p className="admin-page-subtitle">Popularity</p>
            </div>
            <PopularityChart token={admin.token} />
          </>
        );

      case 'vibe':
        return (
          <>
            <div className="admin-page-header">
              <h2 className="admin-page-title">Admin View</h2>
              <p className="admin-page-subtitle">Vibe Distribution</p>
            </div>
            <VibeChart token={admin.token} />
          </>
        );

      case 'growth':
        return (
          <>
            <div className="admin-page-header">
              <h2 className="admin-page-title">Admin View</h2>
              <p className="admin-page-subtitle">Growth</p>
            </div>
            <GrowthChart token={admin.token} />
          </>
        );

      case 'inventory':
        return (
          <>
            <div className="admin-page-header">
              <h2 className="admin-page-title">Admin View</h2>
              <p className="admin-page-subtitle">Inventory</p>
            </div>
            <InventoryChart token={admin.token} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-shell">
      {/* Top Navigation */}
      <nav className="admin-topnav">
        <div className="admin-topnav-brand">
          <h1>ScentStory</h1>
          <span>Find your scent.</span>
        </div>

        <div className="admin-topnav-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              id={`tab-${tab.key}`}
              className={`admin-topnav-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="admin-topnav-actions">
          <button
            id="admin-logout-btn"
            className="admin-topnav-logout"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
