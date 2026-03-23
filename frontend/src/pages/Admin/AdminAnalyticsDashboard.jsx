import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Section } from '../../components/ui/Button';
import { projectsAPI, certificatesAPI, messagesAPI } from '../../utils/api';
import { Plus, LogOut, TrendingUp, Award, MessageSquare } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState({ projects: 0, certificates: 0, messages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [proj, cert, msg] = await Promise.all([
          projectsAPI.getAll(),
          certificatesAPI.getAll(),
          messagesAPI.getAll(),
        ]);
        setStats({
          projects: proj.data.length,
          certificates: cert.data.length,
          messages: msg.data.length,
        });
      } catch (error) {
        showToast('Error loading dashboard', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    showToast('Logged out successfully', 'success');
    setTimeout(() => navigate('/admin/login'), 600);
  };

  const statCards = [
    { 
      label: 'Total Projects', 
      value: stats.projects, 
      icon: <TrendingUp size={28} />, 
      color: 'electric-blue',
      gradient: 'from-electric-blue/20',
      href: '/admin/projects'
    },
    { 
      label: 'Total Certificates', 
      value: stats.certificates, 
      icon: <Award size={28} />, 
      color: 'neon-purple',
      gradient: 'from-neon-purple/20',
      href: '/admin/certificates'
    },
    { 
      label: 'Contact Messages', 
      value: stats.messages, 
      icon: <MessageSquare size={28} />, 
      color: 'electric-blue',
      gradient: 'from-electric-blue/10',
      href: '/admin/messages'
    },
  ];

  return (
    <div className="bg-space-darker min-h-screen pt-24 pb-12">
      <Section>
        <Container>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Manage your portfolio content</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition border border-red-500/20"
            >
              <LogOut size={20} />
              Logout
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {statCards.map((stat, idx) => (
              <motion.button
                key={idx}
                onClick={() => navigate(stat.href)}
                variants={fadeInUp}
                whileHover={{ translateY: -5, boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)' }}
                className={`text-left p-6 rounded-2xl border border-neon-purple/20 bg-gradient-to-br ${stat.gradient} to-transparent backdrop-blur-lg hover:border-${stat.color}/40 transition cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${stat.color}/10 text-${stat.color}`}>
                    {stat.icon}
                  </div>
                  <span className={`text-sm font-bold text-${stat.color}`}>↑ {stat.value}</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Management Sections */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: 'Projects', description: 'Create, edit, or delete projects', action: 'Manage', path: '/admin/projects', icon: '📊' },
              { title: 'Certificates', description: 'Manage your achievements and certificates', action: 'Manage', path: '/admin/certificates', icon: '🏆' },
              { title: 'Messages', description: 'View contact form submissions', action: 'View', path: '/admin/messages', icon: '💬' },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-space-dark/40 border border-neon-purple/20 rounded-2xl p-6 text-left hover:border-electric-blue/30 transition"
              >
                <div className="text-4xl mb-4">{section.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{section.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{section.description}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(section.path)}
                  className="w-full"
                >
                  {section.action} →
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-6 bg-gradient-glow/5 border border-electric-blue/20 rounded-2xl"
          >
            <h3 className="text-white font-bold mb-4">Quick Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Total Portfolio Items</p>
                <p className="text-2xl font-bold text-electric-blue">{stats.projects + stats.certificates}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Portfolio Completion</p>
                <p className="text-2xl font-bold text-neon-purple">{Math.round(((stats.projects + stats.certificates) / 20) * 100)}%</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">New Messages</p>
                <p className="text-2xl font-bold text-electric-blue">{stats.messages}</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Toasts */}
      <div className="fixed bottom-4 right-4 z-50 space-y-3">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`px-6 py-3 rounded-lg text-white font-medium ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
            onClick={() => removeToast(toast.id)}
          >
            {toast.message}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
