import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish?.(), 200);
          return 100;
        }
        return p + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 20,
    }}>
      {/* Brand */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700, fontSize: '2rem',
        color: 'var(--txt)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          width: 12, height: 12, borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 16px var(--glow)',
          animation: 'pulse-dot 1.5s ease-in-out infinite',
        }} />
        BV<span style={{ color: 'var(--accent)' }}>.</span>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 180, height: 2,
        background: 'var(--line)',
        borderRadius: 999, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
          borderRadius: 999,
          transition: 'width .05s linear',
          boxShadow: '0 0 8px var(--glow)',
        }} />
      </div>

      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '.76rem', color: 'var(--dim)' }}>
        {progress < 100 ? 'Loading...' : 'Ready'}
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: .4; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
