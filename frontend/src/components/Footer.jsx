import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: 'About',        href: '#home' },
    { label: 'Projects',     href: '#projects' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact',      href: '#contact' },
  ];

  const socials = [
    { icon: <Github size={17} />,    href: 'https://github.com/BhautikPtl',                               label: 'GitHub' },
    { icon: <Linkedin size={17} />,  href: 'https://www.linkedin.com/in/bhautik-vachhani-427540304',       label: 'LinkedIn' },
    { icon: <Instagram size={17} />, href: 'https://www.instagram.com/ptl_bhautik_/',                     label: 'Instagram' },
  ];

  return (
    <footer style={{ borderTop: '1px solid var(--line)', paddingBlock: '44px 36px', position: 'relative', zIndex: 2 }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          {/* Brand */}
          <a
            href="#home"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--txt)',
              textDecoration: 'none',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--glow)' }} />
            BV<span style={{ color: 'var(--accent)' }}>.</span>
          </a>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  color: 'var(--muted)',
                  fontSize: '.9rem',
                  textDecoration: 'none',
                  transition: '.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 10 }}>
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 38, height: 38,
                  border: '1px solid var(--line-strong)',
                  borderRadius: 10,
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--muted)',
                  transition: '.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--line-strong)'; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          marginTop: 28,
          paddingTop: 24,
          borderTop: '1px solid var(--line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ color: 'var(--dim)', fontSize: '.84rem' }}>
            © {year} Bhautik Vachhani. All rights reserved.
          </p>
          <p style={{ color: 'var(--dim)', fontSize: '.84rem', fontFamily: "'JetBrains Mono', monospace" }}>
            Built with React + Vite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
