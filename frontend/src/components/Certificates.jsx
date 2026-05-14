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
        setCertificates(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCerts();
  }, []);

  return (
    <section id="certificates" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-16 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-2">Certifications</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent hidden md:block"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.length > 0 ? certificates.map((cert, index) => (
            <CertificateCard key={cert._id} cert={cert} index={index} />
          )) : (
            [1, 2, 3].map(i => <div key={i} className="h-64 glass rounded-[2rem] animate-pulse"></div>)
          )}
        </div>
      </div>
    </section>
  );
};

const CertificateCard = ({ cert, index }) => {
  const styles = [
    { border: 'border-l-cyan-500/50', hover: 'hover:border-l-cyan-500', icon: 'bg-cyan-500/10 text-cyan-500', text: 'text-cyan-400', badge: 'bg-cyan-500/10 text-cyan-500' },
    { border: 'border-l-purple-500/50', hover: 'hover:border-l-purple-500', icon: 'bg-purple-500/10 text-purple-500', text: 'text-purple-400', badge: 'bg-purple-500/10 text-purple-500' },
    { border: 'border-l-amber-500/50', hover: 'hover:border-l-amber-500', icon: 'bg-amber-500/10 text-amber-500', text: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-500' },
    { border: 'border-l-emerald-500/50', hover: 'hover:border-l-emerald-500', icon: 'bg-emerald-500/10 text-emerald-500', text: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-500' },
  ];

  const style = styles[index % styles.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`glass-card p-8 rounded-[2rem] border-l-4 ${style.border} ${style.hover} transition-all flex flex-col h-full`}
    >
      <div className="flex justify-between items-start mb-8">
        <div className={`w-14 h-14 ${style.icon} rounded-2xl flex items-center justify-center border border-white/5`}>
          <Award size={28} />
        </div>
        <div className={`px-3 py-1 ${style.badge} rounded-full text-[10px] font-bold uppercase tracking-widest`}>
          Verified
        </div>
      </div>

      <h3 className="text-xl font-black mb-2 group-hover:text-white transition-colors leading-tight uppercase tracking-wider">{cert.title}</h3>
      <div className={`text-xs font-bold ${style.text} uppercase tracking-[0.2em] mb-8`}>
        {cert.issuer}
      </div>

      <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono font-medium italic uppercase tracking-wider">
          <Calendar size={12} /> {cert.date}
        </div>
        <a
          href={cert.image.startsWith('http') ? cert.image : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${cert.image}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-slate-500 hover:text-white transition-colors"
        >
          <ExternalLink size={18} />
        </a>
      </div>
    </motion.div>
  );
};

export default Certificates;
