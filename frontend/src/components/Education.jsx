import React, { useEffect, useRef } from 'react';

const Education = () => {
  const sectionRef = useRef(null);

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

  const timeline = [
    {
      when: '2022 — Present',
      title: 'Bachelor of Computer Applications (BCA)',
      org: 'Noble University, Junagadh',
    },
    {
      when: 'Sem 1 — 7.42 SGPA',
      title: 'Core Programming & Web Fundamentals',
      org: 'C, C++, HTML, CSS, Database Basics',
    },
    {
      when: 'Sem 2 — 6.83 SGPA',
      title: 'Data Structures & Web Design',
      org: 'JavaScript, Data Structures',
    },
    {
      when: 'Sem 3 — 7.52 SGPA',
      title: 'Advanced Programming',
      org: 'Java, Operating Systems',
    },
    {
      when: 'Sem 4 — 7.64 SGPA',
      title: 'Full Stack & Software Engineering',
      org: 'MERN Stack, Software Engineering',
    },
    {
      when: 'Sem 5 — Current',
      title: 'Advanced Web',
      org: 'React and Advanced Javascript',
    },
  ];

  const badges = [
    'BCA Graduate (In Progress)',
    'MERN Stack Specialist',
    'Full Stack Architect',
    
  ];

  return (
    <section id="education" ref={sectionRef}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="kicker">Background</p>
          <h2>Education &amp; academic track record.</h2>
          <p>
            Pursuing a Bachelor of Computer Applications at Noble University, Junagadh — with consistent
            academic growth and a deep focus on full-stack web development.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
          {/* Timeline */}
          <div className="timeline reveal">
            {timeline.map((item, i) => (
              <div key={i} className="tl-item">
                <div className="tl-when">{item.when}</div>
                <h3>{item.title}</h3>
                <div className="tl-org">{item.org}</div>
              </div>
            ))}
          </div>

          {/* Right side: highlights */}
          <div className="reveal">
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', marginBottom: 14 }}>
              Key skills developed
            </h3>
            <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: '.97rem' }}>
              My BCA coursework combined with self-driven projects has built a strong foundation
              across the full web development spectrum — from algorithms to production deployments.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
              {badges.map(b => (
                <span key={b} className="badge">
                  <span className="star">★</span> {b}
                </span>
              ))}
            </div>

            {/* MERN focus box */}
            <div style={{
              border: '1px solid var(--line)',
              borderRadius: 14,
              padding: '24px 26px',
              background: 'var(--bg-soft)',
            }}>
              <div className="kicker" style={{ marginBottom: 12 }}>MERN Specialization</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'REST APIs', 'JWT', 'Git'].map(t => (
                  <span
                    key={t}
                    style={{
                      padding: '7px 14px',
                      border: '1px solid var(--line)',
                      borderRadius: 999,
                      fontSize: '.82rem',
                      color: 'var(--muted)',
                      background: 'var(--panel)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #education .wrap > div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Education;
