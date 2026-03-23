import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Command } from 'lucide-react';
import { COMMAND_PALETTE_ITEMS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { PORTFOLIO_DATA } from '../../utils/constants';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const filteredItems = COMMAND_PALETTE_ITEMS.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    if (item.id === 'home') navigate('/');
    else if (item.id === 'about') navigate('/about');
    else if (item.id === 'projects') navigate('/projects');
    else if (item.id === 'skills') navigate('/#skills');
    else if (item.id === 'contact') navigate('/contact');
    else if (item.id === 'download-resume') window.open('/resume.pdf');
    else if (item.id === 'github') window.open(PORTFOLIO_DATA.github);
    else if (item.id === 'linkedin') window.open(PORTFOLIO_DATA.linkedin);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {isOpen && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-space-dark border border-neon-purple/20 rounded-2xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="p-4 border-b border-neon-purple/10">
            <div className="flex items-center gap-3">
              <Command size={20} className="text-neon-purple" />
              <input
                autoFocus
                type="text"
                placeholder="Search commands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filteredItems.map((item, idx) => (
              <motion.button
                key={item.id}
                onClick={() => handleSelect(item)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="w-full px-6 py-3 flex items-center gap-3 hover:bg-electric-blue/10 text-left border-b border-neon-purple/5 last:border-b-0 transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-white">{item.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="px-4 py-3 bg-space-darker/50 border-t border-neon-purple/10 text-xs text-gray-400 flex justify-between">
            <span>Press ESC to close</span>
          </div>
        </motion.div>
      )}
    </>
  );
};
