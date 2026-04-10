import ManageQuestions from './ManageQuestions';
import ManageFragrances from './ManageFragrances';

// ... (top imports) inside the actual file
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { LogOut, BookOpen, Droplets, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardHome = () => (
  <div className="p-8">
    <h2 className="text-3xl font-serif mb-4 text-white">Dashboard Overview</h2>
    <p className="text-gray-400 font-light">Welcome to the ScentStory administrative console.</p>
  </div>
);

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-1 w-full bg-black border-t border-gray-900 mt-0">
      <div className="w-64 border-r border-gray-900 p-6 flex flex-col min-h-screen">
        <h3 className="font-serif text-xl text-white mb-8">Admin Panel</h3>
        <nav className="flex flex-col gap-2 flex-grow">
          <Link to="/admin" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-900 text-gray-400 hover:text-white transition-colors">
            <LayoutDashboard size={18} />
            <span className="text-sm">Overview</span>
          </Link>
          <Link to="/admin/questions" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-900 text-gray-400 hover:text-white transition-colors">
            <BookOpen size={18} />
            <span className="text-sm">Questions</span>
          </Link>
          <Link to="/admin/fragrances" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-900 text-gray-400 hover:text-white transition-colors">
            <Droplets size={18} />
            <span className="text-sm">Fragrances</span>
          </Link>
        </nav>
        <div className="mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-3 p-3 w-full rounded-md hover:bg-red-900/30 text-gray-400 hover:text-red-400 transition-colors">
            <LogOut size={18} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#0a0a0a]">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/questions" element={<ManageQuestions />} />
          <Route path="/fragrances" element={<ManageFragrances />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
