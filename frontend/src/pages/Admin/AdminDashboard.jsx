import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Award, MessageSquare, LogOut, ExternalLink, Menu, X } from 'lucide-react';
import useStore from '../../utils/store';
import { useState } from 'react';

import Analytics from './Analytics';
import ProjectManager from './ProjectManager';
import CertificateManager from './CertificateManager';
import MessageManager from './MessageManager';

const AdminDashboard = () => {
  const logout = useStore(state => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Analytics', path: '/admin/dashboard' },
    { icon: <Briefcase size={20} />, label: 'Projects', path: '/admin/projects' },
    { icon: <Award size={20} />, label: 'Certificates', path: '/admin/certificates' },
    { icon: <MessageSquare size={20} />, label: 'Messages', path: '/admin/messages' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex italic relative">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
        <div className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic tracking-tighter">
          ADMIN.
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 h-screen w-64 border-r border-white/5 bg-[#020617] z-50
        transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col p-6
      `}>
        <div className="hidden lg:block text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic mb-12 tracking-tighter">
          ADMIN.
        </div>

        <nav className="flex-1 space-y-2 mt-12 lg:mt-0">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                location.pathname === item.path 
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-cyan-400'
              }`}
            >
              <div className={location.pathname === item.path ? 'text-slate-950' : 'group-hover:text-cyan-400 transition-colors'}>
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 italic">
            <ExternalLink size={20} />
            <span className="font-medium">View Site</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition italic"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-10 pt-24 lg:pt-10 overflow-y-auto italic w-full">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/dashboard" element={<Analytics />} />
            <Route path="/projects" element={<ProjectManager />} />
            <Route path="/certificates" element={<CertificateManager />} />
            <Route path="/messages" element={<MessageManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
