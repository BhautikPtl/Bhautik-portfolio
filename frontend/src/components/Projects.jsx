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
    <section id="projects" className="py-20 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-4 text-center md:text-left">
          <div>
            <h2 className="text-4xl font-bold mb-2">Selected Projects</h2>
            <p className="text-slate-400">Hand-picked selection of my recent works.</p>
          </div>
          <Link to="/projects" className="text-primary flex items-center gap-2 font-medium hover:gap-3 transition-all mx-auto md:mx-0">
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.length > 0 ? projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          )) : (
            // Skeleton / Placeholder if empty
            [1, 2, 3].map(i => (
              <div key={i} className="h-80 glass rounded-3xl animate-pulse border border-white/5"></div>
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
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="glass-card group p-8 flex flex-col h-full border border-white/5 cursor-default"
    >
      <div style={{ transform: "translateZ(50px)" }} className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
          <Code2 size={28} />
        </div>
      </div>

      <h3 style={{ transform: "translateZ(40px)" }} className="text-2xl font-black mb-3 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{project.title}</h3>
      <p style={{ transform: "translateZ(30px)" }} className="text-slate-400 text-sm line-clamp-3 mb-8 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto mb-8">
        {(Array.isArray(project.techStack) ? project.techStack : []).map(tech => (
          <span key={tech} className="px-3 py-1 bg-slate-900/50 border border-white/10 text-slate-300 rounded-md text-[10px] font-mono font-medium">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <Github size={16} /> Code
        </a>
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors uppercase tracking-widest text-xs"
        >
          Live Demo <ExternalLink size={16} />
        </a>
      </div>
    </motion.div>
  );
};

export default Projects;
