import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { certificatesAPI } from '../utils/api';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const { data } = await certificatesAPI.getAll();
        setCertificates(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setCertificates([]);
      }
    };
    fetchCerts();
  }, []);

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.1)_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 relative">
          {/* Background Glow */}
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-40 bg-gradient-to-r from-purple-500/20 to-amber-500/20 blur-3xl pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight whitespace-normal">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">Certifications</span>
            </h2>
          </motion.div>
          
          {/* Animated Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
            className="h-1.5 w-48 bg-gradient-to-r from-purple-400 to-amber-500 mx-auto rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)]"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-gray-300 font-semibold tracking-wide"
          >
            Industry-recognized certifications and credentials
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates && certificates.length > 0 ? certificates.map((cert, index) => (
            <CertificateCard key={cert._id} cert={cert} index={index} />
          )) : (
            [1, 2, 3].map(i => <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse border border-white/10"></div>)
          )}
        </div>
      </div>
    </section>
  );
};

const CertificateCard = ({ cert, index }) => {
  const styles = [
    { glow: 'from-cyan-500/30 to-blue-500/20', line: 'from-cyan-400 via-blue-400 to-purple-400', icon: 'bg-cyan-500/20 text-cyan-400', text: 'text-cyan-400' },
    { glow: 'from-purple-500/30 to-pink-500/20', line: 'from-purple-400 via-pink-400 to-orange-400', icon: 'bg-purple-500/20 text-purple-400', text: 'text-purple-400' },
    { glow: 'from-amber-500/30 to-orange-500/20', line: 'from-amber-400 via-orange-400 to-red-400', icon: 'bg-amber-500/20 text-amber-400', text: 'text-amber-400' },
    { glow: 'from-emerald-500/30 to-teal-500/20', line: 'from-emerald-400 via-teal-400 to-cyan-400', icon: 'bg-emerald-500/20 text-emerald-400', text: 'text-emerald-400' },
  ];

  const style = styles[index % styles.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ rotateY: 5, rotateX: -5, z: 100 }}
      className="group relative"
    >
      {/* Card Glow Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${style.glow} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-lg`} />
      
      {/* Card */}
      <div className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col h-full transition-[border-color,background,box-shadow] duration-200 group-hover:from-white/15 group-hover:to-white/8`}
        style={{
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
      >
        
        {/* Gradient Line Top */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.line} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
        
        <div className="flex justify-between items-start mb-4">
          <div className={`w-12 h-12 ${style.icon} rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-200`}>
            <Award size={24} />
          </div>
          <div className={`px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-wider text-gray-300`}>
            Verified
          </div>
        </div>

        <h3 className={`text-lg font-black mb-2 group-hover:${style.text} transition-colors leading-tight uppercase tracking-tight`}>{cert.title}</h3>
        <div className={`text-xs font-bold ${style.text} uppercase tracking-wider mb-6`}>
          {cert.issuer}
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-mono font-medium uppercase tracking-wider">
            <Calendar size={12} /> {cert.date}
          </div>
          <a
            href={cert.image.startsWith('http') ? cert.image : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${cert.image}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 text-gray-400 hover:${style.text} transition-colors`}
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Certificates;
