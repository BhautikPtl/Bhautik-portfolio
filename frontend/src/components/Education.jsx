import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award } from 'lucide-react';

const Education = () => {
  const semesters = [
    { title: 'Semester 1', sgpa: '7.42', icon: <BookOpen size={24} />, color: 'blue' },
    { title: 'Semester 2', sgpa: '6.83', icon: <Award size={24} />, color: 'purple' },
    { title: 'Semester 3', sgpa: '7.52', icon: <GraduationCap size={24} />, color: 'cyan' },
    { title: 'Semester 4', sgpa: 'Current', icon: <BookOpen size={24} />, color: 'emerald', isCurrent: true }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    };
    return colors[color] || colors.blue;
  };

  const getSgpaColor = (color) => {
    const colors = {
      blue: 'text-blue-400',
      purple: 'text-purple-400',
      cyan: 'text-cyan-400',
      emerald: 'text-emerald-400',
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="education" className="py-20 relative overflow-hidden bg-background/50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-4 mb-16 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 justify-center md:justify-start">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Academic Performance</h2>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          <p className="text-lg md:text-xl text-slate-400 font-medium italic">Pursuing BCA @ Noble University, Junagadh</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {semesters.map((sem, index) => (
            <motion.div
              key={sem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-card group p-8 flex flex-col items-center justify-center text-center border border-white/5 rounded-[2rem] hover:border-white/20 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border ${getColorClasses(sem.color)}`}>
                {sem.icon}
              </div>
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{sem.title}</h3>
              <div className="flex items-end gap-2 text-slate-400 font-medium h-12">
                <span className={`text-4xl font-black leading-none ${getSgpaColor(sem.color)} ${sem.isCurrent ? 'text-3xl mt-2' : ''}`}>{sem.sgpa}</span>
                {!sem.isCurrent && <span className="text-sm uppercase tracking-widest pb-1">SGPA</span>}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-12 justify-center md:justify-start">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white/50">MERN Stack Specialization</h3>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/5 to-transparent"></div>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {[
              'MongoDB', 'Express.js', 'React.js', 'Node.js', 
              'Tailwind CSS', 'Full-Stack Architecture'
            ].map((course, idx) => (
              <motion.div
                key={course}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="px-3 py-1.5 md:px-6 md:py-3 text-sm md:text-base bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-slate-300 font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
              >
                {course}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
