import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, LogIn } from 'lucide-react';
import api from '../../utils/api';
import useStore from '../../utils/store';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setLogin = useStore(state => state.setLogin);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', formData);
      setLogin(data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 italic" style={{ background: 'var(--bg)', color: 'var(--txt)' }}>
      <div className="bg-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-10 rounded-[2.5rem]"
        style={{ border: '1px solid var(--line)' }}
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold italic">Admin Access</h1>
          <p className="mt-2" style={{ color: 'var(--muted)' }}>Sign in to manage your portfolio</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm mb-6 text-center italic">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1" style={{ color: 'var(--muted)' }}>Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--dim)' }} size={18} />
              <input 
                required
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full rounded-2xl py-4 pl-12 pr-6 focus:ring-2 ring-blue-500 outline-none"
                style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)', color: 'var(--txt)' }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium ml-1" style={{ color: 'var(--muted)' }}>Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--dim)' }} size={18} />
              <input 
                required
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full rounded-2xl py-4 pl-12 pr-6 focus:ring-2 ring-blue-500 outline-none"
                style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)', color: 'var(--txt)' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : <>{'Enter Dashboard'} <LogIn size={20} /></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
