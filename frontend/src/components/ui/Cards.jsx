import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export const SkillBento = ({ skills }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {skills.map((skill, idx) => (
        <motion.div
          key={idx}
          variants={fadeInUp}
          whileHover={{ y: -10, scale: 1.05 }}
          className="bg-space-dark/40 backdrop-blur-lg border border-neon-purple/20 rounded-2xl p-6 group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          
          <div className="relative z-10">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="text-white font-bold text-lg">{skill}</h3>
            <div className="w-8 h-1 bg-electric-blue rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export const ProjectCard = ({ project, onClick }) => (
  <motion.div
    whileHover={{ y: -10 }}
    onClick={onClick}
    className="bg-space-dark/40 backdrop-blur-lg border border-neon-purple/20 rounded-2xl overflow-hidden group cursor-pointer"
  >
    <div className="relative h-48 overflow-hidden bg-gradient-glow/10">
      <motion.img
        src={project.image && (project.image.startsWith('http') ? project.image : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${project.image}`)}
        alt={project.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-300" />
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies?.slice(0, 3).map((tech, idx) => (
          <span key={idx} className="px-2 py-1 bg-electric-blue/20 text-electric-blue text-xs rounded-full">
            {tech}
          </span>
        ))}
      </div>

      <motion.button
        whileHover={{ x: 5 }}
        className="text-electric-blue font-medium text-sm"
      >
        View Project →
      </motion.button>
    </div>
  </motion.div>
);

export const CertificateCard = ({ certificate, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className="bg-space-dark/40 backdrop-blur-lg border border-neon-purple/20 rounded-2xl overflow-hidden cursor-pointer group"
  >
    <div className="aspect-video bg-gradient-glow/10 overflow-hidden relative flex items-center justify-center">
      {certificate.image && certificate.image.toLowerCase().endsWith('.pdf') ? (
        <div className="flex flex-col items-center gap-2 text-electric-blue">
          <FileText size={48} />
          <span className="text-xs font-bold uppercase tracking-wider">PDF Certificate</span>
        </div>
      ) : (
        <motion.img
          src={certificate.image && (certificate.image.startsWith('http') ? certificate.image : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${certificate.image}`)}
          alt={certificate.issuer}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      )}
    </div>

    <div className="p-4">
      <h3 className="text-white font-bold">{certificate.issuer}</h3>
      <p className="text-gray-400 text-sm">{certificate.date}</p>
    </div>
  </motion.div>
);
