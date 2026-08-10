import React, { useEffect, useRef, useState } from 'react';
import { certificatesAPI, BACKEND_URL } from '../utils/api';
import { ExternalLink } from 'lucide-react';

const getInitials = (title) => {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
};

const AVATAR_COLORS = [
  'linear-gradient(135deg, var(--accent-2), var(--accent-3))',
  'linear-gradient(135deg, var(--accent), var(--accent-2))',
  'linear-gradient(135deg, var(--accent-3), var(--accent))',
  'linear-gradient(135deg, #f0a4ff, #7c83ff)',
];

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const { data } = await certificatesAPI.getAll();
        setCertificates(Array.isArray(data) ? data : []);
      } catch (err) {
        setCertificates([]);
      }
    };
    fetchCerts();
  }, []); 

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          el.querySelectorAll('.reveal').forEach(r => r.classList.add('in'));
        }
      }),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [certificates]);

  return (
    <section id="certificates" ref={sectionRef}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="kicker">Credentials</p>
          <h2>Certifications &amp; achievements.</h2>
          <p>
            Industry-recognized certifications validating my expertise across modern web technologies
            and development practices.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 18,
          }}
        >
          {certificates.length > 0
            ? certificates.map((cert, index) => (
                <CertCard key={cert._id} cert={cert} index={index} />
              ))
            : [1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  style={{
                    height: 86,
                    background: 'var(--panel)',
                    borderRadius: 14,
                    border: '1px solid var(--line)',
                    opacity: 0.4,
                  }}
                />
              ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          #certificates .wrap > div[style*="grid"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

const CertCard = ({ cert, index }) => {
  const certUrl = cert.image?.startsWith('http')
    ? cert.image
    : `${BACKEND_URL}${cert.image}`;

  return (
    <div
      className="plugin-card reveal"
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <div
        className="pi-avatar"
        style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
        aria-hidden="true"
      >
        {getInitials(cert.title)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', marginBottom: 4, lineHeight: 1.3 }}>
          {cert.title}
        </h3>
        <p style={{ fontSize: '.88rem', color: 'var(--muted)', marginBottom: 4 }}>
          {cert.issuer}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '.75rem', color: 'var(--dim)' }}>
            {cert.date}
          </span>
          <a
            href={certUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--dim)',
              transition: '.2s',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
            title="View Certificate"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
