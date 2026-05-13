import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button, Container, GradientText, Section } from '../../components/ui/Button';
import { fadeInUp, floatingAnimation, staggerContainer, glowPulse } from '../../utils/animations';
import { Download, Github, Linkedin, ArrowRight, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import resumePDF from '../../assets/bhautik.pdf';

const TerminalTyping = ({ commands }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (commandIndex >= commands.length) return;

    const currentCommand = commands[commandIndex];
    let charIndex = 0;

    const timer = setInterval(() => {
      if (charIndex < currentCommand.length) {
        setDisplayedText(prev => prev + currentCommand[charIndex]);
        charIndex++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setDisplayedText('');
          setCommandIndex((prev) => (prev + 1) % commands.length);
        }, 3000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [commandIndex, commands]);

  return (
    <div className="font-mono text-sm md:text-base lg:text-lg text-gray-300">
      <span className="text-electric-blue">$</span> <span>{displayedText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="text-electric-blue"
      >
        |
      </motion.span>
    </div>
  );
};

export const HomePage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const terminalCommands = [
    `whoami\n${PORTFOLIO_DATA.name} — Full-Stack Developer`,
    `cat achievements.txt\n🎯 ${PORTFOLIO_DATA.title} | Building Scalable Web Apps`,
    `echo $status\nOpen to Opportunities ✅`,
  ];

  const handleDownloadResume = async () => {
    try {
      const link = document.createElement('a');
      link.href = resumePDF;
      link.download = 'Bhautik Vachhani Resume.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('Resume downloaded successfully! ✅', 'success');
    } catch (error) {
      showToast('Failed to download resume', 'error');
    }
  };

  return (
    <div className="bg-space-darker min-h-screen">
      {/* Hero Section */}
      <Section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="w-96 h-96 bg-electric-blue rounded-full blur-3xl"
          />
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center"
          >
            {/* Terminal-style Hero */}
            <motion.div
              variants={fadeInUp}
              className="mb-12 bg-space-dark/40 border border-neon-purple/20 rounded-2xl p-8 backdrop-blur-lg font-mono"
            >
              <TerminalTyping commands={terminalCommands} />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-white mb-4"
            >
              <GradientText>Building the Future with Full-Stack Code</GradientText>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
            >
              {PORTFOLIO_DATA.shortIntro}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadResume}
                variants={glowPulse}
                className="group relative px-8 py-3 bg-gradient-glow text-white font-bold rounded-lg flex items-center gap-2 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-electric-blue/50 blur-lg rounded-lg"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Download size={20} className="relative z-10" />
                <span className="relative z-10">Download Resume</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  →
                </motion.span>
              </motion.button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/projects')}
                className="group"
              >
                View Projects
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex gap-6 justify-center"
            >
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                href={PORTFOLIO_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-electric-blue/10 border border-electric-blue/30 rounded-full hover:bg-electric-blue/20 transition"
              >
                <Github size={24} className="text-electric-blue" />
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                href={PORTFOLIO_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neon-purple/10 border border-neon-purple/30 rounded-full hover:bg-neon-purple/20 transition"
              >
                <Linkedin size={24} className="text-neon-purple" />
              </motion.a>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section className="py-20 relative">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: '10+', label: 'Projects Completed', icon: '📊' },
              { number: '5+', label: 'Technologies', icon: '⚙️' },
              { number: '100%', label: 'Dedication', icon: '💪' },
              { number: '1000+', label: 'Hours Coded', icon: '⏱️' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-space-dark/40 border border-neon-purple/10 rounded-xl"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-glow bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Quick CTA */}
      <Section className="py-12 relative">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-glow/10 border border-electric-blue/20 rounded-2xl p-8 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start a Project?
            </h2>
            <p className="text-gray-400 mb-6">Let's build something amazing together</p>
            <Button onClick={() => navigate('/contact')} size="lg">
              Get In Touch
              <ArrowRight size={20} />
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
};
