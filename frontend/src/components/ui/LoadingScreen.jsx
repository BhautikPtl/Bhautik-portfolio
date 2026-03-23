import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress over 2 seconds
    const intervals = [
      setTimeout(() => setProgress(25), 200),
      setTimeout(() => setProgress(50), 600),
      setTimeout(() => setProgress(75), 1000),
      setTimeout(() => setProgress(100), 2000),
    ];

    return () => intervals.forEach(interval => clearTimeout(interval));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-space-darker flex flex-col items-center justify-center z-50"
    >
      {/* Animated background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-80 h-80 bg-electric-blue rounded-full blur-3xl opacity-20" />
      </motion.div>

      {/* Logo Container */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mb-12"
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.3)',
              '0 0 60px rgba(59, 130, 246, 0.6)',
              '0 0 20px rgba(59, 130, 246, 0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 bg-gradient-glow rounded-2xl flex items-center justify-center text-5xl font-bold border border-electric-blue/30"
        >
          BV
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Bhautik Vachhani</h2>
        <p className="text-gray-400">Full Stack Developer</p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 w-64 h-1 bg-space-dark rounded-full border border-neon-purple/20 overflow-hidden"
      >
        <motion.div
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-gradient-glow rounded-full"
        />
      </motion.div>

      {/* Progress Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 text-gray-400 text-sm mt-4"
      >
        {Math.round(progress)}%
      </motion.p>

      {/* Bottom text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 absolute bottom-8 text-center"
      >
        <p className="text-gray-500 text-xs">Loading your portfolio...</p>
      </motion.div>
    </motion.div>
  );
};
