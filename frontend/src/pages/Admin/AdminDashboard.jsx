import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Award, MessageSquare, LogOut, ExternalLink, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
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

  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex italic relative" style={{ background: 'var(--bg)', color: 'var(--txt)' }}>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl p-4 flex items-center justify-between" style={{ background: 'var(--glass-bg)', borderBottom: '1px solid var(--line)' }}>
        <div className="text-xl font-black italic tracking-tighter" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          ADMIN.
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg transition-colors"
          style={{ color: 'var(--accent-2)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 h-screen w-64 z-50
        transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col p-6
      `} style={{ background: 'var(--panel)', borderRight: '1px solid var(--line)' }}>
        <div className="hidden lg:block text-2xl font-black italic mb-12 tracking-tighter" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          ADMIN.
        </div>

        <nav className="flex-1 space-y-2 mt-12 lg:mt-0">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group"
                style={active ? { background: 'linear-gradient(90deg, var(--accent), var(--accent-2))', color: 'var(--txt)', fontWeight: 700, boxShadow: '0 10px 30px -10px var(--glow)' } : { color: 'var(--muted)' }}
              >
                <div style={{ color: active ? 'var(--txt)' : 'inherit' }}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-4 px-4 py-3 rounded-xl italic" style={{ color: 'var(--muted)' }}>
            <ExternalLink size={20} />
            <span className="font-medium">View Site</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition italic"
            style={{ color: 'var(--accent-2)' }}
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-10 pt-24 lg:pt-10 overflow-y-auto italic w-full">
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 12 }} className="hidden lg:flex">
          <button
            onClick={toggleTheme}
            title="Toggle Theme"
            aria-label="Toggle Theme"
            style={{ background: 'none', border: '1px solid var(--line-strong)', color: 'var(--txt)', width: 44, height: 44, borderRadius: 10, display: 'grid', placeItems: 'center' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--hover)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.background = 'transparent'; }}
          >
            {isDark ? <Sun size={18} color="var(--accent)" /> : <Moon size={18} color="var(--accent-2)" />}
          </button>
        </div>
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
