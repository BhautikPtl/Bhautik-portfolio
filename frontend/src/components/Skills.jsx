import React, { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

const SKILLS = [
  { label: 'React.js', logo: 'https://cdn.simpleicons.org/react' },
  { label: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs' },
  { label: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb' },
  {
    label: 'Express.js',
    logo: 'https://cdn.simpleicons.org/express',
    logoDark: 'https://cdn.simpleicons.org/express/ffffff',
    logoLight: 'https://cdn.simpleicons.org/express/111827',
  },
  { label: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript' },
  { label: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript' },
  { label: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss' },
  { label: 'HTML5', logo: 'https://cdn.simpleicons.org/html5' },
  { label: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { label: 'REST API', logo: null },
  { label: 'Git', logo: 'https://cdn.simpleicons.org/git' },
  {
    label: 'GitHub',
    logo: 'https://cdn.simpleicons.org/github',
    logoDark: 'https://cdn.simpleicons.org/github/ffffff',
    logoLight: 'https://cdn.simpleicons.org/github/111827',
  },
  { label: 'Vite', logo: 'https://cdn.simpleicons.org/vite' },
  { label: 'Framer Motion', logo: 'https://cdn.simpleicons.org/framer' },
  { label: 'Redux', logo: 'https://cdn.simpleicons.org/redux' },
  {
    label: 'JWT Auth',
    logo: 'https://cdn.simpleicons.org/jsonwebtokens',
    logoDark: 'https://cdn.simpleicons.org/jsonwebtokens/ffffff',
    logoLight: 'https://cdn.simpleicons.org/jsonwebtokens/111827',
  },
  { label: 'Docker', logo: 'https://cdn.simpleicons.org/docker' },
  { label: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql' },
];

// Duplicate for seamless loop
const SKILLS_DOUBLED = [...SKILLS, ...SKILLS];

const Skills = () => {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          el.querySelectorAll('.reveal').forEach(r => r.classList.add('in'));
        }
      }),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '110px 0 0' }}>
      {/* Section header */}
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="kicker">Tech Stack</p>
          <h2>Technologies I work with.</h2>
          <p>
            A curated set of modern tools for building fast, scalable full-stack applications — from
            pixel-perfect UIs to production-grade backends.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee reveal" aria-hidden="true" style={{ marginTop: 40 }}>
        <div className="marquee-track">
          {SKILLS_DOUBLED.map((skill, i) => (
            <span key={i} className="chip">
              {skill.logo ? (
                <img
                  src={isDark ? (skill.logoDark || skill.logo) : (skill.logoLight || skill.logo)}
                  alt={`${skill.label} logo`}
                  className="chip-logo"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="chip-dot">▸</span>
              )}
              {skill.label}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .chip-logo {
          width: 20px;
          height: 20px;
          object-fit: contain;
          flex-shrink: 0;
          opacity: 0.92;
        }

        [data-theme="light"] .chip-logo {
          opacity: 0.8;
        }
      `}</style>


    </section>
  );
};

export default Skills;
