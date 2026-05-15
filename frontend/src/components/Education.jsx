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
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 relative">
          {/* Background Glow */}
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight whitespace-normal">
              Academic <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">Performance</span>
            </h2>
          </motion.div>
          
          {/* Animated Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
            className="h-1.5 w-48 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)]"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-gray-300 font-semibold tracking-wide"
          >
            Pursuing BCA @ Noble University, Junagadh
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {semesters.map((sem, index) => (
            <motion.div
              key={sem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ rotateY: 5, rotateX: -5, z: 100 }}
              className="group relative"
            >
              {/* Card Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-lg" />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center min-h-[160px] hover:border-purple-400/50 transition-[border-color,background,box-shadow] duration-200 group-hover:from-white/15 group-hover:to-white/8 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                
                {/* Gradient Line Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                
                {/* Icon */}
                <div className={`mb-3 p-3 rounded-xl transition-[background-color,transform] duration-200 group-hover:scale-120 group-hover:rotate-12 border ${getColorClasses(sem.color)}`}>
                  {sem.icon}
                </div>
                
                {/* Semester Title */}
                <h3 className="text-lg font-black text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors duration-200">
                  {sem.title}
                </h3>
                
                {/* SGPA */}
                <div className={`text-2xl font-black leading-none ${getSgpaColor(sem.color)}`}>
                  {sem.sgpa}
                </div>
                {!sem.isCurrent && <span className="text-xs uppercase tracking-widest text-gray-400 mt-1">SGPA</span>}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">
              MERN Stack <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Specialization</span>
            </h3>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4">
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
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl text-white font-semibold hover:border-purple-400/50 transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
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
