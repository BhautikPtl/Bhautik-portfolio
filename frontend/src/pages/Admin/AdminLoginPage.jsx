import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container, Section } from '../../components/ui/Button';
import { authAPI } from '../../utils/api';
import { useToast } from '../../hooks/useToast';

export const AdminLoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await authAPI.login(credentials);
      localStorage.setItem('adminToken', res.data.token);
      showToast('Login successful!', 'success');
      setTimeout(() => navigate('/admin/dashboard'), 1000);
    } catch (error) {
      showToast(error.response?.data?.message || 'Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-space-darker min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-space-dark/40 border border-neon-purple/20 rounded-2xl p-8 backdrop-blur-lg">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Admin Portal</h1>
          <p className="text-gray-400 text-center mb-8">Manage your portfolio</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full bg-space-darker/50 border border-neon-purple/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full bg-space-darker/50 border border-neon-purple/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-6">
            Demo: Use admin@example.com / password123
          </p>
        </div>
      </motion.div>

      {toasts.map(toast => (
        <motion.div
          key={toast.id}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 right-4"
        >
          <div className={`px-6 py-3 rounded-lg text-white font-medium ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {toast.message}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
