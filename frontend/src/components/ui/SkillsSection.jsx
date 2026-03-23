import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const skillCategories = [
  {
    category: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'JavaScript', level: 92 },
      { name: 'Tailwind CSS', level: 88 },
    ]
  },
  {
    category: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 90 },
      { name: 'MongoDB', level: 80 },
    ]
  },
  {
    category: 'Tools & Design',
    icon: '🛠️',
    skills: [
      { name: 'Git/GitHub', level: 88 },
      { name: 'Figma', level: 75 },
      { name: 'UI/UX', level: 80 },
      { name: 'Problem Solving', level: 95 },
    ]
  },
];

export const SkillsSection = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {skillCategories.map((category, catIdx) => (
        <motion.div
          key={catIdx}
          variants={fadeInUp}
          className="bg-space-dark/40 border border-neon-purple/20 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{category.icon}</span>
            <h3 className="text-xl font-bold text-white">{category.category}</h3>
          </div>

          <div className="space-y-4">
            {category.skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                  <span className="text-xs text-electric-blue font-bold">{skill.level}%</span>
                </div>
                <motion.div
                  className="h-2 bg-space-darker rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="h-full bg-gradient-glow rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
