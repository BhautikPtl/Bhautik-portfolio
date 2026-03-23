import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const LoadingScreen = ({ onFinish }) => {
  useEffect(() => {
    // Attempt auto-speech at multiple intervals to bypass browser timing restrictions
    const speechAttempts = [500, 1000, 2000].map(delay => 
      setTimeout(() => {
        if (!window.speechSynthesis.speaking) {
          speak();
        }
      }, delay)
    );

    const handleFirstClick = () => {
      if (!window.speechSynthesis.speaking) {
        speak();
      }
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);

    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 1700);

    return () => {
      clearTimeout(timer);
      speechAttempts.forEach(clearTimeout);
      window.removeEventListener('click', handleFirstClick);
      window.speechSynthesis.cancel();
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex flex-col items-center max-w-4xl mx-auto">
        <div className="text-white font-black text-xl md:text-4xl tracking-wide uppercase min-h-[1.5em] mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <TypeAnimation
            sequence={[
              'Full Stack Developer',
              0,
            ]}
            wrapper="span"
            speed={50}
            style={{ display: 'inline-block' }}
            cursor={true}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
