import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Globe, Smartphone, Zap } from 'lucide-react';

const skills = [
  { name: 'React', level: 'Expert', icon: <Code size={32} className="text-cyan-400" /> },
  { name: 'Node.js', level: 'Advanced', icon: <Database size={32} className="text-green-400" /> },
  { name: 'MongoDB', level: 'Advanced', icon: <Database size={32} className="text-green-500" /> },
  { name: 'HTML5', level: 'Expert', icon: <Code size={32} className="text-orange-400" /> },
  { name: 'CSS3', level: 'Expert', icon: <Layout size={32} className="text-blue-400" /> },
  { name: 'JavaScript', level: 'Expert', icon: <Globe size={32} className="text-yellow-400" /> },
  { name: 'TypeScript', level: 'Advanced', icon: <Zap size={32} className="text-purple-400" /> },
  { name: 'Tailwind CSS', level: 'Expert', icon: <Layout size={32} className="text-sky-400" /> },
  { name: 'Next.js', level: 'Advanced', icon: <Smartphone size={32} className="text-white" /> },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 relative">
          {/* Background Glow */}
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight whitespace-normal">
              Core <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Expertise</span>
            </h2>
          </motion.div>
          
          {/* Line */}
          <div 
            className="h-1.5 w-48 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)]"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-gray-300 font-semibold tracking-wide"
          >
            Master of Modern Technologies
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ rotateY: 5, rotateX: -5, z: 100 }}
              className="group relative"
            >
              {/* Card Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-lg" />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center min-h-[160px] hover:border-cyan-400/50 transition-[border-color,background,box-shadow] duration-200 group-hover:from-white/15 group-hover:to-white/8 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                
                {/* Gradient Line Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-primary to-blue-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                
                {/* Icon */}
                <div className="mb-3 p-3 bg-white/5 rounded-xl group-hover:bg-cyan-500/20 transition-[background-color,transform] duration-200 group-hover:scale-120 group-hover:rotate-12">
                  {skill.icon}
                </div>
                
                {/* Skill Name - Large and Bold */}
                <h3 className="text-xl font-black text-white leading-tight group-hover:text-cyan-300 transition-colors duration-200">
                  {skill.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
