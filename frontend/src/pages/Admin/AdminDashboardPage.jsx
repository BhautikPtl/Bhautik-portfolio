import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container, Section } from '../../components/ui/Button';
import { projectsAPI, certificatesAPI, messagesAPI } from '../../utils/api';
import { Plus, LogOut } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

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
    navigate('/admin/login');
  };

  return (
    <div className="bg-space-darker min-h-screen pt-24">
      <Section>
        <Container>
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl font-bold text-white">Admin Dashboard</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
            >
              <LogOut size={20} />
              Logout
            </motion.button>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { label: 'Total Projects', value: stats.projects, icon: '📊' },
              { label: 'Total Certificates', value: stats.certificates, icon: '🏆' },
              { label: 'Total Messages', value: stats.messages, icon: '💬' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-space-dark/40 border border-neon-purple/20 rounded-xl p-6"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-electric-blue">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Projects', action: 'Manage', path: '/admin/projects' },
              { title: 'Certificates', action: 'Manage', path: '/admin/certificates' },
              { title: 'Messages', action: 'View', path: '/admin/messages' },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-space-dark/40 border border-neon-purple/20 rounded-xl p-6 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                <Button
                  onClick={() => navigate(section.path)}
                  size="sm"
                  variant="outline"
                >
                  {section.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {toasts.map(toast => (
        <motion.div key={toast.id} initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-4 right-4">
          <div className={`px-6 py-3 rounded-lg text-white font-medium ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>{toast.message}</div>
        </motion.div>
      ))}
    </div>
  );
};
