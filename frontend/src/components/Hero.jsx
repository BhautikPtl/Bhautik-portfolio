import React, { useEffect, useRef, useState } from 'react';
import resumePDF from '../assets/bhautik.pdf';

const CountUp = ({ target, suffix = '', duration = 1200 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;

    const tick = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setValue(Math.floor(progress * target));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [target, duration]);

  return <>{value}{suffix}</>;
};

const Hero = () => {
  const revealRef = useRef(null);
  const termRef = useRef(null);

  useEffect(() => {
    const els = [revealRef.current, termRef.current].filter(Boolean);
    const timer = setTimeout(() => {
      els.forEach(el => el && el.classList.add('in'));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 90,
      }}
    >
      <div
        className="wrap"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr .85fr',
          gap: 56,
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* LEFT — text content */}
        <div ref={revealRef} className="reveal">
          {/* Available pill */}
          <span className="pill">
            <span className="live" aria-hidden="true" />
            Available for new opportunities
          </span>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.6rem, 6vw, 4.6rem)',
            lineHeight: 1.04,
            fontWeight: 700,
            marginBottom: 22,
            letterSpacing: '-.02em',
          }}>
            Full Stack{' '}
            <span style={{
              background: 'linear-gradient(120deg, var(--accent), var(--accent-2) 55%, var(--accent-3))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Developer
            </span>{' '}
            &amp; MERN Specialist.
          </h1>

          {/* Lead */}
          <p style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
            color: 'var(--muted)',
            maxWidth: 580,
            marginBottom: 36,
            lineHeight: 1.7,
          }}>
            I build performance-driven, scalable web applications — from sleek React UIs to robust Node.js APIs.
            Turning ideas into production-ready products with the MERN stack.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href={resumePDF} download="Bhautik_Vachhani_Resume.pdf" className="btn btn-primary">
              Download Resume →
            </a>
            <a href="#projects" className="btn btn-ghost">
              View Projects
            </a>
          </div>

          {/* Stats row */}
          <div style={{ marginTop: 52, display: 'flex', gap: 38, flexWrap: 'wrap' }}>
            {[
              { n: 'BCA', l: 'In Progress' },
              { target: 2, suffix: '+', l: 'Projects Built' },
              { target: 8, suffix: '+', l: 'Tech Skills' },
            ].map((item) => (
              <div key={item.l}>
                <div className="stat-num">
                  {'target' in item ? <CountUp target={item.target} suffix={item.suffix} /> : item.n}
                </div>
                <div className="stat-label">
                  {item.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Terminal Card */}
        <div ref={termRef} className="reveal term-card">
          {/* macOS dots bar */}
          <div className="term-bar">
            <span className="term-dot" style={{ background: '#ff5f57' }} />
            <span className="term-dot" style={{ background: '#febc2e' }} />
            <span className="term-dot" style={{ background: '#28c840' }} />
            <span className="term-label">~/bhautik — dev.js</span>
          </div>

          {/* Code block */}
          <div className="term-body" aria-hidden="true">
            <span className="term-ln"><span className="c-com">// build → optimize → ship</span></span>
            <span className="term-ln"><span className="c-key">const</span> <span className="c-str">developer</span> = {'{'}</span>
            <span className="term-ln">  <span className="c-str">name</span>: <span className="c-fn">'Bhautik Vachhani'</span>,</span>
            <span className="term-ln">  <span className="c-str">stack</span>: <span className="c-fn">['React', 'Node', 'MongoDB']</span>,</span>
            <span className="term-ln">  <span className="c-str">role</span>: <span className="c-fn">'Full Stack Developer'</span>,</span>
            <span className="term-ln">  <span className="c-str">status</span>: <span className="c-fn">'available'</span>,</span>
            <span className="term-ln">{'}'};</span>
            <span className="term-ln"> </span>
            <span className="term-ln"><span className="c-key">function</span> <span className="c-str">buildProduct</span>() {'{'}</span>
            <span className="term-ln">  <span className="c-key">return</span> <span className="c-fn">deploy</span>(<span className="c-str">'production'</span>);</span>
            <span className="term-ln">{'}'}</span>
            <span className="term-ln"> </span>
            <span className="term-ln"><span className="c-com">// → Status: Ready 🚀</span></span>
            <span className="term-ln"><span className="c-fn">buildProduct</span>();<span className="term-cursor" /></span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #home .wrap {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
