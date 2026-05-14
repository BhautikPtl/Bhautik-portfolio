import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, ExternalLink } from 'lucide-react';
import resumePDF from '../assets/bhautik.pdf';

const Hero = () => {
  const tiltRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = useCallback((e) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s ease-out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
    });
  }, []);

  return (
    <section id="home" className="min-h-screen pt-40 pb-20 relative overflow-hidden bg-grid-pattern">
      <div className="bg-glow top-20 -left-40 opacity-50" />
      <div className="bg-glow bottom-20 -right-40 opacity-50" />

      <div className="container mx-auto px-6 lg:px-40 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#5b78ff] font-bold tracking-widest uppercase text-xs md:text-sm mb-6 block font-mono text-center lg:text-left"
          >
            &lt; Ready to code /&gt;
          </motion.span>

          <div className="flex flex-col items-center lg:items-start gap-2 mb-10 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter w-full"
            >
              I'm <span className="gradient-text">Bhautik</span> <br />
              <div className="text-xl md:text-3xl lg:text-4xl text-white/80 font-bold mt-4 min-h-[1.5em] tracking-normal max-w-2xl mx-auto lg:mx-0">
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'React Architect',
                    2000,
                    'MERN Specialist',
                    2000,
                  ]}
                  wrapper="div"
                  speed={50}
                  repeat={Infinity}
                />
              </div>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl leading-relaxed font-normal text-center lg:text-left mx-auto lg:mx-0"
          >
            Building performance-driven web experiences with modern architecture. Specializing in scalable full-stack systems with the MERN stack.
          </motion.p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <motion.a
              href={resumePDF}
              download="Bhautik_Vachhani_Resume.pdf"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(91, 120, 255, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#5b78ff] text-white font-black rounded-2xl flex items-center gap-2 transition-all cursor-pointer text-base shadow-[0_10px_20px_-5px_rgba(91,120,255,0.4)]"
            >
              <Download size={20} /> Download Resume
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/10 glass rounded-2xl font-black flex items-center gap-2 transition-all text-base"
            >
              Recent Work <ExternalLink size={20} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative order-1 lg:order-2 flex items-center justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
            {/* Floating Particles/Points System (dhavalwp.com style) */}
            <div className="absolute inset-[-60px] md:inset-[-120px] pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, (i % 2 === 0 ? 30 : -30), 0],
                    opacity: [0.1, 0.4, 0.1],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 10 + (i % 10),
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-1.5 h-1.5 bg-[#5b78ff] rounded-full blur-[1px]"
                  style={{
                    left: `${50 + (Math.cos(i * 18) * 45)}%`,
                    top: `${50 + (Math.sin(i * 18) * 45)}%`,
                    boxShadow: '0 0 10px rgba(91, 120, 255, 0.4)'
                  }}
                />
              ))}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5b78ff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#5b78ff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#5b78ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[...Array(10)].map((_, i) => (
                  <motion.line
                    key={`neural-${i}`}
                    x1={`${20 + (i * 10)}%`} y1="0%"
                    x2={`${80 - (i * 10)}%`} y2="100%"
                    stroke="url(#neuralGrad)"
                    strokeWidth="0.5"
                    animate={{
                      strokeDasharray: ["0, 100", "100, 0"],
                      opacity: [0.05, 0.2, 0.05]
                    }}
                    transition={{
                      duration: 8 + i,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </svg>
            </div>

            {/* Floating Stat Badges - Exact Design from Reference */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", type: "tween" }}
              style={{ willChange: "transform" }}
              className="absolute top-[2%] left-[-2%] z-30 pointer-events-none"
            >
              <div className="bg-[#1a1f2e]/95 backdrop-blur-3xl border border-white/10 p-2 md:p-4 rounded-xl md:rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] min-w-[90px] md:min-w-[140px] flex flex-col items-start gap-0.5">
                <div className="text-lg md:text-3xl font-black text-[#5b78ff] tracking-tight">Full Stack</div>
                <div className="text-[7px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Developer</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", type: "tween", delay: 0.8 }}
              style={{ willChange: "transform" }}
              className="absolute top-[10%] right-[-2%] z-30 pointer-events-none"
            >
              <div className="bg-[#1a1f2e]/95 backdrop-blur-3xl border border-white/10 p-2 md:p-4 rounded-xl md:rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] min-w-[90px] md:min-w-[140px] flex flex-col items-start gap-0.5">
                <div className="text-lg md:text-3xl font-black text-[#5b78ff] tracking-tight">MERN</div>
                <div className="text-[7px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Specialist</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", type: "tween", delay: 1.5 }}
              style={{ willChange: "transform" }}
              className="absolute bottom-[5%] left-[-2%] z-30 pointer-events-none"
            >
              <div className="bg-[#1a1f2e]/95 backdrop-blur-3xl border border-white/10 p-2 md:p-4 rounded-xl md:rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] min-w-[90px] md:min-w-[140px] flex flex-col items-start gap-0.5">
                <div className="text-lg md:text-3xl font-black text-[#5b78ff] tracking-tight">React</div>
                <div className="text-[7px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Architect</div>
              </div>
            </motion.div>

            {/* Profile Picture Container - 3D Tilt Effect */}
            <div
              ref={tiltRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={tiltStyle}
              className="absolute inset-2 md:inset-4 lg:inset-6 rounded-full border-[10px] md:border-[16px] border-[#1a1f2e] shadow-2xl overflow-hidden z-20 cursor-pointer"
            >
              <div className="w-full h-full relative bg-[#3b82f6] flex items-center justify-center">
                <img
                  src="/avatars.png"
                  alt="Bhautik Vachhani"
                  className="w-full h-full object-cover scale-[1.25] translate-y-3"
                  loading="eager"
                  fetchpriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
              </div>
            </div>

            {/* Background Glow behind avatar */}
            <div className="absolute inset-0 bg-[#5b78ff]/10 blur-[100px] rounded-full -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
