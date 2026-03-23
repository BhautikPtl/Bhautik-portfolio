import { motion } from 'framer-motion';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-semibold transition-all duration-300 rounded-lg flex items-center gap-2';
  
  const variants = {
    primary: 'bg-electric-blue hover:shadow-glow-blue text-white',
    secondary: 'bg-neon-purple hover:shadow-glow-purple text-white',
    outline: 'border border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white',
    ghost: 'text-electric-blue hover:bg-electric-blue/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' } : {}}
      className={`bg-space-dark/40 backdrop-blur-lg border border-neon-purple/20 rounded-2xl p-6 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const GradientText = ({ children, className = '' }) => (
  <span className={`bg-gradient-glow bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-electric-blue/20 text-electric-blue border border-electric-blue/30',
    secondary: 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Container = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

export const Section = ({ children, className = '', id = '' }) => (
  <section id={id} className={`py-20 relative ${className}`}>
    {children}
  </section>
);
