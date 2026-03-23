import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Globe, Cpu, Smartphone } from 'lucide-react';

const skills = [
  { name: 'React', level: 'Expert', icon: <Code className="text-primary" />, color: 'from-primary/20 to-transparent' },
  { name: 'Node.js', level: 'Advanced', icon: <Database className="text-accent" />, color: 'from-accent/20 to-transparent' },
  { name: 'MongoDB', level: 'Advanced', icon: <Database className="text-emerald-400" />, color: 'from-emerald-500/20 to-transparent' },
  { name: 'HTML5', level: 'Expert', icon: <Code className="text-orange-500" />, color: 'from-orange-500/20 to-transparent' },
  { name: 'CSS3', level: 'Expert', icon: <Layout className="text-blue-500" />, color: 'from-blue-500/20 to-transparent' },
  { name: 'JavaScript', level: 'Expert', icon: <Globe className="text-yellow-400" />, color: 'from-yellow-500/20 to-transparent' },
  { name: 'TypeScript', level: 'Intermediate', icon: < Globe className="text-primary" />, color: 'from-primary/20 to-transparent' },
  { name: 'Tailwind CSS', level: 'Expert', icon: <Layout className="text-sky-400" />, color: 'from-sky-400/20 to-transparent' },
  { name: 'Next.js', level: 'Advanced', icon: <Smartphone className="text-white" />, color: 'from-white/20 to-transparent' },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 italic">Core Expertise</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                rotateX: -10,
                boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
                borderColor: "rgba(6, 182, 212, 0.5)"
              }}
              className={`glass-card p-6 rounded-3xl relative overflow-hidden group transition-colors duration-300 hover:border-primary/50`}
              style={{ perspective: "1000px" }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

              <div className="relative z-10">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center mb-4 text-2xl">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{skill.name}</h3>
                <p className="text-slate-400 text-sm">{skill.level}</p>

                <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level === 'Expert' ? '90%' : '75%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
