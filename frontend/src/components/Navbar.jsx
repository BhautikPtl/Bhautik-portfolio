import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = isDark ? 'dark' : 'light';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About',        href: '#home' },
    { name: 'Skills',       href: '#skills' },
    { name: 'Education',    href: '#education' },
    { name: 'Projects',     href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact',      href: '#contact' },
  ];

  return (
    <header
      id="hd"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: '.3s',
        ...(isScrolled ? {
          background: theme === 'light' ? 'rgba(255, 255, 255, .82)' : 'rgba(6,7,13,.78)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--line)',
        } : {}),
      }}
    >
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Brand */}
        <a href="#home" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--txt)' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 14px var(--glow)', display: 'inline-block' }} />
          BV<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: 6, alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              style={{
                padding: '9px 14px',
                borderRadius: 10,
                fontSize: '.9rem',
                color: 'var(--muted)',
                transition: '.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--txt)';
                e.currentTarget.style.background = 'var(--hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--muted)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link.name}
            </a>
          ))}

          <a href="#contact" className="btn btn-primary" style={{ marginLeft: 8 }}>
            Hire Me →
          </a>

          {/* Theme Toggle Button (moved after Hire Me) */}
          <button
            onClick={toggleTheme}
            type="button"
            title="Toggle Theme"
            aria-label="Toggle Theme"
            style={{
              background: 'none',
              border: '1px solid var(--line-strong)',
              color: 'var(--txt)',
              width: 42,
              height: 42,
              borderRadius: 10,
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
              transition: '.25s',
              marginLeft: 8,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.background = 'var(--hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--line-strong)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {theme === 'dark' ? <Sun size={19} color="var(--accent)" /> : <Moon size={19} color="var(--accent-2)" />}
          </button>
        </nav>

        {/* Mobile Nav Right (Theme toggle + Menu toggle) */}
        <div className="show-mobile" style={{ display: 'none', alignItems: 'center', gap: 8 }}>
          <button
            onClick={toggleTheme}
            type="button"
            title="Toggle Theme"
            aria-label="Toggle Theme"
            style={{
              background: 'none',
              border: '1px solid var(--line-strong)',
              color: 'var(--txt)',
              width: 42,
              height: 42,
              borderRadius: 10,
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {theme === 'dark' ? <Sun size={19} color="var(--accent)" /> : <Moon size={19} color="var(--accent-2)" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: '1px solid var(--line-strong)',
              color: 'var(--txt)',
              width: 42,
              height: 42,
              borderRadius: 10,
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: 72,
          left: 24, right: 24,
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: 14,
          padding: 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          zIndex: 100,
        }}>
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                color: 'var(--muted)',
                fontSize: '.95rem',
                textDecoration: 'none',
                display: 'block',
                transition: '.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--txt)'; e.currentTarget.style.background = 'var(--hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'transparent'; }}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => setIsMobileMenuOpen(false)}>
            Hire Me →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
