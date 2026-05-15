import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsAPI } from '../utils/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await projectsAPI.getAll();
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 relative">
          {/* Background Glow */}
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-40 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 blur-3xl pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight whitespace-normal">
              Selected <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">Projects</span>
            </h2>
          </motion.div>
          
          {/* Animated Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
            className="h-1.5 w-48 bg-gradient-to-r from-blue-400 to-emerald-500 mx-auto rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-gray-300 font-semibold tracking-wide"
          >
            Hand-picked selection of my recent works
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 border border-blue-400/50 rounded-lg font-semibold text-blue-300 hover:border-blue-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-200">
              View All Projects <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          )) : (
            // Skeleton / Placeholder if empty
            [1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-white/5 rounded-2xl animate-pulse border border-white/10"></div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ rotateY: 5, rotateX: -5, z: 100 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="group relative"
    >
      {/* Card Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-emerald-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-lg" />
      
      {/* Card */}
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col h-full hover:border-blue-400/50 transition-[border-color,background,box-shadow] duration-200 group-hover:from-white/15 group-hover:to-white/8 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
        
        {/* Gradient Line Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
        <div style={{ transform: "translateZ(50px)" }} className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform duration-200">
            <Code2 size={24} />
          </div>
        </div>

        <h3 style={{ transform: "translateZ(40px)" }} className="text-lg font-black mb-3 group-hover:text-blue-300 transition-colors uppercase tracking-tight">{project.title}</h3>
        <p style={{ transform: "translateZ(30px)" }} className="text-gray-300 text-sm line-clamp-2 mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto mb-6">
          {(Array.isArray(project.techStack) ? project.techStack : []).map(tech => (
            <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 text-gray-400 rounded text-[9px] font-mono font-medium hover:border-blue-400/50 transition-colors">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-300 transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <Github size={14} /> Code
          </a>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
          >
            Live <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
