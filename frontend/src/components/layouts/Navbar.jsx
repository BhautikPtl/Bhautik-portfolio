import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Certificates', href: '/certificates' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href) => {
    if (href.startsWith('#')) return location.hash === href;
    return location.pathname === href;
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-0"
    >
      <div className="backdrop-blur-xl bg-black/60 border-b border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-primary/20 transition"
              >
                B
              </motion.div>
              <span className="text-white font-black hidden sm:inline text-lg tracking-tighter">Bhautik <span className="text-primary">Vachhani</span></span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <motion.div
                    className={`relative pb-1 cursor-pointer text-xs font-bold uppercase tracking-widest transition-all ${isActive(item.href) ? 'text-primary' : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle - Styled better */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white transition"
              >
                <div className="relative w-5 h-5">
                  <motion.div
                    animate={{
                      rotate: isDark ? 0 : 180,
                      opacity: isDark ? 1 : 0,
                      scale: isDark ? 1 : 0
                    }}
                    className="absolute inset-0"
                  >
                    <Sun size={20} className="text-yellow-400" />
                  </motion.div>
                  <motion.div
                    animate={{
                      rotate: isDark ? -180 : 0,
                      opacity: isDark ? 0 : 1,
                      scale: isDark ? 0 : 1
                    }}
                    className="absolute inset-0"
                  >
                    <Moon size={20} className="text-blue-300" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Admin Portal */}
              <Link
                to="/admin/login"
                className="px-4 py-2 bg-white/5 text-slate-300 rounded-xl hover:bg-white/10 hover:text-primary transition-all border border-white/5 text-xs font-bold uppercase tracking-widest hidden md:block"
              >
                Portal
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-white/5 border border-white/5 text-white transition"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-6 space-y-2 border-t border-white/5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl transition-all font-bold text-center uppercase tracking-widest text-sm ${isActive(item.href)
                    ? 'bg-primary/20 text-primary border border-primary/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/admin/login"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-4 px-4 py-3 bg-white text-slate-950 font-black rounded-xl text-center uppercase tracking-widest text-sm shadow-lg shadow-white/10"
              >
                Admin Portal
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
