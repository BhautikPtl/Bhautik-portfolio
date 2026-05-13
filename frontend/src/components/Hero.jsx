import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, ExternalLink } from 'lucide-react';
import resumePDF from '../assets/bhautik.pdf';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="bg-glow top-20 -left-40" />
      <div className="bg-glow bottom-20 -right-40" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-semibold tracking-widest uppercase text-sm mb-6 block font-mono text-center md:text-left"
          >
            &lt; Ready to code /&gt;
          </motion.span>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 text-center md:text-left">
            <div className="relative shrink-0">
              {/* Rotating Ring (Kept from new design) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-dashed border-primary/30"
              />
              <div className="w-32 h-32 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-r from-primary via-blue-500 to-accent shrink-0 relative z-10 group">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 p-1 bg-slate-900 shadow-2xl transition-all duration-700">
                  <img
                    src="/profile.jpeg"
                    alt="Bhautik Vachhani"
                    className="w-full h-full object-cover rounded-full object-[50%_15%] transition-all duration-700 scale-110"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tighter w-full md:pt-4">
              I'm <span className="gradient-text">Bhautik</span> <br />
              <div className="text-xl md:text-3xl text-white/70 font-bold mt-4 min-h-[2.4em] tracking-normal max-w-2xl mx-auto md:mx-0">
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
            </h1>
          </div>

          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-4xl leading-relaxed font-normal text-left">
            Building performance-driven web experiences with modern architecture and cutting-edge technologies. Pursuing BCA with a focus on scalable full-stack systems.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <motion.a
              href={resumePDF}
              download="Bhautik_Vachhani_Resume.pdf"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-background font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download size={18} /> Download Resume
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/10 glass rounded-xl font-bold flex items-center gap-2 transition-all"
            >
              Recent Work <ExternalLink size={18} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative hidden md:block"
        >
          <div className="w-full max-w-lg mx-auto bg-slate-900 rounded-xl border border-white/10 overflow-hidden shadow-2xl font-mono">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest ml-2">Terminal — zsh — 80x24</div>
            </div>

            <div className="p-6 text-sm md:text-base space-y-4 min-h-[300px]">
              <div className="flex gap-2">
                <span className="text-primary">bhautik@portfolio</span>
                <span className="text-slate-400">:</span>
                <span className="text-accent">~</span>
                <span className="text-slate-400">$</span>
                <TypeAnimation
                  sequence={[
                    'whoami',
                    1000,
                    'Full Stack Developer',
                    2000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={0}
                  className="text-white"
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
                className="space-y-2"
              >
                <div className="flex gap-2">
                  <span className="text-primary">bhautik@portfolio</span>
                  <span className="text-slate-400">:</span>
                  <span className="text-accent">~</span>
                  <span className="text-slate-400">$</span>
                  <span className="text-white">location</span>
                </div>
                <div className="text-slate-400 pl-4">Gujarat (Junagadh), India</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5 }}
                className="space-y-2"
              >
                <div className="flex gap-2">
                  <span className="text-primary">bhautik@portfolio</span>
                  <span className="text-slate-400">:</span>
                  <span className="text-accent">~</span>
                  <span className="text-slate-400">$</span>
                  <span className="text-white">skills</span>
                </div>
                <div className="text-slate-400 pl-4 flex flex-wrap gap-x-4">
                  <span>[ React ]</span>
                  <span>[ Node.js ]</span>
                  <span>[ MongoDB ]</span>
                  <span>[ Express.js ]</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6 }}
                className="flex gap-2"
              >
                <span className="text-primary">bhautik@portfolio</span>
                <span className="text-slate-400">:</span>
                <span className="text-accent">~</span>
                <span className="text-slate-400">$</span>
                <span className="animate-pulse w-2 h-5 bg-primary inline-block align-middle" />
              </motion.div>
            </div>
          </div>

          {/* Background Glows for Terminal */}
          <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-full opacity-50" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
